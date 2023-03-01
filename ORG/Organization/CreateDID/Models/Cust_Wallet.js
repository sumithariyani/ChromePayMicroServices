const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const cust_wallet = new mongoose.Schema({

    customer_ID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },
    phone: {
        type: Number
    },

    type: {
        type: Array,
        default: ['Credit', 'Debit'],

    },

    Transection_limit: {
        type: Number,
        default: 1000
    },

    wallet_Address: {
        type: String
    },

    current_Amount: {
        type: Number,
        default: 0
    },






}, { timestamps: true })

module.exports = mongoose.model("Customer_wallet", cust_wallet)