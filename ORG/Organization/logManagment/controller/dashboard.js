

const Agent_logs = require("../Models/AgentLogHis")
const userLogs = require("../Models/Customer_logs")
const cutomerModel = require("../Models/customer")
const orgBadLogs = require("../Models/OrgBadLogs")
const AgentModel = require("../Models/AgentModel")



const get_agent_LogHistory = async (req, res) => {
    try {




        //-----------------Pagination-----------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await Agent_logs.find();
        counPages = Math.ceil(countpages11.length / 10)

        let findHistory = await Agent_logs.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let result = []
        for (items of findHistory) {

            let data = {
                Name: items.name,
                Email: items.email,
                ID: items.ID,
                status: items.status,
                Date: items.loginTime.toISOString().substring(0, 10),
                Time: items.loginTime.toISOString().substring(12, 19)

            }
            result.push(data)
        }


        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error })
    }
}


const get_user_LogHistory = async (req, res) => {
    try {




        //-----------------Pagination-----------------------------------//
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await userLogs.find();
        counPages = Math.ceil(countpages11.length / 10)

        let findHistory = await userLogs.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        let result = []
        for (items of findHistory) {

            let data = {
                Name: items.name,
                Email: items.email,
                ID: items.ID,
                status: items.status,
                Date: items.createdAt.toISOString().substring(0, 10),
                Time: items.createdAt.toISOString().substring(12, 19)

            }
            result.push(data)
        }


        return res.status(200).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: result })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error })
    }
}


const org_blocked_custmers = async (req, res) => {
    try {
        let orgID = req.OrganisationID
        if (req.body.fromDate) {
            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cutomerModel.find({ organisation: orgID, $or: option, blocked: 1 })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cutomerModel.find({ blocked: 1 })

            return res.status(200).send({ status: true, findCust })

        }
    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "organization agent performance",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/Org_get_agent_cut_month/:agentID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const Org_cust = async (req, res) => {
    try {

        const orgID = req.OrganisationID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID ID" })
        }

        if (orgID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting orgID agentID" })
        }

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await cutomerModel.find({ $or: option, organisation: orgID })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await cutomerModel.find({ organisation: orgID })

            return res.status(200).send({ status: true, findCust })

        }






    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const Org_Agents = async (req, res) => {
    try {

        const orgID = req.OrganisationID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter orgID ID" })
        }

        if (orgID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting orgID agentID" })
        }

        if (req.body.fromDate) {

            let option = [
                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(req.body.toDate).toISOString()
                    }
                }
            ]

            let findCust = await AgentModel.find({ $or: option, organisationID: orgID })

            return res.status(200).send({ status: true, findCust })
        } else {

            let findCust = await AgentModel.find({ organisationID: orgID })

            return res.status(200).send({ status: true, findCust })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

module.exports = {get_agent_LogHistory, get_user_LogHistory, org_blocked_custmers, Org_Agents, Org_cust}