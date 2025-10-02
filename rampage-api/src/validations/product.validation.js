const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(10).max(500).required(),
  costPrice: Joi.number().positive().min(0).required(),
  salePrice: Joi.number().positive().min(Joi.ref("costPrice")).required(),
  rating: Joi.number().min(0).max(5).default(0),
  sold: Joi.number().integer().min(0).default(0),
  isFeatured: Joi.boolean().default(false),
  discountPercentage: Joi.number().min(0).max(90).required(),
  stockQuantity: Joi.number().integer().min(0).max(1000).required(),
  category: Joi.objectId().required(),
  image: Joi.string().min(1).required(),
  public_id: Joi.string().min(1).required(),
  gallery: Joi.array().items(Joi.string()).min(3).required(),
  brand: Joi.string().min(1).required(),
  model: Joi.string().min(1).required(),
  sku: Joi.string().trim().lowercase().min(1).required(),
  colors: Joi.array().items(Joi.string()).min(1).required(),
  tags: Joi.array().items(Joi.string()).default([]),
  specs: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().min(1).required(),
        value: Joi.any().required(),
        unit: Joi.string().allow("", null),
      })
    )
    .default([]),
  dimensions: Joi.object({
    width: Joi.number().min(0),
    height: Joi.number().min(0),
    depth: Joi.number().min(0),
    unit: Joi.string().default("mm"),
  }),
  weight: Joi.object({
    value: Joi.number().min(0),
    unit: Joi.string().default("g"),
  }),
  cpuCoolerMaxMm: Joi.number().min(0),
  gpuMaxMm: Joi.number().min(0),
  psuMaxMm: Joi.number().min(0),
  material: Joi.string(),
  metalThickness: Joi.number().min(0),
  panelSizeInch: Joi.number().min(0),
  refreshRateHz: Joi.number().min(0),
  resolution: Joi.string(),
  ports: Joi.array().items(Joi.string()).default([]),
  responseMs: Joi.number().min(0),
  sensor: Joi.string(),
  dpi: Joi.number().min(0),
  pollingRateHz: Joi.number().min(0),
  connection: Joi.array().items(Joi.string()).default([]),
  cableLengthM: Joi.number().min(0),
  buttons: Joi.number().min(0),
  switchLifeM: Joi.number().min(0),
  batteryMah: Joi.number().min(0),
  rgb: Joi.boolean().default(false),
}).options({ abortEarly: false });

module.exports = productValidationSchema;
