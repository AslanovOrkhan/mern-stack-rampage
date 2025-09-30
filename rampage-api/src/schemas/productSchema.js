const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      required: true,
      index: true,
    },
    description: { type: String, minlength: 10, required: true },

    salePrice: { type: Number, min: 0, required: true },
    costPrice: { type: Number, min: 0, required: true },
    discountPercentage: { type: Number, min: 0, max: 100, default: 0 },

    stockQuantity: { type: Number, min: 0, default: 0, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0, index: true },
    sold: { type: Number, min: 0, default: 0, required: true },
    isFeatured: { type: Boolean, default: false, index: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    reviewCount: { type: Number, min: 0, default: 0 },

    image: { type: String, required: true },
    public_id: { type: String, required: true },

    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    tags: [{ type: String, trim: true, index: true }],

    // 🔑 KATEQORİYAYA GÖRƏ FƏRQLİ XÜSUSİYYƏTLƏR ÜÇÜN DİNAMİK SAHƏ
    specs: [
      {
        key: { type: String, trim: true, required: true }, // məsələn: "connection", "dpi", "refreshRate"
        value: mongoose.Schema.Types.Mixed, // number | string | boolean | text
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Axtarış və filtr üçün indekslər
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ "specs.key": 1, "specs.value": 1 });

// Review-lar üçün virtual
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

// Endirimdən sonrakı qiymət (yalnız oxunur)
productSchema.virtual("finalPrice").get(function () {
  const price = this.salePrice || 0;
  const disc = this.discountPercentage || 0;
  return Math.round((price - (price * disc) / 100) * 100) / 100;
});

module.exports = productSchema;
