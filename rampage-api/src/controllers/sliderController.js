const {
  getAll,
  getOne,
  post,
  update,
  deleteOne,
} = require("../services/sliderService");
const formatMongoData = require("../utils/formatMongoData");

// get all sliders
exports.getSliders = async (req, res, next) => {
  try {
    const { search } = req.query;
    const sliders = await getAll(search);
    res.status(200).json(formatMongoData(sliders));
  } catch (error) {
    next(error);
  }
};

//get one slider
exports.getSliderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const slider = await getOne(id);
    if (!slider) throw new Error("Slider not found!");
    res.status(200).json(formatMongoData(slider));
  } catch (error) {
    next(error);
  }
};

//create new slider
exports.postSlider = async (req, res, next) => {
  try {
    const sliderData = {
      name: req.body.name,
      image: req.body.image,
      slug: req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    };
    const createdSlider = await post(sliderData);
    res.status(201).json(formatMongoData(createdSlider));
  } catch (error) {
    next(error);
  }
};

//update slider
exports.updateSlider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateData = { ...req.body };
    if (req.body.name && !req.body.slug) {
      updateData.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    const updatedSlider = await update(id, updateData);
    if (!updatedSlider) throw new Error("Slider not found!");
    res.status(200).json(formatMongoData(updatedSlider));
  } catch (error) {
    next(error);
  }
};

//delete slider
exports.deleteSlider = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedSlider = await deleteOne(id);
    if (!deletedSlider) throw new Error("Slider not found!");
    res.status(200).json(formatMongoData(deletedSlider));
  } catch (error) {
    next(error);
  }
};
