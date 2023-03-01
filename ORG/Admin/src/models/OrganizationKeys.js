const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OrgKeys = new mongoose.Schema({
    organisationID: {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },

    accessKeyId: {
        type: String
    },

    secretAccessKey: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Organisation_keys', OrgKeys)