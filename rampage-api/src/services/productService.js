const ProductModel = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");

const getAll = async ({ page, limit, sortBy, order, filter }) =>
  await ProductModel.find(filter)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category")
    .populate("vendor", "username")
    .lean();

const getOne = async (id) =>
  await ProductModel.findById(id)
    .populate("category")
    .populate("vendor", "email")
    .populate("reviews");

const getTotalCount = async () => await ProductModel.countDocuments();

const post = async (payload) => await ProductModel.create(payload);

const deleteOne = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) return null;

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(product.public_id);

  // Delete from MongoDB
  return await ProductModel.findByIdAndDelete(id);
};

const deleteMany = async (categoryId) => {
  const products = await ProductModel.find({ category: categoryId });
  await ProductModel.deleteMany({ category: categoryId });
  //delete from cloudinary (multiple files)
  for (let i = 0; i < products.length; i++) {
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(products[i].public_id);
  }
};

const update = async (id, payload) => {
  const existing = await ProductModel.findById(id);
  if (!existing) return null;

  // If a new image is uploaded, delete the old one from Cloudinary
  if (payload.public_id) {
    await cloudinary.uploader.destroy(existing.public_id);
  }

  return await ProductModel.findByIdAndUpdate(id, payload, { new: true });
};

module.exports = {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
  deleteMany,
  getTotalCount,
};
