const Joi = require("joi");

const categoryValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50) // Max 30 yerinə 50 qoyuram, çünki bu daha praktikdir.
    .required()
    .messages({
      "any.required": "Kateqoriya adı məcburidir.",
      "string.min": "Ad ən azı 2 simvol olmalıdır.",
    }),

  description: Joi.string().min(10).max(500).required().messages({
    "any.required": "Təsvir sahəsi məcburidir.",
    "string.min": "Təsvir ən azı 10 simvol olmalıdır.",
  }),

  categoryImage: Joi.string()
    .required() // Şəklin yolu (URL-i) məcburidir.
    .messages({
      "any.required": "Kateqoriya şəkli məcburidir.",
    }), // 'slug' sahəsi Controller tərəfindən avtomatik yaradıldığı üçün buraya daxil edilmir.
});

module.exports = categoryValidationSchema;
