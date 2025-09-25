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
const router = express.Router();

router.get("/", logger, getCategories);
router.get("/:id", getCategoryById);
router.post("/", validateCategory, postCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);

module.exports = router;
