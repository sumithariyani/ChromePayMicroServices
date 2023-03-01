const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const adminAgent = new mongoose.Schema({
    firstName:{
        type:String
    },

    lastName:{
        type:String
    },

    email:{
        type:String
    },
    phone:{
        type:Number
    },
    createdBy:{
        type: Schema.Types.ObjectId, ref: 'admins'
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    blocked:{
        type:Number,
        default: 0
    },
    isDeletd:{
        type:Number,
        default:0
    },
    otp:{
        type:Number
    },
    password:{
        type:String,
    }

},{timestamps:true})

module.exports = mongoose.model('admin_agent', adminAgent)