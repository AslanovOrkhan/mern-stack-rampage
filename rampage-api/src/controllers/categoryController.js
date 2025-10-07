// const ProductModel = require("../models/productModel");
const {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
} = require("../services/categoryService");
// const { deleteMany } = require("../services/productService");
const formatMongoData = require("../utils/formatMongoData");

//get all categories
exports.getCategories = async (_, res, next) => {
  try {
    const categories = await getAll();
    res.status(200).json(formatMongoData(categories));
  } catch (error) {
    next(error);
  }
};

//get one category
exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await getOne(id);
    if (!category) throw new Error("category not found!");
    res.status(200).json(formatMongoData(category));
  } catch (error) {
    next(error);
  }
};

//post
const slugify = require("slugify");
exports.postCategory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path || req.file.url || "";
    }
    req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const newCategory = await post(req.body);
    res.status(201).json(formatMongoData(newCategory));
  } catch (error) {
    next(error);
  }
};

//delete
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteOne(id);
    if (!deletedCategory) throw new Error("category not found!");
    res.status(200).json(formatMongoData(deletedCategory));
  } catch (error) {
    next(error);
  }
};

//update
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCategory = { ...req.body };
    const updatedCategoryResponse = await update(id, updatedCategory);
    if (!updatedCategoryResponse) throw new Error("category not found!");
    res.status(200).json(formatMongoData(updatedCategoryResponse));
  } catch (error) {
    next(error);
  }
};