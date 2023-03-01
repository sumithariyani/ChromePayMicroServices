const { boolean } = require('joi')
const mongoose = require('mongoose')
const { uploadFile } = require("../aws/aws.js")



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
        type: Date,
        required: true
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
        type: String
    }, biometric: {
        type: Boolean,
        default: false
    },
    fingerPrint: {
        type: Boolean,
        default: false
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
    digitalrefID:{
        type:String
    }



}, { timestamps: true })


module.exports = mongoose.model('temp_customer', customerSchema)