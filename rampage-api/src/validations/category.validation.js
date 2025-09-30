const Joi = require("joi");

// Create üçün
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  description: Joi.string().min(10).max(1000).required(),
  image: Joi.string().uri().optional().allow(""),
});

// Update üçün
const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(60),
  description: Joi.string().min(10).max(1000),
  image: Joi.string().uri().optional().allow(""),
}).min(1); // ən azı bir sahə olmalıdır

module.exports = { createCategorySchema, updateCategorySchema };
