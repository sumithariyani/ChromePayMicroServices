const mongoose = require('mongoose')


const OrgbadLogs = new mongoose.Schema({
    IP: {
        type: String
    },

    description: {
        type: String
    },

    api: {
        type: String
    },

    apiUrl:{
        type : String
    }


}, { timestamps: true })

module.exports = mongoose.model('OrgbadLogs', OrgbadLogs)