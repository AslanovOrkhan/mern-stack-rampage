const express = require("express");
const {
  getCampaigns,
  getCampaignById,
  postCampaign,
  deleteCampaign,
  updateCampaign,
} = require("../controllers/campaignsController");
const logger = require("../middlewares/logger");
const validateCampaign = require("../middlewares/validations/campaignsValidate");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express.Router();

const upload = uploadMiddleware("campaignImages");

router.get("/", logger, getCampaigns);
router.get("/:id", getCampaignById);
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
  validateCampaign,
  postCampaign
);

router.delete("/:id", deleteCampaign);
router.patch("/:id", validateCampaign, updateCampaign);

module.exports = router