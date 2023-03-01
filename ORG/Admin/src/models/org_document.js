const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const orgDoc = new mongoose.Schema({
    organisation_id:{
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },
    Certificate_of_Incorporation: {
        type: String
    },

    Proof_of_Company_Address: {
        type: String

    },
    Company_Profile_Brochure: {
        type: String

    },
    Customer_Agreement: {
        type: String
    }

},{timestamps:true})

module.exports = mongoose.model('Org_Doc', orgDoc)