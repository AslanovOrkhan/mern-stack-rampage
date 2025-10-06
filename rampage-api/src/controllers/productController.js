const ProductModel = require("../models/productModel");
const {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
  getTotalCount,
} = require("../services/productService"); // Bu faylın mövcudluğunu fərz edirəm
const { getOne: getCategory } = require("../services/categoryService");
const formatMongoData = require("../utils/formatMongoData");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

// Fayl silinməsi üçün köməkçi funksiya (xəta zamanı təmizləmə)
const cleanupUploadedFiles = (files) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      const filePath = path.join(
        path.dirname(__dirname),
        "public/uploads/products",
        file.filename
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }
};

//get all products (Pagination/Filtering Məntiqi Əladır, olduğu kimi qalır)
exports.getProducts = async (req, res, next) => {
  try {
    const {
      search = "",
      sortBy = "price",
      order = "asc",
      page = 1,
      limit = 5,
    } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 5;

    const allowedSortFields = ["price", "name", "createdAt"];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "price";
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1; // Search filter

    const filter = {};
    if (search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" }; // case-insensitive search
    } // Get products with pagination, sorting, and filtering

    const products = await getAll({
      page: pageNumber,
      limit: pageSize,
      sortBy: safeSortBy,
      order: sortOrder,
      filter,
    }); // Get total count for pagination metadata

    const total = await getTotalCount(filter);

    res.status(200).json({
      products: formatMongoData(products),
      total,
      page: pageNumber,
      pageSize: products.length,
    });
  } catch (error) {
    next(error);
  }
};

//get one product (Populate/Format məntiqi əladır)
exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getOne(id);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    // Yoxlanılır ki, product.category obyekti mövcuddur
    const categoryData = product.category
      ? formatMongoData(product.category)
      : null;

    res.status(200).json({
      ...formatMongoData(product._doc),
      category: categoryData,
    });
  } catch (error) {
    next(error);
  }
};

//post (Mürəkkəb data və Multi-File yükləmə məntiqi)
exports.postProduct = async (req, res, next) => {
  // req.files - Multer tərəfindən yüklənmiş fayllar massivi
  const uploadedFiles = req.files;

  try {
    // --- 1. Fayl Yoxlaması (Ən azı 1 şəkil) ---
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "Məhsul üçün ən azı bir şəkil daxil edilməlidir." });
    }

    // --- 2. JSON String Parsing ---
    const specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : [];
    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];

    // --- 3. Category/Slug Yoxlanışı ---
    const category = await getCategory(req.body.category);
    if (!category) {
      cleanupUploadedFiles(uploadedFiles);
      return res.status(404).json({ message: "Kateqoriya tapılmadı!" });
    }

    // --- 4. Faylların Variants-a Məntiqi İnteqrasiyası ---

    // Fərz edirik ki, frontend variantları JSON olaraq göndərir və Controller faylları uyğunlaşdırır.
    let fileIndex = 0;
    const processedVariants = variants.map((variant) => ({
      ...variant,
      options: variant.options.map((option) => {
        // Hər variantın bir və ya daha çox şəkli üçün uploadedFiles-dan çəkirik
        const pictures = [];
        for (let i = 0; i < option.picturesCount; i++) {
          if (uploadedFiles[fileIndex]) {
            pictures.push({
              img: `/public/uploads/products/${uploadedFiles[fileIndex].filename}`,
              public_id: uploadedFiles[fileIndex].filename, // Lokal yaddaşda filename-i ID kimi istifadə edirik
            });
            fileIndex++;
          }
        }
        return { ...option, pictures };
      }),
    }));

    // --- 5. Yekun Product Obyekti ---
    const newProductData = {
      ...req.body,
      slug: slugify(req.body.name, { lower: true, strict: true }),
      createdBy: req.user._id, // Autentifikasiya olunmuş Admin ID-si
      variants: processedVariants,
      specifications: specifications,
    };

    const newProduct = await post(newProductData);
    res.status(201).json(formatMongoData(newProduct));
  } catch (error) {
    // Xəta zamanı yüklənmiş faylları sil
    cleanupUploadedFiles(uploadedFiles);

    // Mongoose 'Unique' xətasını idarə etmək
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Bu məhsul adı və ya slug artıq mövcuddur." });
    }

    // JSON parsing xətalarını idarə etmək (SyntaxError)
    if (error instanceof SyntaxError) {
      return res
        .status(400)
        .json({
          message:
            "Yanlış JSON formatı: Variants və ya Specifications düzgün deyil.",
        });
    }

    next(error);
  }
};

//delete (Məntiq əladır, amma Cleanup əlavə olunmalıdır)
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteOne(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found!" });

    // TODO: Bulud yaddaşından (və ya lokal yaddaşdan) bütün şəkilləri silmək məntiqi buraya əlavə edilməlidir.

    res.status(200).json(formatMongoData(deletedProduct));
  } catch (error) {
    next(error);
  }
};

//update (Mürəkkəb data və Multi-File yükləmə məntiqi)
exports.updateProduct = async (req, res, next) => {
  const uploadedFiles = req.files;
  try {
    const { id } = req.params;
    let updateProd = { ...req.body };

    // --- 1. JSON String Parsing ---
    if (req.body.specifications) {
      updateProd.specifications = JSON.parse(req.body.specifications);
    }
    if (req.body.variants) {
      updateProd.variants = JSON.parse(req.body.variants);
    }

    // --- 2. Slug Yenilənməsi ---
    if (req.body.name) {
      updateProd.slug = slugify(req.body.name, { lower: true, strict: true });
    }

    // --- 3. Faylların Variants-a Məntiqi İnteqrasiyası ---
    if (uploadedFiles && uploadedFiles.length > 0) {
      // Məhsul yenilənirsə və yeni şəkillər yüklənibsə,
      // variants massivini yenidən fayllarla doldurmalısınız.
      // *Qeyd:* Update əməliyyatında bu məntiq POST-dan daha mürəkkəbdir
      // və adətən frontend hansı şəklin hansı variantı əvəz etdiyini dəqiq göstərməlidir.
      // Sadəlik üçün, yeni şəkilləri updateProd.variants daxilindəki uyğun variantlara əlavə etmək fərz edilir.
    }

    const updatedProductResponse = await update(id, updateProd);
    if (!updatedProductResponse)
      return res.status(404).json({ message: "product not found!" });

    // TODO: Köhnə şəkilləri silmək məntiqi (Əgər yeni şəkillər yüklənibsə)

    res.status(200).json(formatMongoData(updatedProductResponse));
  } catch (error) {
    cleanupUploadedFiles(uploadedFiles);
    if (error instanceof SyntaxError) {
      return res
        .status(400)
        .json({
          message:
            "Yanlış JSON formatı: Variants və ya Specifications düzgün deyil.",
        });
    }
    next(error);
  }
};
