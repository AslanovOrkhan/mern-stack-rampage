const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      required: true,
      unique: true, // Data bütövlüyü üçün hər kateqoriyanın adı unikal olmalıdır.
    },
    slug: {
      type: String,
      required: false,
      unique: true, // SEO üçün unikal URL təmin edilir.
    },
    categoryImage: {
      type: String,
      required: true, // Rampage tərzi vizual təqdimat üçün məcburi şəkildir.
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
  },
  { timestamps: true } // Yaratma və yenilənmə vaxtlarını izləyir
);

// Məhsullarla One-to-Many əlaqəsi üçün virtual sahə
categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false, // Bir kateqoriyada çox məhsul var.
});


categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

module.exports = categorySchema;
