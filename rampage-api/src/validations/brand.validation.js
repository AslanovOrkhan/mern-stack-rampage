const Joi = require("joi");

const brandValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  
  // Mongoose Schema-ya uyğun olaraq optional (məcburi deyil) qoyulur
  description: Joi.string().min(10).max(500).optional().allow(null, ''),
  
  // Mongoose Schema-ya uyğun olaraq required (mütləq) qoyulur və URL formatını yoxlayır
  image: Joi.string().uri().required(), 

  // Əgər client tərəfdən göndərilməsi tələb olunursa əlavə edin, əks halda silin:
  public_id: Joi.string().optional(), 
});

module.exports = brandValidationSchema;