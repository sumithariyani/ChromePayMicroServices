const apimodel = require("../models/apiHistory")


const apiHistory = async (req, res, next) => {
    try {

        let userID = req.userId;

        let apiurl = url

        let currTime = Date.now();

        const ipAddress = req.socket.remoteAddress;

        var ip = require('ip');



        let data = {
            url: apiurl,
            time: currTime,
            userID: userID,
            IPAdress: ip.address(),
            status: "Success",
            BY: By
        }
        let storeApiDetail = await apimodel.create(data);


    } catch (error) {
        console.log(error)
    }
}


//-------------------------------------Get-history-api-------------------------------------------------------------------------------------//

const getApiHistory = async (req, res, next) => {
    try {

        //---------------pagination------------------------
        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }

        const { page = pageNO, limit = 10 } = req.query;

        let countpages11 = await apimodel.find();
        counPages = Math.ceil(countpages11.length / 10)


        let findHistory = await apimodel.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return res.status(500).send({ status: true, totalPages: counPages, currenPage: parseInt(pageNO), data: findHistory })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}

module.exports.apiHistory = apiHistory;
module.exports.getApiHistory = getApiHistory;