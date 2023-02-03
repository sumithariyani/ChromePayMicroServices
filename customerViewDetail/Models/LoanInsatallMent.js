const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Loan_Insatallment = new mongoose.Schema({
    OrganisationID: {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },

    customerID: {
        type: Schema.Types.ObjectId, ref: 'customer'
    },

    Loan_ID: {
        type: Schema.Types.ObjectId, ref: 'Loan_applicables'
    },

    No_Of_Installment: {
        type: Number,
        default: 0
    },

    remainig_Insallment: {
        type: Number,
        default: 0
    },

    Complete_insallment: {
        type: String,
        default: 0
    },

    Installment_Amount: {
        type: Number

    },

    Interest_Rate: {
        type: Number
    },

    Installment_Pay_Date: {
        type: Date
    },

    start_Date: {
        type: Date
    },

    End_Date: {
        type: Date
    },

    Total_Duration: {
        type: Number
    },

    Installments_History: [

        {
            Installment_No: {
                type: Number,
                default: 0
            },

            Installment_Pay_Amount: {
                type: Number,
                default: 0
            },
            Pay_Date: {
                type: Date,
                default: new Date()
            },
            Installment_Date: {
                type: Date,
                default: new Date()
            },
            status: {
                type: String,
                default: "Due"
            }

        }

    ]


}, { timestamps: true })

module.exports = mongoose.model('Loan_Insatallment', Loan_Insatallment)