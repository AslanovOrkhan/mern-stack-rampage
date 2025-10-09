const campaignsValidationSchema = require("../../validations/campaigns.validation");

module.exports = (req, res, next) => {
  const { error } = campaignsValidationSchema.validate(req.body);
  if (error) {
    const { details } = error;
    if (details.length > 0) throw new Error(details[0].message);
  } else next();
};
