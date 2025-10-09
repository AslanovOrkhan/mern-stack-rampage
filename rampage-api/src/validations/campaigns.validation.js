const Joi = require("joi");

const campaignsValidationSchema = Joi.object({
  description: Joi.string().min(2).max(500).required().messages({
    "any.required": "Təsvir sahəsi məcburidir.",
    "string.min": "Təsvir ən azı 2 simvol olmalıdır.",
  }),
});

module.exports = campaignsValidationSchema;
