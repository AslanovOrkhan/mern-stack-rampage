const brandValidationSchema = require("../../validations/brand.validation");

module.exports = (req, res, next) => {
  const { error } = brandValidationSchema.validate(req.body);
  if (error) {
    const { details } = error;
    if (details.length > 0) throw new Error(details[0].message);
  } else next();
};
