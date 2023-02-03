const customerModel = require('../Models/customer')
const transactionModel = require("../Models/transaction")
const customer_bills = require("../Models/customer_bill_pay")
const customer_recharge = require("../Models/mobile_data")
const customer_loan_installment = require("../Models/LoanInsatallMent")
const axios = require('axios')


const custdetail = async (req, res) => {
    try {

        const custID = req.params.custID
        console.log("13212")


        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }

        let findCust = await customerModel.findOne({ _id: custID })


        let findsendingAmount = await transactionModel.find({ senderID: custID })


        var sendindAmount = 0;
        for (let i of findsendingAmount) {
            sendindAmount += i.sendingAmount
        }

        let findrecievingAmount = await transactionModel.find({ recieverID: custID })

        var receiveAmount = 0;
        for (let i of findrecievingAmount) {
            receiveAmount += i.sendingAmount
        }

        let totalAmount = sendindAmount + receiveAmount;

        let findtotalTransection = await transactionModel.find({ senderID: custID })
        let findtotlaTrans = await transactionModel.find({ recieverID: custID })

        var totalTransection = findtotalTransection.length + findtotlaTrans.length



        let findProfilePercentage = await customerModel.findOne({ _id: custID })

        let proPercentage = 0
        if (findProfilePercentage.biometric == 1) {
            proPercentage += 33
        }

        if (findProfilePercentage.fingerPrint == 1) {
            proPercentage += 33
        }

        if (findProfilePercentage.facialIdentification == 1) {
            proPercentage += 34
        }



        //var location = 0

        if (findCust.Latitude.length && findCust.Longitude.length) {
            proPercentage += 33
            var location = 1
        } else {
            var location = 0
        }




        let obj = {

            _id: findCust._id, IDphoto: findCust.IDphoto, fullname: findCust.fullname,
            dateOfBirth: findCust.dateOfBirth, biometric: findCust.biometric, fingerPrint: findCust.fingerPrint,
            facialIdentification: findCust.facialIdentification, phone: findCust.phone, city: findCust.city, age: findCust.age,
            email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: findCust.hash,
            owner: findCust.owner, privateKey: findCust.privateKey, walletAddress: findCust.walletAddress,
            professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
            createdBY: findCust.createdBY, imageDescriptions: findCust.imageDescriptions, Latitude: findCust.Latitude,
            Longitude: findCust.Longitude, digitalID: findCust.digitalID, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
            locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, totalTransection: totalTransection,
            sendindAmount: sendindAmount, receiveAmount: receiveAmount, proPercentage: proPercentage, totalAmount: totalAmount,
            landSize: findCust.landSize, nextFOKinName: findCust.nextFOKinName, nextFOKniPhone: findCust.nextFOKniPhone, Location: location

        }


        return res.status(200).send({ status: true, obj })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



const calculate_final_activities = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }

        let find_recived_payment = await transactionModel.find({ recieverID: custID })

        var reciving_amount = 0

        for (let i of find_recived_payment) {
            reciving_amount += i.receiverAmount
        }


        let find_bills_amount = await customer_bills.find({ customerID: custID })


        var bills_amount = 0
        for (let i of find_bills_amount) {
            bills_amount += i.amount
        }


        let find_recharge_amount = await customer_recharge.find({ customerID: custID })

        var recharge_amount = 0
        for (let i of find_recharge_amount) {
            recharge_amount += i.amount
        }

        let find_Loan_amoount = await customer_loan_installment.find({ customerID: custID })

        let result = []
        for (let i of find_Loan_amoount) {

            for (let j of i.Installments_History) {
                result.push(j)
            }

        }

        let Loan_amount = 0;

        for (let i of result) {
            Loan_amount += i.Installment_Pay_Amount
        }

        let final_amount = reciving_amount
            + bills_amount
            + recharge_amount
            + Loan_amount

        let obj = {
            reciving_amount
            , bills_amount
            , recharge_amount
            , Loan_amount
        }

        let reciving_amount_per = Number(((reciving_amount / final_amount) * 100).toFixed(1))
        let bills_amount_per = Number(((bills_amount / final_amount) * 100).toFixed(1))
        let recharge_amount_per = Number(((recharge_amount / final_amount) * 100).toFixed(1))
        let Loan_amount_per = Number(((Loan_amount / final_amount) * 100).toFixed(1))

        let obj1 = {
            reciving_amount_per,
            bills_amount_per,
            recharge_amount_per,
            Loan_amount_per
        }

        return res.status(200).send({ status: true, obj, obj1 })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg:error.message })
    }
}

const send_cust_otp_data_view = async (req, res) => {

    try {
        let data = req.body;
        const { phoneNo } = data
        if (!phoneNo) {
            return res.status(200).send({ status: false, msg: "Please enter phone number" })
        }
        let OTP = 100000 + Math.floor(Math.random() * 900000);
        let find_customer = await customerModel.findOneAndUpdate({ phone: phoneNo }, { cust_view_OTP: OTP }, { new: true })

        console.log("View_UPdate", find_customer)
        if (!find_customer) {
            return res.status(200).send({ status: false, msg: "Customer not found" })
        }
        const send_mobile_otp = async (req, res) => {
            let mobile = phoneNo;
            let otp = OTP;
            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;
            try {
                return await axios.get(url).then(function (response) {
                    return response;
                }); 
            } catch (error) {
                console.log(error);
            }
        }
        await send_mobile_otp();
        return res.status(200).send({ status: true, msg: "OTP send succesfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "Server error" })
    }
}

//-------------------------------------------------------verify_cust_view_OTP----------------------------------------------------------------------------

const verify_cust_view_OTP = async (req, res) => {
    try {

        let data = req.body;
        const { phoneNo, OTP } = data

        if (!phoneNo) {
            return res.status(200).send({ status: false, msg: "not getting phone number" })

        }

        if (!OTP) {
            return res.status(200).send({ status: false, msg: "Please enter OTP" })

        }

        let verify = await customerModel.findOne({ phone: phoneNo })

        if (!verify) {
            return res.status(200).send({ status: false, msg: "Failed Please try again" })

        }

        console.log(verify.cust_view_OTP)
        let num_OTP = parseInt(OTP)
        console.log(OTP)
        if (verify.cust_view_OTP !== num_OTP) {
            return res.status(200).send({ status: false, msg: "Please enter valid OTP" })
        }
        let FAKE_OTP = 100000 + Math.floor(Math.random() * 900000);
        let update_otp = await customerModel.findOneAndUpdate({ phone: phoneNo }, { cust_view_OTP: FAKE_OTP })
        return res.status(200).send({ status: true, msg: "OTP verified Sucessfully" })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "server error" })
    }
}

module.exports = {custdetail, calculate_final_activities, send_cust_otp_data_view, verify_cust_view_OTP}