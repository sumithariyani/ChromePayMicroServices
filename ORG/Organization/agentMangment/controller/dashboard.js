const AdminController = require("../Models/orgAdmin")
const Adminroles = require("../Models/orgAdminRoles")
const Organisation = require("../Models/Organisation")
const agentModel = require("../Models/AgentModel")
agent_Commission = require("../Models/agentCommission")
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const cutomerModel = require("../Models/customer")
const transectionModel = require('../Models/transaction')
const License_fee = require('../Models/org_LicensesFees')
const Loan_applay_customer = require("../Models/Loan_apllied_by")
const org_Licenses = require("../Models/OrgLicenses")
const { default: mongoose } = require("mongoose")
const agent_commission = require("../Models/agentCommission")

const org_employee = require("../Models/org_employees")



const characters1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString1(length) {
    let result = '';
    const charactersLength = characters1.length;
    for (let i = 0; i < length; i++) {
        result += characters1.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const createAgent = async (req, res) => {
    try {
        let AgentCode = 10000000 + Math.floor(Math.random() * 90000000);


        const data = req.body;
        const orgID = req.OrganisationID;
        let findOrg = await Organisation.findOne({ "_id": orgID })
        let AgentPass = generateString1(8)

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(AgentPass, saltRounds)



        let orgName = findOrg.name;

        const { name, email, phone, agentCode, country, address, city, postCode, transectionLimit, password, organisationID,
            Addsubagent, performPayOut, cancelTarnsection, approveTransection, createdigitalID, cashierapprove, commisionType, commissionAmount } = data

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter OrganisationID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Organisation ID" })
        }

        if (!name) {
            return res.status(200).send({ status: false, msg: "Please enter name" })
        }
        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })
        }
        let checkemail = await agentModel.findOne({ email: email })

        if (checkemail) {
            return res.status(200).send({ status: false, msg: "Email already register try Unique email" })
        }
        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phonne number" })
        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let chechphone = await agentModel.findOne({ phone: phone })
        if (chechphone) {
            return res.status(200).send({ status: false, msg: "Phone number already register please try unique number" })
        }

        if (!country) {
            return res.status(200).send({ status: false, msg: "Please enter country" })
        }
        if (!address) {
            return res.status(200).send({ status: false, msg: "Please enter address" })
        }
        if (!city) {
            return res.status(200).send({ status: false, msg: "Please enter city" })
        }
        if (!postCode) {
            return res.status(200).send({ status: false, msg: "Please enter postCode" })
        }
        if (!transectionLimit) {
            return res.status(200).send({ status: false, msg: "Please enter transectionLimit" })
        }

        let agentData = {

            name: name,
            email: email,
            password: encryptedPassword,
            phone: phone,
            agentCode: AgentCode,
            country: country,
            address: address,
            city: city,
            postCode: postCode,
            transectionLimit: transectionLimit,
            organisationID: orgID,
            agentBy: orgID,

            role: {
                Addsubagent: Addsubagent,
                performPayOut: performPayOut,
                cancelTarnsection: cancelTarnsection,
                approveTransection: approveTransection,
                createdigitalID: createdigitalID,
                cashierapprove: cashierapprove
            }
        }


        const nodemailer = require("nodemailer");


        const sentEmail = async (req, res) => {

            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',
                }
            });


            var mailOptions = {
                from: 'chrmepay123@gmail.com',
                to: 'sumit.hariyani2@gmail.com',
                subject: 'Agent Register',
                text: `Hello ${name}! congratulation now you are part of ${orgName} family, your username ${email} & your password ${AgentPass}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });
        }
        sentEmail();




        let create = await agentModel.create(agentData)

        let obj = {
            agentID: create._id,
            type: commisionType,
            Amount: commissionAmount,
            startDate: create.createdAt,
        }

        let createCommissiin = await agent_Commission.create(obj)

        return res.status(200).send({ status: true, msg: "Agent Register sucessfully", data: create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const viewAgent = async (req, res) => {
    try {

        const orgID = req.OrganisationID;
        console.log("orgID===>", orgID)
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }
        const { page = pageNO, limit = 10 } = req.query;
        if (Object.keys(req.body).length <= 1) {
            console.log("1")
            let countpages1 = await agentModel.find({ organisationID: orgID, isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;

            let filter = await agentModel.find({ organisationID: orgID, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }
        else if (req.body.name || req.body.phone || req.body.agentCode || req.body.country) {
            console.log("2")
            let option = [{ name: req.body.name }, { phone: req.body.phone }, { country: req.body.country }, { agentCode: req.body.agentCode }]
            let countpages2 = await agentModel.find({ $or: option, organisationID: orgID })
            let contRow = countpages2.length
            let filter = await agentModel.find({ $or: option, organisationID: orgID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const deleteAgent = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.OrganisationID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter AgentID" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }



        let checkUser = await agentModel.findOne({ _id: agentID, organisationID: orgID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No agent Found" })
        }


        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person to un-suspend this agent" })
        }


        if (checkUser.isDeleted == 1) {
            return res.status(200).send({ status: 1, msg: "Agent Already deleted" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { isDeleted: 1, DeletedBy: orgID }, { new: true })

            return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })
        }




    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Delete Agent",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/deleteAgent/:agentID/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const agentsuspend = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.OrganisationID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter Agent" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting org id" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agent ID" })
        }

        let checkUser = await agentModel.findOne({ _id: agentID, organisationID: orgID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No agent Found" })
        }

        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person, to suspend this agent" })
        }


        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Agent Already Bolcked" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { blocked: 1, blockedBY: agentID }, { new: true })

            return res.status(200).send({ status: true, msg: "Agent Block Sucessfully" })
        }

    } catch (error) {
        // let obj = {
        //     IP: ip.address(),
        //     description: error,
        //     api: "Suspend Agent",
        //     apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/agentSusupend/:agentID/:orgID"
        // }
        // let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}



const unSuspendagent = async (req, res) => {
    try {

        const agentID = req.params.agentID;
        const orgID = req.OrganisationID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter AgentID" })
        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let checkUser = await agentModel.findOne({ _id: agentID, organisationID: orgID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No agent Found" })
        }


        if (checkUser.organisationID != orgID) {
            return res.status(200).send({ status: false, msg: "you are not authorized person to un-suspend this agent" })
        }


        if (checkUser.blocked == 0) {
            return res.status(200).send({ status: 1, msg: "Agent Already Unbolcked" })
        }

        if (checkUser.organisationID == orgID) {
            let BlockUser = await agentModel.findOneAndUpdate({ _id: agentID }, { blocked: 0 }, { new: true })

            return res.status(200).send({ status: true, msg: "Agent Un-block Sucessfully" })
        }






    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Un-suspend Agent",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/agentSusupend/unSuspendagent/:agentID/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}



const blockedAgent = async (req, res) => {
    try {

        const orgID = req.OrganisationID;
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }
        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }
        const { page = pageNO, limit = 10 } = req.query;
        if (Object.keys(req.body).length <= 1) {
            console.log("1")
            let countpages1 = await agentModel.find({ organisationID: orgID, blocked: 1 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;

            let filter = await agentModel.find({ organisationID: orgID, blocked: 1 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }
        else if (req.body.name || req.body.phone || req.body.agentCode || req.body.country) {
            console.log("2")
            let option = [{ name: req.body.name }, { phone: req.body.phone }, { country: req.body.country }, { agentCode: req.body.agentCode }]
            let countpages2 = await agentModel.find({ $or: option, organisationID: orgID, blocked: 1 })
            let contRow = countpages2.length
            let filter = await agentModel.find({ $or: option, organisationID: orgID, blocked: 1 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

const Agent_dash_main = async (req, res) => {
    try {
        const agentID = req.params.agentId;
        const orgId = req.OrganisationID;
        let finduser = await cutomerModel.find({ createdBY: agentID }).sort({ createdAt: -1 }).limit(5);
        let findTrans = await transectionModel.find().limit(5).sort({ createdAt: -1 })
        let findNoOfuser = await cutomerModel.find({ createdBY: agentID }).count()
        let findLicenseFees = await License_fee.findOne({ OrganisationID: orgId }).select({ recuuringFees: 1, perLicenseFee: 1 });
        let findLoanApplication = await Loan_applay_customer.find({ agentID: agentID }).count();
        let findCust = await cutomerModel.find({ organisation: agentID, isDeleted: 0 })
        let totalCust = findCust.length;
        let findorg = await org_Licenses.findOne({ OrganisationID: orgId })
        let totalTrans = await cutomerModel.find({ createdBY: agentID }).distinct('_id')
        let ToatlTrans = await transectionModel.find({ senderID: totalTrans })
        let agentProfile = await agentModel.findOne({ _id: agentID })
        // let IIDD = mongoose.Schema.Types.ObjectId(agentID)
        let findCommission = await agent_commission.findOne({agentID : agentID}).select({Amount : 1, _id : 0})
        var sending = 0
        var recive = 0


        for (let i of ToatlTrans) {
            sending += i.sendingAmount
        }
        for (let i of ToatlTrans) {
            recive += i.receiverAmount
        }

        let amount = sending + recive


        console.log("findorg", findorg)
        let totalLicense = findorg.totalLicenses
        let remaning_Licenses = totalLicense - totalCust
        let commissionamount = parseInt(findCommission.Amount)
        let NoOfTrans = ToatlTrans.length

        console.log("====>",findCommission)

        return res.status(200).send({ status: true, findNoOfuser, findLicenseFees, findLoanApplication, totalCust, remaning_Licenses, commissionamount, NoOfTrans,totalTrasections: amount, agentProfile, finduser, findTrans })
    } catch (error) {
        // let obj = {
        //     IP: ip.address(),
        //     description: error,
        //     api: "organization get Employee Roles",
        //     apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_employee_roles/:employeeID"
        // }
        // let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const registerAdmin = async (req, res) => {
    try {

        const data = req.body;
        const orgID = req.OrganisationID;
        const { firstName, lastName, Image, email, address, city,phone, addCustomer, deletCustomer, blockCustomer, registerEmployee } = data

        if (!firstName || !lastName || !Image || !email || !req.body.phone || !address || !city) {
            return res.status(200).send({ status: false, msg: "Please fill all fields" })
        }

        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
        let obj = {
            ...data,
            organization: orgID,
            phone : convert_Number

        }

       

      

        console.log(obj)

        let create = await AdminController.create(obj)
        let roles = {
            addCustomer: addCustomer,
            deletCustomer: deletCustomer,
            blockCustomer: blockCustomer,
            registerEmployee: registerEmployee,
            AdminID :  create._id
        }
        let register_roles = await Adminroles.create(roles)
        console.log(create)
        if (create) {
            return res.status(200).send({ status: false, msg: "Admin Register Sucessfully", create, register_roles })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "server error" })
    }
}

const viewAdmins = async (req, res) => {
    try{
        
        let data = req.body;
        const {adminID, phone} = data
        let pageNO = req.body.page;
        
        if (pageNO == 0) {
            pageNO = 1;
        }
        const { page = pageNO, limit = 10 } = req.query;

       
        if(!adminID && !phone){
            let totalRow = await AdminController.find().count()
            let findadmin = await AdminController.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
            return res.status(200).send({ status: true , currentPage : pageNO,totalRow, data : findadmin})

        }

        let options = [{_id : req.body.adminID}, {phone : req.body.phone}]
        let totalRow = await AdminController.find({$or : options, isBlocked : 0, isDeleted : 0}).count()
        let findAdmin = await AdminController.find({$or : options, isBlocked : 0, isDeleted : 0}).limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        
        return res.status(200).send({ status: true , currentPage : pageNO,totalRow, data : findAdmin})
        


    }catch(error){
        console.log(error)
        return res.status(200).send({ status: false, msg: "server error" })
    }
}


const get_emaployees = async (req, res) => {
    try {
        
        let orgID = req.OrganisationID;


        let pageNO = req.body.page;
        console.log("---->",pageNO)
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting org id" })
        }

        let find1 = await org_employee.find({ organisation_id: orgID })
        let contRow = find1.length
        let find = await org_employee.find({ organisation_id: orgID }).sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), find })

    } catch (error) {
        // let obj = {
        //     IP: ip.address(),
        //     description: error,
        //     api: "organization get Employee",
        //     apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_emaployees/:token"
        // }
        // let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, mg: error.message })
    }
}

module.exports = { createAgent, viewAgent, deleteAgent, agentsuspend, unSuspendagent, blockedAgent, Agent_dash_main, registerAdmin, viewAdmins, get_emaployees }