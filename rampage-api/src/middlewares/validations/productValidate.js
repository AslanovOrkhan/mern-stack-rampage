// Product Joi Validation Sxemini daxil edirik
const productValidationSchema = require("../../validations/product.validation");
const { formatMongoData } = require("../../utils/formatMongoData"); // Error mesajlarını formatlamaq üçün (fərz edirik)

module.exports = (req, res, next) => {
  // Təmizləmə üçün req.body obyektini yaradırıq.
  let payload = req.body;

  // --- KRİTİK ƏLAVƏ: JSON string-lərini parse etmək ---
  // Multer/Form-data mürəkkəb sahələri string kimi göndərir.
  // Joi-nin və Controller-in obyektlərlə işləməsi üçün onları çeviririk.
  try {
    if (payload.variants && typeof payload.variants === "string") {
      payload.variants = JSON.parse(payload.variants);
    }
    if (payload.specifications && typeof payload.specifications === "string") {
      payload.specifications = JSON.parse(payload.specifications);
    }
    // req.body dəyişdiyi üçün, validasiyadan sonra controller dəyişmiş payload alacaq.
  } catch (parseError) {
    return res.status(400).json({
      message: "Məlumat formatı xətası!",
      errors: [
        "Variants və ya Specifications sahəsi düzgün JSON formatında deyil.",
      ],
    });
  }

  // Fayl yüklənməsi (req.files) Joi tərəfindən yoxlanılmır, Controller tərəfindən yoxlanılır.

  const { error } = productValidationSchema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);

    // Məsləhət: Mürəkkəb validasiya xətalarını daha təmiz qaytarmaq üçün 400 status kodu istifadə edirik.
    return res.status(400).json({
      message: "Məhsul Validasiyası Xətası!",
      errors: errors,
    });
  }

  // Validasiya uğurlu olduqdan sonra parse edilmiş obyekt növbəti funksiyaya ötürülür.
  next();
};
