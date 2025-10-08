const Joi = require("joi");

const brandValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Kateqoriya adı məcburidir.",
    "string.min": "Ad ən azı 2 simvol olmalıdır.",
  }),
  image: Joi.string().required().messages({
    "any.required": "Kateqoriya şəkli məcburidir.",
  }),
});

module.exports = brandValidationSchema;
