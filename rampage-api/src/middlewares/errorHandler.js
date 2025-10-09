module.exports = (err, req, res, next) => {
  console.error("Error:", err);
  
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: errors[0] || "Validation error"
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Bu kateqoriya artıq mövcuddur"
    });
  }
  
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};