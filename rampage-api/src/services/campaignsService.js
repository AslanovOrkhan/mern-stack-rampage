const CampaignsModel = require("../models/campaignsModel");


const getAll = async () => await CampaignsModel.find();

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