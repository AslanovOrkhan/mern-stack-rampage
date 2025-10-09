const Joi = require("joi");
// Object ID (MongoDB ID) yoxlamasını aktiv edirik
Joi.objectId = require("joi-objectid")(Joi);

// 1. Şəkil (Images) massivi üçün alt-sxem
const imageSchema = Joi.object({
  img: Joi.string().uri().required().messages({
    "any.required": "Şəkil URL-i məcburidir",
    "string.uri": "Şəkil URL-i düzgün formatda olmalıdır"
  }),
  public_id: Joi.string().required().messages({
    "any.required": "Cloudinary public_id məcburidir"
  }),
  isPrimary: Joi.boolean().optional().default(false),
  altText: Joi.string().allow('').optional()
});

// 2. Variant Pictures üçün alt-sxem
const variantPictureSchema = Joi.object({
  img: Joi.string().uri().required(),
  public_id: Joi.string().required()
});

// 3. Variant Seçimləri (Options) massivi üçün alt-sxem
const optionSchema = Joi.object({
  optionValue: Joi.string().min(1).required().messages({
    "any.required": "Variant seçimi (Məsələn: Qara) daxil edilməlidir"
  }),
  variantSKU: Joi.string().optional(),
  additionalPrice: Joi.number().default(0).optional(),
  stock: Joi.number().integer().min(0).required().messages({
    "number.min": "Variant stoku mənfi ola bilməz"
  }),
  pictures: Joi.array().items(variantPictureSchema).optional()
});

// 4. Əsas Variant (Variants) massivi üçün alt-sxem
const variantSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Variant adı məcburidir (Məsələn: Rəng, Ölçü)"
  }),
  options: Joi.array().items(optionSchema).min(1).required().messages({
    "array.min": "Hər variant növü üçün ən azı bir seçim olmalıdır"
  })
});

// 5. Dimensions alt-sxemi
const dimensionsSchema = Joi.object({
  length: Joi.number().positive().optional(),
  width: Joi.number().positive().optional(),
  height: Joi.number().positive().optional()
});

// 6. Additional Specs alt-sxemi (Map/Object üçün)
const additionalSpecsSchema = Joi.object().pattern(
  Joi.string(),
  Joi.alternatives().try(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
    Joi.array()
  )
).optional();

// Əsas Rampage Product Validasiya Sxemi
const productValidationSchema = Joi.object({
  // --- Basic Information ---
  name: Joi.string().min(2).max(200).required().messages({
    "any.required": "Məhsul adı məcburidir",
    "string.min": "Məhsul adı ən azı 2 simvol olmalıdır",
    "string.max": "Məhsul adı 200 simvoldan çox ola bilməz"
  }),
  
  model: Joi.string().max(100).optional().allow(''),
  
  description: Joi.string().min(10).max(2000).required().messages({
    "any.required": "Məhsul təsviri məcburidir",
    "string.min": "Təsvir ən azı 10 simvol olmalıdır",
    "string.max": "Təsvir 2000 simvoldan çox ola bilməz"
  }),
  
  shortDescription: Joi.string().max(300).optional().allow(''),

  // --- Category & Brand Relations ---
  category: Joi.objectId().required().messages({
    "any.required": "Kateqoriya məcburidir",
    "objectId.base": "Kateqoriya ID düzgün formatda olmalıdır"
  }),
  
  brand: Joi.objectId().required().messages({
    "any.required": "Brend məcburidir", 
    "objectId.base": "Brend ID düzgün formatda olmalıdır"
  }),

  // --- Pricing ---
  costPrice: Joi.number().positive().required().messages({
    "any.required": "Alış qiyməti məcburidir",
    "number.positive": "Alış qiyməti müsbət olmalıdır"
  }),
  
  salePrice: Joi.number().positive().required().messages({
    "any.required": "Satış qiyməti məcburidir",
    "number.positive": "Satış qiyməti müsbət olmalıdır"
  }),
  
  discountPercentage: Joi.number().min(0).max(100).default(0).optional(),

  // --- Stock Management ---
  stockQuantity: Joi.number().integer().min(0).default(0).required().messages({
    "number.min": "Stok sayı mənfi ola bilməz"
  }),
  
  stockStatus: Joi.string().valid('in-stock', 'out-of-stock', 'pre-order', 'discontinued').optional(),

  // --- Product Images ---
  images: Joi.array().items(imageSchema).min(1).required().messages({
    "array.min": "Ən azı bir məhsul şəkli olmalıdır",
    "any.required": "Məhsul şəkilləri məcburidir"
  }),

  // --- Product Variants ---
  variants: Joi.array().items(variantSchema).optional(),

  // --- Gaming Specifications (Rampage Products) ---
  // GAMING MOUSE
  dpi: Joi.string().max(50).optional().allow(''),
  sensor: Joi.string().max(100).optional().allow(''),
  
  // GAMING KEYBOARD  
  switchType: Joi.string().max(100).optional().allow(''),
  keyboardLayout: Joi.string().valid('Full Size', 'TKL', '60%', '65%', '75%').optional().allow(''),
  
  // MONITOR
  screenSize: Joi.string().max(50).optional().allow(''),
  resolution: Joi.string().max(50).optional().allow(''),
  refreshRate: Joi.string().max(50).optional().allow(''),
  responseTime: Joi.string().max(50).optional().allow(''),
  panelType: Joi.string().max(100).optional().allow(''),
  
  // UNIVERSAL GAMING SPECS
  connectivity: Joi.array().items(Joi.string()).optional(),
  isWireless: Joi.boolean().default(false).optional(),
  hasRGB: Joi.boolean().default(false).optional(),
  batteryLife: Joi.string().max(50).optional().allow(''),
  pollingRate: Joi.string().max(50).optional().allow(''),
  
  // COMPATIBILITY
  compatibility: Joi.array().items(Joi.string()).optional(),
  
  // ADDITIONAL SPECS
  additionalSpecs: additionalSpecsSchema,

  // --- Technical Details ---
  sku: Joi.string().uppercase().optional().allow(''),
  weight: Joi.number().positive().optional(),
  dimensions: dimensionsSchema.optional(),

  // --- Product Status ---
  status: Joi.string().valid('active', 'inactive', 'draft').default('draft').optional(),
  isFeatured: Joi.boolean().default(false).optional(),
  isNewProduct: Joi.boolean().default(true).optional(),

  // --- Ratings & Sales ---
  rating: Joi.number().min(0).max(5).default(0).optional(),
  reviewCount: Joi.number().integer().min(0).default(0).optional(),
  sold: Joi.number().integer().min(0).default(0).optional(),
  viewCount: Joi.number().integer().min(0).default(0).optional(),

  // --- SEO ---
  metaTitle: Joi.string().max(160).optional().allow(''),
  metaDescription: Joi.string().max(320).optional().allow(''),
  metaKeywords: Joi.array().items(Joi.string()).optional(),

  // --- Admin ---
  createdBy: Joi.objectId().required().messages({
    "any.required": "Yaradan istifadəçi ID-si məcburidir",
    "objectId.base": "İstifadəçi ID düzgün formatda olmalıdır"
  })
});

// Update Product Validation Schema (bəzi fieldlər optional olur)
const updateProductValidationSchema = Joi.object({
  name: Joi.string().min(2).max(200).optional(),
  model: Joi.string().max(100).optional().allow(''),
  description: Joi.string().min(10).max(2000).optional(),
  shortDescription: Joi.string().max(300).optional().allow(''),
  category: Joi.objectId().optional(),
  brand: Joi.objectId().optional(),
  costPrice: Joi.number().positive().optional(),
  salePrice: Joi.number().positive().optional(),
  discountPercentage: Joi.number().min(0).max(100).optional(),
  stockQuantity: Joi.number().integer().min(0).optional(),
  stockStatus: Joi.string().valid('in-stock', 'out-of-stock', 'pre-order', 'discontinued').optional(),
  images: Joi.array().items(imageSchema).optional(),
  variants: Joi.array().items(variantSchema).optional(),
  
  // Gaming specs (all optional for update)
  dpi: Joi.string().max(50).optional().allow(''),
  sensor: Joi.string().max(100).optional().allow(''),
  switchType: Joi.string().max(100).optional().allow(''),
  keyboardLayout: Joi.string().valid('Full Size', 'TKL', '60%', '65%', '75%').optional().allow(''),
  screenSize: Joi.string().max(50).optional().allow(''),
  resolution: Joi.string().max(50).optional().allow(''),
  refreshRate: Joi.string().max(50).optional().allow(''),
  responseTime: Joi.string().max(50).optional().allow(''),
  panelType: Joi.string().max(100).optional().allow(''),
  connectivity: Joi.array().items(Joi.string()).optional(),
  isWireless: Joi.boolean().optional(),
  hasRGB: Joi.boolean().optional(),
  batteryLife: Joi.string().max(50).optional().allow(''),
  pollingRate: Joi.string().max(50).optional().allow(''),
  compatibility: Joi.array().items(Joi.string()).optional(),
  additionalSpecs: additionalSpecsSchema,
  
  sku: Joi.string().uppercase().optional().allow(''),
  weight: Joi.number().positive().optional(),
  dimensions: dimensionsSchema.optional(),
  status: Joi.string().valid('active', 'inactive', 'draft').optional(),
  isFeatured: Joi.boolean().optional(),
  isNewProduct: Joi.boolean().optional(),
  rating: Joi.number().min(0).max(5).optional(),
  reviewCount: Joi.number().integer().min(0).optional(),
  sold: Joi.number().integer().min(0).optional(),
  viewCount: Joi.number().integer().min(0).optional(),
  metaTitle: Joi.string().max(160).optional().allow(''),
  metaDescription: Joi.string().max(320).optional().allow(''),
  metaKeywords: Joi.array().items(Joi.string()).optional()
});

module.exports = {
  createProduct: productValidationSchema,
  updateProduct: updateProductValidationSchema
};
