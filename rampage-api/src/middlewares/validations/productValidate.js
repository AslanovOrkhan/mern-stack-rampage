// Rampage Product Joi Validation Schema
const { createProduct, updateProduct } = require("../../validations/product.validation");

// Determine which validation schema to use based on HTTP method
const getValidationSchema = (method) => {
  switch (method) {
    case 'POST':
      return createProduct;
    case 'PATCH':
    case 'PUT':
      return updateProduct;
    default:
      return createProduct;
  }
};

module.exports = (req, res, next) => {
  try {
    // Get appropriate validation schema
    const validationSchema = getValidationSchema(req.method);
    
    // Clone req.body to avoid mutations
    let payload = { ...req.body };

    // --- JSON String Parsing ---
    // Multer/Form-data sends complex fields as strings
    // Parse them for Joi validation and controller usage
    if (payload.variants && typeof payload.variants === "string") {
      try {
        payload.variants = JSON.parse(payload.variants);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Variants JSON formatı düzgün deyil",
          error: "Invalid JSON format for variants field"
        });
      }
    }

    if (payload.additionalSpecs && typeof payload.additionalSpecs === "string") {
      try {
        payload.additionalSpecs = JSON.parse(payload.additionalSpecs);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Additional specifications JSON formatı düzgün deyil",
          error: "Invalid JSON format for additionalSpecs field"
        });
      }
    }

    // Parse array fields
    const arrayFields = ['connectivity', 'compatibility', 'metaKeywords'];
    arrayFields.forEach(field => {
      if (payload[field] && typeof payload[field] === "string") {
        try {
          payload[field] = JSON.parse(payload[field]);
        } catch (e) {
          // If it's a simple comma-separated string, split it
          payload[field] = payload[field].split(',').map(item => item.trim());
        }
      }
    });

    // Convert string numbers to actual numbers
    const numberFields = ['costPrice', 'salePrice', 'stockQuantity', 'weight', 'discountPercentage'];
    numberFields.forEach(field => {
      if (payload[field] && typeof payload[field] === "string") {
        const num = parseFloat(payload[field]);
        if (!isNaN(num)) {
          payload[field] = num;
        }
      }
    });

    // Convert string booleans to actual booleans
    const booleanFields = ['isFeatured', 'isNewProduct', 'isWireless', 'hasRGB'];
    booleanFields.forEach(field => {
      if (payload[field] && typeof payload[field] === "string") {
        payload[field] = payload[field].toLowerCase() === 'true';
      }
    });

    // Parse dimensions object if it's a string
    if (payload.dimensions && typeof payload.dimensions === "string") {
      try {
        payload.dimensions = JSON.parse(payload.dimensions);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Dimensions JSON formatı düzgün deyil",
          error: "Invalid JSON format for dimensions field"
        });
      }
    }

    // Update req.body with processed payload
    req.body = payload;

    // Skip validation for certain endpoints (validation is done in controller)
    const skipValidationPaths = ['/bulk/delete', '/bulk/status'];
    const isSkipPath = skipValidationPaths.some(path => req.path.includes(path));
    
    if (isSkipPath) {
      return next();
    }

    // Joi Validation
    const { error } = validationSchema.validate(payload, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        message: "Məhsul validasiya xətası",
        errors: errors,
        details: error.details.map(detail => detail.message)
      });
    }

    // Validation successful, proceed to next middleware
    next();

  } catch (parseError) {
    return res.status(400).json({
      success: false,
      message: "Məlumat parse xətası",
      error: parseError.message
    });
  }
};
