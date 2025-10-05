const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(10).max(500).required(),
  costPrice: Joi.number().positive().min(0).required(),
  salePrice: Joi.number().positive().min(Joi.ref("costPrice")).required(),
  rating: Joi.number().min(0).max(5).required().default(0),
  sold: Joi.number().integer().positive().allow(0).default(0),
  isFeatured: Joi.boolean().default(false),
  discountPercentage: Joi.number().min(0).max(100).required(),
  stockQuantity: Joi.number()
    .integer()
    .min(2, "stock quantity should be at least 2")
    .max(1000)
    .required(),
  category: Joi.objectId().required(),
  image: Joi.string().uri().required(),
  public_id: Joi.string().required(),
});

module.exports = productValidationSchema;
