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
        type: String
    },
    Latitude: {
        type: String,
        default: ""
    },
    Longitude: {
        type: String,
        default: ""
    },
    biometric: {
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

    imageDescriptions: {
        type: Array
    },
    digitalrefID:{
        type:String
    },
    digitalID:{
        type:String,
        default : null
    },
    assetType:{
        type: String,
        default: ""

    },
    assetID:{
        type: String,
        default: ""
    },
    assetAddress:{
        type:String
    },
    assetLongitude:{
        type:String
    },
    assetLatitude:{
        type:String
    },
    Location:{
        type:Number,
        default : 0
    },



}, { timestamps: true })


module.exports = mongoose.model('temp_customer', customerSchema)
