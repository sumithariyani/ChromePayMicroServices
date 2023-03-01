const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const addCustomerBank = new mongoose.Schema({
    customerID: {
    type: Schema.Types.ObjectId, ref: 'customer'

    },

    bankID: {
        type: String
    },

    country: {
        type: String,
        default: "ethopia"
    },

    Bankcode: {
        type: String,
        default: 0
    },
    Bankname: {
        type: String,
        default: 0
    },

    Transitnumber: {
        type: String,
        default: 0
    },
    Accountnumber: {
        type: String,
        default: 0
    },

    Branchname: {
        type: String,
        default: 0
    },
    Branchdistrict: {
        type: String,
        default: 0
    },
    IFSC: {
        type: String,
        default: 0
    },
    City: {
        type: String,
        default: 0
    },

    Postcode: {
        type: Number,
        default: 0
    },
    Phonenumber: {
        type: Number,
        default: 0
    },
    organisationID: {
        type: String
    },
    Branchcode: {
        type: String
    },
    State: {
        type: String
    },
    Documentnumber: {
        type: String
    },
    Accounttype: {
        type: String
    },
    isDeleted: {
        type: Number,
        default: 0
    },
    suspend: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


module.exports = mongoose.model('customer bank', addCustomerBank)