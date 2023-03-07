const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ChromePat_Transections = new mongoose.Schema({
    transactionID: {
        type: String
    },

    senderID: {
        type: Schema.Types.ObjectId, ref: 'customer'

    },
    recieverID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },
    transactionDate: {
        type: Date
    },
    PCN: {
        type: String
    },
    senderName: {
        type: String
    },
    recieverName: {
        type: String
    },
    sendingAmount: {
        type: Number
    },
    receivingAmount: {
        type: Number
    },

    status: {
        type: String,
        enum: ["Confirmed", "Failed", "Pending"],
        default: "Pending"
    },

}, { timestamps: true })

module.exports = mongoose.model("Chrome_pay_Transections", ChromePat_Transections)