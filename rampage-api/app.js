const express = require("express");
const cors = require("cors");
const productRouter = require("./src/routes/productRoute");
const categoryRouter = require("./src/routes/categoryRoute");
// const brandRouter = require("./src/routes/brandRoute");
// const sliderRouter = require("./src/routes/sliderRoute");
const errorHandler = require("./src/middlewares/errorHandler");
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

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
// app.use("/brands", brandRouter);
// app.use("/sliders", sliderRouter);

//global error handler - ERROR BOUNDARY
app.use(errorHandler);

module.exports = app;