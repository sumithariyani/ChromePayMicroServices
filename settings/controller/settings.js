
const agentModel = require("../Models/AgentModel")
const bcrypt = require('bcrypt')

const agentProfile = async (req, res) => {
    try {

        const agentID = req.agentId;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "not getting adminID" })}

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })}
            
        let filter = await agentModel.findOne({ _id: agentID }).select({
            name: 2, email: 1, _id: 1, password: 1, country: 1,
            phone: 1, address: 1, city: 1, postCode: 1, transectionLimit: 1
        })

        if (!filter) {
            return res.status(200).send({ status: false, msg: "agent not found" })}
            return res.status(200).send({ status: true, filter })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//------------------------------------------agent-profile-update------------------------------------------------------------------------------

const agentProfileUpdate = async (req, res) => {
    try {

        const agentID = req.agentId;

        const data = req.body;
        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }
        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid agentID" })
        }
        const { name, email, phone, agentCode, country, address, city, postCode, password, transectionLimit, organisationID } = data

        final = {
            name: name,
            email: email,
            phone: phone,
            agentCode: agentCode,
            country: country,
            address: address,
            city: city,
            postCode: postCode,
            password: password,
            transectionLimit: transectionLimit,
            organisationID: organisationID
        }

        let upadte = await agentModel.findOneAndUpdate({ _id: agentID }, final, { new: true })

        if (!upadte) {
            return res.status(200).send({ status: false, msg: "agent not found" })
        }

        return res.status(200).send({ status: true, msg: "Profile Updated sucessfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({})
    }
}


const agentchangePassword = async (req, res) => {
    try {



        const agentID = req.agentId;
        const oldPaasword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        console.log("newpass", newPassword)

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "agentID not getting" })
        }

        if (!oldPaasword) {
            return res.status(200).send({ status: false, msg: "Please enter oldPassword" })
        }

        if (!newPassword) {
            return res.status(200).send({ status: false, msg: "Please enter new password" })
        }

        if (!newPassword.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
            return res.status(200).send({ status: false, msg: "Please111 enter valid password, password at least one number and one special caharacter" })
        }


        if (!confirmPassword) {
            return res.status(200).send({ status: false, msg: "Please enter confirm Password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(200).send({ status: false, msg: " Your confirm password is not match" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let findadmin = await agentModel.findOne({ _id: agentID })
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(confirmPassword, saltRounds)
        const decryptedPassword = await bcrypt.compare(oldPaasword, findadmin.password)


        if (!findadmin) {
            return res.status(200).send({ status: false, msg: "organisation not found" })
        }


        if (!decryptedPassword) {
            return res.status(200).send({ status: false, msg: "Please enter valid old password" })
        }

        let findadmin1 = await agentModel.findOneAndUpdate({ _id: agentID }, { password: encryptedPassword })

        return res.status(200).send({ status: true, msg: "Password Change Sucessfully" })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}



module.exports = { agentProfile, agentProfileUpdate, agentchangePassword }