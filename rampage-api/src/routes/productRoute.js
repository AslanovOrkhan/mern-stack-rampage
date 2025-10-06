const express = require("express");
const multer = require("multer"); // Multer-i daxil edirik (xəta idarəçiliyi üçün)
const {
  getProducts,
  getProductById,
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); // Sizin uploadMiddleware-iniz
const logger = require("../middlewares/logger");
const validateProduct = require("../middlewares/validations/productValidate");
const router = express.Router();

// Multer instance for product images (multi-upload)
// 'products' qovluğuna yüklənməni fərz edirik
const upload = uploadMiddleware("products");

// Controller req.files gözlədiyi üçün 'productPictures' adlı massiv qəbul edirik.
const multiUpload = upload.array("productPictures");

// Middleware: Multi-file Uploadı idarə etmək və xətaları tutmaq
const handleUploadErrors = (req, res, next) => {
  multiUpload(req, res, function (err) {
    if (err) {
      // Multer xətalarını idarə etmək
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "Faylın ölçüsü 5MB limitini aşır!" });
        }
        // Sizin custom file filter xətanız üçün
        if (err.message.includes("INVALID_FILE_TYPE")) {
          return res
            .status(400)
            .json({
              message:
                "Yalnız JPEG, PNG və ya WebP formatlı şəkillərə icazə verilir!",
            });
        }
        return res
          .status(400)
          .json({ message: `Multer Xətası: ${err.message}` });
      }

      // Başqa xətalar
      return res
        .status(400)
        .json({ message: `Şəkil yüklənməsi xətası: ${err.message}` });
    }
    // Uğurlu yüklənmə.
    next();
  });
};

// GET Products
router.get("/", logger, getProducts);
router.get("/:id", getProductById);

// POST Product (Çoxlu şəkil yüklənməsi, Validasiya, Controller)
router.post(
  "/",
  handleUploadErrors, // 1. Faylları qəbul edir (req.files)
  validateProduct, // 2. Body-ni yoxlayır (Joi)
  postProduct // 3. Controller bazaya yazır
);

// DELETE Product
router.delete("/:id", deleteProduct);

// PATCH Product (Çoxlu şəkil yenilənməsi)
router.patch(
  "/:id",
  handleUploadErrors, // Yenilənmə zamanı da şəkilləri qəbul edir
  validateProduct,
  updateProduct
);

module.exports = router;
