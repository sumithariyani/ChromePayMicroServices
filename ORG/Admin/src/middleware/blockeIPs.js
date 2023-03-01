const BlockedIPsModel = require("../models/blockedIPs")
var ip = require('ip');


const findBlockIPs = async (req, res, next) => {
    try {

        let UserIP = ip.address()

        let findIPs = await BlockedIPsModel.findOne({IP:UserIP});
        if(findIPs){
            return res.status(403).send({ status: false, msg: "You are not authorized for this activity, you are blocked" })
        }


        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports.findBlockIPs = findBlockIPs