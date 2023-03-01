const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const org_LicenseFees = new mongoose.Schema ({
    OrganisationID :{
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },
    name:{
        type:String
    },
    recuuringFees:{
        type:Number
    },
    perLicenseFee:{
        type:Number
    }
},{timestamps:true})

module.exports = mongoose.model('Org_LicenseFee', org_LicenseFees)