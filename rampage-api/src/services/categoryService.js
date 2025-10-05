const CategoryModel = require("../models/categoryModel");

const getAll = async () => await CategoryModel.find().populate("products");

const getOne = async (id) =>
  await CategoryModel.findById(id).populate("products");

const post = async (payload) => await CategoryModel.create(payload);

const deleteOne = async (id) => await CategoryModel.findByIdAndDelete(id);

const update = async (id, payload) =>
  await CategoryModel.findByIdAndUpdate(id, payload, { new: true });

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
};