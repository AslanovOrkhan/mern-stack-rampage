const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = sliderSchema;
