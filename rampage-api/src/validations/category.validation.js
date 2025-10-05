const Joi = require("joi");

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(10).max(500).required(),
  categoryImage: Joi.string().uri().required(),
  slug: Joi.string().min(2).max(50).required(),
});

module.exports = categoryValidationSchema;