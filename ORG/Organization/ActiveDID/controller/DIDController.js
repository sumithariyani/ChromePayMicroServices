// const cutomerModel = require("../Models/customer")
// const orgBadLogs = require("../Models/OrgBadLogs")
// const Delete_DID_Notes = require("../models/Delete_DID_Notes");
// /./const { uploadFile } = require("../aws/aws.js");

const cutomerModel = require("../Models/customer")
const orgBadLogs = require("../Models/OrgBadLogs")
const Delete_DID_Notes = require("../Models/Delete_DID_Notes");
const Wallet_MOdel = require("../Models/Cust_Wallet")
const transactionModel = require("../Models/Chrome_pay_Transections")
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




//-----------------------------Wallet-section-----------------------------------------------------------------------------

const get_Cust_wallet = async (req, res, next) => {
    try {
        url = "/get_Cust_wallet/: custID"
        By = "Agent"

        const custID = req.params.custID;


        if (!custID) {
            return res.statsu(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid custID" })
        }

        let find_cust_wallet = await Wallet_MOdel.findOne({ customer_ID: custID })
            .populate('customer_ID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1, 'email': 1, 'profession': 1, "nationality": 1 })

        let find_total_sending_Transections = await transactionModel.find({ senderID: custID })
        let find_total_reciving_Transections = await transactionModel.find({ recieverID: custID })



        let sending_amount = 0
        for (let i of find_total_sending_Transections) {
            sending_amount += i.sendingAmount
        }


        let recived_amount = 0;
        for (let i of find_total_reciving_Transections) {
            recived_amount += i.receivingAmount
        }



        next();
        return res.status(200).send({ status: true, sending_amount, recived_amount, find_cust_wallet })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//------------------------------------------------Chrome_pay_wallet_Transection------------------------------------------------------------------

const Chrome_pay_transection = async (req, res, next) => {
    try {
        url = "Chrome_pay_transection";
        By = "Agent"


        const sender_phone = req.body.sender_phone;
        const reciever_phone1 = req.body.receiver_phone;
        const reciever_phone = parseInt(reciever_phone1)
        const amount1 = req.body.amount;
        const amount = parseInt(amount1)
        const custID = req.params.custID;


        //----------------------------VALIDATIONS---------------------------------------------------------------
        if (!custID) {
            return res.status(200).send({ status: false, msg: "please enter customer ID" })
        }

        let find_Limit = await Wallet_MOdel.findOne({ customer_ID: custID })

        if (amount > find_Limit.current_Amount) {
            return res.status(200).send({ status: false, msg: `Failed!, Insufficient Fund` })
        }

        let tran_limit = find_Limit.Transection_limit
        let phoneNO = find_Limit.phone
        let walletAdress = find_Limit.wallet_Address.slice(42, 46)
        let Date1 = new Date();
        let currentDAte = Date1.getDate();
        let current_Month = Date1.getMonth() + 1;
        let current_year = Date1.getFullYear();
        let today_date = `${currentDAte}-${current_Month}-${current_year}`

        var d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        let current_time = `${h}-${m}-${s}`




        if (reciever_phone == phoneNO) {
            return res.statsu(200).send({ status: false, msg: "Permission denied!, your phone number is same" })
        }

        if (amount > tran_limit) {
            return res.status(200).send({ status: false, msg: `Failed!, Maximum limit for transection ${tran_limit}` })
        }

        if (!reciever_phone) {
            return res.status(200).send({ status: false, msg: "please fill all fields " })
        }

        if (!amount1) {
            return res.status(200).send({ status: false, msg: "please fill all fields" })
        }

        let findrecieverID = await Wallet_MOdel.findOne({ phone: reciever_phone })

        if (!findrecieverID) {
            return res.status(200).send({ status: false, msg: "Receiver is not available" })
        }

        let wallet_address = findrecieverID.wallet_Address

        if (!findrecieverID) {
            return res.status(200).send({ status: false, msg: "This user is not available in chrome pay" })
        }

        let find_Wallet_MOdel = await Wallet_MOdel.findOne({ customer_ID: custID })
            .populate('customer_ID', { 'fullname': 1, 'IDphoto': 1, 'digitalID': 1, 'phone': 1 })

        let findrecevrID = await Wallet_MOdel.findOne({ phone: reciever_phone })
        let findrecevrID1 = await cutomerModel.findOne({ phone: reciever_phone })



        if (!findrecevrID) {
            return res.status(200).send({ status: false, msg: "Receiver is not available" })
        }

        //-------------------------------------------STORE-DATA---------------------------------------------------------



        const PCNnumber = generateString(10).toLowerCase()
        const TransactionID = generateString11(10)


        sendername = find_Wallet_MOdel.customer_ID.fullname,
            receivername = findrecevrID1.fullname
        reciever_ID = findrecevrID.customer_ID


        let data = {
            transactionID: TransactionID,
            senderID: custID,
            recieverID: reciever_ID,
            transactionDate: today,
            PCN: PCNnumber,
            senderName: sendername,
            recieverName: receivername,
            sendingAmount: amount,
            receivingAmount: amount,
            Relationship: "",
            status: "Confirmed",
        }

        let failedData = {
            senderID: custID,
            recieverID: reciever_ID,
            transactionDate: today,
            PCN: PCNnumber,
            senderName: sendername,
            recieverName: receivername,
            sendingAmount: amount,
            receivingAmount: amount,
            Relationship: "",
            status: "Failed"

        }

        let create = await transactionModel.create(data)





        if (create) {


            //---------------------manage-account-amount-----------------------------------------------------------------------

            //---------------sender-amount---------------------------------------------------------
            let find_Current_Amount = await Wallet_MOdel.findOne({ customer_ID: custID })
            let curr_amount = find_Current_Amount.current_Amount
            let substracting_amount = curr_amount - amount
            const find_sender_account = await Wallet_MOdel.findOneAndUpdate({ customer_ID: custID }, { current_Amount: substracting_amount })

            //--------------reciver-amount---------------------------------------------------------

            let find_reciver_Current_Amount = await Wallet_MOdel.findOne({ phone: reciever_phone })
            let reciver_curr_amount = find_reciver_Current_Amount.current_Amount
            let add_amount = reciver_curr_amount + amount
            const find_reciver_account = await Wallet_MOdel.findOneAndUpdate({ phone: reciever_phone }, { current_Amount: add_amount })

            //------------------------send-messege-to-sender------------------------------------------------------------------------
            const send_mobile_otp = async (req, res) => {

                let mobile = 9877487381 //phoneNO
                let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=W/A+${654}+debited+$+${amount}+DT+${123}+${123}+thru+${654}+$+${amount}+Not+u?Fwd+this+SMS+to+Chrome+pay+to+block+Chrome+pay+wallet+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

                try {
                    return await axios.get(url).then(function (response) {

                        return response;
                    });
                } catch (error) {
                    console.log(error);
                }
            }

            send_mobile_otp();

            const sentEmail = async (req, res) => {

                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'chrmepay123@gmail.com',
                        pass: 'zawuovwktnkeejlg',
                    }
                });

                //sumit.hariyani2@gmail.com
                var mailOptions = {
                    from: 'chrmepay123@gmail.com',
                    to: 'sumit.hariyani2@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: `W/A XXXXXXX${654} debited $${amount} DT ${today_date} ${current_time} thru XXXXXXX${654} $ ${amount} Not u?Fwd this SMS to Chrome pay to block Chrome pay wallet`
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


            next();

            return res.status(200).send({
                status: true, msg: `Transaction done Sucessfully , To ${receivername}, Amount-${Number(amount)} Your Current Balance $${parseInt(substracting_amount)}`, data: {
                    To: receivername, From: sendername,
                    Amount: amount, transactionID: TransactionID,
                    PCN: PCNnumber,
                    transactionDate: today
                }
            })
        }

        if (!create) {
            let create = await transactionModel.create(failedData)
            return res.status(200).send({ status: false, msg: "Transection Failed", data: create })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

//--------------------------------------------get-latest-transections--------------------------------------------------------------------------

const latest_transecitons = async (req, res, next) => {
    try {

        url = "latest_transecitons";
        By = "Agent"

        const custID = req.params.custID;

        if (!custID) {
            return res.status(200).send({ sttaus: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid  customer ID" })
        }


        const find_Transections = await transactionModel.find({ senderID: custID }).sort({ createdAt: -1 }).limit(10 * 1).skip((1 - 1) * 10).exec();
        const find_Transections1 = await transactionModel.find({ recieverID: custID }).sort({ createdAt: -1 }).limit(10 * 1).skip((1 - 1) * 10).exec();
        let letmerge = find_Transections.concat(find_Transections1)
        let sort = letmerge.sort()

        next();
        return res.status(200).send({ status: true, sort })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}

//--------------------------------------------------------view-transeciton-detail-------------------------------------------------------------

const Transection_detail = async (req, res, next) => {
    try {

        url = "Transection_detail";
        By = "Agent"
        const transection_ID = req.params.transection_ID

        if (!transection_ID) {
            return res.status(200).send({ status: false, msg: "Please enter transectionID" })
        }

        if (transection_ID.length != 24) {
            return res.status(200).send({ status: false, msg: "please enter valid transection ID" })
        }

        let transection_detail = await transactionModel.findById({ _id: transection_ID })

        next()
        return res.status(200).send({ status: true, transection_detail })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports = {
    OrganisationCustomerTest, blockCustomer, UnblockCustomer, DeleteCustomer, get_Cust_wallet, Chrome_pay_transection, latest_transecitons, Transection_detail
}   