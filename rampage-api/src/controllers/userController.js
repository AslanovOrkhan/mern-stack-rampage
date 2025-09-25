const {
  register,
  getAll,
  getOne,
  getByEmail,
  verifyEmail,
  login,
  unlockAcc,
  forgotPassword,
  resetPass,
} = require("../services/userService");
const { CLIENT_URL } = require("../config/config");
const bcrypt = require("bcrypt");
const formatMongoData = require("../utils/formatMongoData");
const { sendVerificationEmail } = require("../utils/mailService");
const { generateAccessToken } = require("../utils/jwt");

exports.getAllUsers = async (_, res, next) => {
  try {
    const users = await getAll();
    res.status(200).json({
      message: "users retrieved successfully!",
      data: formatMongoData(users),
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getOne(id);
    if (!user) {
      res.status(404).json({
        message: "no such user found!",
        data: null,
      });
    } else {
      res.status(200).json({
        message: "user retrieved successfully!",
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await getByEmail(email);
    if (!user) {
      res.status(404).json({
        message: "no such user with given email",
        data: null,
      });
    } else {
      res.status(200).json({
        message: "user retrieved successfully!",
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    //password hash
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (req.file && req.file.path) {
      req.body.profileImage = req.file.path;
      req.body.public_id = req.file.filename;
    }
    const response = await register({
      ...req.body,
      password: hashedPassword,
    });
    if (!response.success) {
      throw new Error(response.message);
    }

    //send email service ...
    const token = generateAccessToken(
      {
        id: response.data._id,
        email: req.body.email,
        fullName: req.body.fullName,
      },
      "6h"
    );
    const verificationLink = `${process.env.SERVER_URL}/auth/verify-email?token=${token}`;
    sendVerificationEmail(req.body.email, req.body.fullName, verificationLink);

    res.status(201).json({
      message: "user registered successfully | verify your email",
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    //call your service here!
    const response = await verifyEmail(token); //success, message
    // res.status(200).json({
    //   message: response.message,
    //   success: response.success,
    // });
    res.redirect(`${CLIENT_URL}/email-verified?message=${response.message}`);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await forgotPassword(email);
    res.status(200).json({
      message: "reset password email was sent!",
    });
  } catch (error) {
    res.json({
      message: error.message || "internal server error",
      statusCode: 401,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword, email } = req.body;
    await resetPass(newPassword, email);
    //redirect to login page
    res.status(200).json({
      message: "password reset successfully!",
    });
  } catch (error) {
    next(error);
  }
};

exports.unlockAccount = async (req, res, next) => {
  try {
    const { token } = req.query;
    //call your service here!
    const response = await unlockAcc(token); //success, message
    res.redirect(`${CLIENT_URL}/auth/login?message=${response.message}`);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    const response = await login(credentials);

    console.log("RESPONSE ON SERVER: ", response);

    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true, // in production (possible BUG)
      sameSite: "strict",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    res.status(200).json({
      message: response.message,
      token: response.accessToken,
    });
  } catch (error) {
    res.json({
      message: error.message || "internal server error",
      statusCode: 401, //unauthorized
    });
  }
};

exports.refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.sendStatus(401).json({ message: "no token provided!" });

  jwt.verify(token, JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
    if (err)
      return res.sendStatus(403).json({ message: "invalid or expired token!" });
    const user = await getOne(decoded.id);
    if (!user)
      return res.sendStatus(403).json({ message: "invalid or expired token!" });

    const accessToken = generateAccessToken({
      email: user.email,
      id: user._id,
      role: user.role,
      fullName: user.fullName,
    });
    res.json({ accessToken });
  });
};

exports.logout = (_, res) => {
  res.clearCookie("refreshToken", { path: "/auth/refresh" });
  res.sendStatus(204).json({ message: "logged out successfully!" });
};
