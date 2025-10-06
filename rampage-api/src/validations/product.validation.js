const Joi = require("joi");
// Object ID (MongoDB ID) yoxlamasını aktiv edirik
Joi.objectId = require("joi-objectid")(Joi);

// 1. Şəkil (Pictures) massivi üçün alt-sxem
const pictureSchema = Joi.object({
  img: Joi.string().uri().required(), // Şəkil URL-i
  public_id: Joi.string().required(), // Bulud yaddaşı ID-si
});

// 2. Variant Seçimləri (Options) massivi üçün alt-sxem
const optionSchema = Joi.object({
  optionValue: Joi.string().min(1).required().messages({
    "any.required": "Variant seçimi (Məsələn: Qara) daxil edilməlidir.",
  }),
  variantSKU: Joi.string().required(), // Hər variant üçün unikal kod
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  pictures: Joi.array().items(pictureSchema).min(1).required().messages({
    "array.min": "Hər variant üçün ən azı bir şəkil daxil edilməlidir.",
  }),
});

// 3. Əsas Variant (Variants) massivi üçün alt-sxem
const variantSchema = Joi.object({
  name: Joi.string().required(), // Məsələn: 'Rəng', 'Yaddaş'
  options: Joi.array().items(optionSchema).min(1).required().messages({
    "array.min": "Hər variant növü üçün ən azı bir seçim daxil edilməlidir.",
  }),
});

// 4. Spesifikasiyalar (Specifications) massivi üçün alt-sxem
const specificationSchema = Joi.object({
  key: Joi.string().required(), // Məsələn: "Switch Tipi"
  value: Joi.string().required(), // Məsələn: "Outemu Red"
});

// Əsas Product Validasiya Sxemi
const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  description: Joi.string().min(10).max(3000).required(),

  // --- Qiymət və Stok (Məcburi) ---
  costPrice: Joi.number().positive().min(0).required(),
  salePrice: Joi.number()
    .positive()
    .min(Joi.ref("costPrice"))
    .required()
    .messages({
      "number.min": "Satış qiyməti alış qiymətindən ({#ref}) aşağı ola bilməz.",
    }),
  discountPercentage: Joi.number().min(0).max(100).default(0).required(),
  stockQuantity: Joi.number().integer().min(0).default(0).required(),

  // --- Nested Massivlər ---
  variants: Joi.array().items(variantSchema).optional(), // Variantlar optionaldır
  specifications: Joi.array().items(specificationSchema).optional(), // Spesifikasiyalar optionaldır

  // --- Əlaqəli ID-lər (Məcburi Object ID) ---
  category: Joi.objectId().required().messages({
    "any.required": "Məhsulun kateqoriya ID-si məcburidir.",
    "objectId.base": "Kateqoriya ID-si düzgün MongoDB formatında olmalıdır.",
  }),
  createdBy: Joi.objectId().required().messages({
    "any.required": "Məhsulu yaradan istifadəçi ID-si məcburidir.",
    "objectId.base": "İstifadəçi ID-si düzgün MongoDB formatında olmalıdır.",
  }),

  // --- Reytinq/Digər (Optional) ---
  rating: Joi.number().min(0).max(5).optional(),
  sold: Joi.number().integer().min(0).optional(),
  isFeatured: Joi.boolean().optional(),
});

module.exports = productValidationSchema;
