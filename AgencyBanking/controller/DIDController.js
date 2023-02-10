const customerModel = require("../Models/customer")
const Organisation = require("../Models/Organisation")
const agent_Commission = require("../models/agentCommission")
const agent_Commission_His = require("../Models/AgentCommissinHistory")
const temp_Cust = require("../Models/temp_Cust")
const axios = require("axios")
const { uploadFile } = require("../aws/aws.js");


const sendAgencyOTP = async (req, res) => {
    try {

        let data = req.body;
        const { ID } = data

        if (!ID) return res.status(200).send({ status: false, msg: "Please enter phone DID number" })
        let OTP = 100000 + Math.floor(Math.random() * 900000);
        let findCust = await customerModel.findOneAndUpdate({ $or: [{ phone: ID }, { digitalrefID: ID }] }, { cust_view_OTP: OTP })
        return res.status(200).send({ status: true, msg: "OTP send sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const verifyOTP = async (req, res) => {
    try {

        let data = req.body;
        const { ID, OTP } = data

        if (!OTP) return res.status(200).send({ status: false, msg: 'Please enter otp' })
        if (!ID) return res.status(200).send({ status: false, msg: "Please enter phone DID number" })
        let findCust = await customerModel.findOne({ $or: [{ phone: ID }, { digitalrefID: ID }] }).select({ fullname: 1, IDphoto: 1, phone: 1, email: 1, digitalrefID: 1, cust_view_OTP: 1 })
        if (findCust.cust_view_OTP != OTP) { return res.status(200).send({ status: false, msg: "Please enter Valid otp" }) }
        return res.status(200).send({ status: true, msg: "OTP verify successfully", data: findCust })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}




module.exports = {
    sendAgencyOTP, verifyOTP
}