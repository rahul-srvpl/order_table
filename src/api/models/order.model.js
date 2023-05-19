const mongoose = require("mongoose");
const product = require("./products.model");
const user_address = require("./user_address.model");
const user = require("../models/user");
const seller = require("./seller_auth");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, default: "pending" },
    customerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    totalProduct: { type: Number },
    amount: { type: String },
    orderItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    shipingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_addresses",
    },
    paymentMethod: {
      type: String,
    },
    payment: {
      type: String,
      enum: ["Unpaid", "Paid"],
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupons",
      default: "NA",
    },
    sellerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller_auths",
    },
    isCancle: {
      type: String,
      default: false,
    },
    isReturn: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order_tables", orderSchema);

