const Organisation = require("../Models/Organisation")
const orgBadLogs = require("../Models/OrgBadLogs")
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const ip = require('ip')
const { uploadFile } = require("../aws/aws.js");



// const updateAgentTransection = async (req, res) => {
//     try {

//         const agentID = req.body.agentID;
//         const limit = req.body.limit;




//         const adminID = req.params.adminID

//         let findsubAdminID = await subAdmin.findOne({ _id: adminID })

//         if (findsubAdminID) {
//             let findRole = await sub_admin_role.findOne({ adminID: adminID })

//             let customerRole = findRole.Agent.updateAgent

//             if (customerRole == 0) {
//                 return res.status(200).send({ status: false, msg: "You are not allow to update transaction limit, Contact admin to access update transaction limit" })

//             }

//         }

//         if (!agentID) {
//             return res.status(200).send({ status: false, msg: "not getting agent ID" })
//         }

//         if (agentID.length < 24) {
//             return res.status(200).send({ status: false, msg: "Please enter valid agent ID" })
//         }

//         let findAgent = await AgentModel.findOne({ _id: agentID })

//         if (!findAgent) {
//             return res.status(200).send({ status: false, msg: "no agent found" })
//         }

//         if (findAgent.blocked == 1) {
//             return res.status(200).send({ status: false, msg: "agent is blocked" })
//         }

//         if (findAgent.isDeleted == 1) {
//             return res.status(200).send({ status: false, msg: "no agent found" })
//         }


//         let upadteAgent = await AgentModel.findOneAndUpdate({ _id: agentID }, { transectionLimit: limit })

//         if (!upadteAgent) {
//             return res.status(200).send({ staus: false, msg: "limit update process failed please try again" })
//         }

//         return res.status(200).send({ status: true, msg: "limit update sucessfully" })



//     } catch (error) {
//         console.log(error)
//         return res.status(200).send({ status: false, msg: error.message })
//     }
// }

const findLicenses = async (req, res) => {
    try {

        const orgID = req.OrganisationID;

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

const orgLicenses = async (req, res) => {
    try {

        let orgID = req.OrganisationID;



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


const changePassword = async (req, res) => {
    try {

        const orgID =  req.OrganisationID;
        const oldPaasword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "orgID not getting" })
        }

        if (!oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter oldPassword" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new password" })
        }

        // if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {
        //     return res.status(200).send({ status: false, msg: "Please enter valid password, password at least one number and one special caharacter" })
        // }

        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: " Your confirm password is not match" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        let findadmin = await Organisation.findOne({ _id: orgID })



        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "organisation not found" })
        }

        const decryptedPassword = await bcrypt.compare(oldPaasword, findadmin.password)



        if (!decryptedPassword) {
            return res.status(200).send({ status: false, msg: "Please enter valid old password" })
        }
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)
        let findadmin1 = await Organisation.findOneAndUpdate({ _id: orgID }, { password: encryptedPassword })
        return res.status(200).send({ status: true, msg: "Password Change Sucessfully" })

    } catch (error) {                                               
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization forgot password",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/OrgchangePassword/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        conosle.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const org_update = async (req, res) => {
    try {

        const orgID = req.OrganisationID;
        let files = req.files;


        if (!orgID) {
            return res.status(200).send({ status: falsle, msg: "enter orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgID" })
        }

        if (files.length > 0) {

            let data = req.body;

            const profilePicture = await uploadFile(files[0])




            const { logo, code, name, phone, email, country, city, joiningDate, postCode, address } = data

        
            let checkPhone = await Organisation.findOne({ phoneNo: phone })

            let checkEmail = await Organisation.findOne({ email: data.email })


            let finalData = {
                logo: profilePicture,
                name: name,
                phoneNo: phone,
                email: email,
                country: country,
                city: city,
                postCode: postCode,
                address: address,
               
            }


            let update = await Organisation.findOneAndUpdate({ _id: orgID }, finalData)

            if (!update) {
                return res.status(200).send({ status: false, msg: "org not found" })
            }


            return res.status(200).send({ status: true, msg: "profile updated sucessfully" })

        } else {


            let data = req.body;
            let files = req.files;

            const { code, name, phone, email, country, city, joiningDate, postCode, address, password } = data

            let checkPhone = await Organisation.findOne({ phoneNo: phone })
            const saltRounds = 10
            const encryptedPassword = await bcrypt.hash(password, saltRounds)


            let checkEmail = await Organisation.findOne({ email: data.email })

            let finalData = {
                name: name, phoneNo: phone, email: email,
                country: country, city: city,
                postCode: postCode, address: address, password: encryptedPassword
            }

            let update = await Organisation.findOneAndUpdate({ _id: orgID }, finalData, { new: true })

            if (!update) {
                return res.status(200).send({ status: false, msg: "org not found" })
            }



            return res.status(200).send({ status: true, msg: "profile updated sucessfully" })


        }
    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Update",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/org_update/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const vieworg = async (req, res) => {
    try {

        const orgID = req.OrganisationID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting orgID" })
        }

        if (orgID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid orgDI" })
        }

        let data = await Organisation.findOne({ _id: orgID })
        return res.status(200).send({ status: true, data })




    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: " view organization",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/vieworg/:orgID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
    }
}


module.exports = {findLicenses, orgLicenses, changePassword, org_update, vieworg}