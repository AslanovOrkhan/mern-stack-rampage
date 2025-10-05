const express = require("express");
const cors = require("cors");
const productRouter = require("./src/routes/productRoute");
const categoryRouter = require("./src/routes/categoryRoute");
// const sliderRouter = require("./src/routes/sliderRoute");
const errorHandler = require("./src/middlewares/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

//middlewares
// app.use(express.json()); // YALNIZ JSON üçün istifadə et, file upload üçün lazım deyil
// app.use(express.urlencoded({ extended: true })); // YALNIZ urlencoded üçün istifadə et, file upload üçün lazım deyil
app.use(express.static("public"));
app.use(cors());
app.use(limiter);
app.use(helmet());

//routes
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
// app.use("/sliders", sliderRouter);

//global error handler - ERROR BOUNDARY
app.use(errorHandler);

module.exports = app;