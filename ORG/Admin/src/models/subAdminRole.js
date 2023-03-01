const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const sub_Admin_Role = new mongoose.Schema({

    adminID: {
        type: Schema.Types.ObjectId, ref: 'admins'
    },

    customer: {
        addCustomer: {
            type: Number,
            default: 0
        },

        editCustomer: {
            type: Number,
            default: 0
        },

        approveDID: {
            type: Number,
            default: 0
        },

        viewCustomer: {
            type: Number,
            default: 0
        },

        blockCustomer: {
            type: Number,
            default: 0
        },

        unBlockCustomer: {
            type: Number,
            default: 0
        },

        deleteCustomer: {
            type: Number,
            default: 0
        },

        setcustomerOtpLimit: {
            type: Number,
            default: 0
        },

        setCustomerPasswordLimit: {
            type: Number,
            default: 0
        },
        updateCustomer:{
            type:Number,
            default:0
        },
        disableOtp:{
            type:Number,
            default:0
        }


    }
    ,

    Organisation: 
        {
            addOrganisation: {
                type: Number,
                default: 0
            },

            blockorganisation: {
                type: Number,
                default: 0
            },

            unBlockOrganisation: {
                type: Number,
                default: 0
            },

            deleteOrganisation: {
                type: Number,
                default: 0
            },

            setOrgOptLimit: {
                type: Number,
                default: 0
            },

            setOrgPasswordLimit: {
                type: Number,
                default: 0
            },

            updateOrganisation:{
                type:Number,
                default:0
            }
        }
    ,

    Agent: 
        {
            addAgent: {
                type: Number,
                default: 0
            },
            blockAgent: {
                type: Number,
                default: 0
            },
            unBlockAgent: {
                type: Number,
                default: 0
            },
            deleteAgent: {
                type: Number,
                default: 0
            },
            setagentOtpLimit:{
                type:Number,
                default:0
            },
            setagentPasswordLimit:{
                type:Number,
                default:0
            },

            updateAgent:{
                type:Number,
                default:0
            }

        }
    ,

    IP:{
        IPblackListing :{
             type:Number,
             default: 0
        },

        IPwhiteListing:{
            type:Number,
            default : 0
        },

    },

    subAdmin:{
        addSubAdmin:{
            type:Number,
            default: 0
        },

        blockSubAdmin:{
            type:Number,
            default:0
        },

        unBlockSubAdmin:{
            type:Number,
            default:0
        },
        deleteSubAdmin:{
            type:Number,
            default:0
        },

        updateSubAgent:{
            type:Number,
            default:0
        }

    }
},{timeseries:true})


module.exports = mongoose.model('sub_admin_role', sub_Admin_Role)