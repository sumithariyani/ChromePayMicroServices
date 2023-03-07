
const org_employee = require("../Models/org_employees")
const orgBadLogs = require("../Models/OrgBadLogs")
const customerModel = require("../Models/customer")
const Loan_applay_customer = require("../Models/Loan_apllied_by")
const transectionModel = require("../Models/transaction");
const organisationModel = require("../Models/OrganisationModel")
const custBanks = require("../Models/customerBank")
const customer_logs = require("../Models/Customer_logs")
const axios = require('axios')
const ip = require('ip')
const mongoose = require('mongoose')
const moment = require('moment')


const create_employe = async (req, res) => {
    try {

        let orgID = req.OrganisationID;
        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter organization ID" })
        }

        let data = req.body;

        const { first_name, last_name, phone, email, status, organisation_id,
            add_customer, approve_customer, block_customer, delete_customer, password, createdigitalID } = data

        let check_phone = await org_employee.findOne({ phone: phone })

        if (check_phone) {
            return res.status(200).send({ status: false, msg: "Employee already register" })}


        let check_email = await org_employee.findOne({ email: email })
        if (check_email) {
            return res.status(200).send({ status: false, msg: "Employee alrady register" })}

        if (!first_name) {
            return res.status(200).send({ status: false, msg: "Please enter first name" })}

        if (!last_name) {
            return res.status(200).send({ status: false, msg: "Please enter last name" })}

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone number" })}

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })}

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })}

        let obj = {
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            organisation_id: orgID,
            password: password,
            employee_roles: {
                add_customer: add_customer,
                approve_customer: approve_customer,
                block_customer: block_customer,
                delete_customer: delete_customer,
                createdigitalID: createdigitalID
            }
        }
        let create = await org_employee.create(obj)
        if (create) {
            return res.status(200).send({ status: true, msg: "Employee Create Successfully" })}
    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization Create Employee",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/create_employe/:token"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const Org_pendingCust = async (req, res) => {
    try {


        const orgID = req.OrganisationID;
        let pageNO = req.body.page;

        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let findcust1 = await customerModel.find({ organisation: orgID, status: "pending", isDeleted: 0, blocked: 0 }).sort({ createdAt: -1 })
        let totalRow = findcust1.length
        if (Object.keys(req.body).length <= 1) {


            let findcust = await customerModel.find({ organisation: orgID, status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })
 
        }


        let option = [{ digitalrefID: req.body.digitalrefID }]
        let findcust = await customerModel.find({ $or: option, organisation: orgID, status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })
    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Pending Customer",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/Org_pendingCust/:token"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



const customerVerify = async (req, res) => {
    try {


        const custID = req.params.custID;
        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (custID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        let findcust = await customerModel.findOneAndUpdate({ _id: custID }, { status: "verified" })

        if (findcust) {
            return res.status(200).send({ status: true, msg: "customer verified sucessfully" })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const Org_blockedIDS = async (req, res) => {
    try {

        const OrgID = req.OrganisationID;
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let findBlockedIDs1 = await customerModel.find({ organisation: OrgID, blocked: 1 })
        let totlaRow = findBlockedIDs1.length
        let findBlockedIDs = await customerModel.find({ organisation: OrgID, blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let totalRaow1 = findBlockedIDs.length;

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: findBlockedIDs })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Blocked DID's",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/Org_blockedIDS/:token"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const UnsuspendCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;
      

        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await customerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Customer Already Unbolcked" })
        }

        let BlockUser = await customerModel.findOneAndUpdate({ _id: userID }, { blocked: 0 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Unblock Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const customerDetail = async (req, res) => {
    try {

        const customerID = req.body.custID;

        let findCustomer = await customerModel.findOne({ _id: customerID })
        let orgs = findCustomer.organisation
        let find1 = await organisationModel.find({ _id: orgs })
        let proPercentage = 0
        var totalTrans = 0
        var noOfTran = 0
        location = 0
        if (findCustomer.biometric == 1) {
            proPercentage += 33
        }

        if (findCustomer.fingerPrint == 1) {
            proPercentage += 33
        }

        if (findCustomer.facialIdentification == 1) {
            proPercentage += 34
        }

        if (findCustomer.Latitude.length && findCustomer.Longitude.length) {
            proPercentage += 33
            var location = 1
        } else {
            var location = 0
        }

      
        let findTransection = await customerModel.aggregate([
            {$match : {_id : mongoose.Types.ObjectId(customerID)}},
            {
                $lookup: {
                    from: "transactions",
                    localField: "_id",
                    foreignField: "senderID",
                    as: "withdrawal"
                }
            },

            {
                $lookup: {
                    from: "transactions",
                    localField: "_id",
                    foreignField: "recieverID",
                    as: "Deposite"
                }
            },
        ])

        let findTransections = await transectionModel.aggregate([
            {$match : {senderID : mongoose.Types.ObjectId(customerID)}},
            {
                
                $group:
                { _id: null, Withdraw: { $sum: "$sendingAmount" }, Deposite: { $sum: "$receiverAmount" } }
               
              },  
        ])


        let findLoans = await Loan_applay_customer.aggregate([
            {$match : {CustomerID : customerID}},
            {
                
                $group:
                { _id: null, LoanAmount: { $sum: "$Total_Amount" }}
               
              },
           
        ])

        let Wothdraw = findTransections.length ? findTransections[0].Withdraw : 0
        let Deposite = findTransections.length ? findTransections[0].Deposite : 0
        let LoanAmount = findLoans.length ? findLoans[0].LoanAmount : 0
         totalTrans = Wothdraw + Deposite
         noOfTran = findTransection.length + 12

        const financialData = {
            Wothdraw, Deposite, LoanAmount, totalTrans, noOfTran
        }


        let Banks = await custBanks.find({customerID : customerID})

        let merge = {
            proPercentage: proPercentage,
            location: location,
            totalTrans : totalTrans,
            noOfTran : noOfTran


        }
        let Data = { ...findCustomer._doc, ...merge }

        // return res.status(200).send({Data, Orgs : find1   }) 
        return res.status(200).send({  Data, orgs : find1, Banks, financialData})


    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization get Employee Roles",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_employee_roles/:employeeID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



const updateDigitalID = async (req, res) => {
    try {

        const custID = req.body.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (custID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }


        let findCustomer = await customerModel.findOne({ _id: custID })

        if (!findCustomer) {
            return res.status(200).send({ status: false, msg: "not found ciustomer" })
        }

        if (!findCustomer.owner) {
            return res.status(200).send({ status: false, msg: "Customer not have owner key" })
        }

        let custOwnerKey = findCustomer.owner;
        async function getID() {
            try {
                const Ownwe_key = '0x12734821a5B2be1D204fEdb3e986a6d149772a6B'
                var result11 = []
                let result = await axios.get(`http://13.233.12.75:7008/api/mainnet/getDigitalIdOfOwner/${custOwnerKey}`)
                    .catch((error) => {
                        let data = error.response.data
                        result11.push(data)
                    })

                for (item of result11) {

                    let findCustomer = await customerModel.findOneAndUpdate({ _id: custID }, { digitalID: item.owner }, { new: true })

                    if (findCustomer) {

                        return res.status(200).send({ status: false, msg: "Digital ID added sucessfullt", findCustomer })
                    }
                }




                let findCustomer = await customerModel.findOneAndUpdate({ _id: custID })






            } catch (error) {

                return res.status(200).send({ "catch error": error.message })


                result.push(error)

            }               
        }

        getID()



    } catch (error) {
        // let obj = {
        //     IP: ip.address(),
        //     description: error,
        //     api: "Organization Add Customer DID",
        //     apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/updateDigitalID/:custID/:adminID"
        // }
        // let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const get_cust_logs = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Not getting customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Not getting valid customer ID" })
        }

        const { page = 1, limit = 5 } = req.query;

        if (Object.keys(req.body).length == 0) {
            let filter = await customer_logs.find({ customer_ID: custID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((1 - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, filter })
        }
        let options = [{ field: req.body.field }, { status: req.body.status }]


        let filter = await customer_logs.find({ $or: options, customer_ID: custID })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((1 - 1) * limit)
            .exec();

        return res.status(200).send({ statussss: true, filter })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



module.exports = {create_employe, Org_pendingCust, customerVerify, Org_blockedIDS, UnsuspendCustomer, customerDetail, updateDigitalID, get_cust_logs}