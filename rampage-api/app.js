const express = require("express");
const cors = require("cors");
const productRouter = require("./src/routes/productRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const brandRouter = require("./src/routes/brandRoute");
const campaignRouter = require("./src/routes/campaignsRoute");
// const sliderRouter = require("./src/routes/sliderRoute");
const errorHandler = require("./src/middlewares/errorHandler");

// Import models to register them
require("./src/models/userModel");
require("./src/models/campaignsModel"); // Fixed typo in filename
require("./src/models/categoryModel");
require("./src/models/brandModel");
require("./src/models/productModel");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(express.static("public"));
app.use(cors());
app.use(limiter);
app.use(helmet());

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/campaigns", campaignRouter);
// app.use("/sliders", sliderRouter);

//global error handler - ERROR BOUNDARY
app.use(errorHandler);

module.exports = app;
