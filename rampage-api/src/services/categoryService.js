const CategoryModel = require("../models/categoryModel");

// Bütün kateqoriyalar (ən yenilər əvvəl) + products virtual populate
const getAll = async () => {
  return CategoryModel.find()
    .sort({ createdAt: -1 })
    .populate("products")
    .exec();
};

const getOne = async (id) => {
  return CategoryModel.findById(id)
    .populate("products")
    .exec();
};

const post = async (payload) => {
  // Validation middleware-in varsa, bura toxunmaq lazım deyil.
  // İstəsən burada da minimal sanitizasiya edə bilərsən:
  // if (payload.name) payload.name = payload.name.trim();
  return CategoryModel.create(payload);
};

const deleteOne = async (id) => {
  return CategoryModel.findByIdAndDelete(id).exec();
};

const update = async (id, payload) => {
  return CategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,  // update zamanı da schema qaydaları işləsin
    context: "query",     // bəzi validatorlar üçün vacib ola bilər
  }).exec();
};

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
};
