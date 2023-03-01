// const cutomerModel = require("../Models/customer")
// const orgBadLogs = require("../Models/OrgBadLogs")
// const Delete_DID_Notes = require("../models/Delete_DID_Notes");
// const { uploadFile } = require("../aws/aws.js");

const cutomerModel = require("../Models/customer")
const orgBadLogs = require("../Models/OrgBadLogs")
const Delete_DID_Notes = require("../Models/Delete_DID_Notes");
const { uploadFile } = require("../aws/aws.js");

const OrganisationCustomerTest = async (req, res) => {

    try {
        const OrganisationID = req.OrganisationID;
        const CustomerName = req.body.customerName;
        const status = req.body.Status



        let countpages = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
        let totlaRow = countpages.length


        if (!OrganisationID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 1) {
            let countpages1 = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send({ statussss: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
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

            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })




        }
        else if (req.body.ID.length <= 0 && req.body.phone.length <= 0 && req.body.phone.length <= 0 && req.body.status.length <= 0 && req.body.nationality.length <= 0 && req.body.fromDate.length <= 0 && req.body.toDate.length <= 0) {
            let countpages2 = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }


        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.ID.length > 2) {


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages2 = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }

        else {

            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, organisation: OrganisationID })
            let contRow3 = countpages3.length

            let filter = await cutomerModel.find({ $or: option, organisation: OrganisationID, isDeleted: 0, blocked: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totlaRow = filter.length;
            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })
        }

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Get Customer",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/OrganisationCustomerTest/:ID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


const blockCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;
        const Note = req.body.note

        console.log("blocked", userID)



        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        if (userID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }

        if (!Note) {
            return res.status(200).send({ status: false, msg: "Please write the reason of blocking" })
        }

        let checkUser = await cutomerModel.findOne({ _id: userID })
        if (!checkUser) {
            return res.status(200).send({ status: false, msg: "No User Found" })
        }
        if (checkUser.blocked == 1) {
            return res.status(200).send({ status: false, msg: "Customer Already Bolcked" })
        }


        let upadte_notes = await cutomerModel.findByIdAndUpdate({ _id: userID }, { Block_notes: Note })
        console.log("upadte_notes", upadte_notes)

        // let obj = {
        //     customerID: req.params.ID,
        //     blocked: true,
        //     Notes: Note

        // }

        // let add_note = await Blocked_Notes.create(obj)

        let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 1 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Block Sucessfully" })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Block DID",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/BlockCustomer/:ID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}




const UnblockCustomer = async (req, res) => {
    try {

        const userID = req.params.ID;
       // const Note = req.body.note

        console.log("blocked", userID)



        if (!userID) {
            return res.status(200).send({ status: false, msg: "Please enter CustomerID" })
        }

        if (userID.length !== 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid customer ID" })
        }




        let BlockUser = await cutomerModel.findOneAndUpdate({ _id: userID }, { blocked: 0 }, { new: true })

        return res.status(200).send({ status: true, msg: "Customer Un-block Sucessfully" })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Block DID",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/BlockCustomer/:ID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error })
    }
}


const DeleteCustomer = async (req, res) => {
    try {

        const customerID = req.params.ID
        const Note = req.body.note

        console.log("1231231231231")

        if (!customerID.length) {
            return res.status(200).send({ status: false, msg: "Customer Id is required" })
        }

        let findCUstomer = await cutomerModel.findOne({ _id: customerID })
        if (!findCUstomer) {
            return res.status(200).send({ status: false, msg: "Customer not found" })
        }

        if (findCUstomer.isDeleted == 1) {
            return res.status(200).send({ Status: false, msg: "Customer already deleted" })
        }
        let obj = {
            customerID: req.params.ID,
            deletd: true,
            Notes: Note
        }
        let add_note = await Delete_DID_Notes.create(obj)
        let update = await cutomerModel.findOneAndUpdate({ _id: customerID }, { isDeleted: 1 }, { new: true })
        return res.status(200).send({ status: true, msg: "Customer Deleted Sucessfully" })

    } catch (error) {
        // let obj = {
        //     IP: ip.address(),
        //     description: error,
        //     api: "Organization Delete Customer",
        //     apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/Delete/:ID"
        // }
        // let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

module.exports = {
    OrganisationCustomerTest, blockCustomer, UnblockCustomer, DeleteCustomer
}   