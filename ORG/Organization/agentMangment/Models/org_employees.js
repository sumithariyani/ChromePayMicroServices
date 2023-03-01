const { default: mongoose } = require('mongoose')
const monggose = require('mongoose')
const Schema = mongoose.Schema;


const org_employees = new mongoose.Schema({

    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    },
    organisation_id: {
        type: Schema.Types.ObjectId, ref: 'Organisation'
    },
    password: {
        type: String
    },
    employee_roles: {
        add_customer: {
            type: Number,
            default: 0
        },
        approve_customer: {
            type: Number,
            default: 0
        },

        block_customer: {
            type: Number,
            default: 0
        },

        delete_customer: {
            type: Number,
            default: 0
        },

        createdigitalID: {
            type: Number,
            default: 0
        }

    }
}, { timestamps: true })


module.exports = mongoose.model('org_employee', org_employees)