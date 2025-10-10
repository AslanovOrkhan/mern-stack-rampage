const mongoose = require("mongoose");
const sliderSchema = require("../schemas/sliderSchema");

const SliderModel = mongoose.model("Slider", sliderSchema);

module.exports = SliderModel;
