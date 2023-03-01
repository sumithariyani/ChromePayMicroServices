const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OrgLoans = new mongoose.Schema({

    OrganisationID: {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },

    TypeOfLoans: {
        Personal_Loans: {
            type: Number,
            default: 0
        },
        secured_Loans: {
            type: Number,
            default: 0
        },

        Insatallment_Loans: {
            type: Number,
            default: 0
        },

        Student_Loans: {
            type: Number,
            default: 0
        },

        Home_Loans: {
            type: Number,
            default: 0
        },

        Bussiness_Loans: {
            type: Number,
            default: 0
        },

        Pension_Loans: {
            type: Number,
            default: 0
        },

        Paydey_Loans: {
            type: Number,
            default: 0
        },

        Asset_Loans: {
            type: Number,
            default: 0
        },
        Overcraft_Loans: {
            type: Number,
            default: 0
        }
    },


}, { timestamps: true })

module.exports = mongoose.model('Org_Loans', OrgLoans)