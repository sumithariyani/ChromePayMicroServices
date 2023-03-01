const mongoose = require("mongoose")
const { Organisation } = require("./Organisation")

const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String
    },

    senderID: {
        type: String
    },

    recieverID: {
        type: String
    },

    transactionDate: {
        type: Date
    },
    PCN: {
        type: String
    },
    PayInCashier: {
        type: String,

    },
    PayOutCashier: {
        type: String,

    },

    senderName: {
        type: String
    },
    beneficiaryName: {
        type: String
    },
    sendingAmount: {
        type: Number
    },
    receiverAmount: {
        type: Number
    },
    Relationship: {
        type: String
    },
    status: {
        type: String,
        enum: ["Confirmed", "Failed", "Pending"]
    },
    OrganisationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation",
    }

}, { timestamps: true })

module.exports = mongoose.model('transaction', transactionSchema)

