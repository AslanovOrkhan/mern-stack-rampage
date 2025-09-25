module.exports = (err, req, res, next) => {
  res.json({
    message: err.message || "Internal server error",
    statusCode: err.statusCode || 500,
  });
};
