const mongoose = require('mongoose');

const loghistory = new mongoose.Schema({
    email: {
        type:String
    },
    UserID:{
        type:String
    },
    loginTime:{
        type:Date
    },
    IP: {
        type: String,
        default: ""
    },
    status: {
        type: String,
    }
});

module.exports = mongoose.model('adminLogHistory', loghistory)
