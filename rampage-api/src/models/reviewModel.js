const mongoose = require("mongoose");
const reviewSchema = require("../schemas/reviewSchema");

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
