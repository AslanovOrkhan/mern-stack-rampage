const express = require("express");
const multer = require("multer");
const {
  // Basic CRUD
  getProducts,
  getProductsForAdmin,
  getProductById,
  getProductBySlug,
  postProduct,
  updateProduct,
  deleteProduct,
  
  // Rampage Gaming Features
  getProductsByCategory,
  getProductsByBrand,
  getFeaturedProducts,
  getNewProducts,
  getBestSellingProducts,
  searchByGamingSpecs,
  
  // Admin Features
  getLowStockProducts,
  updateProductStatus,
  bulkDeleteProducts,
  bulkUpdateProductStatus
} = require("../controllers/productController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const logger = require("../middlewares/logger");
const validateProduct = require("../middlewares/validations/productValidate");
const authToken = require("../middlewares/authToken"); // Authentication
const authRole = require("../middlewares/authRole"); // Role check
const router = express.Router();

// Multer configuration for product images
const upload = uploadMiddleware("products");
const multiUpload = upload.array("images", 10); // Max 10 şəkil

// Enhanced upload error handling middleware
const handleUploadErrors = (req, res, next) => {
  multiUpload(req, res, function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            return res.status(400).json({ 
              success: false,
              message: "Faylın ölçüsü 5MB limitini aşır!" 
            });
          case "LIMIT_FILE_COUNT":
            return res.status(400).json({ 
              success: false,
              message: "Maksimum 10 şəkil yükləyə bilərsiniz!" 
            });
          case "LIMIT_UNEXPECTED_FILE":
            return res.status(400).json({ 
              success: false,
              message: "Gözlənilməz fayl sahəsi!" 
            });
          default:
            return res.status(400).json({ 
              success: false,
              message: `Multer xətası: ${err.message}` 
            });
        }
      }

      if (err.message.includes("INVALID_FILE_TYPE")) {
        return res.status(400).json({
          success: false,
          message: "Yalnız JPEG, PNG, WebP formatlarına icazə verilir!"
        });
      }

      return res.status(400).json({ 
        success: false,
        message: `Şəkil yüklənmə xətası: ${err.message}` 
      });
    }
    next();
  });
};

// --- PUBLIC ROUTES (No Auth Required) ---

// Get products for website (with advanced filtering)
router.get("/", logger, getProducts);

// Get product by slug (SEO-friendly URLs)
router.get("/slug/:slug", getProductBySlug);

// Get product by ID
router.get("/:id", getProductById);

// --- GAMING PRODUCT FEATURES ---

// Get featured products
router.get("/special/featured", getFeaturedProducts);

// Get new products  
router.get("/special/new", getNewProducts);

// Get best selling products
router.get("/special/bestselling", getBestSellingProducts);

// Get products by category
router.get("/category/:categoryId", getProductsByCategory);

// Get products by brand
router.get("/brand/:brandId", getProductsByBrand);

// Search by gaming specifications
router.get("/search/gaming-specs", searchByGamingSpecs);

// --- ADMIN ROUTES (Auth + Admin Required) ---

// Get all products for admin (includes drafts)
router.get("/admin/all", 
  authToken, 
  authRole(['admin']), 
  getProductsForAdmin
);

// Get low stock products
router.get("/admin/low-stock", 
  authToken, 
  authRole(['admin']), 
  getLowStockProducts
);

// Create new product (TEST - Auth disabled)
router.post("/",
  // authToken,
  // authRole(['admin']),
  handleUploadErrors,
  // validateProduct, // Validation artıq controller-də var
  postProduct
);

// Update product
router.patch("/:id",
  authToken,
  authRole(['admin']),
  handleUploadErrors,
  updateProduct
);

// Delete product
router.delete("/:id", 
  authToken, 
  authRole(['admin']), 
  deleteProduct
);

// Update product status
router.patch("/:id/status",
  authToken,
  authRole(['admin']),
  updateProductStatus
);

// --- BULK OPERATIONS ---

// Bulk delete products
router.post("/bulk/delete",
  authToken,
  authRole(['admin']),
  bulkDeleteProducts
);

// Bulk update product status
router.patch("/bulk/status",
  authToken,
  authRole(['admin']),
  bulkUpdateProductStatus
);

module.exports = router;
