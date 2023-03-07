const adminModel = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const logHistory = require("../models/adminLogHistory");
const { findOne } = require("../models/transaction");
const adminLogHistory = require("../models/adminLogHistory")

const Organisation = require("../models/Organisation")
const customerModel = require("../models/customer")
const BlockIP = require("../models/blockedIPs")
const transactionModel = require("../models/transaction");
const BlockIPModel = require("../models/blockedIPs");
const transectionModel= require("../models/transaction")
var ip = require('ip');
const { findOneAndUpdate } = require("../models/Organisation");
const AgentModel = require("../models/AgentModel");
const userModel = require("../models/userModel");
const sub_Admin_Role = require("../models/subAdminRole")
const subAdmin = require("../models/AdminModel")
const sub_admin_role = require("../models/subAdminRole")
const temp_Cust = require("../models/temp_Cust")
const axios = require('axios')
const { uploadFile } = require("../aws/aws.js");
const agentModel = require("../models/AgentModel");
const License_fee = require("../models/org_LicensesFees")
const org_Licenses = require("../models/OrgLicenses");
const { required } = require("joi");
const org_Doc = require("../models/org_document");
const admin_Email_request = require("../models/adminEmail")
const customer_Bank = require("../models/customerBank")
const agent_Commission = require("../models/agentCommission")
const bankModel = require("../models/customerBank")
const bcrypt = require("bcrypt")
const Org_logs = require("../models/Organisationlog")
const aget_logs = require("../models/AgentLogHis")
const api_his = require("../models/apiHistory")
const Lons_Model = require("../models/Loan_apllied_by")
const moment = require("moment")
const licenses_Model = require("../models/OrgLicenses")
const admin_agent = require("../models/adminAgent")




const adminAgent = async (req, res) => {
    try {

        let adminID = req.params.adminID;
        let data = req.body;

        const { firstName, lastName, email, phone, createdBy, city, state, country, password, confirmPass, commisionType, commissionAmount } = data

        let findadmin = await adminModel.findOne({ _id: adminID })

        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }


        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        if (!firstName) {
            return res.status(200).send({ status: false, msg: "Please enter first name" })
        }

        if (!lastName) {
            return res.status(200).send({ status: false, msg: "Please enter last name" })
        }
        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email name" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enterphone" })
        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let checkEmail = await admin_agent.findOne({ email: email })

        if (checkEmail) {
            return res.status(200).send({ status: false, mag: "email already register" })
        }

        let checkPhone = await admin_agent.findOne({ phone: phone })
        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "phone already register" })
        }



        if (!city) {
            return res.status(200).send({ status: false, msg: "Please enter city name" })
        }

        if (!state) {
            return res.status(200).send({ status: false, msg: "Please enter state name" })
        }

        if (!country) {
            return res.status(200).send({ status: false, msg: "Please enter country name" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })
        }

        if (!confirmPass) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (password !== confirmPass) {
            return res.status(200).send({ status: true, msg: "Please enter confirm password" })
        }

        let obj = {

            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            createdBy: adminID,
            city: city,
            state: state,
            country: country,
            password: password

        }

        let create = await admin_agent.create(obj)

        let obj1 = {
            agentID: create._id,
            type: commisionType,
            Amount: commissionAmount,
            startDate: create.createdAt,



        }

        let createCommissiin = await agent_Commission.create(obj1)

        return res.status(200).send({ status: true, msg: "Agent register sucessfully", data: create })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------view-admin_agent------------------------------------------------------------------------------

const viewAdminAgent = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findAgents1 = await admin_agent.find()


        let totlaRow = findAgents1.length

        let findAgents = await admin_agent.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: findAgents })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//------------------------------------------update-admin-agents-------------------------------------------------------------------------

const updateAdminAgent = async (req, res) => {
    try {

        let data = req.body

        const AgentID = req.params.agentID

        if (!AgentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (AgentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid " })
        }

        const { firstName, lastName, email, phone, createdBy, city, state, country, password, confirmPass } = data

        let obj = {
            firstName: firstName, lastName: lastName, email: email, phone: phone,
            city: city, state: state,
            country: country, password: password
        }


        let findAgent = await admin_agent.findOneAndUpdate({ _id: AgentID }, obj, { new: true })

        if (!findAgent) {
            return res.status(200).send({ status: true, msg: "process failed pleas try agian" })

        }

        return res.status(200).send({ status: true, msg: "agent updated sucessfully", findAgent })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------dlete-agent----------------------------------------------------------------------------

const deleteAgent = async (req, res) => {
    try {

        const AgentID = req.params.agentID

        if (!AgentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (AgentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid " })
        }

        let deleteAgent = await admin_agent.findOneAndUpdate({ _id: AgentID }, { isDeletd: 1 })

        if (!deleteAgent) {
            return res.status(200).send({ status: false, msg: "Failed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "agent deleted succesfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------admin-agents-blocked-lists-----------------------------------------------------------------

const blockedAgentsList = async (req, res) => {
    try {


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findCust11 = await admin_agent.find({ blocked: 1 })

        let totalRow = findCust11.length


        let find = await admin_agent.find({ blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), find })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "" })
    }
}


//================================================================AgentDash====

const agentDash = async (req, res) => {

    try {

        const agentID = req.params.agentID;


        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        let findagent = await agentModel.findOne({ _id: agentID })

        let image = findagent.image
        let agentName = findagent.name;
        let email = findagent.email
        let mobile = findagent.phone
        let country = findagent.country

        //======================================total=transection====

        let findAgentUsers = await customerModel.find({ createdBY: agentID })

        let data = []
        for (let i of findAgentUsers) {
            data.push(i._id)
        }


        let findtrans = await transectionModel.find({ senderID: data })

        let totalTransection = 0
        for (let i of findtrans) {
            totalTransection += i.sendingAmount
        }



        //------------


        let data1 = []
        for (let i of findAgentUsers) {
            data1.push(i._id)
        }

        let findtrans1 = await transectionModel.find({ recieverID: data1 })

        let receive = 0
        for (let i of findtrans1) {
            receive += i.sendingAmount
        }

        let totalAmount = totalTransection + receive



        let NumberOFUser = findAgentUsers.length

        //====================================================================================================

        return res.status(200).send({ status: true, NumberOFUser: NumberOFUser, image: image, agentName: agentName, email: email, country: country, mobile: mobile, totalTransection: totalAmount })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------Agent-Performane-reports---------------------------------------------------------------------------

const agentPerformanceReport = async (req, res) => {
    try {

        const agentID = req.params.agentID
        // console.log("==>", agentID)

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter " })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid ID" })
        }


        const LastMonthData = await customerModel.aggregate([
            {
                $match: {
                    createdBY: agentID,
                    $expr: {
                        $and: [
                            {
                                "$eq": [
                                    {
                                        $month: "$createdAt"
                                    },
                                    {
                                        $month: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$eq": [
                                    {
                                        $year: "$createdAt"
                                    },
                                    {
                                        $year: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
        )



        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const Current_Month = await customerModel.find({
            $and: [

                {
                    createdAt: {
                        $gte: startOfCurrentMonth,
                        $lt: startOfNextMonth
                    },
                    createdBY: agentID
                },
            ],
        }).count();



        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()


        if (perDayLastMonth > perDayCurrMonth) {


            let positive1 = `-${perDayLastMonth - perDayCurrMonth}`
            let positive = parseFloat(positive1)
            let nextMonthTarget = positive1 * 30
            let nexttarget1 = nextMonthTarget + Last_Month
            let nexttarget = Math.ceil(nexttarget1)
            if (nexttarget <= 0) {
                nexttarget = 100
            }


            return res.status(200).send({ status: true, positive, nexttarget, Current_Month, Last_Month, Today_date })

        } else {
            let positive = perDayCurrMonth - perDayLastMonth
            let nextMonthTarget = positive * 30
            let nexttarget1 = nextMonthTarget + Last_Month
            let nexttarget = Math.ceil(nexttarget1)
            return res.status(200).send({ status: true, positive, nexttarget, Current_Month, Last_Month, Today_date })
        }


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------recent-users---------------------------------------------------------------------------------


const recentAgentUser = async (req, res) => {
    try {

        const agentID = req.params.ID

        let findUser = await customerModel.find({ createdBY: agentID }).select({ fullname: 1, phone: 1, email: 1, dateOfBirth: 1, status: 1 })

        let users = findUser.length
        let result = [];
        let totalTransection = 0

        let tt = [];

        for (let i of findUser) {

            let findTransection = await transectionModel.find({ senderID: i._id })

            for (i of findTransection) {
                tt.push(i)
            }

            for (let j of findTransection) {
                totalTransection += j.sendingAmount
            }

        }
        let NumberOfTransection = tt.length
        let totalCustomer = findUser.length

        let final = findUser.slice(Math.max(findUser.length - 3, 0))
        return res.status(200).send({ status: true, totalTransection, NumberOfTransection, totalCustomer: totalCustomer, final })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//-------------------------------------agent-reports-----------------------------------------------------------------------------------

const AgentReport = async (req, res) => {
    try {

        let pageNO = req.body.page;

        if (pageNO == 0) {
            pageNO = 1;
        }


        const { page = pageNO, limit = 10 } = req.query;
        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await agentModel.find({ isDeleted: 0 }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;

            let filter = await agentModel.find({ isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }
        else if (req.body.name || req.body.phone || req.body.agentCode || req.body.country) {
            let option = [{ name: req.body.name }, { phone: req.body.phone }, { country: req.body.country }, { agentCode: req.body.agentCode }]


            let countpages2 = await agentModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await agentModel.find({ $or: option }).sort({ createdAt: -1 })
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

//------------------------------------------update-transection-limit----------------------------------------------------------------------

const updateAgentTransection = async (req, res) => {
    try {

        const agentID = req.body.agentID;
        const limit = req.body.limit;




        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            let customerRole = findRole.Agent.updateAgent

            if (customerRole == 0) {
                return res.status(200).send({ status: false, msg: "You are not allow to update transaction limit, Contact admin to access update transaction limit" })

            }

        }



        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting agent ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agent ID" })
        }

        let findAgent = await AgentModel.findOne({ _id: agentID })

        if (!findAgent) {
            return res.status(200).send({ status: false, msg: "no agent found" })
        }

        if (findAgent.blocked == 1) {
            return res.status(200).send({ status: false, msg: "agent is blocked" })
        }

        if (findAgent.isDeleted == 1) {
            return res.status(200).send({ status: false, msg: "no agent found" })
        }


        let upadteAgent = await AgentModel.findOneAndUpdate({ _id: agentID }, { transectionLimit: limit })

        if (!upadteAgent) {
            return res.status(200).send({ staus: false, msg: "limit update process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "limit update sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------admin-email-request-By-agent---------------------------------------------------------------------

const agentEmailRequest = async (req, res) => {
    try {
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }
        const { page = pageNO, limit = 10 } = req.query;


        let findrequests1 = await admin_Email_request.find({ By: 'Agent' })
        let findrequests = await admin_Email_request.find({ By: 'Agent' }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        let contRow = findrequests1.length

        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findrequests })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



const createAdmin = async (req, res, next) => {
    try {
        url = "http://localhost:3000/Admin";
        //next();
        const data = req.body

        const { name, email, password, lastName, phone, address, country, state, city, postCode } = data;


        if (!email) {
            return res.status(400).send({ status: false, msg: "Please enter name" });
        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(password, saltRounds)



        if (!password) {
            return res.status(400).send({ status: false, msg: "Please enter name" });
        }

        let obj = {
            Firstname: name,
            email: email,
            password: encryptedPassword,
            lastName: lastName,
            phone: phone,
            address: address,
            country: country,
            state: state,
            city: city,
            postCode: postCode,
        }

        let create = await adminModel.create(obj)
        //next();
        return res.status(201).send({ status: true, msg: "data created", data: create });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, error: error });
    }
}

//-------------------------------------------Get-Admin-Login-History--------------------------------------------------------//

const getHistory = async (req, res, next) => {
    try {

        //----------------------------Pagination------------------------------------------------------------//
        url = "http://localhost:3000/getAdminHistory"
        //next();
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await adminLogHistory.find();
        counPages = Math.ceil(countpages11.length / 10)





        let findData = await adminLogHistory.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        let result = [];
        for (items of findData) {
            let data = {
                Name: items.name,
                Email: items.email,
                AdminID: items.UserID,
                Date: items.loginTime.toISOString().substring(0, 10).replace('T', ' '),
                Time: items.loginTime.toISOString().substring(12, 19).replace('T', ' ')

            }
            result.push(data)
        }
        //next();
        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, error: error })
    }
}

//----------------------------------------------Login--------------------------------------------------------------------------------


const AdminLogin = async (req, res) => {
    try {
        url = "http://localhost:3000/adminLogin"

        let email = req.body.email;
        let password = req.body.password;

        if (!email) {
            return res.status(200).send({ 'status': false, 'msg': "enter email" });
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "enter password" });
        }

        let checkEmail = await adminModel.findOne({ email: email });

        if (checkEmail.blocked == 1) {
            return res.status(200).send({ status: false, msg: "You are blocked! Please contact to admin" })
        }

        if (!checkEmail) {
            return res.status(200).send({ status: false, msg: "Please enter valid information" });
        }

        const decryptedPassword = await bcrypt.compare(password, checkEmail.password)

        if (!decryptedPassword) {

            let findAdmindata = await adminModel.findOne({ email: email });
            let UserIP = ip.address()
            let adminID = checkEmail._id

            let findLoginTime = Date.now();

            let logData = {
                email: email,
                UserID: findAdmindata._id,
                loginTime: findLoginTime,
                IP: UserIP,
                status: "Please enter valid info",

            }

            let admindata = await adminModel.findOne();
            let currStatus = await adminModel.findOne({ email: email })
            let wrongCount = currStatus.wrongpassword + 1;
            let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: wrongCount })
            let remainingchance = admindata.adminpasswordlimit - update.wrongpassword


            if (update.wrongpassword == admindata.adminpasswordlimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: 0 })

                setTimeout(async () => {
                    let UserIP = ip.address()
                    let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                }, "10000")

                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

            }



            let MakeLogHIstory = await logHistory.create(logData);
            return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
        }

        //---------Login_History-------------//
        let adminID = checkEmail._id
        let admminID = checkEmail._id

        let findLoginTime = Date.now();


        let findAdmindata = await adminModel.findOne({ email: email });

        let UserIP = ip.address()
        let logData = {
            email: email,
            UserID: findAdmindata._id,
            loginTime: findLoginTime,
            IP: UserIP,
            status: "Login sucessfully",


        }

       // let MakeLogHIstory = await logHistory.create(logData);
        let token = jwt.sign({ admminID, email }, 'Admin')
        let update = await adminModel.findOneAndUpdate({ email: email }, { wrongpassword: 0 })
        return res.status(200).send({ status: true, token: token, ID: checkEmail._id, msg: "Login Sucessfully" })
        //-------------------generate-Otp---------------------------------------------------------------
        let otp = 100000 + Math.floor(Math.random() * 900000);



        let collection = {
            name: checkEmail.name,
            email: checkEmail.email,
            password: checkEmail.password,
            otp: otp,
            createdAt: checkEmail.createdAt,
            updatedAt: checkEmail.updatedAt


        }

        let create = await adminModel.findOneAndUpdate({ email: email }, collection)

        const nodemailer = require("nodemailer");




        const sentEmail = async (req, res) => {
            //var email = req.email;
            //var otp = req.otp;


            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'chrmepay123@gmail.com',
                    pass: 'jgiplcgrbddvktkl',
                    // user: 'donotreply@d49.co.in',
                    //   pass: '&4e=XSQB'
                }
            });


            var mailOptions = {
                from: 'chrmepay123@gmail.com',
                to: 'sumit.hariyani2@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'your OTP is " ' + otp + ' " do not share this otp'
                // text : otp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });



        }

        sentEmail();

        let ID = adminID.toString();


        // return res.status(200).send({ status: true, ID: '654', msg: " OTP Send Sucessfully" });



    } catch (error) {
        console.log(error);
    }
}


//---------------------------------------Verify-User-OTP---------------------------------------------------------------------------------------//

const verifyOTP = async (req, res) => {
    try {

        const OTP = req.body.OTP;

        let admminID = req.params.ID


        if (!OTP) {
            return res.status(200).send({ status: false, msg: "Please Enter OTP" })
        }

        let findOTP = await adminModel.findOne({ _id: admminID });

        if (!findOTP) {
            return res.status(200).send({ status: false, msg: "User Not Found" })
        }

        if (findOTP.otp != OTP) {

            let admindata = await adminModel.findOne();
            let currStatus = await adminModel.findOne({ _id: admminID })
            let wrongCount = currStatus.wrongOTP + 1;
            let update = await adminModel.findOneAndUpdate({ _id: admminID }, { wrongOTP: wrongCount })
            let remainingchance = admindata.adminotplimit - update.wrongOTP

            if (update.wrongOTP >= admindata.adminotplimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await adminModel.findOneAndUpdate({ _id: admminID }, { wrongOTP: 0 })
                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please contact to our team" })
            }
            return res.status(200).send({ status: false, msg: `Invalid OTP remaining chances ${remainingchance}` })
        }

        let email = findOTP.email
        let name = findOTP.name
        let token = jwt.sign({ name, admminID, email }, 'Admin')

        let update = await adminModel.findOneAndUpdate({ _id: admminID }, { wrongOTP: 0 })
        return res.status(200).send({ status: true, token: token, ID: admminID, msg: "OTP Verify Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}

///////////////////////////////////////////////////admin_login//////////////////////////////////////////////////////////////////////////////////////////////

const admin_login = async (req, res) => {
    try {
        let email = req.body.email;
        let pass = req.body.pass;
        let token = gen_str(99);

        adminModel.findOneAndUpdate({ email, pass }, { $set: { token } }, (error, data) => {
            if (error) { console.log("test errors is == ", error); return res.status(200).send({ 'status': false, 'msg': "Something went wrong please try again", 'body': '' }); }

            if (data) { data.token = token; return res.status(200).send({ 'status': true, 'msg': "success", 'body': data }); } else {

                res.status(200).send({ 'status': false, "msg": "Invalid User ", 'body': '' });
            }



        });



    } catch (error) {
        res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

}


const suspendCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;

        const adminID = req.params.adminID

        let findsubAdminID = await adminModel.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {


                let customerRole = findRole.customer.blockCustomer

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to block customer, Contact admin to access block customer" })

                }
            }

        }



        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        let checkUser = await customerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: 1, msg: "Customer Already Bolcked" })
        }



        let BlockUser = await customerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

        return res.status(200).send({ status: 1, msg: "Customer Block Sucessfully" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}
//--------------------------un-Suspend-Customer---------------------------------------------------------------------------------------------

const UnsuspendCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;
        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })
            if (findRole) {
                let customerRole = findRole.customer.unBlockCustomer
                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to unblocke customer, Contact admin to access block customer" })

                }
            }
        }


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


//----------------------------------------------DeleteCustomer-----------------------------------------------------------------------------//
const DeleteCustomer = async (req, res) => {
    try {

        const customerID = req.params.ID
        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "please enter admin ID" })
        }


        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })
            let customerRole = findRole.customer.deleteCustomer
            if (customerRole == 0) {
                return res.status(200).send({ status: false, msg: "You are not allow to unblocke customer, Contact admin to access block customer" })
            }
        }



        if (!customerID.length) {
            return res.status(200).send({ status: false, msg: "Customer Id is required" })
        }

        let findCUstomer = await customerModel.findOne({ _id: customerID })
        if (!findCUstomer) {
            return res.status(200).send({ status: false, msg: "Customer not found" })
        }

        if (findCUstomer.isDeleted == 1) {
            return res.status(200).send({ Status: false, msg: "Customer already deleted" })
        }

        let update = await customerModel.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//----------------------------------Admin-Test-Filter-Data-Customer----------------------------------------------------------------------------



const AdminCustomerList = async (req, res) => {

    try {


        let countpages = await customerModel.find({ isDeleted: 0, blocked: 0, }).sort({ createdAt: -1 })
        let totlaRow = countpages.length

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter1 = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();


            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status

                }
                filter.push(filter2)

            }

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality || req.body.status) {
            let option = [{ nationality: req.body.nationality }, { status: req.body.status }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter1 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter1.length;


            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status

                }
                filter.push(filter2)

            }


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {



            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }, {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter1 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter1.length;

            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status

                }
                filter.push(filter2)

            }


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }

        else if (req.body.ID.length <= 0 && req.body.phone.length <= 0 && req.body.phone.length <= 0 && req.body.status.length <= 0 && req.body.nationality.length <= 0 && req.body.fromDate.length <= 0 && req.body.toDate.length <= 0) {
            let countpages2 = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter1 = await customerModel.find({ isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter1.length;

            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status

                }
                filter.push(filter2)

            }


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }


        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter1 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter1.length;

            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status

                }
                filter.push(filter2)

            }


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        } else if (req.body.ID.length > 2) {


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter1 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter1.length;


            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status

                }
                filter.push(filter2)

            }


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }


        else {




            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await customerModel.find({ $or: option, blocked: 0, status: "verified" })
            let contRow3 = countpages3.length

            let filter1 = await customerModel.find({ $or: option, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totlaRow = filter1.length;

            let filter = []
            for (let i of filter1) {


                let org_id = i.organisation.shift()
                let find_org = await Organisation.findOne({ _id: org_id })
                let org_name = find_org.name




                let filter2 = {
                    _id: i._id,
                    IDphoto: i.IDphoto,
                    fullname: i.fullname,
                    dateOfBirth: i.dateOfBirth,
                    phone: i.phone,
                    city: i.city,
                    age: i.age,
                    email: i.email,
                    gender: i.gender,
                    nationality: i.nationality,
                    hash: i.hash,
                    owner: i.owner,
                    privateKey: i.privateKey,
                    walletAddress: i.walletAddress,
                    professoin: i.professoin,
                    address: i.address,
                    organisation: i.organisation,
                    createdBY: i.createdBY,
                    imageDescriptions: i.imageDescriptions,
                    Latitude: i.Latitude,
                    Longitude: i.Longitude,
                    digitalrefID: i.digitalrefID,
                    residance: i.residance,
                    locaDocument: i.locaDocument,
                    landRegistration: i.landRegistration,
                    landSize: i.landSize,
                    digitalID: i.digitalID,
                    nextFOKniPhone: i.nextFOKniPhone,
                    nextFOKinName: i.nextFOKinName,
                    assetType: i.assetType,
                    assetID: i.assetID,
                    assetAddress: i.assetAddress,
                    assetLongitude: i.assetLongitude,
                    assetLatitude: i.assetLatitude,
                    password: i.password,
                    facialIdentification: i.facialIdentification,
                    biometric: i.biometric,
                    organisation_name: org_name,
                    status: i.status
                }
                filter.push(filter2)

            }


            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })



        }



    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

// const createCustomerByAdmin = async (req, res, next) => {
//     try {
//         url = "http://localhost:3000/customer";
//         let data = req.body;
//         let files = req.files
//         let recidence = req.files
//         let localDoc = req.files
//         let ladregistration = req.files
//         let ID = req.params.ID;

//         let findsubAdminID = await subAdmin.findOne({ _id: ID })

//         if (findsubAdminID) {
//             let findRole = await sub_admin_role.findOne({ adminID: ID })

//             if (findRole) {

//                 let customerRole = findRole.customer.addCustomer

//                 if (customerRole == 0) {
//                     return res.status(200).send({ status: false, msg: "You are not allow to add customer, Contact admin to access add customer" })
//                 }
//             }
//         }


//         if (Object.values(ID).length < 2) {
//             return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
//         }


//         const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
//             Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data



//         //------------------------------------Manage-Linked-service----------------------------------------------------------------------

//         let trim = phone.replaceAll(' ', '')
//         let remove_character = trim.replace('-', '')
//         let convert_Number = parseInt(remove_character)

//         const cheack_cus = await temp_Cust.findOne({ phone: convert_Number })




//         if (cheack_cus) {
//             return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
//         }


//         //---------------------------------------------------------------------------------------------------------------------------------





//         let findcust = await customerModel.find({ organisation: organisation })
//         let findOrg = await org_Licenses.findOne({ OrganisationID: organisation })

//         if (findOrg.totalLicenses <= findcust.length) {
//             return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update your licenses" })

//         }

//         if (!data)
//             return res.status(200).send({ status: false, msg: "please enter data" })
//         //next();

//         if (!fullname) {
//             return res.status(200).send({ status: false, msg: "Please enter Full Name" })
//         }

//         if (!dateOfBirth) {
//             return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
//         }

//         if (!phone) {
//             return res.status(200).send({ status: false, msg: "Please enter phone" })
//         }

//         let checkPhone = await temp_Cust.findOne({ phone: convert_Number })


//         if (checkPhone) {
//             return res.status(200).send({ status: false, msg: "Number already register" })
//             //next();
//         }


//         if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
//             return res.status(200).send({ status: false, msg: "Please enter valid email" })
//         }

//         let checkEmail = await temp_Cust.findOne({ email: data.email })

//         if (checkEmail) {
//             return res.status(200).send({ status: false, msg: "Email is already register" })
//         }


//         if (!gender) {
//             return res.status(200).send({ status: false, msg: "Please enter gender" })

//         }

//         const profilePicture = await uploadFile(files[0])
//         const residace = await uploadFile(recidence[1])
//         const local = await uploadFile(localDoc[2])
//         const land = await uploadFile(ladregistration[3])




//         async function doPostRequest() {

//             let payload = {
//                 "data": {
//                     "name": `${fullname}`,
//                     "age": `${age}`,
//                     "city": `${city}`,
//                     "email": `${email}`
//                 },
//                 "phoneNumber": `+${convert_Number}`
//             }

//             console.log("payload", payload)


//             let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
//             let data1 = res.data;

//         }

//         doPostRequest();


//         var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()




//         let collection = {
//             IDphoto: profilePicture, fullname: fullname,
//             dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
//             email: email, gender: gender, nationality: nationality,
//             professoin: professoin, address: address, Latitude: Latitude,
//             Longitude: Longitude, organisation: organisation,
//             status: status, createdBY: ID, createdBY: ID,
//             nextFOKinName: nextFOKinName,
//             nextFOKniPhone: nextFOKniPhone,
//             landSize: landSize,
//             residance: residace,
//             locaDocument: local,
//             landRegistration: land,
//             digitalrefID: seq,
//             assetType: assetType, assetID: assetID,
//             assetAddress: assetAddress, assetLongitude: assetLongitude,
//             assetLatitude: assetLatitude


//         }

//         let create = await temp_Cust.create(collection)

//         return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ status: false, message: error })
//     }
// }

//-------------------------------------------------BlockedIDS----------------------------------------------------------------------------------


const blockedIDS = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findBlockedIDs1 = await customerModel.find({ blocked: 1 })
        let totlaRow = findBlockedIDs1.length

        let findBlockedIDs = await customerModel.find({ blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let totalRaow1 = findBlockedIDs.length;

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), data: findBlockedIDs })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------------customer-detail-dash--------------------------------------------------------------------------

const custdetail = async (req, res) => {
    try {

        const custID = req.params.custID


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

//----------------------------------------------customer-verify------------------------------------------------------------------

const customerVerify = async (req, res) => {
    try {

        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })



        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.customer.approveDID

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to verify customer, Contact admin to access verify customer" })

                }
            }

        }

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

//--------------------------------------------all-DIDs-------------------------------------------------------------------------------------


const getAllDIDs = async (req, res) => {
    try {


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let findCust12 = await customerModel.find({ "digitalID": { "$nin": [null, ""] } })

        let findDIDs11 = await customerModel.find({ "digitalID": { "$nin": [null, ""] } }).select({ _id: 1, fullname: 1, dateOfBirth: 1, email: 1, digitalID: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();




        let totalRaow1 = findCust12.length;


        return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), data: findDIDs11 })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ Status: false, msg: error.message })
    }
}


//-------------------------------------update-digitalID----------------------------------------------------------------------------------------

const updateDigitalID = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "not getting customer ID" })
        }

        if (custID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid custID" })
        }



        const adminID = req.params.adminID

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid admin ID" })
        }

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.customer.approveDID

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to block customer, Contact admin to access block customer" })

                }

            }

        }


        let findCustomer = await customerModel.findOne({ _id: custID })

        if (!findCustomer) {
            return res.status(200).send({ status: false, msg: "not found customer" })
        }

        if (!findCustomer.owner) {
            return res.status(200).send({ status: false, msg: "Customer not have owner key" })
        }

        let custOwnerKey = findCustomer.owner;


        async function getID() {

            try {
                const Ownwe_key = '0x12734821a5B2be1D204fEdb3e986a6d149772a6B'

                var result11 = []
                let result = await axios.get(`http://13.127.64.68:7008/api/mainnet/getDigitalIdOfOwner/${custOwnerKey}`)

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
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}




//===============================================================OrganisationAddByAdmin====================================================
//-----------------------------------generate Code---------------------------------------------------------------------------------------

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//--------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------generate-Organisation-Password---------------------------------------------------------------------------------------

const characters1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString1(length) {
    let result = '';
    const charactersLength = characters1.length;
    for (let i = 0; i < length; i++) {
        result += characters1.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//------------------------------------generate-accessKey-----------------------------------------------------------------------------------------

const AccessKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateAccesskey(length) {
    let result = '';
    const charactersLength = AccessKey.length;
    for (let i = 0; i < length; i++) {
        result += AccessKey.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------generate-Sceret-Key-----------------------------------------------------------------------------------------

const SecretKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/#@';

function generateSeceret(length) {
    let result = '';
    const charactersLength = SecretKey.length;
    for (let i = 0; i < length; i++) {
        result += SecretKey.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------



const createOrganisation = async (req, res, next) => {
    try {
       // url = "http://localhost:3000/Organisation";
        // next();
        let data = req.body;
        let files = req.files;
        const adminID = req.params.adminID

        console.log("test db")

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid admin ID" })
        }

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.Organisation.addOrganisation

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to add organisation, Contact admin to access add organisation" })

                }

            }

        }




        const { logo, code, name, phone, email, country, city, joiningDate, postCode, address, password, totlaLicense,
            Personal_Loans, secured_Loans, Insatallment_Loans, Student_Loans, Home_Loans, BussinessLoans, PensionLoans,
            PaydeyLoans, AssetLoans, OvercraftLoans } = data


        console.log("password", password)



        let Code = generateString(10);
        let Orgpassword = generateString1(8)
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        let JoiningDate = new Date().toISOString().substring(0, 10)


       // const profilePicture = await uploadFile(files[0])



        if (!name) {
            return res.status(200).send({ status: false, msg: "Please Enter Name" })
        }

        if (!postCode) {
            return res.status(200).send({ status: false, msg: "Please enter postal code" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await Organisation.findOne({ phoneNo: phone })


        if (checkPhone)
            return res.status(200).send({ status: false, msg: "Number already register " })
        //next();

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })

        }

        if (!totlaLicense) {
            return res.status(200).send({ status: false, msg: "Please enter Licenses" })

        }


        // if (!(/^\d{10}$/).test(phone)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid phone number" })
        // }

        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }



        let checkEmail = await Organisation.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }



        const nodemailer = require("nodemailer");

        const AccessKey = generateAccesskey(20)
        const SceretKey = generateSeceret(30)




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
                subject: 'From Chromepay',
                text: ` Hello! ${name} Welcome to ChromePay family your Password for Login is ${password} 
                 your secret Access Key = ${SceretKey} and Your access Key Id = ${AccessKey} do not share this Information to anyone `

            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });

        }
        sentEmail();

        let finalData = {
            logo: "", code: Code, name: name, phoneNo: phone, email: email,
            country: country, city: city, joiningDate: JoiningDate,
            postCode: postCode, address: address, password: encryptedPassword, totlaLicense: totlaLicense, accessKeyId: AccessKey,
            secretAccessKey: SceretKey,
        }

        let create = await Organisation.create(finalData);

        let Loans = {
            OrganisationID: create._id,

            TypeOfLoans: {
                Personal_Loans: Personal_Loans,
                secured_Loans: secured_Loans,
                Insatallment_Loans: Insatallment_Loans,
                Student_Loans: Student_Loans,
                Home_Loans: Home_Loans,
                BussinessLoans: BussinessLoans,
                PensionLoans: PensionLoans,
                PaydeyLoans: PaydeyLoans,
                AssetLoans: AssetLoans,
                OvercraftLoans: OvercraftLoans
            }
        }

        let IntersetRate = {
            OrganisationID: create._id
        }


        let cerate_Interest = await Organisation_Loans_Interestrate.create(IntersetRate)

        let createLoans = await Organisation_Loans.create(Loans)





        let orgID = create._id

        let obj = {
            OrganisationID: orgID,
            name: name,
            totalLicenses: totlaLicense


        }

         let createLicenses = await org_Licenses.create(obj)


        return res.status(201).send({ status: true, msg: "Register Sucessfully", data: create, Loans: createLoans })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

//-----------------------------------------------------Admin-Organisation-List-------------------------------------------------------------------


const OrganisationList = async (req, res) => {

    try {

        const OrganisationID = req.params.ID;
        const CustomerName = req.body.customerName;
        const status = req.body.Status


        let countpages = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        //let currPage = 0
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
            let totalRaow1 = countpages1.length;
            let filter1 = await Organisation.find({ isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // let totlaRow = filter.length;
            if (filter1.length == 0) {
                return res.status(200).send({ status: false, msg: "No Customer Found" })
            }

            let filter = []

            let numbers = 0
            for (let i of filter1) {
                let find_customers = await customerModel.find({ organisation: i._id })

                let numbers = find_customers.length

                let obj = {
                    _id: i._id,
                    logo: i.logo,
                    name: i.name,
                    code: i.code,
                    email: i.email,
                    phoneNo: i.phoneNo,
                    country: i.country,
                    address: i.address,
                    status: i.status,
                    createdAt: i.createdAt,
                    number_of_users: numbers

                }

                filter.push(obj)

            }



            // let obj = {
            //     name
            // }
            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }


        if (req.body.fromDate) {



            let option = [{ status: req.body.status }, {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await Organisation.find({ isDeleted: 0 })
            let contRow = countpages2.length
            let filter1 = await Organisation.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter1.length;


            let filter = []

            let numbers = 0
            for (let i of filter1) {
                let find_customers = await customerModel.find({ organisation: i._id })

                let numbers = find_customers.length

                let obj = {
                    _id: i._id,
                    logo: i.logo,
                    name: i.name,
                    code: i.code,
                    email: i.email,
                    phoneNo: i.phoneNo,
                    country: i.country,
                    address: i.address,
                    status: i.status,
                    number_of_users: numbers

                }

                filter.push(obj)

            }

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else {

            let option = [{ status: req.body.status }]
            let countpages3 = await Organisation.find({ $or: option, isDeleted: 0 })
            let contRow3 = countpages3.length

            let filter1 = await Organisation.find({ $or: option, isDeleted: 0 }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totlaRow = filter1.length;

            let filter = []

            let numbers = 0
            for (let i of filter1) {
                let find_customers = await customerModel.find({ organisation: i._id })

                let numbers = find_customers.length

                let obj = {
                    _id: i._id,
                    logo: i.logo,
                    name: i.name,
                    code: i.code,
                    email: i.email,
                    phoneNo: i.phoneNo,
                    country: i.country,
                    address: i.address,
                    status: i.status,
                    number_of_users: numbers

                }

                filter.push(obj)

            }

            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })



        }



    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

//----------------------------------------------------Blocked-organisation--------------------------------------------------------------------

const blockedOrglist = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        let findBlockedOrg1 = await Organisation.find({ blocked: 1 })

        let totalRow = findBlockedOrg1.length;

        let findBlockedOrg = await Organisation.find({ blocked: 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let totalRaow1 = findBlockedOrg.length;

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), data: findBlockedOrg })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------org-low-License-list--------------------------------------------------------------------------

const findlowLicenseOrganisattions = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        const { page = pageNO, limit = 10 } = req.query;


        let findorg1 = await org_Licenses.find({ totalLicenses: { $lt: 15 } })
        let findorg = await org_Licenses.find({ totalLicenses: { $lt: 15 } }).populate('OrganisationID', { 'logo': 1, 'email': 1, 'phoneNo': 1, 'code': 1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        let contRow = findorg1.length
        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findorg })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const approvalDIDs = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 2 } = req.query;

        if (Object.keys(req.body).length <= 1) {


            let findCust11 = await customerModel.find({ digitalID: null })
            let findCust = await customerModel.find({ digitalID: null }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totalRaow1 = findCust11.length;

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), findCust })

        } else if (req.body.custID) {


            let option = [{ _id: req.body.custID }]

            let findCust11 = await customerModel.find({ $or: option, digitalID: null })
            let findCust = await customerModel.find({ $or: option, digitalID: null }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totalRaow1 = findCust11.length;

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), findCust })


        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//------------------------------list-of-pending-Customer----------------------------------------------------------------------------------

const pendingCust = async (req, res) => {
    try {



        let pageNO = req.body.page;

        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        let findcust1 = await customerModel.find({ status: "pending", isDeleted: 0, blocked: 0 }).sort({ createdAt: -1 })
        let totalRow = findcust1.length
        if (Object.keys(req.body).length <= 1) {


            let findcust = await customerModel.find({ status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })

        }


        let option = [{ digitalrefID: req.body.digitalrefID }]
        let findcust = await customerModel.find({ $or: option, status: "pending", isDeleted: 0, blocked: 0 }).select({ fullname: 1, dateOfBirth: 1, phone: 1, email: 1, status: 1, walletAddress: 1, digitalID: 1, digitalrefID: 1 }).sort({ createdAt: -1 }).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        return res.status(200).send({ status: true, totlaRow: totalRow, currenPage: parseInt(pageNO), findcust })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const createCustomerByAdmin = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID = req.params.ID;

        let findsubAdminID = await subAdmin.findOne({ _id: ID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: ID })

            if (findRole) {

                let customerRole = findRole.customer.addCustomer

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to add customer, Contact admin to access add customer" })
                }
            }
        }


        if (Object.values(ID).length < 2) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
        }


        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data



        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)

        const cheack_cus = await temp_Cust.findOne({ phone: convert_Number })




        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }


        //---------------------------------------------------------------------------------------------------------------------------------





        let findcust = await customerModel.find({ organisation: organisation })
        let findOrg = await org_Licenses.findOne({ OrganisationID: organisation })
        
       if (findOrg.totalLicenses <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update your licenses" })

       }

        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })
        //next();

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        let checkPhone = await temp_Cust.findOne({ phone: convert_Number })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
            //next();
        }


        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await temp_Cust.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }


        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }

        const profilePicture = await uploadFile(files[0])
        const residace = await uploadFile(recidence[1])
        const local = await uploadFile(localDoc[2])
        const land = await uploadFile(ladregistration[3])




        async function doPostRequest() {

            let payload = {
                "data": {
                    "name": `${fullname}`,
                    "age": `${age}`,
                    "city": `${city}`,
                    "email": `${email}`
                },
                "phoneNumber": `+${convert_Number}`
            }

            console.log("payload", payload)


            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;

        }

        doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()




        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: organisation,
            status: status, createdBY: ID, createdBY: ID,
            nextFOKinName: nextFOKinName,
            nextFOKniPhone: nextFOKniPhone,
            landSize: landSize,
            residance: residace,
            locaDocument: local,
            landRegistration: land,
            digitalrefID: seq,
            assetType: assetType, assetID: assetID,
            assetAddress: assetAddress, assetLongitude: assetLongitude,
            assetLatitude: assetLatitude


        }

        let create = await temp_Cust.create(collection)

        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}

//=================================================globalImageUploader================================================

const globalImageUploader = async (req, res) => {
    try{

        let file = req.files;

        const image = await uploadFile(file[0])
        return res.status(200).send({status:true, data : image})




    }catch(error){
        conosole.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------latest-transection--------------------------------------------------------------------

const recentTransection = async (req, res) => {
    try {

        let findUser = await transactionModel.find()

        let final = findUser.slice(Math.max(findUser.length - 3, 0))
     
        let totalTransection = findUser.length



        return res.status(200).send({ status: true, totalTransection: totalTransection, data: final })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------admin-cust-graph----------------------------------------------------------------------------------

const get_admin_cust_data_graph = async (req, res) => {
    try {


        let Field = req.body.filter



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);
        var date = new Date();
        let curr_year = date.getFullYear();
        console.log("curr_Year", curr_year - 1)


        let find_cust_Months = await customerModel.find({ $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })
        let find_cust_Years = await customerModel.find();

        January = 0, February = 0, March = 0, April = 0, May = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December = 0
        eighteen = 0, nineteen = 0, twenty = 0, twentyOne = 0, tewentyTwo = 0, twentyThree = 0, twentyfour = 0, twentyFive = 0, twentySix = 0






        for (let i of find_cust_Months) {

            if (i.createdAt.getMonth() + 1 == 1) {
                January++
            } else if (i.createdAt.getMonth() + 1 == 2) {
                February++
            } else if (i.createdAt.getMonth() + 1 == 3) {
                March++
            } else if (i.createdAt.getMonth() + 1 == 4) {
                April++
            } else if (i.createdAt.getMonth() + 1 == 5) {
                May++
            } else if (i.createdAt.getMonth() + 1 == 6) {
                June++
            } else if (i.createdAt.getMonth() + 1 == 7) {
                July++
            } else if (i.createdAt.getMonth() + 1 == 8) {
                August++
            } else if (i.createdAt.getMonth() + 1 == 9) {
                September++
            } else if (i.createdAt.getMonth() + 1 == 10) {
                October++
            } else if (i.createdAt.getMonth() + 1 == 11) {
                November++
            } else if (i.createdAt.getMonth() + 1 == 12) {
                December++
            }
        }

        for (let i of find_cust_Years) {

            if (i.createdAt.getFullYear() == 2018) {
                eighteen++
            }
            else if (i.createdAt.getFullYear() == 2019) {
                nineteen++
            } else if (i.createdAt.getFullYear() == 2020) {
                twenty++


            } else if (i.createdAt.getFullYear() == 2021) {

                twentyOne++
            } else if (i.createdAt.getFullYear() == 2022) {

                tewentyTwo++
            } else if (i.createdAt.getFullYear() == 2023) {

                twentyThree++
            } else if (i.createdAt.getFullYear() == 2024) {
                twentyfour++

            } else if (i.createdAt.getFullYear() == 2025) {

                twentyFive++
            } else if (i.createdAt.getFullYear() == 2026) {
                twentySix++

            }
        }






        let obj = {
            January: January,
            February: February,
            March: March,
            April: April,
            May: May,
            June: June,
            July: July,
            August: August,
            September: September,
            October: October,
            November: November,
            December: December
        }




        let obj1 = {
            2018: eighteen,
            2019: nineteen,
            2020: twenty,
            2021: twentyOne,
            2022: tewentyTwo,
            2023: twentyThree,
            2024: twentyfour,
            2025: twentyFive,
            2026: twentySix
        }


        // console.log(obj1)



        let days_Array = [{ "Monday": 0 }, { "Tuseday": 0, }, { "Wednesday": 0 }, { "Thrusday": 0 }, { "Friday": 0 }, { "Saturday": 0 },
        { "Sunday": 0 }]





        let get_day = date.getDay()




        if (get_day == 1) {

            days_Array[0] = { Monday: 0 }
            days_Array[1] = { Tuseday: 0 }
            days_Array[2] = { Wednesday: 0 }
            days_Array[3] = { Thrusday: 0 }
            days_Array[4] = { Friday: 0 }
            days_Array[5] = { Sataurday: 0 }
            days_Array[6] = { Sunday: 0 }
            days_Array[7] = { Monday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[0].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[1].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[2].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[3].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[4].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[5].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[6].Sunday++
                }
            }




        } else if (get_day == 2) {
            days_Array[0] = { Tuseday: 0 }
            days_Array[1] = { Wednesday: 0 }
            days_Array[2] = { Thrusday: 0 }
            days_Array[3] = { Friday: 0 }
            days_Array[4] = { Sataurday: 0 }
            days_Array[5] = { Sunday: 0 }
            days_Array[6] = { Monday: 0 }
            days_Array[7] = { Tuseday: 0 }

            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[6].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[7].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[1].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[2].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[3].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[4].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[5].Sunday++
                }
            }




        } else if (get_day == 3) {
            days_Array[0] = { Wednesday: 0 }
            days_Array[1] = { Thrusday: 0 }
            days_Array[2] = { Friday: 0 }
            days_Array[3] = { Sataurday: 0 }
            days_Array[4] = { Sunday: 0 }
            days_Array[5] = { Monday: 0 }
            days_Array[6] = { Tuseday: 0 }
            days_Array[7] = { Wednesday: 0 }

            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[5].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[6].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[7].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[1].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[2].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[3].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[4].Sunday++
                }
            }




        } else if (get_day == 4) {
            days_Array[0] = { Thrusday: 0 }
            days_Array[1] = { Friday: 0 }
            days_Array[2] = { Sataurday: 0 }
            days_Array[3] = { Sunday: 0 }
            days_Array[4] = { Monday: 0 }
            days_Array[5] = { Tuseday: 0 }
            days_Array[6] = { Wednesday: 0 }
            days_Array[7] = { Thrusday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[4].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[5].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[6].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[7].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[1].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[2].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[3].Sunday++
                }
            }






        } else if (get_day == 5) {
            console.log("1231321321313212121FDRI")
            days_Array[0] = { Friday: 0 }
            days_Array[1] = { Saturday: 0 }
            days_Array[2] = { Sunday: 0 }
            days_Array[3] = { Monday: 0 }
            days_Array[4] = { Tuseday: 0 }
            days_Array[5] = { Wednesday: 0 }
            days_Array[6] = { Thrusday: 0 }
            days_Array[7] = { Friday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {

                console.log("Test_Over", i.createdAt.getDay())

                if (i.createdAt.getDay() === 1) {
                    console.log("123121321==ENTER")
                    days_Array[3].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[4].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[5].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[6].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[7].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[1].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[2].Sunday++
                }
            }






        } else if (get_day == 6) {
            days_Array[0] = { Sataurday: 0 }
            days_Array[1] = { Sunday: 0 }
            days_Array[2] = { Monday: 0 }
            days_Array[3] = { Tuseday: 0 }
            days_Array[4] = { Wednesday: 0 }
            days_Array[5] = { Thrusday: 0 }
            days_Array[6] = { Friday: 0 }
            days_Array[7] = { Sataurday: 0 }





            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[2].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[3].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[4].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[5].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[6].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[7].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[1].Sunday++
                }
            }

        } else if (get_day == 7) {


            days_Array[0] = { Sunday: 0 }
            days_Array[1] = { Monday: 0 }
            days_Array[2] = { Tuseday: 0 }
            days_Array[3] = { Wednesday: 0 }
            days_Array[4] = { Thrusday: 0 }
            days_Array[5] = { Friday: 0 }
            days_Array[6] = { Sataurday: 0 }
            days_Array[7] = { Sunday: 0 }




            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[1].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[2].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[3].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[4].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[5].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[6].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[7].Sunday++
                }
            }






        }


        let last_date = new Date(new Date().setDate(new Date().getDate() - 7))
        let get_last_date = last_date.getDay();
        let find_last_seven_days = await customerModel.find(
            { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
        )



        let DaysData = Object.assign(days_Array[0], days_Array[1], days_Array[2], days_Array[3], days_Array[4], days_Array[5], days_Array[6], days_Array[7])

        if (Field == "Year") {
            return res.status(200).send({ status: true, obj: obj1 })

        } else if (Field == "Month") {
            return res.status(200).send({ status: true, obj: obj })

        } else if (Field == "Day") {
            return res.status(200).send({ status: true, obj: DaysData })

        } else {
            return res.status(200).send({ status: true, obj })

        }








       // return res.status(200).send({ status: true, days_Array })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------all-agents---------------------------------------------------------------------------------------------------------

const view_all_agents = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;


        if (Object.keys(req.body).length <= 1) {
            let find_length = await agentModel.find({ isDeleted: 0, blocked: 0 })
            let contRow = find_length.length
            let find = await agentModel.find({ isDeleted: 0, blocked: 0 }).sort({ time: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), find })
        } else {
            let options = [{ name: req.body.name }, { phone: req.body.phone }]

            let find_length = await agentModel.find({ isDeleted: 0, blocked: 0 })
            let contRow = find_length.length
            let find = await agentModel.find({ $or: options, isDeleted: 0, blocked: 0 }).sort({ time: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), find })
        }



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------get-all-loans-----------------------------------------------------------------------------------------------------

const get_all_loans = async (req, res) => {
    try {

        let find_loans = await Lons_Model.find();
        
        let find_Numbers = find_loans.length
        
        return res.status(200).send({ status: true, find: find_Numbers })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------recent-users---------------------------------------------------------------------------------


const recentUser = async (req, res) => {
    try {

        let findUser = await customerModel.find({ isDeleted: 0, blocked: 0 }).sort({ createdAt: "-1" }).select({ fullname: 1, phone: 1, email: 1, dateOfBirth: 1, status: 1 })
       
        let totalCustomer = findUser.length

        let final = findUser.slice(Math.max(findUser.length - 3, 0))



        return res.status(200).send({ status: true, totalCustomer: totalCustomer, final })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const admindash = async (req, res) => {
    try {

        let findcust = await customerModel.find();


        let totaluser = findcust.length

        let findtrans = await transactionModel.find()

        let sum = 0;
        for (let i of findtrans) {
            sum += i.sendingAmount
        }



        let findorg = await Organisation.find()
        let find_licenses = await licenses_Model.find()
        

        let sum1 = 0;
        for (let i of find_licenses) {
            sum1 += i.totalLicenses
        }

        let dashData = {
            totalUser: totaluser,
            totlaTransection: sum,
            totlaLicense: sum1


        }


        return res.status(200).send({ staus: true, msg: "dashboard updated", dashData })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//--------------------------------------admin-email-requests-By-Organisation---------------------------------------------------------------------------------


const emailRequestsByOrg = async (req, res) => {
    try {

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }

        const { page = pageNO, limit = 10 } = req.query;

        let findrequests = await admin_Email_request.find({ By: 'Organisation', status: "pending" })

        return res.status(200).send({ status: true, findrequests })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------Customer-Bank--------------------------------------------------------------------------------------

const customer_bank = async (req, res) => {
    try {

        const custID = req.params.custID

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID" })
        }

        let findCust = await customer_Bank.find({ customerID: custID }).populate('customerID', { 'IDphoto': 1, 'fullname': 1, 'phone': 1, 'email': 1, })



        return res.status(200).send({ status: true, findCust })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//---------------------------------------transection-list-filter-----------------------------------------------------------------------------------

const admintransectionfillter = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await transactionModel.find().sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await transactionModel.find().sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })



        } else if (req.body.fromDate) {

            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromAmount && req.body.senderName) {
            let option = [{ senderName: req.body.senderName }, {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromAmount && req.body.beneficiaryName) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.senderName && req.body.beneficiaryName) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },

            ]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromAmount && req.body.senderName) {
            let option = [{ senderName: req.body.senderName }, {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }]




            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.senderName && req.body.beneficiaryName && req.body.fromAmount && req.body.toAmount) {
            let option = [{ beneficiaryName: req.body.beneficiaryName }, { senderName: req.body.senderName },
            {
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }
            ]

            let countpages2 = await transactionModel.find({ $and: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $and: option }).sort({ transactionDate: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }


        else {



            let option = [{
                sendingAmount: {
                    $gte: req.body.fromAmount,
                    $lte: req.body.toAmount
                }
            }, { senderName: req.body.senderName }, { beneficiaryName: req.body.beneficiaryName }]




            let countpages2 = await transactionModel.find({ $or: option })
            let contRow = countpages2.length
            let filter = await transactionModel.find({ $or: option }).sort({ transactionDate: -1 })
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

//-------------------------------------------admin_read_notification-------------------------------------------------------------------------

const admin_read_notification = async (req, res) => {
    try {

        const notification_ID = req.params.ID;

        let find_notification = await admin_Email_request.findOneAndUpdate({ _id: notification_ID }, { status: "Read" })

        if (find_notification) {
            return res.status(200).send({ status: true })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------chrome_pay_logs--------------------------------------------------------------------------------------

const chrome_pay_logs = async (req, res) => {
    try {

        const API_HIS = await api_his.find();
        data = req.body;
        const { IP, Category, toDate, fromDate, status } = data

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;

        //---------------------------------------------------------------------------------------

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await api_his.find().sort({ createdAt: -1 })
            let totalRaow1 = countpages1.length;
            let filter = await api_his.find().sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // let totlaRow = filter.length;
            if (filter.length == 0) {
                return res.status(200).send({ status: false, msg: "No Customer Found" })
            }
            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        }

        let option = [{ IPAdress: IP }, { BY: Category }, { status: status }]
        let countpages2 = await api_his.find({ $or: option })
        let contRow = countpages2.length
        const filter = await api_his.find({ $or: option }).sort({ time: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();



        //------------------------------date-filter--------------------------------------------------------

        if (req.body.fromDate) {

            let option = [

                {
                    time: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }

            ]


            let countpages2 = await api_his.find({ $or: option })
            let contRow = countpages2.length
            let filter = await api_his.find({ $or: option }).sort({ time: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

        return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })

    }
}


const SuspendOrganisation = async (req, res) => {
    try {

        const orgID = req.params.OrganisationID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not geting Organisation ID " })
        }

        let findOrganisation = await Organisation.findByIdAndUpdate({ _id: orgID }, { blocked: 1 }, { new: true })


        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "Organisation Blocked Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------Un-Suspend-Organisation--------------------------------------------------------------------------

const Un_suspend_Organisation = async (req, res) => {
    try {

        const OrganisationID = req.params.OrganisationID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "not getting Organisation ID " })
        }

        let findOrganisation = await Organisation.findByIdAndUpdate({ _id: OrganisationID }, { blocked: 0 }, { new: true })


        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "Organisation Un-Blocked Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


//----------------------------------------------Delete-Organisation--------------------------------------------------------------------------------

const deleteOrganisation = async (req, res) => {

    try {

        const OrganisationID = req.params.OrganisationID;

        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Not getting organisation ID" })
        }

        let findOrganisation = await Organisation.findByIdAndUpdate({ _id: OrganisationID }, { isDeleted: 1 }, { new: true })



        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Process failed please try again" })
        }

        return res.status(200).send({ status: true, msg: "Organisation deleted Sucessfully" })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------------verify-organisation------------------------------------------------------------------------

const orgVerify = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        const adminID = req.params.adminID

        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.Organisation.updateOrganisation

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to verify customer, Contact admin to access verify customer" })

                }
            }

        }

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter custID ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID ID " })
        }

        let findcust = await Organisation.findOneAndUpdate({ _id: orgID }, { status: "verified" })

        if (findcust) {
            return res.status(200).send({ status: true, msg: "Organisation verified sucessfully" })
        }



    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------------admin-org-customer-----------------------------------------------------------------

const OrgCust = async (req, res) => {
    try {

        const custID = req.params.custID;
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 5 } = req.query;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter cust ID" })
        }

        if (Object.keys(req.body).length <= 1) {

            let findORg = await Organisation.findOne({ _id: custID })

            let name = findORg.name

            let findCust11 = await customerModel.find({ organisation: custID, isDeleted: 0, blocked: 0 })
            let findCust = await customerModel.find({ organisation: custID, isDeleted: 0, blocked: 0 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let contRow = findCust11.length
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), OrganisationName: name, findCust })

        }

        else if (req.body.fromDate) {

            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]




            let findORg = await Organisation.findOne({ _id: custID })

            let name = findORg.name

            let findCust11 = await customerModel.find({ $or: option, organisation: custID, isDeleted: 0, blocked: 0 })
            let findCust = await customerModel.find({ $or: option, organisation: custID, isDeleted: 0, blocked: 0 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let contRow = findCust11.length
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), OrganisationName: name, findCust })

        } else {
            let option = [{ status: req.body.status }, { fullname: req.body.name }]
            let findORg = await Organisation.findOne({ _id: custID })

            let name = findORg.name

            let findCust11 = await customerModel.find({ $or: option, organisation: custID, isDeleted: 0, blocked: 0 })
            let findCust = await customerModel.find({ $or: option, organisation: custID, isDeleted: 0, blocked: 0 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let contRow = findCust11.length
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), OrganisationName: name, findCust })

        }



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------org-licenses-inncrement--------------------------------------------------------------------------------

const orgLicenses = async (req, res) => {
    try {

        let orgID = req.params.orgID;



        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findOrg = await Organisation.findOne({ _id: orgID })



        if (!findOrg) {
            return res.status(200).send({ status: false, msg: "org not found" })
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
                subject: 'for update Licenses limit',
                text: `Hello! this is  ${findOrg.name} organisation of chromepay we want to update our Licenses Limit, please update.
                   Our Organisation ID = ${findOrg._id}`
                // text : otp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });
        }

        sentEmail();

        return res.status(200).send({ status: true, msg: "request add sucessfully! please wait for admin response" })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------find-total-licenses-------------------------------------------------------------------------------

const findLicenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let find = await Organisation.findOne({ _id: orgID })

        let license = find.totlaLicense

        return res.status(200).send({ status: true, license })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------------update-Licenses------------------------------------------------------------------------------

const add_Licenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        const Licenses = req.body.Licenses

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findOrg_Licenses = await org_Licenses.findOne({ OrganisationID: orgID })


        let updateLicenses = findOrg_Licenses.totalLicenses

        let addLicenses = updateLicenses += parseInt(Licenses)




        let update = await org_Licenses.findOneAndUpdate({ OrganisationID: orgID }, { totalLicenses: addLicenses, LicenseUpdateStatus: 1 }, { new: true })



        if (!update) {
            return res.status(200).send({ status: false, msg: "Organisation not have License Please add first organisation Licenses" })

        }



        return res.status(200).send({ status: true, msg: "Licenses add sucessfully", update })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------view-fee-setup-----------------------------------------------------------------------------------

const viewFee = async (req, res) => {
    try {

        const orgID = req.params.orgID;


        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findLicenseFees = await License_fee.findOne({ OrganisationID: orgID }).select({ recuuringFees: 1, perLicenseFee: 1 })

        return res.status(200).send({ status: true, findLicenseFees })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------update-fee-setup--------------------------------------------------------------------------------------------

const updateFee = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        const recurring = req.body.recurring;
        const perLicenseFee = req.body.perLicenseFee;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let update = await License_fee.findOneAndUpdate({ OrganisationID: orgID }, { recuuringFees: recurring, perLicenseFee: perLicenseFee }, { new: true })

        return res.status(200).send({ status: true, msg: "fee section update sucessfully", update })





    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------add-Organisation-document----------------------------------------------------------------------------

const addOrgDocument = async (req, res) => {
    try {

        const orgID = req.params.orgID;
        let Certificate_of_Incorporatio = req.files
        let Proof_of_Company_Address = req.files
        let Company_Profile_Brochure = req.files
        let Customer_Agreement = req.files
        const data1 = req.files
        const data = req.body

        if (data1.length < 4) {
            return res.status(200).send({ status: false, msg: "Please uplaod all documents" })

        }




        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let check_org = await org_Doc.findOne({ organisation_id: orgID })

        if (check_org) {
            return res.status(200).send({ status: false, msg: "Documents already Uploaded! go to update documents sections" })
        }

        let findOrg = await Organisation.findOne({ _id: orgID })



        const Certificate_of_Incorporatio1 = await uploadFile(Certificate_of_Incorporatio[0])
        const Proof_of_Company_Address1 = await uploadFile(Proof_of_Company_Address[1])
        const Company_Profile_Brochure1 = await uploadFile(Company_Profile_Brochure[2])
        const Customer_Agreement1 = await uploadFile(Customer_Agreement[3])





        let obj = {
            organisation_id: orgID,
            Certificate_of_Incorporation: Certificate_of_Incorporatio1,
            Proof_of_Company_Address: Proof_of_Company_Address1,
            Company_Profile_Brochure: Company_Profile_Brochure1,
            Customer_Agreement: Customer_Agreement1
        }

        let create = await org_Doc.create(obj)

        return res.status(200).send({ status: true, msg: "Organisation document upload sucessfully", create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------remainig-licenses-------------------------------------------------------------------------------------

const find_Org_RemainingLicenses = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findCust = await customerModel.find({ organisation: orgID, isDeleted: 0 })
        let total_DIDs = findCust.length

        let totalCust = findCust.length;

        let findorg = await org_Licenses.findOne({ OrganisationID: orgID })

        let totalLicense = findorg.totalLicenses
        console.log("totalLicense", totalLicense)
        let name = findorg.name;
        let remaning_Licenses = totalLicense - totalCust

        if (remaning_Licenses <= 10) {

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
                    subject: 'Alert to update Licenses',
                    text: `Hello! ${name}, your Licenses for add customer is remainig ${remaning_Licenses} please contact admin to update your licenses`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log('email error line 34 ===  ', error);
                        return false;
                    } else {
                        console.log('Email sent: ' + info.messageId);
                        return info.messageId;
                    }
                });



            }

            sentEmail();

        }

        if (remaning_Licenses < 10) {
            return res.status(200).send({ status: false, remaning_Licenses, total_DIDs, msg: "Your Remaning License is below 10 Please update your licenses for continue customer service" })
        }

        return res.status(200).send({ status: true, remaning_Licenses, total_DIDs })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------view-Organisation-documents-------------------------------------------------------------------------

const viewDoc = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findDoc = await org_Doc.findOne({ organisation_id: orgID })

        return res.status(200).send({ status: true, findDoc })


    } catch (error) {

        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })

    }

}

//-------------------------------------------------Org-Cust-Chart-by-Month------------------------------------------------------------------------------

const OrgChart = async (req, res) => {
    try {

        let find = await Organisation.find().select({ name: 1 });

        let result = [];

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]
            for (let i of find) {
                let findCust = await customerModel.find({ $or: option, organisation: i._id })

                result.push({ ...i._doc, customers: findCust.length })
            }


            let sorted = result.sort(function (c1, c2) {
                if (c1.customers < c2.customers) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })

        } else {
            for (let i of find) {
                let findCust = await customerModel.find({ organisation: i._id })

                result.push({ ...i._doc, customers: findCust.length })
            }


            let sorted = result.sort(function (c1, c2) {
                if (c1.customers < c2.customers) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })


        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------org-transection-chart---------------------------------------------------------------------------------

const OrgTransectionChart = async (req, res) => {
    try {

        let find = await Organisation.find().select({ name: 1 });

        let result = [];


        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]
            for (let i of find) {
                let findCust = await transactionModel.find({ $or: option, OrganisationID: i._id })

                result.push({ ...i._doc, Transections: findCust.length })
            }


            let sorted = result.sort(function (c1, c2) {
                if (c1.Transections < c2.Transections) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })

        } else {

            for (let i of find) {
                let findCust = await transactionModel.find({ OrganisationID: i._id })

                result.push({ ...i._doc, Transections: findCust.length })
            }

            let sorted = result.sort(function (c1, c2) {
                if (c1.Transections < c2.Transections) {
                    return 1;
                } else {
                    return -1;
                }
            })

            return res.status(200).send({ status: true, sorted })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------Customer-organisation's------------------------------------------------------------------------------------

const cust_organisation = async (req, res) => {
    try {

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }
        if (custID.length == 0) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }
        let find_Oragnsiations = await customerModel.findOne({ _id: custID })
        let Organisations = find_Oragnsiations.organisation
        let result = [];
        for (let i of Organisations) {
            let find_Org = await Organisation.find({ _id: i }).select({ name: 1, logo: 1, })
            result.push(find_Org)
        }

        let final = []
        for (let organisations of result) {
            for (let org of organisations) {
                final.push(org)
            }
        }

        return res.status(200).send({ status: true, final })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------admin-change-Spassword------------------------------------------------------------------------------------------

const changePassword = async (req, res) => {
    try {

        const adminID = req.params.adminID;
        const oldPaasword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "adminID not getting" })
        }

        if (!oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter oldPassword" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new password" })
        }

        if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
            return res.status(200).send({ status: false, msg: "Please enter valid password, password at least one number and one special caharacter" })
        }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: " Your confirm password is not match" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let findadmin = await adminModel.findOneAndUpdate({ _id: adminID }, { password: newPassword })


        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }

        if (findadmin.password !== oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter valid old password" })
        }

        return res.status(200).send({ status: true, msg: "Password Change Sucessfully" })

    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}



//------------------------------------------------admin-forgot-password-----------------------------------------------------------------------

const forgotpassword = async (req, res) => {
    try {


        const email = req.body.email;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter your register email" })
        }


        let cheackEmail = await adminModel.findOne({ email: email })

        if (!cheackEmail) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (cheackEmail.email !== email) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }
        let otp = 100000 + Math.floor(Math.random() * 900000);
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
                subject: 'Sending Email using Node.js',
                text: ' Hello! admin your OTP for change password is" ' + otp + ' " do not share this otp'

            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }
            });



        }
        sentEmail();

        let updateOTP = await adminModel.findOneAndUpdate({ email: email }, { otp: otp })

        if (!updateOTP) {
            return res.status(200).send({ status: false, msg: "Agent not Found" })
        }

        return res.status(200).send({ status: true, msg: "Otp send Sucessfully" })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------------chnage-password------------------------------------------------------------------------------

const changePasswordotp = async (req, res) => {
    try {

        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        const otp = req.body.otp;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Not getting email" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new Password" })
        }

        if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
            return res.status(200).send({ status: false, msg: "Please enter valid password, password at least one number and one special caharacter" })
        }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your confirm Password is not match" })
        }

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp, which you getting through your email" })
        }

        let checkOTP = await adminModel.findOne({ email: email })

        if (!checkOTP) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        let updatePassword = await adminModel.findOneAndUpdate({ email: email }, { password: confirmPassword })

        if (!updatePassword) {
            return res.status(200).send({ status: false, msg: "Password not changed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Password change sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------------blockip-----------------------------------------------------------------------------

const CreateIPs = async (req, res) => {
    try {

        const IP = req.body.IP;

        const adminID = req.params.adminID



        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter adminID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }








        let findsubAdminID = await subAdmin.findOne({ _id: adminID })



        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })
            if (findRole) {

                let customerRole = findRole.IP.IPblackListing


                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to block IP, Contact admin to access block IP" })

                }
            }

        }

        if (!IP) {
            return res.status(400).send({ status: false, msg: "Please enter IP" })
        }

        let caheckIP = await BlockIPModel.findOne({ IP: IP })
        if (caheckIP) {
            return res.status(400).send({ status: false, msg: "IP Already Blocked" })
        }


        let create = await BlockIPModel.create({ IP })
        return res.status(201).send({ status: true, msg: `${IP} is Blocked` })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, error: error })
    }
}

//--------------------------------------------------update-limits---------------------------------------------------------------------------------//

const updatelimits = async (req, res) => {
    try {

        const adminID = req.params.adminID;
        const adminotplimit = req.body.AdminOTP
        const adminpasswordlimit = req.body.AdminPassword
        const agentotplimit = req.body.agentOTP
        const agentpasswordlimit = req.body.agentPassword
        const orgpasswordlimit = req.body.orgPassword
        const orgotplimit = req.body.orgOTP

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }


        if (!adminotplimit) {
            return res.status(200).send({ status: false, msg: "Please enter admin otp limit" })
        }
        if (!adminpasswordlimit) {
            return res.status(200).send({ status: false, msg: "Please enter admin password limit" })
        }



        if (!agentpasswordlimit) {
            return res.status(200).send({ status: false, msg: "Please enter agent password limit" })
        }
        if (!orgpasswordlimit) {
            return res.status(200).send({ status: false, msg: "Please enter organisation password limit" })
        }

        if (!orgotplimit) {
            return res.status(200).send({ status: false, msg: "Please enter organisation otp limit" })
        }


        if (!Object.keys(req.body).length) {
            return res.status(200).send({ status: false, msg: "please enter data to update" })
        }

        let data = {
            adminotplimit: adminotplimit, adminpasswordlimit: adminpasswordlimit,
            agentotplimit: agentotplimit, agentpasswordlimit: agentpasswordlimit, orgpasswordlimit: orgpasswordlimit,
            orgotplimit: orgotplimit
        }

        let updatedata = await adminModel.findOneAndUpdate({ _id: adminID }, data, { new: true })


        if (!updatedata) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }

        return res.status(200).send({ status: true, msg: "data update sucessfully", updatedata })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------view-transection----------------------------------------------------------------------------------

const viewtransection = async (req, res) => {
    try {

        const ID = req.params.ID;

        if (!ID) {
            return res.status(200).send({ status: false, msg: "Please enter transection ID" })
        }

        if (ID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid transection ID" })
        }

        let filter = await transactionModel.findOne({ _id: ID })

        if (!filter) {
            return res.status(200).send({ status: false, msg: "no transection found" })
        }

        return res.status(200).send({ status: true, filter })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//-----------------------------------Admin-Profile-Update-----------------------------------------------------------------------------

const adminProfileUpdate = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        const data = req.body

        const { Firstname, email, password, lastName, phone, address, country, state
            , city, postCode } = data;


        let final = {
            Firstname: Firstname,
            lastName: lastName,
            email: email,
            password: password,
            lastName: lastName,
            phone: phone,
            address: address,
            country: country,
            state: state,
            city: city, postCode: postCode
        }

        let updateAdmin = await adminModel.findOneAndUpdate({ _id: adminID }, final, { new: true })

        return res.status(200).send({ status: true, msg: "admin profile update sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-------------------------------------------------Fee-setup----------------------------------------------------------------------------

const addFeeSetup = async (req, res) => {

    try {
        const orgID = req.body.orgID

        const data = req.body;

        const { RecurringFees, Licences, LicenceFees } = data

        if (!RecurringFees) {
            return res.status(200).send({ status: false, msg: "Please enter Recurring Fees" })
        }

        if (!LicenceFees) {
            return res.status(200).send({ status: false, msg: "Please enter Fees" })
        }




        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }

        let findOrganisation = await Organisation.findOne({ _id: orgID, blocked: 0, isDeleted: 0 })

        if (!findOrganisation) {
            return res.status(200).send({ status: false, msg: "Organisation not found, maybe blocked or deleted" })
        }

        let orgName = findOrganisation.name;




        let obj = {
            OrganisationID: orgID,
            name: orgName,
            recuuringFees: RecurringFees,
            perLicenseFee: LicenceFees

        }

        let findOrg = await License_fee.create(obj)




        return res.status(200).send({ status: true, msg: "Fees Setup Sucessfully", findOrg })


    } catch (error) {
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}




//--------------------------------------admin-profle----------------------------------------------------------------------------------------

const adminProfile = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admin ID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let findadmin = await adminModel.findOne({ _id: adminID })
        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "no admin find" })
        }

        return res.status(200).send({ status: true, data: findadmin })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const addSubAdmin = async (req, res) => {
    try {


        const adminID = req.params.adminID;
        const data = req.body;



        const { Firstname, lastName, email, phone, createdBy, city, state, Country, address, password, confirmPassword, role } = data

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        if (!Firstname) {
            return res.status(200).send({ status: false, msg: "Please enter first name " })

        }

        if (!lastName) {
            return res.status(200).send({ status: false, msg: "Please enter last name " })

        }

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email " })

        }

        let checkemail = await adminModel.findOne({ email: email })

        if (checkemail) {
            return res.status(200).send({ status: false, msg: "email already register" })

        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone " })

        }

        if (!(/^\d{8,12}$/).test(phone)) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone number, number should be in between 8 to 12" })
        }

        let checkphone = await adminModel.findOne({ phone: phone })

        if (checkphone) {
            return res.status(200).send({ status: false, msg: "mobile number already register" })

        }

        if (!city) {
            return res.status(200).send({ status: false, msg: "Please enter city " })

        }

        if (!state) {
            return res.status(200).send({ status: false, msg: "Please enter state " })

        }

        if (!Country) {
            return res.status(200).send({ status: false, msg: "Please enter country " })

        }

        if (!address) {
            return res.status(200).send({ status: false, msg: "Please enter address " })

        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter password" })

        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })

        }

        if (password !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your Confirm password not matched" })

        }

        if (!role) {
            return res.status(200).send({ status: false, msg: "please enter role" })

        }

        let obj = {
            Firstname: Firstname,
            lastName: lastName,
            email: email,
            phone: phone,
            createdBy: adminID,
            city: city,
            state: state,
            Country: Country,
            address: address,
            password: encryptedPassword,
            role: role

        }

        let create = await adminModel.create(obj)

        if (!create) {
            return res.status(200).send({ status: false, msg: "failed please try again" })
        }


        return res.status(200).send({ status: true, msg: "sub admin register sucessfullyy", create })




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------------------add-sub-admin-role------------------------------------------------------------------------


const add_sub_admin_role = async (req, res) => {
    try {

        const adminID = req.params.adminID
        const subAdminID = req.params.subAdminID

        let checksubAdmin = await sub_Admin_Role.findOne({ adminID: subAdminID })



        if (checksubAdmin) {
            return res.status(200).send({ status: false, msg: "role already register, go to update role" })

        }

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (adminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        if (!subAdminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (subAdminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        let findSubAdmin = await adminModel.findOne({ _id: subAdminID, blocked: 0 })

        if (!findSubAdmin) {
            return res.status(200).send({ status: false, msg: "not found sub admin" })
        }

        let obj = {
            adminID: subAdminID,
            customer: {
                addCustomer: req.body.addCustomer,
                editCustomer: req.body.editCustomer,
                approveDID: req.body.approveDID,
                viewCustomer: req.body.viewCustomer,
                blockCustomer: req.body.blockCustomer,
                unBlockCustomer: req.body.unBlockCustomer,
                deleteCustomer: req.body.deleteCustomer,
                setcustomerOtpLimit: req.body.setcustomerOtpLimit,
                setCustomerPasswordLimit: req.body.setCustomerPasswordLimit,
                updateCustomer: req.body.updateCustomer
            },

            Organisation: {
                addOrganisation: req.body.addOrganisation,
                blockorganisation: req.body.blockorganisation,
                unBlockOrganisation: req.body.unBlockOrganisation,
                deleteOrganisation: req.body.deleteOrganisation,
                setOrgOptLimit: req.body.setOrgOptLimit,
                setOrgPasswordLimit: req.body.setOrgPasswordLimit,
                updateOrganisation: req.body.updateOrganisation
            },

            Agent: {
                addAgent: req.body.addAgent,
                blockAgent: req.body.blockAgent,
                unBlockAgent: req.body.unBlockAgent,
                deleteAgent: req.body.deleteAgent,
                setagentOtpLimit: req.body.setagentOtpLimit,
                setagentPasswordLimit: req.body.setagentPasswordLimit,
                updateAgent: req.body.updateAgent
            },

            IP: {
                IPblackListing: req.body.IPblackListing,
                IPwhiteListing: req.body.IPwhiteListing,

            },

            subAdmin: {
                addSubAdmin: req.body.addSubAdmin,
                blockSubAdmin: req.body.blockSubAdmin,
                unBlockSubAdmin: req.body.unBlockSubAdmin,
                deleteSubAdmin: req.body.deleteSubAdmin,
                updateSubAgent: req.body.updateSubAgent

            }
        }
        let create = await sub_Admin_Role.create(obj)
        return res.status(200).send({ status: true, msg: "role added sucessfully", create })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//----------------------------------update-sub-admin-roles--------------------------------------------------------------------------------

const updateSubAdminRoles = async (req, res) => {
    try {

        const subAdminID = req.params.subAdminID

        if (!subAdminID) {
            return res.status(200).send({ status: false, msg: "Please enter admin ID" })
        }

        if (subAdminID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid admin ID " })
        }

        let checkID = await sub_Admin_Role.findOne({ adminID: subAdminID })


        if (!checkID) {
            return res.status(200).send({ status: false, msg: "not found sub admin" })
        }

        let obj = {
            adminID: subAdminID,
            customer: {
                addCustomer: req.body.addCustomer,
                editCustomer: req.body.editCustomer,
                approveDID: req.body.approveDID,
                viewCustomer: req.body.viewCustomer,
                blockCustomer: req.body.blockCustomer,
                unBlockCustomer: req.body.unBlockCustomer,
                deleteCustomer: req.body.deleteCustomer,
                setcustomerOtpLimit: req.body.setcustomerOtpLimit,
                setCustomerPasswordLimit: req.body.setCustomerPasswordLimit,
                updateCustomer: req.body.updateCustomer
            },

            Organisation: {
                addOrganisation: req.body.addOrganisation,
                blockorganisation: req.body.blockorganisation,
                unBlockOrganisation: req.body.unBlockOrganisation,
                deleteOrganisation: req.body.deleteOrganisation,
                setOrgOptLimit: req.body.setOrgOptLimit,
                setOrgPasswordLimit: req.body.setOrgPasswordLimit,
                updateOrganisation: req.body.updateOrganisation
            },

            Agent: {
                addAgent: req.body.addAgent,
                blockAgent: req.body.blockAgent,
                unBlockAgent: req.body.unBlockAgent,
                deleteAgent: req.body.deleteAgent,
                setagentOtpLimit: req.body.setagentOtpLimit,
                setagentPasswordLimit: req.body.setagentPasswordLimit,
                updateAgent: req.body.updateAgent
            },

            IP: {
                IPblackListing: req.body.IPblackListing,
                IPwhiteListing: req.body.IPwhiteListing,

            },

            subAdmin: {
                addSubAdmin: req.body.addSubAdmin,
                blockSubAdmin: req.body.blockSubAdmin,
                unBlockSubAdmin: req.body.unBlockSubAdmin,
                deleteSubAdmin: req.body.deleteSubAdmin,
                updateSubAgent: req.body.updateSubAgent

            }
        }
        let update = await sub_Admin_Role.findOneAndUpdate({ adminID: subAdminID }, obj, { new: true })

        if (!update) {
            return res.status(200).send({ status: false, msg: "Failed!, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Roles Updated Sucessfully", update })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//-----------------------------------------sub-admin-roles-------------------------------------------------------------------------------

const subAdminRole = async (req, res) => {
    try {

        const Sub_admin_ID = req.params.adminID

        if (!Sub_admin_ID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID" })
        }

        if (Sub_admin_ID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }

        let find = await sub_Admin_Role.findOne({ adminID: Sub_admin_ID })

        if (!find) {
            return res.status(200).send({ status: false, msg: "no admin roles" })
        }

        return res.status(200).send({ status: true, find })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//---------------------------------------------Block-sub-admin----------------------------------------------------------------------------------

const Block_sub_admin = async (req, res) => {
    try {

        const sub_admin_id = req.params.sub_admin_ID;

        if (!sub_admin_id) {
            return res.staus(200).send({ sataus: false, msg: "Please enter sub admin iD" })
        }

        if (sub_admin_id.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid sub admin ID" })
        }

        let findAndBlock = await adminModel.findByIdAndUpdate({ _id: sub_admin_id }, { blocked: 1 })

        if (!findAndBlock) {
            return res.status(200).send({ status: false, msg: "Failed! Please try again" })
        }

        return res.status(200).send({ status: true, msg: "sub admin blocked sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------------Un-block-subadmin----------------------------------------------------------------------------

const Unblock_sub_admin = async (req, res) => {
    try {

        const sub_admin_id = req.params.sub_admin_ID;

        if (!sub_admin_id) {
            return res.staus(200).send({ sataus: false, msg: "Please enter sub admin iD" })
        }

        if (sub_admin_id.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid sub admin ID" })
        }

        let findAndBlock = await adminModel.findByIdAndUpdate({ _id: sub_admin_id }, { blocked: 0 })

        if (!findAndBlock) {
            return res.status(200).send({ status: false, msg: "Failed! Please try again" })
        }

        return res.status(200).send({ status: true, msg: "sub admin Un-blocked sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


//------------------------------------list-of--sub-admin----------------------------------------------------------------------------

const findSubAdmin = async (req, res) => {
    try {

        let find = await adminModel.find({ role: 'sub_Admin' })

        return res.status(200).send({ staus: true, find })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------view-sub-admin----------------------------------------------------------------------------------------------------

const Sub_admin_profil = async (req, res) => {
    try {

        const sub_adminID = req.params.sub_adminID

        if (!sub_adminID) {
            return res.status(200).send({ status: false, msg: error.message })
        }

        let find = await adminModel.findOne({ _id: sub_adminID })

        return res.status(200).send({ status: true, find })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



//---------------------------------------------------IP-Unblock-admin---------------------------------------------------------------------------

const UnBlockIP = async (req, res) => {
    try {

        const adminID = req.params.adminID;
        const ID = req.params.ID;



        if (!adminID) {
            return res.status(200).send({ status: false, msg: "adminID not getting" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid admin ID" })
        }


        let findsubAdminID = await subAdmin.findOne({ _id: adminID })

        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: adminID })

            if (findRole) {

                let customerRole = findRole.IP.IPwhiteListing

                if (customerRole == 0) {
                    return res.status(200).send({ status: false, msg: "You are not allow to un block IP, Contact admin to access Un block IP" })

                }
            }

        }
        let findadmin = await adminModel.findOne({ _id: adminID })

        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "admin not found" })
        }

        if (!ID) {
            return res.status(200).send({ status: false, msg: "Please enter ID" })
        }

        if (ID < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid IP ID" })
        }

        let findIP = await BlockIP.findOneAndDelete({ _id: ID })

        if (!findIP) {
            return res.status(200).send({ status: false, msg: "ip adress not found" })
        }

        return res.status(200).send({ status: true, msg: "IP adress un-blocked sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------Blockip-fiter-list------------------------------------------------------------------------------------

const blockIPList = async (req, res) => {
    try {

        const adminID = req.params.adminID;

        if (!adminID) {
            return res.status(200).send({ status: false, msg: "not getting admiID" })
        }

        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid asminID" })
        }

        let findadmin = await adminModel.findOne({ _id: adminID })
        if (!findadmin) {
            return res.status(200).send({ Status: false, msg: "admin not found" })
        }

        let countpages = await BlockIP.find().sort({ createdAt: 1 })
        let totlaRow = countpages.length

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 5 } = req.query;


        if (req.body.IP) {

            let option = [{ IP: req.body.IP }]

            let countpages2 = await BlockIP.find({ $or: option }).sort({ createdAt: -1 })
            let contRow = countpages2.length

            let filter = await BlockIP.find({ $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            let counPages = Math.ceil(countpages.length / 10)
            return res.status(200).send({ status: true, totlaRow: contRow, totalPages: 1, currenPage: parseInt(pageNO), filter })
        }

        if (!Object.keys(req.body).length <= 1) {


            let filter = await BlockIP.find().sort({ createdAt: -1 }).limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let counPages = Math.ceil(countpages.length / 10)

            return res.status(200).send({ status: false, totlaRow: totlaRow, totalPages: counPages, currenPage: parseInt(pageNO), filter })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------find-bank-with-customer-------------------------------------------------------------------------------


const bankWithCust = async (req, res) => {
    try {

        const BankID = req.params.BankID

        if (!BankID) {
            return res.status(200).send({ status: false, msg: "Please enter Bank ID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Bank ID" })
        }

        let findCust = await customer_Bank.findOne({ _id: BankID }).populate('customerID', { 'IDphoto': 1, 'fullname': 1, 'phone': 1, 'email': 1, })

        if (findCust.suspend == 1) {
            return res.status(200).send({ status: true, findCust, suspend: 1, msg: "This Account Is Blocked By Admin" })
        }

        return res.status(200).send({ status: true, findCust })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------BLOCK-BANK---------------------------------------------------------------------------------

const Block_Bank = async (req, res) => {

    try {

        const BankID = req.params.BankID

        if (!BankID) {
            return res.status(200).send({ status: false, msg: "Please enter Bank ID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Bank ID" })
        }

        let findCust = await customer_Bank.findOneAndUpdate({ _id: BankID }, { suspend: 1 })

        return res.status(200).send({ status: true, msg: "Bank Block Successfully " })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//---------------------------------------------BLOCK-BANK---------------------------------------------------------------------------------

const Un_Block_Bank = async (req, res) => {

    try {

        const BankID = req.params.BankID

        if (!BankID) {
            return res.status(200).send({ status: false, msg: "Please enter Bank ID" })
        }

        if (BankID < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Bank ID" })
        }

        let findCust = await customer_Bank.findOneAndUpdate({ _id: BankID }, { suspend: 0 })

        return res.status(200).send({ status: true, msg: "Bank Un Block Successfully " })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const OrgDashSection = async (req, res) => {
    try {

        const organisationID = req.params.ID;
        if (!organisationID) {
            return res.status(200).send({ Status: false, msg: "Not Geting Organisation ID" })
        }
        let findName = await Organisation.findOne({ _id: organisationID })
        let orgName = findName.name
        let orgEmail = findName.email
        let country = findName.country

        let findUsers = await transectionModel.find({ OrganisationID: organisationID });




        //-------------------------users-and-totaltransections---------------------------
        let totalTransection = 0;
        let count = 0
        for (items of findUsers) {
            totalTransection += items.sendingAmount
            count++;
        }

        //--------------------------find-total-use--------------------------------------------

        let finduser = await customerModel.find({ organisation: organisationID })

        let numberOFUSer = 0;
        for (Element of finduser) {
            numberOFUSer++
        }

        let data = {
            name: findName.name,
            totlaLicense: findName.totlaLicense,
            totalUser: numberOFUSer,
            totalTransection: count,
            email: orgEmail,
            country: country,
            image: findName.logo,
            name: findName.name,
            code: findName.code,
            phone: findName.phoneNo,
            country: findName.country,
            city: findName.city,
            postCode: findName.postCode,
            joining_date: findName.createdAt,
            address: findName.address,
            totalTransection_amount: totalTransection
        }

        console.log("data", data)
        return res.status(200).send({ status: true, data: data })
    } catch (error) {

        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


const AdminCust = async (req, res) => {
    try {

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await customerModel.find({ $or: option, isDeleted: 0 })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await customerModel.find({ isDeleted: 0 })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------------------------Organisation-List--------------------------------------------------------------------------


const AdminOrg = async (req, res) => {
    try {

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findOrg = await Organisation.find({ $or: option, isDeleted: 0 })

            return res.status(200).send({ status: true, findOrg })
        } else {

            let findOrg = await Organisation.find({ isDeleted: 0 })

            return res.status(200).send({ status: true, findOrg })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//----------------------------------------------Admin-blocked-customer-------------------------------------------------------------------------------------

const AdminBlockedCust = async (req, res) => {
    try {

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await customerModel.find({ $or: option, blocked: 1 })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await customerModel.find({ blocked: 1 })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const get_org_transections_months = async (req, res) => {
    try {

        const OrgID = req.params.orgID

        console.log(OrgID, "YTYUTY")

        if (!OrgID) {
            return res.status(200).send({ status: false, msg: "Please enter Organization ID" })
        }

        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        January = 458507, February = 56900, March = 178555, April = 129000, May = 400000, June = 785000, July = 456000, August = 589000, September = 100000, October = 560047, November = 7854, December = 0


        let find_Transac = await transectionModel.find({ OrganisationID: OrgID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })

        for (let i of find_Transac) {



            if (i.createdAt.getMonth() + 1 == 1) {
                January += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 2) {
                February += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 3) {
                March += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 4) {
                April += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 5) {
                May += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 6) {
                June += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 7) {
                July += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 8) {
                August += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 9) {
                September += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 10) {
                October += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 11) {
                November += i.sendingAmount
            } else if (i.createdAt.getMonth() + 1 == 12) {
                December += i.sendingAmount
            }
        }


        let obj = {
            January: January,
            February: February,
            March: March,
            April: April,
            May: May,
            June: June,
            July: July,
            August: August,
            September: September,
            October: October,
            November: November,
            December: December
        }

        return res.status(200).send({ status: true, obj })


    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization transection by months",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_org_transections_months/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const get_transctions = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 5 } = req.query;


        if (!orgID) {
            return re.status(200).send({ status: false, msg: "Please enter organization ID" })
        }

        if (Object.keys(req.body).length <= 1) {
            let findCust11 = await transectionModel.find({ OrganisationID: orgID })
            let findCust = await transectionModel.find({ OrganisationID: orgID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let contRow = findCust11.length
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findCust })

        } else if (req.body.name) {

            let option = [{ senderName: req.body.name }]


            let findCust11 = await transectionModel.find({ $or: option, OrganisationID: orgID })
            let findCust = await transectionModel.find({ $or: option, OrganisationID: orgID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let contRow = findCust11.length
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), findCust })
        }

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization transection by months",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_org_transections_months/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const OrgPerreort = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })

        }



        const LastMonthData = await customerModel.aggregate([
            {
                $match: {
                    organisation: orgID,
                    $expr: {
                        $and: [
                            {
                                "$eq": [
                                    {
                                        $month: "$createdAt"
                                    },
                                    {
                                        $month: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$eq": [
                                    {
                                        $year: "$createdAt"

                                    },

                                    {
                                        $year: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ])

        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const Current_Month = await customerModel.find({
            $and: [
                {
                    createdAt: {
                        $gte: startOfCurrentMonth,
                        $lt: startOfNextMonth
                    },
                    organisation: orgID
                },
            ],
        }).count();



        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()

        if (perDayLastMonth > perDayCurrMonth) {
            let Negetive = perDayLastMonth - perDayCurrMonth
            let nextMonthTarget = Negetive * 30
            let Target1 = nextMonthTarget + Last_Month
            let Target = Math.ceil(Target1)
            if (Target <= 0) {
                Target = 100
            }


            return res.status(200).send({ status: true, Negetive, Current_Month, Target, Last_Month, Today_date })

        } else {
            let positive = perDayCurrMonth - perDayLastMonth
            let nextMonthTarget = positive * 30
            let Target1 = nextMonthTarget + Last_Month
            let Target = Math.ceil(Target1)


            return res.status(200).send({ status: true, positive, Current_Month, Target, Last_Month, Today_date })
        }




    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }

}


const org_add_cust = async (req, res) => {
    try {

        const orgID = req.params.orgID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })
        }


        let currDate = new Date().getFullYear();

        let finalYear = currDate - 1

        let startTime = performance.now();
        cutomerModel.find({ organisation: orgID, createdAt: { $gte: `${finalYear}-01-31T09:37:32.320+00:00`, $lte: '2022-11-05T07:33:37.480+00:00' } }).then(result => {
            let newMonthsArray = new Array();
            let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let months = {};

            for (let i = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7)) - 1; i < 12; i++) {
                let year = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(0, 4)) - 1;
                let month = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7));
                newMonth = monthsArray[i] + '-' + year;
                newMonthsArray.push(newMonth);
                months[newMonth] = 0;
            }

            for (let i = 0; i < parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7)); i++) {
                let year = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(0, 4));
                let month = parseInt(`${currDate}-12-31T09:37:32.320+00:00`.substring(5, 7));
                newMonth = monthsArray[i] + '-' + year;
                newMonthsArray.push(newMonth);
                months[newMonth] = 0;
            }

            for (i = 0; i < result.length; i++) {
                let getDate = result[i].createdAt.toISOString();
                let year = getDate.substring(0, 4);
                let month = parseInt(getDate.substring(5, 7));
                let monthName = monthsArray[month - 1];
                let date = monthName + '-' + year;
                let count = Number(months[date]) + 1;
                months[date] = count;
            }

            let endTime = performance.now();
            return res.status(200).send({ Data: months, 'Execution time': endTime - startTime + ' mls' });
        });

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Customer Performance",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/org_add_cust/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


module.exports.createAdmin = createAdmin;
module.exports.AdminLogin = AdminLogin;
module.exports.getHistory = getHistory;
module.exports.admin_login = admin_login;
module.exports.verifyOTP = verifyOTP;
module.exports.OrganisationList = OrganisationList;
module.exports.SuspendOrganisation = SuspendOrganisation;
module.exports.Un_suspend_Organisation = Un_suspend_Organisation;
module.exports.deleteOrganisation = deleteOrganisation;
module.exports.AdminCustomerList = AdminCustomerList;
module.exports.suspendCustomer = suspendCustomer;
module.exports.UnsuspendCustomer = UnsuspendCustomer;
module.exports.DeleteCustomer = DeleteCustomer;
module.exports.UnBlockIP = UnBlockIP;
module.exports.admintransectionfillter = admintransectionfillter;
module.exports.adminProfile = adminProfile;
module.exports.changePassword = changePassword;
module.exports.forgotpassword = forgotpassword;
module.exports.changePasswordotp = changePasswordotp;
module.exports.CreateIPs = CreateIPs;
module.exports.blockIPList = blockIPList;
module.exports.updatelimits = updatelimits;
module.exports.viewtransection = viewtransection;
module.exports.adminProfileUpdate = adminProfileUpdate;
module.exports.updateAgentTransection = updateAgentTransection;
module.exports.admindash = admindash;
module.exports.custdetail = custdetail;
module.exports.approvalDIDs = approvalDIDs;
module.exports.blockedIDS = blockedIDS;
module.exports.blockedOrglist = blockedOrglist;
module.exports.getAllDIDs = getAllDIDs;
module.exports.recentUser = recentUser;
module.exports.recentTransection = recentTransection;
module.exports.adminAgent = adminAgent;
module.exports.viewAdminAgent = viewAdminAgent;
module.exports.updateAdminAgent = updateAdminAgent;
module.exports.deleteAgent = deleteAgent;
module.exports.blockedAgentsList = blockedAgentsList;
module.exports.addSubAdmin = addSubAdmin
module.exports.add_sub_admin_role = add_sub_admin_role
module.exports.updateSubAdminRoles = updateSubAdminRoles
module.exports.customerVerify = customerVerify;
module.exports.orgVerify = orgVerify;
module.exports.OrgCust = OrgCust;
module.exports.addFeeSetup = addFeeSetup;
module.exports.createCustomerByAdmin = createCustomerByAdmin
module.exports.pendingCust = pendingCust
module.exports.AgentReport = AgentReport
module.exports.recentAgentUser = recentAgentUser;
module.exports.findSubAdmin = findSubAdmin;
module.exports.subAdminRole = subAdminRole;
module.exports.orgLicenses = orgLicenses;
module.exports.findLicenses = findLicenses;
module.exports.add_Licenses = add_Licenses;
module.exports.viewFee = viewFee;
module.exports.updateFee = updateFee;
module.exports.addOrgDocument = addOrgDocument;
module.exports.find_Org_RemainingLicenses = find_Org_RemainingLicenses;
module.exports.viewDoc = viewDoc;
module.exports.findlowLicenseOrganisattions = findlowLicenseOrganisattions;
module.exports.emailRequestsByOrg = emailRequestsByOrg;
module.exports.customer_bank = customer_bank;
module.exports.agentEmailRequest = agentEmailRequest;
module.exports.bankWithCust = bankWithCust;
module.exports.Block_Bank = Block_Bank;
module.exports.Un_Block_Bank = Un_Block_Bank;
module.exports.OrgChart = OrgChart
module.exports.OrgTransectionChart = OrgTransectionChart;
module.exports.cust_organisation = cust_organisation;
module.exports.chrome_pay_logs = chrome_pay_logs;
module.exports.get_all_loans = get_all_loans
module.exports.Block_sub_admin = Block_sub_admin
module.exports.Unblock_sub_admin = Unblock_sub_admin
module.exports.admin_read_notification = admin_read_notification
module.exports.get_admin_cust_data_graph = get_admin_cust_data_graph
module.exports.Sub_admin_profil = Sub_admin_profil
module.exports.view_all_agents = view_all_agents
module.exports.globalImageUploader = globalImageUploader 
module.exports.OrgDashSection = OrgDashSection
module.exports.AdminCust = AdminCust
module.exports.AdminOrg = AdminOrg
module.exports.AdminBlockedCust = AdminBlockedCust
module.exports.agentPerformanceReport = agentPerformanceReport
module.exports.get_org_transections_months = get_org_transections_months
module.exports.get_transctions = get_transctions
module.exports.OrgPerreort = OrgPerreort
module.exports.org_add_cust = org_add_cust


