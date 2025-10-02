// models/productModel.js
const mongoose = require("mongoose");
const productSchema = require("../schemas/productSchema");

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
