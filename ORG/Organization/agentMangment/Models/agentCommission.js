const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const agentCommission = new mongoose.Schema({
    agentID: {
        type: Schema.Types.ObjectId, ref: 'Agent'
    },
    type: {
        type: String
    },
    Amount:{
        type:String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date,
        default : ""
    }
}, { timestamps: true })

module.exports = mongoose.model('Agent_Commission', agentCommission)

