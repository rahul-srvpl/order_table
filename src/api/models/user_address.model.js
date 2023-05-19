const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  user_details_Id: {
    type: String,
  },
  addressType: {
    type: String,
    enum: [
      "Home",
      "Work",
      "Office",
      "School",
      "Business",
      "Postal",
      "Vacation",
      "Others",
    ],
  },
  country: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  alterNativeMobile: {
    type: String,
  },
  pincode: {
    type: String,
  },
  house_address: {
    type: String,
  },
  area_address: {
    type: String,
  },
  landmark: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

module.exports = mongoose.model("user_addresses", userAddressSchema);
