const mongoose = require("mongoose");
const product = require("./products.model");
const user_address = require("./user_address.model");
const user = require("../models/user");
const seller = require("./seller");

const orderSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    order_date: { type: Date, default: Date.now },
    order_status: {
      type: String,
      enum: ["pending", "delivered", "cancelled", "shipped"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      requird: true,
    },
    total_product: { type: Number },
    amount: { type: String, required: true },
    order_items: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    shiping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_addresses",
    },
    billing_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_addresses",
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ["unpaid", "paid"],
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupons",
      default: "NA",
    },
    seller_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
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

