const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      required: true,
      unique: true, // təkrar olmasın
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // image URL və ya file path
      default: "",
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// slug avtomatik generasiya
categorySchema.pre("validate", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = String(this.name)
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-+/g, "-")
      .replace(/^\-+|\-+$/g, "");
  }
  next();
});

// category virtual for products
categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

module.exports = categorySchema;
