const mongoose = require("mongoose");
const categorySchema = require("../schemas/categorySchema");

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;