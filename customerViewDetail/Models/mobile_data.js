const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const cust_recharge = new mongoose.Schema({
    customerID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },

    Recharge_ID: {
        type: String
    },

    amount: {
        type: Number
    }

}, { timestamps: true })


module.exports = mongoose.model('customer_Recharge', cust_recharge)