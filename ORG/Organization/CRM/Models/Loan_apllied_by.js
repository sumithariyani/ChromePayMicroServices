const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const Loan_applicables = new mongoose.Schema({
    OrganisationID: {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },

    CustomerID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },

    agentID: {
        type: Schema.Types.ObjectId, ref: 'Agent'
    },

    Loan_type: {
        type: String
    },

    recidence: {
        type: String
    },

    LocalGov: {
        type: String
    },
    LandRegistration: {
        type: String
    },

    Loan_status: {
        type: String,
        enum: ['PENDING', 'PASS'],
        default: 'PENDING'
    },

    Interest_Rate: {
        type: Number
    },
    EMI: {
        type: Number
    },
    Total_Amount: {
        type: Number
    },

    Duration_Month: {
        type: Number
    },
    Duration_Year: {
        type: Number
    },
    Interest_percentege: {
        type: Number
    },
    Intrest_Amount_per_Year: {
        type: Number
    },
    Total_Interest_Amount: {

        type: Number
    }





}, { timestamps: true })

module.exports = mongoose.model('Loan_applicables', Loan_applicables)