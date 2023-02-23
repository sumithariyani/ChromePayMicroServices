const agentModel = require("../Models/AgentModel")
const adminModel = require("../Models/AdminModel")
const logHistory = require("../Models/AgentLogHis")
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const ip = require('ip')
const jwt = require('jsonwebtoken')



const agent_login_new = async (req, res) => {
    try {

        const data = req.body;
        const { username, password } = data
        console.log("run check")

        if (!username) {
            return res.status(200).send({ status: false, msg: "Please enter email or phone number11" })}
        if (!password) {
            return res.status(200).send({ status: false, msg: "Please enter pasword" })}

        if (username.length > 29) {

            let find_customer = await cutomerModel.findOne({ digitalID: username })

            //conosle.log("12")

            if (!find_customer) {
                return res.status(200).send({ status: false, msg: "Please enter valid phone or email or didgital ID" })
            }

            if (find_customer.password != password) {
                return res.status(200).send({ status: false, msg: "Please enter valid password" })
            }

            let custID = find_customer._id
            let cust_email = find_customer.email

            let token = jwt.sign({ custID, cust_email }, 'GDHSFVHDF785DF1234DGFVDHF456354R')

            return res.status(200).send({ status: true, Login_status: "customer", msg: "Login sucessfully", token, custID })
        }

        if ((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(username)) {

            let find_agent = await agentModel.findOne({ email: username })

            if (find_agent) {

                const decryptedPassword = await bcrypt.compare(password, find_agent.password)

                if (!decryptedPassword) {
                    let UserIP = ip.address()
                    let AgentID = find_agent._id
                    let findLoginTime = Date.now();
                    let logData = {
                        email: find_agent.email,
                        UserID: find_agent._id,
                        loginTime: findLoginTime,
                        IP: UserIP,
                        status: "Please enter valid password",
                    }
                    let admindata = await adminModel.findOne();
                    let currStatus = await agentModel.findOne({ email: username })
                    let wrongCount = currStatus.WrongPassword + 1;
                    let update = await agentModel.findOneAndUpdate({ email: username }, { WrongPassword: wrongCount })
                    let remainingchance = admindata.agentpasswordlimit - update.WrongPassword

                    if (update.WrongPassword >= admindata.agentpasswordlimit) {
                        let UserIP = ip.address()
                        let data = {
                            IP: UserIP
                        }
                        let blockIP = await BlockIP.create(data)
                        let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })

                        setTimeout(async () => {
                            let UserIP = ip.address()
                            let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                        }, "10000")

                        return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

                    }

                    let MakeLogHIstory = await logHistory.create(logData);

                    return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
                }

                let agentID = find_agent._id;
                let name = find_agent.name
                let image = find_agent.image
                let orgID = find_agent.organisationID
                let token = jwt.sign({ name, agentID, orgID, username, }, 'GDHSFVHDF785DF1234DGFVDHF456354R')
                let setTooken = await agentModel.findOneAndUpdate({ email: find_agent.email }, { token: token })
                let UserIP = ip.address()
                let AgentID = find_agent._id;
                let findLoginTime = Date.now();
                let logData = {
                    email: find_agent.email,
                    UserID: find_agent._id,
                    loginTime: findLoginTime,
                    IP: UserIP,
                    status: "Login Sucessfull",

                }
                let MakeLogHIstory = await logHistory.create(logData);
                let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })
                return res.status(200).send({ status: true, Login_status: "agent", msg: "Login Sucessfull", token: token, ID: agentID, orgID: orgID, name : name, image : image })

            } else {

                let find_customer = await cutomerModel.findOne({ email: username })
                if (!find_customer) {
                    return res.status(200).send({ status: false, msg: "Please enter valid phone or email" })
                }
                if (find_customer.password != password) {
                    return res.status(200).send({ status: false, msg: "Please enter valid password" })
                }
                let custID = find_customer._id
                let cust_email = find_customer.email

                let token = jwt.sign({ custID, cust_email }, 'GDHSFVHDF785DF1234DGFVDHF456354R')

                return res.status(200).send({ status: true, Login_status: "customer", msg: "Login sucessfully", token, custID })

            }

        } else {


            let find_agent = await agentModel.findOne({ phone: username })

            if (find_agent) {

                const decryptedPassword = await bcrypt.compare(password, find_agent.password)

                if (!decryptedPassword) {
                    let UserIP = ip.address()
                    let AgentID = find_agent._id

                    let findLoginTime = Date.now();

                    let logData = {
                        email: find_agent.email,
                        UserID: find_agent._id,
                        loginTime: findLoginTime,
                        IP: UserIP,
                        status: "Please enter valid password",

                    }

                    let admindata = await adminModel.findOne();
                    let currStatus = await agentModel.findOne({ email: find_agent.email })
                    let wrongCount = currStatus.WrongPassword + 1;
                    let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: wrongCount })
                    let remainingchance = admindata.agentpasswordlimit - update.WrongPassword
                    if (update.WrongPassword >= admindata.agentpasswordlimit) {
                        let UserIP = ip.address()
                        let data = {
                            IP: UserIP
                        }
                        let blockIP = await BlockIP.create(data)
                        let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })
                        setTimeout(async () => {
                            let UserIP = ip.address()
                            let findIP = await BlockIP.findOneAndDelete({ IP: UserIP })

                        }, "10000")
                        return res.status(200).send({ status: false, msg: "You are blocked due to access try Please try againn after 10 mintutes" })

                    }

                    let MakeLogHIstory = await logHistory.create(logData);
                    return res.status(200).send({ status: false, msg: `Invalid password remaining chances ${remainingchance}` });
                }

                let agentID = find_agent._id;
                let name = find_agent.name
                let image = find_agent.image
                let orgID = find_agent.organisationID
                let token = jwt.sign({ name, agentID, orgID, username, }, 'GDHSFVHDF785DF1234DGFVDHF456354R')
                let setTooken = await agentModel.findOneAndUpdate({ email: find_agent.email }, { token: token })
                let UserIP = ip.address()
                let AgentID = find_agent._id;
                let findLoginTime = Date.now();
                let logData = {
                    email: find_agent.email,
                    UserID: find_agent._id,
                    loginTime: findLoginTime,
                    IP: UserIP,
                    status: "Login Sucessfull",
                }
                let MakeLogHIstory = await logHistory.create(logData);
                let update = await agentModel.findOneAndUpdate({ email: find_agent.email }, { WrongPassword: 0 })
                return res.status(200).send({ status: true, Login_status: "agent", msg: "Login Sucessfull", token: token, ID: agentID, orgID: orgID , name : name, image : image})
            } else {



                let find_customer = await cutomerModel.findOne({ phone: username })

                if (!find_customer) {
                    return res.status(200).send({ status: false, msg: "Please enter valid phone or email" })
                }

                if (find_customer.password != password) {
                    return res.status(200).send({ status: false, msg: "Please enter valid password" })
                }

                let custID = find_customer._id
                let cust_email = find_customer.email

                let token = jwt.sign({ custID, cust_email }, 'GDHSFVHDF785DF1234DGFVDHF456354R')

                return res.status(200).send({ status: true, Login_status: "customer", msg: "Login sucessfully", token, custID })

            }
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
    
}


//-------------------------------forgotPassword--------------------------------------------------

const forgotpassword = async (req, res) => {
    try {

        const email = req.body.email;
        console.log(email)
        let cheackEmail = await agentModel.findOne({ email: email })

        if (!cheackEmail) {
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
                text: 'your OTP for change password is " ' + otp + ' " do not share this otp'
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


        let updateOTP = await agentModel.findOneAndUpdate({ email: email }, { otp: otp })

        if (!updateOTP) {
            return res.status(200).send({ status: false, msg: "Agent not Found" })
        }

        return res.status(200).send({ status: true, msg: "Otp send Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//------------------------------------------------------verify-otp-----------------------------------------------------------------------------

const ForgetPassVerifyOtp = async (req, res) => {
    try {

        const otp = req.body.otp;
        const email = req.body.email

        if (!otp) {
            return res.status(200).send({ status: false, msg: "Please enter otp, which you getting through your email" })
        }

        if (!email) {
            return res.status(200).send({ status: false, msg: "Please enter email" })

        }

        let checkOTP = await agentModel.findOne({ email: email })

        if (checkOTP.otp != otp) {
            return res.status(200).send({ status: false, msg: "Please enter valid otp" })
        }

        return res.status(200).send({ status: true, msg: "OTP Verified Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}

//-------------------------------------frogotchangepassword----------------------------------------------------------------------------------------


const ForgotchangePass = async (req, res) => {
    try{

        const email = req.body.email;
        const newpassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword

       

        if (!newpassword) {
            return res.status(200).send({ status: false, msg: "Please enter new Password" })
        }
        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm password" })
        }
        if(newpassword !== confirmPassword){
            return res.status(200).send({ status: false, msg: "Confirm password not match" })
        }
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(confirmPassword, saltRounds)
        let updatePassword = await agentModel.findOneAndUpdate({ email: email }, { password: encryptedPassword })
        

        if(updatePassword){
            return res.status(200).send({ status: false, msg: "Password Change Succesfully" })

        }else{
            return res.status(200).send({ status: false, msg: "Falied Please try again" })
        }





    }catch(error){
        console.log(error)
    }
}

module.exports = {agent_login_new, forgotpassword, ForgetPassVerifyOtp, ForgotchangePass}