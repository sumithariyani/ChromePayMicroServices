const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const cust_logs = new mongoose.Schema({

    customer_ID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },

    activity: {
        type: String
    },

    status: {
        type: String,
    },
    field: {
        type: String
    },
    field_status: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('customer_logs', cust_logs)