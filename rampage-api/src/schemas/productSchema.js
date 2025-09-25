const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salePrice: {
      type: Number,
      min: 0,
      required: true,
    },
    costPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    reviewCount: { type: Number, default: 0 },
    image: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

//product virtual for reviews
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

module.exports = productSchema;
