const express = require("express");
const {
  getCategories,
  getCategoryById,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const logger = require("../middlewares/logger");
const validateCategory = require("../middlewares/validations/categoryValidate");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express.Router();

const upload = uploadMiddleware("categoryImages");

router.get("/", logger, getCategories);
router.get("/:id", getCategoryById);
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
  validateCategory,
  postCategory
);
router.delete("/:id", deleteCategory);
router.patch(
  "/:id",
  upload.single("image"),
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.path || req.file.url || "";
    }
    next();
  },
  validateCategory,
  updateCategory
);

module.exports = router;