const BrandModel = require("../models/brandModel");


const getAll = async () => await BrandModel.find();

const getOne = async (id) => await BrandModel.findById(id);

const post = async (payload) => await BrandModel.create(payload);

const deleteOne = async (id) => await BrandModel.findByIdAndDelete(id);

const update = async (id, payload) =>
  await BrandModel.findByIdAndUpdate(id, payload, { new: true });

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
};