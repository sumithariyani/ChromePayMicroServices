const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const DID_Blocked_Notes = new mongoose.Schema({
    customerID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },
    blocked: {
        type: String,
        default: "True"
    },
    Notes: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('DID_Blocked_Notes', DID_Blocked_Notes)