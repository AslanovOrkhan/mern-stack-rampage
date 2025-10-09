const mongoose = require("mongoose");
const productSchema = require("../schemas/productSchema");

// Create Product Model
const ProductModel = mongoose.model("Product", productSchema);

// --- Static Helper Methods ---

// Find products by category with population
ProductModel.findByCategory = function(categoryId, options = {}) {
  const {
    limit = 10,
    skip = 0,
    sort = { createdAt: -1 },
    status = 'active'
  } = options;
  
  return this.find({ category: categoryId, status })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort(sort)
    .limit(limit)
    .skip(skip);
};

// Find featured products
ProductModel.findFeatured = function(limit = 10) {
  return this.find({ isFeatured: true, status: 'active' })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Find new products
ProductModel.findNewProducts = function(limit = 10) {
  return this.find({ isNewProduct: true, status: 'active' })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Search products with filters
ProductModel.searchProducts = function(filters = {}) {
  const {
    searchTerm,
    category,
    brand,
    minPrice,
    maxPrice,
    inStock,
    hasDiscount,
    limit = 20,
    skip = 0,
    sort = { createdAt: -1 }
  } = filters;
  
  let query = { status: 'active' };
  
  // Text search
  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }
  
  // Category filter
  if (category) {
    query.category = category;
  }
  
  // Brand filter
  if (brand) {
    query.brand = brand;
  }
  
  // Price range
  if (minPrice || maxPrice) {
    query.salePrice = {};
    if (minPrice) query.salePrice.$gte = minPrice;
    if (maxPrice) query.salePrice.$lte = maxPrice;
  }
  
  // Stock filter
  if (inStock) {
    query.stockQuantity = { $gt: 0 };
  }
  
  // Discount filter
  if (hasDiscount) {
    query.discountPercentage = { $gt: 0 };
  }
  
  return this.find(query)
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort(sort)
    .limit(limit)
    .skip(skip);
};

// Find related products (same category, exclude current)
ProductModel.findRelated = function(productId, categoryId, limit = 6) {
  return this.find({
    _id: { $ne: productId },
    category: categoryId,
    status: 'active'
  })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort({ viewCount: -1 })
    .limit(limit);
};

// Get products with low stock
ProductModel.findLowStock = function(threshold = 10) {
  return this.find({
    stockQuantity: { $lte: threshold },
    status: 'active'
  })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort({ stockQuantity: 1 });
};

// Get best selling products
ProductModel.findBestSelling = function(limit = 10) {
  return this.find({ status: 'active' })
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort({ sold: -1 })
    .limit(limit);
};

// Get products by gaming specifications
ProductModel.findByGamingSpecs = function(specs = {}) {
  let query = { status: 'active' };
  
  // Mouse specifications
  if (specs.dpi) {
    query.dpi = new RegExp(specs.dpi, 'i');
  }
  
  if (specs.sensor) {
    query.sensor = new RegExp(specs.sensor, 'i');
  }
  
  // Keyboard specifications
  if (specs.switchType) {
    query.switchType = new RegExp(specs.switchType, 'i');
  }
  
  if (specs.keyboardLayout) {
    query.keyboardLayout = specs.keyboardLayout;
  }
  
  // Monitor specifications
  if (specs.screenSize) {
    query.screenSize = new RegExp(specs.screenSize, 'i');
  }
  
  if (specs.refreshRate) {
    query.refreshRate = new RegExp(specs.refreshRate, 'i');
  }
  
  // Universal specs
  if (specs.isWireless !== undefined) {
    query.isWireless = specs.isWireless;
  }
  
  if (specs.hasRGB !== undefined) {
    query.hasRGB = specs.hasRGB;
  }
  
  return this.find(query)
    .populate('category', 'name slug')
    .populate('brand', 'name slug logo')
    .sort({ createdAt: -1 });
};

// Update product view count
ProductModel.incrementViews = function(productId) {
  return this.findByIdAndUpdate(
    productId,
    { $inc: { viewCount: 1 } },
    { new: true }
  );
};

// Update product sales count
ProductModel.incrementSales = function(productId, quantity = 1) {
  return this.findByIdAndUpdate(
    productId,
    { 
      $inc: { 
        sold: quantity,
        stockQuantity: -quantity 
      }
    },
    { new: true }
  );
};

module.exports = ProductModel;