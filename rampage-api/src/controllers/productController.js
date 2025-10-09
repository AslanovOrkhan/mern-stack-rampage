const ProductModel = require("../models/productModel");
const {
  getAll,
  getAllForAdmin,
  getOne,
  getBySlug,
  post,
  update,
  deleteOne,
  getTotalCount,
  getByCategory,
  getByBrand,
  getFeatured,
  getNewProducts,
  getBestSelling,
  getRelated,
  searchProducts,
  searchByGamingSpecs,
  getLowStock,
  updateStockStatus,
  recordSale,
  updateStatus,
  bulkDelete,
  bulkUpdateStatus
} = require("../services/productService");
const { getOne: getCategory } = require("../services/categoryService");
const { getOne: getBrand } = require("../services/brandService");
const { createProduct, updateProduct } = require("../validations/product.validation");
const formatMongoData = require("../utils/formatMongoData");
const cloudinary = require("../config/cloudinaryConfig");

// Cloudinary üçün şəkil yükləmə köməkçi funksiyası
const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = files.map(file => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, {
        folder: 'rampage/products',
        use_filename: true,
        unique_filename: true,
        overwrite: false
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            img: result.secure_url,
            public_id: result.public_id
          });
        }
      });
    });
  });
  
  return Promise.all(uploadPromises);
};

// Get all products (Public - for website)
exports.getProducts = async (req, res, next) => {
  try {
    const {
      search = "",
      category,
      brand,
      minPrice,
      maxPrice,
      inStock,
      hasDiscount,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 12;
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;

    // Advanced search with filters
    const searchFilters = {
      searchTerm: search.trim() || undefined,
      category: category || undefined,
      brand: brand || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      inStock: inStock === 'true',
      hasDiscount: hasDiscount === 'true',
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      sort: { [sortBy]: sortOrder }
    };

    const products = await searchProducts(searchFilters);
    
    // Get total count for pagination
    const filter = {};
    if (search.trim()) {
      filter.$text = { $search: search.trim() };
    }
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.salePrice = {};
      if (minPrice) filter.salePrice.$gte = parseFloat(minPrice);
      if (maxPrice) filter.salePrice.$lte = parseFloat(maxPrice);
    }
    if (inStock === 'true') filter.stockQuantity = { $gt: 0 };
    if (hasDiscount === 'true') filter.discountPercentage = { $gt: 0 };
    
    const total = await getTotalCount(filter);

    res.status(200).json({
      success: true,
      products: formatMongoData(products),
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all products for admin (includes draft products)
exports.getProductsForAdmin = async (req, res, next) => {
  try {
    const {
      search = "",
      status,
      category,
      brand,
      sortBy = "createdAt",
      order = "desc", 
      page = 1,
      limit = 12,
    } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 12;
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;

    const filter = {};
    if (search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" };
    }
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await getAllForAdmin({
      page: pageNumber,
      limit: pageSize,
      sortBy,
      order: sortOrder,
      filter,
    });

    const total = await getTotalCount(filter);

    res.status(200).json({
      success: true,
      products: formatMongoData(products),
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getOne(id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found!" 
      });
    }

    res.status(200).json({
      success: true,
      product: formatMongoData(product)
    });
  } catch (error) {
    next(error);
  }
};

// Get product by slug (SEO-friendly URLs)
exports.getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await getBySlug(slug);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found!" 
      });
    }

    // Get related products
    const relatedProducts = await getRelated(product._id, product.category._id, 6);

    res.status(200).json({
      success: true,
      product: formatMongoData(product),
      relatedProducts: formatMongoData(relatedProducts)
    });
  } catch (error) {
    next(error);
  }
};

// Create new product
exports.postProduct = async (req, res, next) => {
  try {
    // 1. Validation
    const { error } = createProduct.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details[0].message
      });
    }

    // 2. Handle images (optional for testing)
    let images = [];
    if (req.files && req.files.length > 0) {
      // Upload images to Cloudinary
      const uploadedImages = await uploadImagesToCloudinary(req.files);
      images = uploadedImages.map((img, index) => ({
        ...img,
        isPrimary: index === 0,
        altText: req.body.name
      }));
    } else if (req.body.images) {
      // Use images from body (for raw JSON testing)
      images = Array.isArray(req.body.images) ? req.body.images : [];
    }

    // 3. Verify category and brand exist
    const [category, brand] = await Promise.all([
      getCategory(req.body.category),
      getBrand(req.body.brand)
    ]);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kateqoriya tapılmadı"
      });
    }

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brend tapılmadı"
      });
    }

    // Skip this section - images already processed above

    // 6. Parse JSON fields if they exist
    let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Variants JSON formatı düzgün deyil"
        });
      }
    }

    // 7. Prepare product data
    const productData = {
      ...req.body,
      images,
      variants,
      createdBy: req.user?._id || req.body.createdBy || '675c1a2b4f5e8c9d11111111', // TEST için mock ID
      // Convert string values to numbers where needed
      costPrice: parseFloat(req.body.costPrice),
      salePrice: parseFloat(req.body.salePrice),
      stockQuantity: parseInt(req.body.stockQuantity),
      // Convert boolean strings
      isFeatured: req.body.isFeatured === 'true',
      isNewProduct: req.body.isNewProduct === 'true',
      isWireless: req.body.isWireless === 'true',
      hasRGB: req.body.hasRGB === 'true',
    };

    // 8. Create product
    const newProduct = await post(productData);

    res.status(201).json({
      success: true,
      message: "Məhsul uğurla yaradıldı",
      product: formatMongoData(newProduct)
    });

  } catch (error) {
    // Clean up uploaded images on error
    if (req.files) {
      for (const file of req.files) {
        try {
          await cloudinary.uploader.destroy(file.filename);
        } catch (e) {
          console.error('Cloudinary cleanup error:', e);
        }
      }
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Bu məhsul adı və ya SKU artıq mövcuddur"
      });
    }

    next(error);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteOne(id); // Service-də artıq Cloudinary cleanup var
    
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Məhsul tapılmadı"
      });
    }

    res.status(200).json({
      success: true,
      message: "Məhsul uğurla silindi",
      product: formatMongoData(deletedProduct)
    });
  } catch (error) {
    next(error);
  }
};

// --- Rampage Gaming Product Features ---

// Get products by category
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 12, sort = 'createdAt' } = req.query;

    const products = await getByCategory(categoryId, {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      sort: { [sort]: -1 }
    });

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// Get products by brand
exports.getProductsByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const { page = 1, limit = 12, sort = 'createdAt' } = req.query;

    const products = await getByBrand(brandId, {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      sort: { [sort]: -1 }
    });

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await getFeatured(parseInt(limit));

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// Get new products
exports.getNewProducts = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await getNewProducts(parseInt(limit));

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// Get best selling products
exports.getBestSellingProducts = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await getBestSelling(parseInt(limit));

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// Search by gaming specifications
exports.searchByGamingSpecs = async (req, res, next) => {
  try {
    const {
      dpi,
      sensor,
      switchType,
      keyboardLayout,
      screenSize,
      refreshRate,
      isWireless,
      hasRGB
    } = req.query;

    const specs = {};
    if (dpi) specs.dpi = dpi;
    if (sensor) specs.sensor = sensor;
    if (switchType) specs.switchType = switchType;
    if (keyboardLayout) specs.keyboardLayout = keyboardLayout;
    if (screenSize) specs.screenSize = screenSize;
    if (refreshRate) specs.refreshRate = refreshRate;
    if (isWireless !== undefined) specs.isWireless = isWireless === 'true';
    if (hasRGB !== undefined) specs.hasRGB = hasRGB === 'true';

    const products = await searchByGamingSpecs(specs);

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// --- Admin Features ---

// Get low stock products
exports.getLowStockProducts = async (req, res, next) => {
  try {
    const { threshold = 10 } = req.query;
    const products = await getLowStock(parseInt(threshold));

    res.status(200).json({
      success: true,
      products: formatMongoData(products)
    });
  } catch (error) {
    next(error);
  }
};

// Update product status
exports.updateProductStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Yanlış status değeri"
      });
    }

    const updatedProduct = await updateStatus(id, status);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Məhsul tapılmadı"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status uğurla yeniləndi",
      product: formatMongoData(updatedProduct)
    });
  } catch (error) {
    next(error);
  }
};

// Bulk delete products
exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ID massivi tələb olunur"
      });
    }

    const result = await bulkDelete(ids);

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} məhsul silindi`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    next(error);
  }
};

// Bulk update product status
exports.bulkUpdateProductStatus = async (req, res, next) => {
  try {
    const { ids, status } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ID massivi tələb olunur"
      });
    }

    if (!['active', 'inactive', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Yanlış status değeri"
      });
    }

    const result = await bulkUpdateStatus(ids, status);

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} məhsulun statusu yeniləndi`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    next(error);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Validation
    const { error } = updateProduct.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details[0].message
      });
    }

    // 2. Check if product exists
    const existingProduct = await getOne(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Məhsul tapılmadı"
      });
    }

    let updateData = { ...req.body };

    // 3. Handle new images if provided
    if (req.files && req.files.length > 0) {
      try {
        const uploadedImages = await uploadImagesToCloudinary(req.files);
        
        // Combine with existing images or replace based on frontend logic
        const newImages = uploadedImages.map((img, index) => ({
          ...img,
          isPrimary: index === 0 && (!existingProduct.images || existingProduct.images.length === 0),
          altText: req.body.name || existingProduct.name
        }));

        if (req.body.replaceImages === 'true') {
          // Delete old images from Cloudinary
          if (existingProduct.images) {
            for (const image of existingProduct.images) {
              try {
                await cloudinary.uploader.destroy(image.public_id);
              } catch (e) {
                console.error('Error deleting old image:', e);
              }
            }
          }
          updateData.images = newImages;
        } else {
          // Append new images to existing ones
          updateData.images = [...(existingProduct.images || []), ...newImages];
        }
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Şəkil yükləmə xətası"
        });
      }
    }

    // 4. Parse JSON fields if they exist
    if (req.body.variants) {
      try {
        updateData.variants = JSON.parse(req.body.variants);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Variants JSON formatı düzgün deyil"
        });
      }
    }

    // 5. Convert data types
    if (updateData.costPrice) updateData.costPrice = parseFloat(updateData.costPrice);
    if (updateData.salePrice) updateData.salePrice = parseFloat(updateData.salePrice);
    if (updateData.stockQuantity) updateData.stockQuantity = parseInt(updateData.stockQuantity);
    if (updateData.isFeatured) updateData.isFeatured = updateData.isFeatured === 'true';
    if (updateData.isNewProduct) updateData.isNewProduct = updateData.isNewProduct === 'true';
    if (updateData.isWireless) updateData.isWireless = updateData.isWireless === 'true';
    if (updateData.hasRGB) updateData.hasRGB = updateData.hasRGB === 'true';

    // 6. Update product
    const updatedProduct = await update(id, updateData);

    res.status(200).json({
      success: true,
      message: "Məhsul uğurla yeniləndi",
      product: formatMongoData(updatedProduct)
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Bu məhsul adı və ya SKU artıq mövcuddur"
      });
    }
    next(error);
  }
};
