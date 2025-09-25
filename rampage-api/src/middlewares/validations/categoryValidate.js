const categoryValidationSchema = require("../../validations/category.validation");

module.exports = (req, res, next) => {
  const { error } = categoryValidationSchema.validate(req.body);
  if (error) {
    const { details } = error;
    if (details.length > 0) throw new Error(details[0].message);
  } else next();
};