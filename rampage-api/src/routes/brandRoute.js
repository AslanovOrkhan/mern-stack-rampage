const express = require("express");
const {
  getBrands,
  getBrandById,
  postBrand,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");
const logger = require("../middlewares/logger");
const validateBrand = require("../middlewares/validations/brandValidate");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express.Router();

const upload = uploadMiddleware("brandImages");

router.get("/", logger, getBrands);
router.get("/:id", getBrandById);
router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    // File varsa, image sahəsinə url əlavə et
    if (req.file) {
      req.body.image = req.file.path || req.file.url || "";
    }
    next();
  },
  validateBrand,
  postBrand
);

router.delete("/:id", deleteBrand);
router.patch(
  "/:id",
  upload.single("image"),
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.path || req.file.url || "";
    }
    next();
  },
  validateBrand,
  updateBrand
);

module.exports = router