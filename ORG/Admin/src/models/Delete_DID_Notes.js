const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const DID_Delete_Notes = new mongoose.Schema({
    customerID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },
    deleted: {
        type: String,
        default: "True"
    },
    Notes: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('DID_Delete_Notes', DID_Delete_Notes)