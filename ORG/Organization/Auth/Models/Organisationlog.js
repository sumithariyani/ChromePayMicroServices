const mongoose = require('mongoose');

const organisationLog = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    ID: {
        type: String
    },
    loginTime: {
        type: Date
    },
    IP: {
        type: String
    },
    status: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Organisation Log History', organisationLog)

