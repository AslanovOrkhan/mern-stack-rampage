const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        status: {
          type: String,
          enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: addressSchema,
  },
  { timestamps: true, versionKey: false }
);

module.exports = orderSchema;
