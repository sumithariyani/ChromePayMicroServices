const mongoose = require('mongoose')
//const joi = require('joi');

const OrganisationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },

    code: {
        type: String,
        reequired: true
    },

    joiningDate: {
        type: String,
        
    },
    phoneNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        
    },
    address: {
        type: String,
    },
    password:{
         type:String,
         required:true
    },
    totlaLicense: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending'
    },
    blocked: {
        type: Number,
        default: '0'
    },
    isDeleted: {
        type: Number,
        default: '0'
    },
    otp: {
        type: Number
    },
    WrongPassword: {
        type: Number,
        default: 0
    },
    passwordLimit: {
        type: Number,
        default: 5
    },
    otpLimit: {
        type: String,
        default: 5
    },
    recurringFee:{
        type:Number
    },
    totalLicenceFee:{
        type:Number
    },

    feePerLicence:{
        type:Number
    },

    LicenseUpdateStatus:{
        type:Number,
        default: 0
    },
    accessKeyId: {
        type: String
    },
    secretAccessKey: {
        type: String 
    }


}, { timestamps: true })

module.exports = mongoose.model("Organisation", OrganisationSchema)

// const Organisation = new mongoose.model("Organisation", OrganisationSchema);
// module.exports.Organisation = Organisation;
