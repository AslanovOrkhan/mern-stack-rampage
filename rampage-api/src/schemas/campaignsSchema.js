const mongoose = require("mongoose");

const campaignsSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = campaignsSchema;
