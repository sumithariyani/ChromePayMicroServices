const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const orgAdminSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    Image: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    organization : {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },
    isBlocked: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('orgadmin', orgAdminSchema)