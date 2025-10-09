const CampaignsModel = require("../models/campaignsModel");


const getAll = async (search) => {
  let query = {};
  if (search) {
    query.description = { $regex: search, $options: "i" };
  }
  return await CampaignsModel.find(query);
};

const getOne = async (id) => await CampaignsModel.findById(id);

const post = async (payload) => await CampaignsModel.create(payload);

const deleteOne = async (id) => await CampaignsModel.findByIdAndDelete(id);

const update = async (id, payload) =>
  await CampaignsModel.findByIdAndUpdate(id, payload, { new: true });

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
};