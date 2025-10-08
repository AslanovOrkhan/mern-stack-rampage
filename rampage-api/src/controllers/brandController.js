const {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
} = require("../services/brandService");

const formatMongoData = require("../utils/formatMongoData");


//get all brands
exports.getBrands = async (_, res, next) => {
  try {
    const brands = await getAll();
    res.status(200).json(formatMongoData(brands));
  } catch (error) {
    next(error);
  }
};

//get one brand
exports.getBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await getOne(id);
    if (!brand) throw new Error("brand not found!");
    res.status(200).json(formatMongoData(brand));
  } catch (error) {
    next(error);
  }
};

//post
const slugify = require("slugify");
exports.postBrand = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path || req.file.url || "";
    }
    req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const newBrand = await post(req.body);
    res.status(201).json(formatMongoData(newBrand));
  } catch (error) {
    next(error);
  }
};

//delete
exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBrand = await deleteOne(id);
    if (!deletedBrand) throw new Error("brand not found!");
    res.status(200).json(formatMongoData(deletedBrand));
  } catch (error) {
    next(error);
  }
};

//update
exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBrand = { ...req.body };
    const updatedBrandResponse = await update(id, updatedBrand);
    if (!updatedBrandResponse) throw new Error("brand not found!");
    res.status(200).json(formatMongoData(updatedBrandResponse));
  } catch (error) {
    next(error);
  }
};