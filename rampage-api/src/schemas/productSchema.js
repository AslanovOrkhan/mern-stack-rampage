const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      required: true,
      unique: true, // Məhsul adının unikal olması arzuolunandır
    },
    slug: {
      // Təmiz URL-lər (SEO) üçün
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    }, // --- Əsas Qiymət və Stok (Məhsulun baza versiyası üçün) ---
    // Variants sahəsi olmadığı halda, bu məlumatlar istifadə olunur
    costPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    salePrice: {
      type: Number,
      min: 0,
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    }, // --- Variantlar (Rəng, Ölçü və s. üçün) ---
    variants: [
      {
        name: { type: String, required: true }, // Məsələn: 'Rəng', 'Yaddaş'
        options: [
          {
            optionValue: { type: String, required: true }, // Məsələn: 'Qara', 'Ağ'
            variantSKU: { type: String, unique: true }, // Hər variant üçün unikal kod
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            pictures: [
              // Hər variantın öz şəkilləri ola bilər
              {
                img: { type: String, required: true },
                public_id: { type: String, required: true },
              },
            ],
          },
        ],
      },
    ], // --- Reytinq və Satış Məlumatları ---
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    }, // --- Əlaqə və Admin Məlumatı ---
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    specifications: [
      {
        key: { type: String, required: true }, // Məsələn: "Switch Tipi"
        value: { type: String, required: true }, // Məsələn: "Outemu Red"
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Əsas sahələri birbaşa export edirik.
module.exports = productSchema;
