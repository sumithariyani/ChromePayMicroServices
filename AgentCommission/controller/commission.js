
const agent_Commission_His = require("../Models/AgentCommissinHistory")




const commissionlist = async (req, res) => {
    try {

        const agentID = req.agentId ;
        const data = req.body;
        const { toDate, fromDate } = data
        console.log("123123132")

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agentID" })
        }

        if (agentID.length != 24) {
            return res.status(200).send({ status: false, msg: "not getting valid agentID" })
        }

        //---------------------pagination----------------------------------

        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1;
        }
        const { page = pageNO, limit = 10 } = req.query;

        console.log(pageNO, "laskdjhflhjdgf lajsd dhgsf ")

        console.log(typeof pageNO)

        //-----------------------------------------------------------------

        if (!toDate.length && !fromDate.length) {
            console.log("save date1213")
            let countpages1 = await agent_Commission_His.find({ agentID: agentID }).sort({ createdAt: 1 })
            let totalRaow1 = countpages1.length;



            let filter = await agent_Commission_His.find({ agentID: agentID }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            let result = []
            for (let i of filter) {

                var hours = i.createdAt.getHours();
                var minutes = i.createdAt.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; 
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                console.log(strTime)

                var Date1 = i.createdAt.toISOString().substring(0, 10)
                // var Time1 = i.createdAt.toISOString().substring(12, 19)

                let obj1 = {
                    _id: i._id,
                    custPhoto: i.custPhoto,
                    custName: i.custName,
                    commission: i.commission,
                    transactionId: i.transactionID,
                    Date: Date1,
                    Time: strTime
                }
                result.push(obj1)
            }

            return res.status(200).send({ status: true, totlaRow: totalRaow1, currenPage: parseInt(pageNO), filter: result })
        } else if (req.body.fromDate.length > 0) {
            console.log("save date")
            var toDate1 = req.body.toDate
            let date = parseInt(toDate1.slice(8, 10)) + 1
            let year_month = toDate1.slice(0, 7)
            let final_to_date = `${year_month}-${date}`



            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new Date(final_to_date).toISOString()
                    }
                }

            ]

            let countpages2 = await agent_Commission_His.find({ agentID: agentID, $or: option })
            let contRow = countpages2.length
            let filter = await agent_Commission_His.find({ agentID: agentID, $or: option }).sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            let totlaRow = filter.length;
            let result = []
            for (let i of filter) {
                var hours = i.createdAt.getHours();
                var minutes = i.createdAt.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                console.log(strTime)

                var Date1 = i.createdAt.toISOString().substring(0, 10)
                // var Time1 = i.createdAt.toISOString().substring(12, 19)

                let obj1 = {
                    _id: i._id,
                    custPhoto: i.custPhoto,
                    custName: i.custName,
                    commission: i.commission,
                    transactionId: i.transactionID,
                    Date: Date1,
                    Time: strTime
                }
                result.push(obj1)
            }
            return res.status(200).send({ status: true, totlaRow: contRow, currenPage: parseInt(pageNO), filter: result })

        }


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}




module.exports = {commissionlist}