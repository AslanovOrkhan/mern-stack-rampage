const mongoose = require("mongoose");
const brandSchema = require("../schemas/brandSchema");

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;