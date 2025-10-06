const ProductModel = require("../models/productModel");
// Bulud yaddaşı konfiqurasiyası
// Qeyd: Bu faylın mövcudluğunu və Cloudinary-nin düzgün konfiqurasiya edildiyini fərz edirik
const cloudinary = require("../config/cloudinaryConfig");

// Şəkillərin public_id-lərini variantlar massivindən çıxaran köməkçi funksiya
const extractPublicIds = (product) => {
  const ids = [];
  if (product && product.variants) {
    product.variants.forEach((variant) => {
      variant.options.forEach((option) => {
        if (option.pictures) {
          option.pictures.forEach((picture) => {
            if (picture.public_id) {
              ids.push(picture.public_id);
            }
          });
        }
      });
    });
  }
  return ids;
};

// --- Məhsulun Çəkilməsi (Pagination, Filter, Sort) ---
const getAll = async ({ page, limit, sortBy, order, filter }) =>
  await ProductModel.find(filter)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category")
    .lean(); // Performans üçün lean() əladır

const getOne = async (id) =>
  await ProductModel.findById(id).populate("category");

const getTotalCount = async (filter = {}) =>
  await ProductModel.countDocuments(filter);

const post = async (payload) => await ProductModel.create(payload);

// --- Tək Məhsulu Silmək (Çoxlu Şəkil Silinməsi ilə) ---
const deleteOne = async (id) => {
  const product = await ProductModel.findById(id).lean();
  if (!product) return null;

  // 1. Bütün variant şəkillərinin public_id-lərini çıxarırıq
  const publicIds = extractPublicIds(product);

  // 2. Cloudinary-dən bütün şəkilləri silirik
  for (const public_id of publicIds) {
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (e) {
      console.error(`Cloudinary-dən silmə xətası: ${public_id}`, e);
      // Silinmə xətasını görməzdən gəlirik ki, MongoDB əməliyyatı davam etsin
    }
  }

  // 3. Məhsulu MongoDB-dən silirik
  return await ProductModel.findByIdAndDelete(id);
};

// --- Bir Kateqoriyaya Aid Bütün Məhsulları Silmək ---
const deleteMany = async (categoryId) => {
  const products = await ProductModel.find({ category: categoryId }).lean();

  for (const product of products) {
    // 1. Hər məhsulun bütün variant şəkillərinin public_id-lərini çıxarırıq
    const publicIds = extractPublicIds(product);

    // 2. Cloudinary-dən bütün şəkilləri silirik
    for (const public_id of publicIds) {
      try {
        await cloudinary.uploader.destroy(public_id);
      } catch (e) {
        console.error(`Cloudinary-dən silmə xətası: ${public_id}`, e);
      }
    }
  }

  // 3. MongoDB-dən məhsulları silirik
  await ProductModel.deleteMany({ category: categoryId });
  return { deletedCount: products.length };
};

// --- Məhsulu Yeniləmək ---
const update = async (id, payload) => {
  const existing = await ProductModel.findById(id).lean();
  if (!existing) return null;

  // Qeyd: Şəkil yenilənməsi məntiqi Controller-də daha mürəkkəbdir,
  // çünki hansı köhnə şəkillərin silinəcəyi variantlara əsasən müəyyən edilməlidir.
  // Burada yalnız birbaşa update əməliyyatını həyata keçiririk.

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
