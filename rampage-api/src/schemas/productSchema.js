const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    // --- Basic Information ---
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxLength: [200, 'Product name cannot exceed 200 characters']
      // unique: true // TEMP disable edildi
    },
    
    slug: {
      type: String,
      // unique: true, // TEMP disable edildi
      lowercase: true
    },
    
    model: {
      type: String,
      trim: true,
      maxLength: [100, 'Model cannot exceed 100 characters']
    },
    
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxLength: [2000, 'Description cannot exceed 2000 characters']
    },
    
    shortDescription: {
      type: String,
      trim: true,
      maxLength: [300, 'Short description cannot exceed 300 characters']
    },
    
    // --- Category & Brand Relations ---
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'Brand is required']
    },
    
    // --- Pricing ---
    costPrice: {
      type: Number,
      required: [true, 'Cost price is required'],
      min: [0, 'Cost price cannot be negative']
    },
    
    salePrice: {
      type: Number,
      required: [true, 'Sale price is required'],
      min: [0, 'Sale price cannot be negative']
    },
    
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    
    // --- Stock Management ---
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    
    stockStatus: {
      type: String,
      enum: ['in-stock', 'out-of-stock', 'pre-order', 'discontinued'],
      default: 'in-stock'
    },
    
    // --- Product Images ---
    images: [{
      img: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      },
      altText: {
        type: String,
        default: ''
      }
    }],
    
    // --- Product Variants (Colors, Sizes, etc.) ---
    variants: [{
      name: { 
        type: String, 
        required: true 
      }, // 'Color', 'Size', 'Memory'
      
      options: [{
        optionValue: { 
          type: String, 
          required: true 
        }, // 'Black', 'White', '16GB'
        
        variantSKU: { 
          type: String,
          unique: true,
          sparse: true
        },
        
        additionalPrice: {
          type: Number,
          default: 0
        },
        
        stock: { 
          type: Number, 
          required: true,
          min: 0,
          default: 0
        },
        
        pictures: [{
          img: { type: String, required: true },
          public_id: { type: String, required: true }
        }]
      }]
    }],
    
    // --- Gaming Specifications (Rampage Products) ---
    // GAMING MOUSE
    dpi: {
      type: String,
      maxLength: 50
    }, // "26000 DPI", "24000 DPI"
    
    sensor: {
      type: String,
      maxLength: 100
    }, // "3395 Optical Sensor", "3311 Sensor"
    
    // GAMING KEYBOARD
    switchType: {
      type: String,
      maxLength: 100
    }, // "Outemu Red", "Crystal Blue", "Gasket Magnetic"
    
    keyboardLayout: {
      type: String,
      enum: ['Full Size', 'TKL', '60%', '65%', '75%']
    },
    
    // MONITOR
    screenSize: {
      type: String,
      maxLength: 50
    }, // "27 inch", "24.5 inch", "30 inch"
    
    resolution: {
      type: String,
      maxLength: 50
    }, // "2560x1440", "1920x1080", "2560x1080"
    
    refreshRate: {
      type: String,
      maxLength: 50
    }, // "240Hz", "300Hz", "180Hz"
    
    responseTime: {
      type: String,
      maxLength: 50
    }, // "0.5ms", "1ms"
    
    panelType: {
      type: String,
      maxLength: 100
    }, // "Fast IPS", "VA", "CSOT VA", "BOE VA"
    
    // UNIVERSAL GAMING SPECS
    connectivity: [String], // ["USB-C", "Wireless", "Bluetooth", "2.4GHz"]
    
    isWireless: {
      type: Boolean,
      default: false
    },
    
    hasRGB: {
      type: Boolean,
      default: false
    },
    
    batteryLife: {
      type: String,
      maxLength: 50
    }, // "70 hours", "Up to 200 hours"
    
    pollingRate: {
      type: String,
      maxLength: 50
    }, // "8000Hz", "4000Hz", "1000Hz"
    
    // COMPATIBILITY
    compatibility: [String], // ["PC", "PS5", "Xbox", "Mac", "Mobile"]
    
    // ADDITIONAL SPECS (Dynamic for future expansion)
    additionalSpecs: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: new Map()
    },
    
    // --- Technical Details ---
    sku: {
      type: String,
      // unique: true, // TEMP disable edildi
      sparse: true,
      uppercase: true
    },
    
    weight: {
      type: Number // grams
    },
    
    dimensions: {
      length: Number, // cm
      width: Number,  // cm  
      height: Number  // cm
    },
    
    // --- Product Status ---
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'draft'
    },
    
    isFeatured: {
      type: Boolean,
      default: false
    },
    
    isNewProduct: {
      type: Boolean,
      default: true
    },
    
    // --- Ratings & Sales ---
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    
    reviewCount: {
      type: Number,
      default: 0
    },
    
    sold: {
      type: Number,
      min: 0,
      default: 0
    },
    
    viewCount: {
      type: Number,
      default: 0
    },
    
    // --- SEO ---
    metaTitle: {
      type: String,
      maxLength: 160
    },
    
    metaDescription: {
      type: String,
      maxLength: 320
    },
    
    metaKeywords: [String],
    
    // --- Admin ---
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// --- Indexes for Performance ---
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ brand: 1, status: 1 });
productSchema.index({ salePrice: 1 });
productSchema.index({ isFeatured: 1, status: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ isNewProduct: 1 });

// --- Pre-save Middleware ---
productSchema.pre('save', function(next) {
  // Generate slug from name
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  
  // Update stock status
  this.stockStatus = this.stockQuantity > 0 ? 'in-stock' : 'out-of-stock';
  
  // Calculate discount percentage
  if (this.costPrice > this.salePrice) {
    this.discountPercentage = Math.round(((this.costPrice - this.salePrice) / this.costPrice) * 100);
  }
  
  // Ensure only one primary image
  const primaryImages = this.images.filter(img => img.isPrimary);
  if (primaryImages.length === 0 && this.images.length > 0) {
    this.images[0].isPrimary = true;
  } else if (primaryImages.length > 1) {
    this.images.forEach((img, index) => {
      img.isPrimary = index === 0;
    });
  }
  
  next();
});

// --- Virtual Properties ---
productSchema.virtual('effectivePrice').get(function() {
  return this.salePrice;
});

productSchema.virtual('savings').get(function() {
  return this.costPrice - this.salePrice;
});

productSchema.virtual('isOnSale').get(function() {
  return this.discountPercentage > 0;
});

productSchema.virtual('isInStock').get(function() {
  return this.stockQuantity > 0;
});

// --- Static Methods ---
productSchema.statics.findByCategory = function(categoryId) {
  return this.find({ category: categoryId, status: 'active' });
};

productSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, status: 'active' });
};

productSchema.statics.findNewProducts = function() {
  return this.find({ isNewProduct: true, status: 'active' });
};

// Export schema
module.exports = productSchema;
