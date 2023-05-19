//const { EMAIL_PROVIDER, ROLES } = require('../../constants');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const sellerAuthSchema = new Schema({
    fullname: {
        type: String,

    },
    email: {
        type: String,

    },

    password: {
        type: String
    },
    store_name: {
        type: String
    },
    mobile: {
        type: String
    },
    // role: {
    //     type: String,
    //     default: ROLES.SELLER,
    //     enum: [ROLES.SELLER]
    // },
    sellerType: {
        type: String,
        default: "establishBusiness",
        enum: ["establishBusiness", "startUp"]
    },
    gst_number: {
        type: String
    },
    pan_number: {
        type: String
    },

    isVerify: {
        type: Boolean,
        default : false
    },
    gstImageUrl : {
        type : String,
    },
    panImageUrl : {
        type : String,
    },
    resetPasswordToken: 
    { type: String },
    resetPasswordExpires: 
    { type: Date },

}, { timestamps : true}
);

module.exports = mongoose.model('seller_auths', sellerAuthSchema);