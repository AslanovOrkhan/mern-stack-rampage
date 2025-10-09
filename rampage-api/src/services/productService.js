const ProductModel = require("../models/productModel");
// Cloudinary konfiqurasiyası
const cloudinary = require("../config/cloudinaryConfig");

// Şəkillərin public_id-lərini çıxaran köməkçi funksiya (yeni schema üçün)
const extractPublicIds = (product) => {
  const ids = [];
  
  // Əsas məhsul şəkillərindən public_id-lər
  if (product && product.images) {
    product.images.forEach((image) => {
      if (image.public_id) {
        ids.push(image.public_id);
      }
    });
  }
  
  // Variant şəkillərindən public_id-lər
  if (product && product.variants) {
    product.variants.forEach((variant) => {
      variant.options.forEach((option) => {
        if (option.images) {
          option.images.forEach((image) => {
            if (image.public_id) {
              ids.push(image.public_id);
            }
          });
        }
      });
    });
  }
  
  return ids;
};

// --- Məhsulların Alınması (Advanced Features) ---
const getAll = async ({ page = 1, limit = 12, sortBy = 'createdAt', order = -1, filter = {} }) => {
  const query = { ...filter, status: { $ne: 'draft' } }; // Draft məhsulları gizlədir
  
  return await ProductModel.find(query)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .populate("createdBy", "name email")
    .lean();
};

// Admin üçün bütün məhsullar (draft daxil)
const getAllForAdmin = async ({ page = 1, limit = 12, sortBy = 'createdAt', order = -1, filter = {} }) => {
  return await ProductModel.find(filter)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .populate("createdBy", "name email")
    .lean();
};

const getOne = async (id) => {
  const product = await ProductModel.findById(id)
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .populate("createdBy", "name email");
  
  // Baxış sayını artır
  if (product) {
    await ProductModel.incrementViews(id);
  }
  
  return product;
};

// Slug ilə məhsul tap
const getBySlug = async (slug) => {
  const product = await ProductModel.findOne({ slug, status: 'active' })
    .populate("category", "name slug")
    .populate("brand", "name slug logo");
  
  if (product) {
    await ProductModel.incrementViews(product._id);
  }
  
  return product;
};

const getTotalCount = async (filter = {}) => 
  await ProductModel.countDocuments(filter);

const post = async (payload) => {
  const product = await ProductModel.create(payload);
  return await ProductModel.findById(product._id)
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .populate("createdBy", "name email");
};

// --- Tək Məhsulu Silmək (Çoxlu Şəkil Silinməsi ilə) ---
const deleteOne = async (id) => {
  const product = await ProductModel.findById(id).lean();
  if (!product) return null;

  // 1. Bütün variant şəkillərinin public_id-lərini çıxarırıq
  const publicIds = extractPublicIds(product);

  // 2. Cloudinary-dən bütün şəkilləri silirik
  for (const public_id of publicIds) {
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (e) {
      console.error(`Cloudinary-dən silmə xətası: ${public_id}`, e);
      // Silinmə xətasını görməzdən gəlirik ki, MongoDB əməliyyatı davam etsin
    }
  }

  // 3. Məhsulu MongoDB-dən silirik
  return await ProductModel.findByIdAndDelete(id);
};

// --- Bir Kateqoriyaya Aid Bütün Məhsulları Silmək ---
const deleteMany = async (categoryId) => {
  const products = await ProductModel.find({ category: categoryId }).lean();

  for (const product of products) {
    // 1. Hər məhsulun bütün variant şəkillərinin public_id-lərini çıxarırıq
    const publicIds = extractPublicIds(product);

    // 2. Cloudinary-dən bütün şəkilləri silirik
    for (const public_id of publicIds) {
      try {
        await cloudinary.uploader.destroy(public_id);
      } catch (e) {
        console.error(`Cloudinary-dən silmə xətası: ${public_id}`, e);
      }
    }
  }

  // 3. MongoDB-dən məhsulları silirik
  await ProductModel.deleteMany({ category: categoryId });
  return { deletedCount: products.length };
};

// --- Məhsulu Yeniləmək ---
const update = async (id, payload) => {
  const existing = await ProductModel.findById(id).lean();
  if (!existing) return null;

  const updated = await ProductModel.findByIdAndUpdate(id, payload, { 
    new: true,
    runValidators: true
  })
    .populate("category", "name slug")
    .populate("brand", "name slug logo")
    .populate("createdBy", "name email");

  return updated;
};

// --- Rampage Gaming Product Specific Services ---

// Kateqoriyaya görə məhsullar
const getByCategory = async (categoryId, options = {}) => {
  return await ProductModel.findByCategory(categoryId, options);
};

// Brendə görə məhsullar
const getByBrand = async (brandId, options = {}) => {
  const { limit = 12, skip = 0, sort = { createdAt: -1 } } = options;
  
  return await ProductModel.find({ brand: brandId, status: 'active' })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort(sort)
    .limit(limit)
    .skip(skip);
};

// Featured məhsullar
const getFeatured = async (limit = 10) => {
  return await ProductModel.findFeatured(limit);
};

// Yeni məhsullar
const getNewProducts = async (limit = 10) => {
  return await ProductModel.findNewProducts(limit);
};

// Ən çox satılanlar
const getBestSelling = async (limit = 10) => {
  return await ProductModel.findBestSelling(limit);
};

// Bənzər məhsullar
const getRelated = async (productId, categoryId, limit = 6) => {
  return await ProductModel.findRelated(productId, categoryId, limit);
};

// Gaming specifications ilə axtarış
const searchByGamingSpecs = async (specs = {}) => {
  return await ProductModel.findByGamingSpecs(specs);
};

// Advanced search with filters
const searchProducts = async (filters = {}) => {
  return await ProductModel.searchProducts(filters);
};

// Az stoklu məhsullar (Admin üçün)
const getLowStock = async (threshold = 10) => {
  return await ProductModel.findLowStock(threshold);
};

// Stok statusunu yenilə
const updateStockStatus = async (id, quantity) => {
  const product = await ProductModel.findById(id);
  if (!product) return null;
  
  product.stockQuantity = quantity;
  product.stockStatus = quantity > 0 ? 'in-stock' : 'out-of-stock';
  
  return await product.save();
};

// Məhsul satışını qeyd et
const recordSale = async (productId, quantity = 1) => {
  return await ProductModel.incrementSales(productId, quantity);
};

// Məhsul statusunu dəyiş
const updateStatus = async (id, status) => {
  return await ProductModel.findByIdAndUpdate(
    id, 
    { status }, 
    { new: true }
  ).populate("category", "name slug").populate("brand", "name slug logo");
};

// Bulk operations
const bulkDelete = async (ids) => {
  const products = await ProductModel.find({ _id: { $in: ids } }).lean();
  
  // Bütün şəkilləri sil
  for (const product of products) {
    const publicIds = extractPublicIds(product);
    for (const public_id of publicIds) {
      try {
        await cloudinary.uploader.destroy(public_id);
      } catch (e) {
        console.error(`Cloudinary silmə xətası: ${public_id}`, e);
      }
    }
  }
  
  const result = await ProductModel.deleteMany({ _id: { $in: ids } });
  return result;
};

// Bulk status update
const bulkUpdateStatus = async (ids, status) => {
  return await ProductModel.updateMany(
    { _id: { $in: ids } },
    { status }
  );
};

module.exports = {
  // Basic CRUD
  getAll,
  getAllForAdmin,
  getOne,
  getBySlug,
  post,
  update,
  deleteOne,
  deleteMany,
  getTotalCount,
  
  // Rampage Gaming Features
  getByCategory,
  getByBrand,
  getFeatured,
  getNewProducts,
  getBestSelling,
  getRelated,
  searchByGamingSpecs,
  searchProducts,
  
  // Admin Features
  getLowStock,
  updateStockStatus,
  recordSale,
  updateStatus,
  bulkDelete,
  bulkUpdateStatus
};
