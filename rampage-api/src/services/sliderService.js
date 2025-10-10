const SliderModel = require("../models/sliderModel");

const getAll = async (search) => {
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  return await SliderModel.find(query);
};

const getOne = async (id) => await SliderModel.findById(id);

const post = async (payload) => await SliderModel.create(payload);

const deleteOne = async (id) => await SliderModel.findByIdAndDelete(id);

const update = async (id, payload) =>
  await SliderModel.findByIdAndUpdate(id, payload, { new: true });

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
};