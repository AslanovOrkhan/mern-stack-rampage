const categoryValidationSchema = require("../../validations/category.validation");

const schemas = require("../../validations/category.validation");

module.exports = (mode = "create") => {
  return (req, res, next) => {
    const schema = mode === "update" ? schemas.categoryUpdateValidationSchema : schemas.categoryValidationSchema;
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      if (details.length > 0) throw new Error(details[0].message);
    } else next();
  };
};