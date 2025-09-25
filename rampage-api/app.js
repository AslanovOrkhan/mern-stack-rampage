const express = require("express");
const cors = require("cors");
const productRouter = require("./src/routes/productRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const sliderRouter = require("./src/routes/sliderRoute");
const userRouter = require("./src/routes/userRoute");
const errorHandler = require("./src/middlewares/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { CLIENT_URL } = require("./src/config/config");
const passport = require("passport");
require("./src/config/passport");
const googleAuthRoute = require("./src/routes/googleAuthRoute");
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(limiter);
app.use(helmet());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/sliders", sliderRouter);
app.use("/auth", userRouter);
app.use(passport.initialize());
app.use("/auth", googleAuthRoute);

app.use(errorHandler);

module.exports = app;
