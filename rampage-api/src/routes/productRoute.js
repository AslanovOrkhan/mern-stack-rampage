// routes/products.js
const express = require("express");
const {
  getProducts,
  getProductById,
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const logger = require("../middlewares/logger");
const verifyToken = require("../middlewares/authToken");
const verifyRole = require("../middlewares/authRole");
const validateProduct = require("../middlewares/validations/productValidate");
const roles = require("../constants/roles");

const router = express.Router();
const upload = uploadMiddleware("productImages");

/** 1) Multer errorlarını mərkəzləşdir: */
const handleSingleImage = (req, res, next) =>
  upload.single("image")(req, res, (err) => {
    if (!err) return next();
    if (err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ message: "File size exceeds 5MB limit" });
    if (err.code === "INVALID_FILE_TYPE")
      return res.status(400).json({ message: "Invalid file format" });
    return res.status(400).json({ message: err.message });
  });

/** 2) Multipart sahələri parse et (numbers/booleans/arrays/JSON): */
const parseProductBody = (req, _res, next) => {
  [
    "salePrice",
    "costPrice",
    "discountPercentage",
    "stockQuantity",
    "sold",
    "rating",
    "reviewCount",
  ].forEach((f) => {
    if (
      req.body[f] !== undefined &&
      req.body[f] !== null &&
      req.body[f] !== ""
    ) {
      const n = Number(req.body[f]);
      if (!Number.isNaN(n)) req.body[f] = n;
    }
  });
  if (typeof req.body.isFeatured === "string")
    req.body.isFeatured = req.body.isFeatured.toLowerCase() === "true";
  if (typeof req.body.tags === "string")
    req.body.tags = req.body.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  if (typeof req.body.specs === "string" && req.body.specs.trim())
    try {
      req.body.specs = JSON.parse(req.body.specs);
    } catch {}
  if (typeof req.body.variants === "string" && req.body.variants.trim())
    try {
      req.body.variants = JSON.parse(req.body.variants);
    } catch {}
  next();
};

/** Multer-dən gələn şəkil məlumatını body-yə əlavə et */
function attachImageFields(req, res, next) {
  if (req.file) {
    req.body.image = req.file.path || req.file.url || "";
    req.body.public_id = req.file.filename || req.file.public_id || "";
  }
  next();
}

/* ================= ROUTES (təkrarsız) ================= */

router.get(
  "/",
  logger,
  verifyToken,
  verifyRole([roles.customer, roles.admin, roles.vendor]),
  getProducts
);

router.get("/:id", getProductById);

// POST /api/products  (yalnız admin və vendor)
router.post(
  "/",
  verifyToken,
  verifyRole([roles.admin, roles.vendor]),
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "File size exceeds 5MB limit" });
        }
        if (err.code === "INVALID_FILE_TYPE") {
          return res.status(400).json({ message: "Invalid file format" });
        }
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  attachImageFields, // <--- Əlavə olundu
  parseProductBody,
  validateProduct, // image/public_id artıq multer-dən gəlib
  postProduct
);

router.patch(
  "/:id",
  handleSingleImage,
  parseProductBody,
  updateProduct // PATCH üçün ayrıca validate lazım deyil (optional sahələr)
);

router.delete("/:id", deleteProduct);

module.exports = router;
