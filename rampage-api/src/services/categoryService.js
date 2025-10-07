const CategoryModel = require("../models/categoryModel");


const getAll = async () => await CategoryModel.find();

const getOne = async (id) => await CategoryModel.findById(id);

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