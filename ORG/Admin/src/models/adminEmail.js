const mongoose = require('mongoose')

const adminEmail = new mongoose.Schema({
    messege : {
        type:String
    },
    By:{
        type:String
    },
    logo:{
           type:String
    },
    receivedBy:{
         type:String
    },
    subject:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    },
    code:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('admin_Email_request', adminEmail)