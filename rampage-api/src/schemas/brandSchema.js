const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    public_id: { type: String, required: true },
  
  },
  { timestamps: true, versionKey: false }
);

brandSchema.set("toObject", { virtuals: true });
brandSchema.set("toJSON", { virtuals: true });

module.exports = brandSchema;
