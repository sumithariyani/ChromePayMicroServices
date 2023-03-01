const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OrgLoans = new mongoose.Schema({

    OrganisationID: {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },

    Personal_Loans: {
            type: Number,
            default: 7
        },
    secured_Loans: {
            type: Number,
            default: 7
        },

    Insatallment_Loans: {
            type: Number,
            default: 7
        },

    Student_Loans: {
            type: Number,
            default: 7
        },

    Home_Loans: {
            type: Number,
            default: 7
        },

    Bussiness_Loans: {
            type: Number,
            default: 7
        },

    Pension_Loans: {
            type: Number,
            default: 7
        },

    Paydey_Loans: {
            type: Number,
            default: 7
        },

    Asset_Loans: {
            type: Number,
            default: 7
        },
    Overcraft_Loans: {
            type: Number,
            default: 7
        }



}, { timestamps: true })

module.exports = mongoose.model('Org_Loans_Rate', OrgLoans)