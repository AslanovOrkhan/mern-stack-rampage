const {
  getAll,
  getOne,
  post,
  update,
  deleteById,
} = require("../services/sliderService");
const formatMongoData = require("../utils/formatMongoData");

exports.getSliders = async (_, res, next) => {
  try {
    const sliders = await getAll();
    res.status(200).json({
      data: formatMongoData(sliders),
      message: "sliders retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getSliderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sliders = await getOne(id);
    res.status(200).json({
      data: formatMongoData(sliders),
      message: "slider retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.postSlider = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const sliderData = {
      name: req.body.name,
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename,
    };
    const createdSlider = await post(sliderData);

    res.status(201).json({
      data: formatMongoData(createdSlider),
      message: "Slider created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSlider = { ...req.body };
    if (req.file) {
      updateSlider.public_id = req.file.filename;
      updateSlider.url = req.file.path;
    }
    const updatedSliderResponse = await update(id, updateSlider);
    if (!updatedSliderResponse) throw new Error("slider not found!");
    res.status(200).json(formatMongoData(updatedSliderResponse));
  } catch (error) {
    next(error);
  }
};

exports.deleteSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSlider = await deleteById(id);
    if (!deletedSlider) throw new Error("slider not found!");
    res.status(200).json(formatMongoData(deletedSlider));
  } catch (error) {
    next(error);
  }
};
