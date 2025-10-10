const sliderValidationSchema = require("../../validations/slider.validation");

module.exports = (req, _, next) => {
  const { error } = sliderValidationSchema.validate(req.body);
  if (error) {
    const { details } = error;
    if (details.length > 0) throw new Error(details[0].message);
  } else next();
};
