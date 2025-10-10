const Joi = require("joi");

const sliderValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Slider adı məcburidir.",
    "string.min": "Ad ən azı 2 simvol olmalıdır.",
    "string.max": "Ad ən çox 50 simvol ola bilər.",
  }),
  image: Joi.string().uri().required().messages({
    "any.required": "Slider şəkli məcburidir.",
    "string.uri": "Düzgün şəkil URL-i daxil edin.",
  }),
  slug: Joi.string().min(2).max(60).pattern(/^[a-z0-9-]+$/).optional().messages({
    "string.pattern.base": "Slug yalnız kiçik hərflər, rəqəmlər və tire ola bilər.",
  }),
});

module.exports = sliderValidationSchema;