const mongoose = require("mongoose");
const campaignsSchema = require("../schemas/campaignsSchema");

const CampaignsModel = mongoose.model("Campaigns", campaignsSchema);

module.exports = CampaignsModel;