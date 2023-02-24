const cutomerModel = require("../Models/customer")
const Organisation = require("../Models/Organisation")
const agent_Commission = require("../Models/agentCommission")
const agent_Commission_His = require("../Models/AgentCommissinHistory")
const customer_logs = require("../Models/Customer_logs")

const temp_Cust = require("../Models/temp_Cust")
const axios = require("axios")
const { uploadFile } = require("../aws/aws.js");





const createCustomerByOrg1 = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        console.log("456")
        let data = req.body;
        let ID = req.agentId;
        let orgID = req.orgId;

        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
            Longitude, nextFOKinName, nextFOKniPhone } = data

        //console.log()
        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)


        let findcust = await cutomerModel.find({ createdBY: orgID })
        let findOrg = await Organisation.findOne({ _id: orgID })

        if (findOrg.totlaLicense <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You organization not have enough licenses to add DID, Please contact admin to update yout licenses" })
        }

        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }
        // if (!IDphoto) {
        //     return res.status(200).send({ status: false, msg: "Please enter IDphoto" })
        // }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }

        if (phone.length < 5) {
            return res.status(200).send({ status: false, msg: "Please enter valid phone" })
        }


        let checkPhone = await cutomerModel.findOne({ phone: convert_Number })



        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }

        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })
        }

        //const profilePicture = await uploadFile(files[0])
        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()

        let collection = {
            IDphoto: IDphoto, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: orgID,
            status: status, createdBY: ID, createdBY: ID,
            nextFOKinName: nextFOKinName,
            nextFOKniPhone: nextFOKniPhone,
            digitalrefID: seq,

        }

        let create = await temp_Cust.create(collection)

        return res.status(201).send({ status: true, msg: "", data: create, })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}





const createCustomerByOrg2 = async (req, res) => {
    try {

        let data = req.body;
        let phone_number1 = req.body.phone
        let email = req.body.email
        let age = req.body.age
        let city = req.body.city

        let trim = phone_number1.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let phone_number = parseInt(remove_character)

        console.log("phone, ", phone_number)



        // if (req.files.length < 3) {
        //     return res.status(200).send({ status: false, msg: "Please upload all documents" })
        // }



        //------------------------------------Manage-Linked-service----------------------------------------------------------------------

        const cheack_cus = await cutomerModel.findOne({ phone: phone_number })

        console.log("cheack_cus", cheack_cus)

        if (cheack_cus) {
            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })
        }

        //---------------------------------------------------------------------------------------------------------------------------------


        const { landSize, assetType, assetID, } = data

        if (!landSize) {
            return res.status(200).send({ status: false, msg: "Please enter land size" })

        }






        const residace = req.body.residace
        const local = req.body.local
        const land = req.body.land

        if (!assetType) {
            return res.status(200).send({ status: false, msg: "Please enter asset type" })

        }

        if (!assetID) {
            return res.status(200).send({ status: false, msg: "Please enter asset ID" })
        }

        // if (!residace) {
        //     return res.status(200).send({ status: false, msg: "Please Upload residace Image" })
        // }

        // if (!local) {
        //     return res.status(200).send({ status: false, msg: "Please upload local Image" })
        // }
        // if (!land) {
        //     return res.status(200).send({ status: false, msg: "Please upload land Image" })

        // }


        const find_and_update = await temp_Cust.findOneAndUpdate({ phone: phone_number }, {
            assetID: assetID, assetType: assetType,
            landSize: landSize, residance: residace, locaDocument: local, landRegistration: land
        }, { new: true })

        if (find_and_update) {
            async function doPostRequest() {
                let payload = {
                    data: {
                        "name": `${find_and_update.fullname}`,
                        "age": `${age}`,
                        "city": `${city}`,
                        "email": `${email}`
                    },
                    phoneNumber: `${phone_number}`

                }

                console.log("payload", payload)
                let res = await axios.post('http://13.233.12.75:7008/api/mainnet/getUserData', payload);
                //console.log(res, "123123")
                let data1 = res.data;

            }

            await doPostRequest();



            return res.status(200).send({ status: true, msg: "Otp send sucessfully" })
        } else {
            return res.status(200).send({ status: false, msg: "Please try again" })

        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: "server error" })
    }
}


async function addCommission(agentID, custName, custID) {
    let latestCommission = await agent_Commission.find({ agentID: agentID })
    let agent_Cmisn = latestCommission.slice(-1)[0]


    if (!agent_Cmisn) {
        return res.status(200).send({ status: false, msg: "Agent commisiion is missing" })
    }


    if (agent_Cmisn.type == 'Percentage') {

        let amount = agent_Cmisn.Amount

        let perAmount = (amount / 100 * 5000)

        let obj = {
            custPhoto: "",
            agentName: agent_Cmisn.agentID.name,
            agentID: agent_Cmisn.agentID,
            custID: custID,
            custName: custName,
            commissionID: agent_Cmisn._id,
            commission: perAmount,
            transactionID: (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring(),

        }

        let createcomsn = await agent_Commission_His.create(obj)
    } else if (agent_Cmisn.type == 'Flat Money') {

        let amount = agent_Cmisn.Amount
        let obj = {
            custPhoto: "",
            agentName: agent_Cmisn.agentID.name,
            agentID: agent_Cmisn.agentID,
            custID: custID,
            custName: custName,
            commissionID: agent_Cmisn._id,
            commission: amount,
            transactionID: (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring(),

        }
        let createcomsn = await agent_Commission_His.create(obj)
    }
}


const new_verify_customer = async (req, res) => {
    try {

        console.log("123")
        const OTP = req.body.OTP
        const phoneNo1 = req.body.phoneNo
        const phoneNo = `+${phoneNo1}`
        // console.log("cheackPhone", phoneNo)
        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }
        var findCust = await temp_Cust.findOne({ phone: phoneNo1 })

        // console.log("findCust", findCust)

        var agentId = req.agentId;

        let payload = {
            code: OTP,
            phoneNumber: phoneNo
        }

        console.log("payload verify", payload)


        const response = await axios.post('http://13.233.12.75:7008/api/mainnet/generate-digitalid', payload)

        console.log("1")
        let data1 = response.data
        console.log("2")
        let cust_password = generateString1(5)
        console.log("3")

        let newCust = {
            IDphoto: findCust.IDphoto, fullname: findCust.fullname,
            dateOfBirth: findCust.dateOfBirth, phone: findCust.phone,
            email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: data1.hash,
            owner: data1.response.owner, privateKey: data1.response.privateKey, walletAddress: data1.response.walletAddress,
            professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
            createdBY: findCust.createdBY, Latitude: findCust.Latitude,
            Longitude: findCust.Longitude, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
            locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, landSize: findCust.landSize,
            digitalID: findCust.digitalID, nextFOKniPhone: findCust.nextFOKniPhone, nextFOKinName: findCust.nextFOKinName,
            password: cust_password, facialIdentification: 1
        }



        let create_cust = await cutomerModel.create(newCust)

        console.log("create_cust", create_cust)

        if (create_cust) {

            let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

            let totalLicenses = OrganisationList.totalLicenses

            let findreaminig = await cutomerModel.find({ organisation: findCust.organisation })

            let calculateRemainig = totalLicenses - findreaminig.length;

            let Remainig = calculateRemainig

            let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig }, { new: true })


            let cust_wallet = `00x${generateString1(43)}`
            let obj = {
                customer_ID: create_cust._id,
                phone: create_cust.phone,
                wallet_Address: cust_wallet
            }

            let create_Wallet = await cust_wallet_Model.create(obj)

            const sentEmail = async (req, res) => {


                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'chrmepay123@gmail.com',
                        pass: 'jgiplcgrbddvktkl',
                    }
                });


                var mailOptions = {
                    from: 'chrmepay123@gmail.com',
                    to: 'sumit.hariyani2@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: `Hello! welcome to chrome pay your login password is ${cust_password}`

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
            await sentEmail();
            await addCommission(agentId, findCust.fullname, create_cust._id)
            return res.status(200).send({ status: true, msg: "customer register " })

        }



        let find = await cutomerModel.findOne({ phone: phoneNo1 })
        console.log("find", find)
        if (!find) {
            let find1 = await cutomerModel.findOne({ phone: phoneNo1 })
            if (!find1) {
                let find2 = await cutomerModel.findOne({ phone: phoneNo1 })
                if (!find2) {
                    let find3 = await cutomerModel.findOne({ phone: phoneNo1 })
                    if (!find3) {
                        return res.status(200).send({ status: false, msg: "Failed " })
                    }
                }
            }
        }

        //---------------------------------------------------------------------------------------------------------------
        if (create_cust) {
            //let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })
            await addCommission(agentId, findCust.fullname, create_cust._id)
            return res.status(200).send({ status: false, msg: "customer register " })
        }
    } catch (error) {

        setTimeout(async function () {
            const phoneNo1 = req.body.phoneNo
            console.log("temp cheack", phoneNo1)
            let find = await cutomerModel.findOne({ phone: phoneNo1 })
            console.log("find", find)
            if (find) {
                let find1 = await cutomerModel.findOne({ phone: phoneNo1 })
                if (find1) {
                    let find2 = await cutomerModel.findOne({ phone: phoneNo1 })
                    if (find2) {
                        let find3 = await cutomerModel.findOne({ phone: phoneNo1 })
                        if (find3) {
                            //let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })
                            await addCommission(agentId, findCust.fullname, create_cust._id)
                            return res.status(200).send({ status: true, msg: "customer register  succesfully" })
                        }
                    }
                }
            } else {
                // let delete_cust = await temp_Cust.findOneAndDelete({ phone: phoneNo1 })

                await addCommission(agentId, "sourabh singh", '638455c05f12c279fe18e348')

                return res.status(200).send({ status: false, msg: "Failed Please Try Again" })

            }
        }, 3 * 1000);
    }
}


const Cust_Linked_Srevice_send_OTP = async (req, res) => {
    try {

        console.log("12313")
        const DIDref = req.body.DIDref;


        if (!DIDref) {
            return res.status(200).send({ status: false, msg: "Please enter DID refrence" })
        }

        let check_cust = await cutomerModel.findOne({ digitalrefID: DIDref })

        if (!check_cust) {
            return res.status(200).send({ status: false, msg: "customer not regiater please register first" })
        }

        let OTP = 100000 + Math.floor(Math.random() * 900000);



        const send_mobile_otp = async (req, res) => {

            let mobile = check_cust.phone;
            let otp = OTP;

            let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

            try {
                return await axios.get(url).then(function (response) {

                    return response;
                });
            } catch (error) {
                console.log(error);
            }
        }

        send_mobile_otp();

        let update_OTP = await cutomerModel.findOneAndUpdate({ digitalrefID: DIDref }, { Linekd_Service_OTP: OTP })

        return res.status(200).send({ status: true, msg: "OTP send succesfully" })



    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const Cust_Linked_Srevice = async (req, res) => {
    try {
        const DIDref = req.body.DIDref;
        const orgID = req.orgId;
        const otp = req.body.otp;
        if (!orgID) {
            return res.status(200).send({ status: false, msg: "Please enter Organisation ID" })}

        if (!DIDref) {
            return res.status(200).send({ status: false, msg: "Please enter phone number" })}

        let find_org = await Organisation.findOne({ _id: orgID })

        let org_name = find_org.name

        if (!otp) {
            return res.status(200).send({ statsu: false, msg: "Please enter OTP " })
        }

        let verify_OTP = await cutomerModel.findOne({ digitalrefID: DIDref })
        let all_organisations = verify_OTP.organisation
        let cust_ID = verify_OTP._id

        if (all_organisations.includes(orgID)) {
            return res.status(200).send({ statsu: false, msg: `This customer already linked with ${org_name} organisation` })
        }

        if (verify_OTP.Linekd_Service_OTP != otp) {
            return res.status(200).send({ status: false, msg: "Please enter Valid otp" })
        }

        let update_OTP = await cutomerModel.findOneAndUpdate({ digitalrefID: DIDref }, { $push: { "organisation": orgID } }, { new: true })

        let update_OTP_Again = await cutomerModel.findOneAndUpdate({ digitalrefID: DIDref }, { Linekd_Service_OTP: "000@$#&*" })

        let obj = {
            customer_ID: cust_ID,
            activity: `Linked to ${org_name}`,
            status: 'Pass',
            field: "Linked_service",
            field_status: "Pass"
        }

        let create_logs = await customer_logs.create(obj)


        return res.status(200).send({ status: true, msg: `Congratulation now you are also part of ${org_name}`, update_OTP })


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const Resend_otp = async (req, res) => {
    try {

        let phone = req.params.phone;
        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone nummber" })
        }

        async function doPostRequest() {

            let payload = {
                data: {
                    "name": "",
                    "age": "",
                    "city": "",
                    "email": ""
                },
                phoneNumber: `+${phone}`
            }


            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
        }
        await doPostRequest();
        return res.status(200).send({ status: true, msg: "OTP send sucessfully" })

    } catch (error) {

        return res.status(200).send({ status: false, msg: error.message })
    }
}


const orgList = async (req, res) => {
    try {

        let Org = await Organisation.find().select({ name: 1 })
        return res.status(200).send({ status: true, Org })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const globalImageUploader = async (req, res) => {
    try {

        let file = req.files;
        const image = await uploadFile(file[0])
        return res.status(200).send({ status: true, data: image })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports = {
    createCustomerByOrg1, createCustomerByOrg2, new_verify_customer, Cust_Linked_Srevice_send_OTP, Cust_Linked_Srevice, Resend_otp, orgList
    , globalImageUploader
}