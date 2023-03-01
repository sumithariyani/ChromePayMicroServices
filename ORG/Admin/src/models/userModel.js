const mongoose = require('mongoose')
const { uploadFile } = require("../aws/aws.js")



const userSchema = new mongoose.Schema({


    IDphoto: {
        type: String,
        default: ""
    },
    NextofKin: {
        type: String
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
        enum: ['Male', 'Female'],
    },
    nationality: {
        type: String,

    },
    profession: {
        type: String
    },
    address: {
        type: String
    },
    organisation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            default: ""
        }
    ],

    category: {
        type: String,
        required: true,
        enum: ['in progress', 'verified'],
    },

    refNumber: {
        type: String,
    },
    biometric: {
        type: Boolean,
        default: false
    },
    fingerPrint: {
        type: Boolean,
        default: false
    },
    otp: { type: Number }


}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)