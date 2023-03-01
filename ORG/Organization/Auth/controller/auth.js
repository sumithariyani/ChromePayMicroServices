const Organisation = require("../Models/Organisation")
const organisationLog = require("../Models/Organisationlog")
const BlockIP = require("../models/blockedIPs")
const adminModel = require("../Models/AdminModel")
const orgBadLogs = require("../Models/OrgBadLogs")
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const ip = require('ip')
const jwt = require('jsonwebtoken')



const organisationLogin = async (req, res, next) => {
    try {
        url = "http://localhost:3000/Login";
        //next();
        const email = req.body.email;
        const password = req.body.password;
        if (!email) {
            return res.status(200).send({ status: false, msg: "email field required" })
        }

        if (!password) {
            return res.status(200).send({ status: false, msg: "password field required" })
        }

        let findData = await Organisation.findOne({ email: email })


        if (!findData) {
            let time = Date.now();
            let UserIP = ip.address()
            return res.status(200).send({ status: false, msg: "Please enter valid email" })

        }

        const decryptedPassword = await bcrypt.compare(password, findData.password)

        if (!decryptedPassword) {
            let time = Date.now();
            let UserIP = ip.address()
            let data = {
                name: findData.name,
                email: email,
                ID: findData._id,
                loginTime: time,
                IP: UserIP,
                status: "Please enter valid email"

            };

            let admindata = await adminModel.findOne();
            let currStatus = await Organisation.findOne({ email: email })
            let wrongCount = currStatus.WrongPassword + 1;
            let update = await Organisation.findOneAndUpdate({ email: email }, { WrongPassword: wrongCount })
            let remainingchance = admindata.orgpasswordlimit - update.WrongPassword

            if (update.WrongPassword >= admindata.orgpasswordlimit) {
                let UserIP = ip.address()
                let data = {
                    IP: UserIP
                }
                let blockIP = await BlockIP.create(data)
                let update = await Organisation.findOneAndUpdate({ email: email }, { WrongPassword: 0 })

                setTimeout(async () => {
                    let UserIP = ip.address()
                    let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                }, "10000")

                let obj = {
                    IP: UserIP,
                    description: "Blocked due to enter wrong password",
                    api: "Login oeganization"
                }

                let create = await orgBadLogs.create(obj)
                return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

            }

            let createLogHistory = await organisationLog.create(data)
            return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });


        }
        let OrganisationID = findData._id;
        let name = findData.name;
        let phone = findData.phoneNo;
        let accessKeyId = findData.accessKeyId;
        let secretAccessKey = findData.secretAccessKey

        if (!findData.accessKeyId) {
            return res.status(200).send({ status: false, msg: "Missing access key" })
        }

        if (!findData.secretAccessKey) {
            return res.status(200).send({ status: false, msg: "Missing secret access Key" })
        }

        let token = jwt.sign({ OrganisationID, name, email, phone, accessKeyId, secretAccessKey }, 'GDHSFVHDF785DF1234DGFVDHF456354R')
        res.header("x-api-key", token);

        if (findData) {
            let time = Date.now();
            let UserIP = ip.address()

            let data = {
                name: findData.name,
                email: email,
                ID: findData._id,
                loginTime: time,
                IP: UserIP,
                status: "Login Sucessfully"

            };

            let createLogHistory = await organisationLog.create(data)
            let update = await Organisation.findOneAndUpdate({ email: email }, { WrongPassword: 0 })
            return res.status(200).send({ status: true,prof : "Oganization", 'token': token, 'ID': OrganisationID, msg: "Login Sucessfully" })
        } else {
            return res.status(200).send({ status: false, 'msg': "Invalid Data" })
        }


    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Login Organization",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000//Login"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        res.status(500).send({ status: false, error: { error } })
    }
}



const orgforgotpassword = async (req, res) => {
    try {


        const email = req.body.email;

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter your register email" })
        }


        let cheackEmail = await Organisation.findOne({ email: email })

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
                text: ' Hello! admin your OTP for change password is " ' + otp + ' " do not share this otp'
                // text : otp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('email error line 34 ===  ', error);
                    return false;
                } else {
                    console.log('Email sent: ' + info.messageId);
                    return info.messageId;
                }})};

        sentEmail();
        let updateOTP = await Organisation.findOneAndUpdate({ email: email }, { otp: otp })
        if (!updateOTP) {
            return res.status(200).send({ status: false, msg: "Agent not Found" })}
        return res.status(200).send({ status: true, msg: "Otp send Sucessfully" })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization forgot password",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/orgforgotpassword"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//----------------------------------------------------change-password------------------------------------------------------------------------------

const orgchangePasswordotp = async (req, res) => {
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

        // if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid password in between 6 to 10 character, password at least one number and one special caharacter" })
        // }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: "your confirm Password is not match" })
        }

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp, which you getting through your email" })
        }

        let checkOTP = await Organisation.findOne({ email: email })

        if (!checkOTP) {
            return res.status(200).send({ status: false, msg: "Please enter register email" })
        }

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(confirmPassword, saltRounds)

        let updatePassword = await Organisation.findOneAndUpdate({ email: email }, { password: encryptedPassword })

        if (!updatePassword) {
            return res.status(200).send({ status: false, msg: "Password not changed, Please try again" })
        }

        return res.status(200).send({ status: true, msg: "Password change sucessfully" })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization forgot password otp verify",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/orgchangePasswordotp"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

module.exports = {organisationLogin, orgforgotpassword, orgchangePasswordotp}