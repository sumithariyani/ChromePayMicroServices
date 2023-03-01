const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const orgLicenses = new mongoose.Schema({
    OrganisationID :{
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },
    name:{
        type:String
    },
    totalLicenses:{
        type:Number
    },
    LicenseUpdateStatus:{
        type:Number,
        default: 0
    },
    RemainingLicenses: {
        type: Number,
        default: 0
    }

},{timestamps:true})

module.exports = mongoose.model('Org_License', orgLicenses)