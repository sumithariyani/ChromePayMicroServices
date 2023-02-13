const cutomerModel = require('../Models/customer')
const transectionModel = require("../Models/transaction")
const Loan_applay_customer = require("../Models/Loan_apllied_by")
const License_fee = require("../models/org_LicensesFees")
const org_Licenses = require("../Models/OrgLicenses")

//test



const AgentAwaiting = async (req, res) => {
    try {

        const agentID = req.agentId
        const CustomerName = req.body.customerName;
        const status = req.body.Status

        console.log("agentID", agentID)


        let countpages = await cutomerModel.find({ createdBY: agentID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length    
        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agnet ID" })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        console.log("Pagbe_NO", pageNO)
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 2) {
            let countpages1 = await cutomerModel.find({ createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            console.log("agent_ID", agentID)
            let filter = await cutomerModel.find({ createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {



            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }, {
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }

        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        } else if (req.body.ID.length > 2) {


            let option = [{ _id: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;


            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }
        else {

            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, createdBY: agentID, status: 'pending' })
            let contRow3 = countpages3.length

            let filter = await cutomerModel.find({ $or: option, createdBY: agentID, isDeleted: 0, status: 'pending' }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();


            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const Agent_dash_main = async (req, res) => {
    try {
        const agentID = req.agentId;
        const orgId = req.orgId;
        let finduser = await cutomerModel.find({ createdBY: agentID }).sort({ createdAt: -1 }).limit(5);
        let findTrans = await transectionModel.find().limit(5).sort({ createdAt: -1 })
        let findNoOfuser = await cutomerModel.find({ createdBY: agentID }).count()
        let findLicenseFees = await License_fee.findOne({ OrganisationID: orgId }).select({ recuuringFees: 1, perLicenseFee: 1 });
        let findLoanApplication = await Loan_applay_customer.find({ agentID: agentID }).count();
        let findCust = await cutomerModel.find({ organisation: agentID, isDeleted: 0 })
        let totalCust = findCust.length;
        let findorg = await org_Licenses.findOne({ OrganisationID: orgId })
        console.log("findorg", findorg)
        let totalLicense = findorg.totalLicenses
        let remaning_Licenses = totalLicense - totalCust

        return res.status(200).send({ status: true, findNoOfuser, findLicenseFees, findLoanApplication, totalCust, remaning_Licenses, finduser, findTrans })
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



module.exports = { AgentAwaiting, Agent_dash_main }