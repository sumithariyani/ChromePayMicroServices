const { boolean } = require('joi')
const mongoose = require('mongoose')
const { uploadFile } = require("../aws/aws.js")
const Schema = mongoose.Schema;




const customerSchema = new mongoose.Schema({


    IDphoto: {
        type: String,
        default: ""
    },

    fullname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,

    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,

    },
    gender: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,

    },
    professoin: {
        type: String
    },
    address: {
        type: String,
        default: ""
    },

    Latitude: {
        type: String
    },


    Longitude: {
        type: String
    },

    biometric: {
        type: Number,
        default: 0
    },
    fingerPrint: {
        type: Number,
        default: 0
    },
    city: {
        type: String
    },
    age: {
        type: Number
    },
    status: {
        type: String,
        default: "pending"

    },
    hash: {
        type: String,

    },
    owner: {
        type: String
    },
    privateKey: {
        type: String
    },
    walletAddress: {
        type: String
    },
    organisation: [
        {
            type: String,
            ref: "Organisation",
            default: ""
        }
    ],

    blocked: {
        type: Number,
        default: '0'

    },
    isDeleted: {
        type: Number,
        default: '0'
    },
    createdBY: [

    ],

    DeletedBy: [

    ],
    suspendBy: [

    ],

    nextFOKinName: {
        type: String
    },

    nextFOKniPhone: {
        type: Number
    },

    landSize: {
        type: String
    },

    residance: {
        type: String,
        default: ""
    },
    locaDocument: {
        type: String,
        default: ""
    },
    landRegistration: {
        type: String,
        default: ""
    },
    otp: {
        type: Number,
        default: ""
    },
    facialIdentification: {
        type: Number,
        default: 0
    },
    faceDiscription: {
        type: Array
    },
    digitalID: {
        type: String
    },
    digitalrefID: {
        type: String
    },
    Location: {
        type: Number,
        default: 0
    },
    assetType: {
        type: String
    },
    assetID: {
        type: String
    },
    assetAddress: {
        type: String
    },
    assetLongitude: {
        type: String
    },
    assetLatitude: {
        type: String
    },
    Loan_OTP: {
        type: String
    },
    Linekd_Service_OTP: {
        type: String
    },
    password: {
        type: String,
        default: ""
    },
    wrongOTP: {
        type: Number,
        default: 0
    },
    wrong_pass: {
        type: Number,
        default: 0
    },
    login_otp: {
        type: Number
    },
    Block_notes: {
        type: String
    },

    cust_view_OTP: {
        type: Number
    }

}, { timestamps: true })


module.exports = mongoose.model('customer', customerSchema)