const express = require("express");
const {
  getBrands,
  getBrandById,
  postBrands,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");
const logger = require("../middlewares/logger");
const validateBrand = require("../middlewares/validations/brandValidate");
const router = express.Router();

router.get("/", logger, getBrands);
router.get("/:id", getBrandById);
router.post("/", validateBrand, postBrands);
router.delete("/:id", deleteBrand);
router.patch("/:id", updateBrand);

module.exports = router;