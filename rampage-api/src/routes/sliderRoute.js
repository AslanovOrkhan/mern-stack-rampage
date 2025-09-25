const express = require("express");
const {
  getSliders,
  getSliderById,
  postSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const validateSlider = require("../middlewares/validations/sliderValidate");

const router = express.Router();

const upload = uploadMiddleware("sliderImages");

router.get("/", getSliders);
router.get("/:id", getSliderById);
router.post("/", validateSlider, (req, res, next) => {
  upload.single("url")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size exceeds 5MB limit" });
      }
      if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({ message: "Invalid file format" });
      }
      return res.status(400).json({ message: err.message });
    }
    postSlider(req, res, next);
  });
});
router.patch("/:id", (req, res, next) => {
  upload.single("url")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size exceeds 5MB limit" });
      }
      if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({ message: "Invalid file format" });
      }
      return res.status(400).json({ message: err.message });
    }
    updateSlider(req, res, next);
  });
});
router.delete("/:id", deleteSlider);

module.exports = router;
