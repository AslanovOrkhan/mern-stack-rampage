const express = require("express");
const {
  getSliders,
  getSliderById,
  postSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");
const validateSlider = require("../middlewares/validations/sliderValite");

const router = express.Router();

router.get("/", getSliders);
router.get("/:id", getSliderById);
router.post("/", validateSlider, postSlider);
router.patch("/:id", validateSlider, updateSlider);
router.delete("/:id", deleteSlider);

module.exports = router;
