const mongoose = require('mongoose');


const agentSchema = new mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },

    agentCode: {
        type: String

    },
    country: {
        type: String
    },

    address: {
        type: String
    },

    city: {
        type: String
    },

    postCode: {
        type: String
    },

    transectionLimit: {
        type: String
    },

    Addsubagent: {
        type: String
    },

    organisationID: {
        type: String,
        required: true
    },

    token: {
        type: String,
        default: ""
    },

    isDeleted: {
        type: Number,
        default: 0
    },
    DeletedBy: [

    ],
    blockedBy: {
        type: String
    },
    blocked: {
        type: Number,
        default: 0
    },
    otp: {
        type: Number
    },
    WrongPassword: {
        type: Number,
        default: 0
    },
    passwordLimit: {
        type: Number,
        default: 5
    },
    otpLimit: {
        type: String,
        default: 5
    },

    role: {
        Addsubagent: {
            type: Number
        },
        performPayOut: {
            type: Number
        },

        cancelTarnsection: {
            type: Number
        },

        approveTransection: {
            type: Number
        },

        createdigitalID: {
            type: Number
        },

        cashierapprove: {
            type: Number
        },
        agentBy:{
            type:String
        }

    }
}, { timestamps: true })

module.exports = mongoose.model('Agent', agentSchema)

