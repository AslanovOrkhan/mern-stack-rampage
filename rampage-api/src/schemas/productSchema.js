const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Əsas məlumatlar
    name: { type: String, trim: true, minLength: 2, required: true },
    description: { type: String, minLength: 2, required: true },
    salePrice: { type: Number, min: 0, required: true },

    // Maya dəyəri API-lərdə gizlədilsin (istəyə görə select:+costPrice ilə oxuya bilərsən)
    costPrice: { type: Number, min: 0, required: true, select: false },

    // Endirim sağlam aralıqda
    discountPercentage: { type: Number, min: 0, max: 90, required: true },

    stockQuantity: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    sold: { type: Number, default: 0, required: true },
    isFeatured: { type: Boolean, default: false },

    // Əlaqələr
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewCount: { type: Number, default: 0 },

    // Media
    image: { type: String, required: true, trim: true },
    public_id: { type: String, required: true, trim: true },
    gallery: {
      type: [String], // şəkil URL-ləri
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 3,
        message: "Hər məhsul üçün ən azı 3 şəkil olmalıdır",
      },
    },

    // İdentifikasiya
    brand: { type: String, trim: true, required: true },
    model: { type: String, trim: true, required: true },
    sku: {
      type: String,
      trim: true,
      lowercase: true, // SKU-ları kiçik hərflə standartlaşdır
      unique: true,
      required: true,
    },

    // Rənglər
    colors: {
      type: [String], // məsələn: ["Black", "White"]
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 1,
        message: "Ən azı bir rəng seçilməlidir",
      },
    },

    // Etiketlər
    tags: { type: [String], default: [] },

    // Specs: açar-dəyər siyahısı
    specs: {
      type: [
        {
          key: { type: String, required: true, trim: true }, // "Sensor", "DPI"...
          value: { type: mongoose.Schema.Types.Mixed, required: true }, // "PixArt 3327", 12800...
          unit: { type: String, trim: true }, // "Hz", "mm", "g", "m"
        },
      ],
      default: [],
    },

    // Fiziki ölçü və çəki
    dimensions: {
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
      depth: { type: Number, min: 0 },
      unit: { type: String, default: "mm", trim: true },
    },
    weight: {
      value: { type: Number, min: 0 },
      unit: { type: String, default: "g", trim: true },
    },

    // CASE (korpus) limitləri
    cpuCoolerMaxMm: { type: Number, min: 0 },
    gpuMaxMm: { type: Number, min: 0 },
    psuMaxMm: { type: Number, min: 0 },
    material: { type: String, trim: true }, // "Metal", "Tempered Glass"
    metalThickness: { type: Number, min: 0 }, // 0.6 (mm)

    // MONITOR
    panelSizeInch: { type: Number, min: 0 }, // 27
    refreshRateHz: { type: Number, min: 0 }, // 144
    resolution: { type: String, trim: true }, // "2560x1440"
    ports: { type: [String], default: [] }, // ["HDMI","DP","USB-C"]
    responseMs: { type: Number, min: 0 }, // 1

    // MOUSE/KLAVYE/HEADSET ümumi
    sensor: { type: String, trim: true }, // "PixArt PAW3950", "Instant 825"
    dpi: { type: Number, min: 0 }, // 12800, 26000...
    pollingRateHz: { type: Number, min: 0 }, // 1000, 8000
    connection: { type: [String], default: [] }, // ["USB","2.4GHz","Bluetooth"]
    cableLengthM: { type: Number, min: 0 }, // 1.5
    buttons: { type: Number, min: 0 }, // 6, 7, 11...
    switchLifeM: { type: Number, min: 0 }, // milyon klik: 5, 70...
    batteryMah: { type: Number, min: 0 }, // 300
    rgb: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// product -> reviews (populate üçün)
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

module.exports = productSchema;
