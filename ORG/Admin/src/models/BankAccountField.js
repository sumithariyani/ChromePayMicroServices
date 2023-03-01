const mongoose = require('mongoose')

const bankfields = new mongoose.Schema({
    workingCountry: {
        type: String,
        default: 'ethopia'
    },
    fields: {
        type: String,
    },
    country: {
        type: String,
        default: "ethopia"
    },

    Bankcoderequired: {
        type: Number,
        default: 0
    },

    Banknamerequired: {
        type: Number,
        default: 0
    },

    Transitnumberrequired: {
        type: Number,
        default: 0
    },
    Accountnumberrequired: {
        type: Number,
        default: 0
    },

    Branchnamerequired: {
        type: Number,
        default: 0
    },
    Branchdistrictrequired: {
        type: Number,
        default: 0
    },
    Branchcoderequired: {
        type: Number,
        default: 0
    },
    IFSCrequired: {
        type: Number,
        default: 0
    },
    Cityrequired: {
        type: Number,
        default: 0
    },
    Staterequired: {
        type: Number,
        default: 0
    },

    Postcoderequired: {
        type: Number,
        default: 0
    },
    Phonenumberrequired: {
        type: Number,
        default: 0
    },
    Accounttyperequired: {
        type: Number,
        default: 0
    },
    Documentnumberrequired: {
        type: Number,
        default: 0
    },
    organisationID: {
        type: String
    },
    Addresslinerequired: {
        type: String,
        default: 0
    }


}, { timestamps: true })

module.exports = mongoose.model('bankfeild', bankfields)