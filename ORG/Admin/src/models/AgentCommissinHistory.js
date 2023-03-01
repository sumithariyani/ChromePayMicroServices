const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const commissionHistory = new mongoose.Schema({
    custPhoto:{
        type:String
    },
    agentName:{
        type:String
    },
    agentID:{
        type: Schema.Types.ObjectId, ref: 'Agent'
    },
    custID:{
        type: Schema.Types.ObjectId, ref: 'customer'
    },
    custName:{
        type:String
    },
    commission:{
        type:Number
    },
    commissionID: {
        type: Schema.Types.ObjectId, ref: 'Agent_Commission'
    }
},{timestamps:true})

module.exports = mongoose.model('Agent_Commission_His', commissionHistory)