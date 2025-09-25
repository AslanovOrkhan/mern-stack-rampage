const {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
  getTotalCount,
} = require("../services/productService");
const { getOne: getCategory } = require("../services/categoryService");
const formatMongoData = require("../utils/formatMongoData");

//get all products
exports.getProducts = async (req, res, next) => {
  try {
    const {
      search = "",
      sortBy = "price",
      order = "asc",
      page = 1,
      limit = 5,
    } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 5;

    const allowedSortFields = ["price", "name", "createdAt"];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "price";
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;

    // Search filter
    const filter = {};
    if (search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" }; // case-insensitive search
    }

    // Get products with pagination, sorting, and filtering
    const products = await getAll({
      page: pageNumber,
      limit: pageSize,
      sortBy: safeSortBy,
      order: sortOrder,
      filter,
    });

    // Get total count for pagination metadata
    const total = await getTotalCount(filter);

    res.status(200).json({
      products: formatMongoData(products),
      total,
      page: pageNumber,
      pageSize: products.length,
    });
  } catch (error) {
    next(error);
  }
};

//get one product
exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getOne(id);
    const { category } = product;
    const formattedCategory = formatMongoData(category);
    if (!product) throw new Error("product not found!");
    const formattedProd = { ...product, formattedCategory };
    delete formattedProd.category;
    res.status(200).json({
      ...formatMongoData(formattedProd._doc),
      category: formattedCategory,
    });
  } catch (error) {
    next(error);
  }
};

//post
exports.postProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    //post of a new product
    const category = await getCategory(req.body.category);
    if (!category) {
      res.status(404).json({
        message: "no such category!",
      });
    } else {
      const newProduct = await post({
        ...req.body,
        image: req.file.path,
        public_id: req.file.filename,
      });
      res.status(201).json(formatMongoData(newProduct));
    }
  } catch (error) {
    next(error);
  }
};

//delete
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteOne(id);
    if (!deletedProduct) throw new Error("product not found!");
    res.status(200).json(formatMongoData(deletedProduct));
  } catch (error) {
    next(error);
  }
};

//update
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateProd = { ...req.body };
    if (req.file) {
      updateProd.public_id = req.file.filename;
      updateProd.image = req.file.path;
    }
    const updatedProductResponse = await update(id, updateProd);
    if (!updatedProductResponse) throw new Error("product not found!");
    res.status(200).json(formatMongoData(updatedProductResponse));
  } catch (error) {
    next(error);
  }
};
