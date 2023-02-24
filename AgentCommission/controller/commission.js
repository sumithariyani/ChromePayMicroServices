
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
            let toDate = new Date(req.body.toDate).toISOString()
            console.log("1213212123123123")
            let new_per = new Date()
            new_per.setDate(new_per.getDate() + 1);


            let date_num = Number(toDate)
            console.log("check permisioin", new_per)

            let option = [

                {
                    createdAt: {
                        $gte: new Date(req.body.fromDate).toISOString(),
                        $lte: new_per.toISOString() 
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