const Joi = require("joi");


const categoryValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "any.required": "Kateqoriya adı məcburidir.",
      "string.min": "Ad ən azı 2 simvol olmalıdır."
    }),

  description: Joi.string()
    .min(2)
    .max(500)
    .required()
    .messages({
      "any.required": "Təsvir sahəsi məcburidir.",
      "string.min": "Təsvir ən azı 2 simvol olmalıdır."
    }),

  image: Joi.string()
    .required()
    .messages({
      "any.required": "Kateqoriya şəkli məcburidir."
    })
});

module.exports = categoryValidationSchema;
