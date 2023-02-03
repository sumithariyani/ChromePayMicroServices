const cutomerModel = require('../Models/customer')



const agentCustomerList = async (req, res) => {

    try {

        const adminID = req.agentId;
        let countpages = await cutomerModel.find({ createdBY: adminID, isDeleted: 0 }).sort({ createdAt: -1 })
        let totlaRow = countpages.length
        if (!adminID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })
        }
        if (adminID.length < 24) {
            return res.status(200).send({ status: false, msg: "not getting valid adminID" })
        }

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        const { page = pageNO, limit = 10 } = req.query;
        let ID1 = req.body.ID

        if (Object.keys(req.body).length <= 2) {
            let countpages1 = await cutomerModel.find({ createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
            let totalRaow1 = countpages1.length;
            let filter = await cutomerModel.find({ createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

              console.log("filter",filter)
            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter })
        } else if (req.body.nationality) {
            let option = [{ nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.fromDate) {

            let option = [{
                createdAt: {
                    $gte: new Date(req.body.fromDate).toISOString(),
                    $lte: new Date(req.body.toDate).toISOString()
                }
            }]



            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })

            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })
        }
        else if (req.body.ID && req.body.ID > 0) {
            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        } else if (req.body.ID.length > 2) {


            let option = [{ digitalrefID: req.body.ID }, { phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]

            let countpages2 = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" })
            let contRow = countpages2.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter })

        }
        else {

            let option = [{ phone: req.body.phone }, { status: req.body.status }, { nationality: req.body.nationality }]
            let countpages3 = await cutomerModel.find({ $or: option, createdBY: adminID, status: "verified", isDeleted: 0, })
            let contRow3 = countpages3.length
            let filter = await cutomerModel.find({ $or: option, createdBY: adminID, isDeleted: 0, status: "verified" }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let totlaRow = filter.length;

            return res.status(200).send({ status: true, totlaRow: contRow3, currenPage: parseInt(pageNO), filter })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


module.exports = {agentCustomerList}