const cutomerModel = require("../Models/customer")
const org_Licenses = require('../Models/OrgLicenses')
const temp_Cust = require("../Models/temp_Cust")
const orgBadLogs = require("../Models/OrgBadLogs")
const axios = require("axios")
const { uploadFile } = require("../aws/aws.js");

//---------------------------------------add-coustomer-------------------------------------------------------------------------------------

const createCustomerByOrg = async (req, res, next) => {
    try {
        url = "http://localhost:3000/customer";
        let data = req.body;
        let files = req.files
        let recidence = req.files
        let localDoc = req.files
        let ladregistration = req.files
        let ID =  req.OrganisationID;;

        console.log("org")

        if (!ID) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })}

        if (ID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid Adding ID" })}

        const { IDphoto, fullname, dateOfBirth, phone, city, age, email, gender, nationality, professoin, address, organisation, status, Latitude,
        Longitude, nextFOKinName, nextFOKniPhone, landSize, assetType, assetID, assetAddress, assetLongitude, assetLatitude } = data


        if (!data) {
            return res.status(200).send({ status: false, msg: "Please fill all fields " })}

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })}

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })}

        let findsubAdminID = await subAdmin.findOne({ _id: ID })
        if (findsubAdminID) {
            let findRole = await sub_admin_role.findOne({ adminID: ID })
            if (findRole) {

                let customerRole = findRole.customer.addCustomer

                if (customerRole == 0) {
                     return res.status(200).send({ status: false, msg: "You are not allow to add customer, Contact admin to access add customer" })}}}


        if (Object.values(ID).length < 2) {
            return res.status(200).send({ status: false, msg: "Please enter Adding ID" })
        }




        // ------------------------------------Manage - Linked - service----------------------------------------------------------------------

        let trim = phone.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)
        const cheack_cus = await cutomerModel.findOne({ phone: convert_Number })
        if (cheack_cus) {

            return res.status(200).send({ status: false, service: "Linked", msg: "Customer already register, you want to linked service" })

        }

        // ---------------------------------------------------------------------------------------------------------------------------------




        let findcust = await cutomerModel.find({ organisation: ID })
        let findOrg = await org_Licenses.findOne({ OrganisationID: ID })


        if (findOrg.totalLicenses <= findcust.length) {
            return res.status(200).send({ status: false, msg: "You have not enough licenses to add DID, Please contact admin to update your licenses" })

        }



        if (!data)
            return res.status(200).send({ status: false, msg: "please enter data" })


        if (!fullname) {
            return res.status(200).send({ status: false, msg: "Please enter Full Name" })
        }

        if (!dateOfBirth) {
            return res.status(200).send({ status: false, msg: "Please enter Date Of Birth" })
        }

        if (!phone) {
            return res.status(200).send({ status: false, msg: "Please enter phone" })
        }



        let checkPhone = await cutomerModel.findOne({ phone: convert_Number })


        if (checkPhone) {
            return res.status(200).send({ status: false, msg: "Number already register" })
        } 


        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            return res.status(200).send({ status: false, msg: "Please enter valid email" })
        }

        let checkEmail = await cutomerModel.findOne({ email: data.email })

        if (checkEmail) {
            return res.status(200).send({ status: false, msg: "Email is already register" })
        }


        if (!gender) {
            return res.status(200).send({ status: false, msg: "Please enter gender" })

        }

        const profilePicture = await uploadFile(files[0])
        const residace = await uploadFile(recidence[1])
        const local = await uploadFile(localDoc[2])
        const land = await uploadFile(ladregistration[3])



        async function doPostRequest() {

            let payload = {
                data: {
                    "name": `${fullname}`,
                    "age": `${age}`,
                    "city": `${city}`,
                    "email": `${email}`
                },
                phoneNumber: `+${convert_Number}`
            }


            let res = await axios.post('http://13.127.64.68:7008/api/mainnet/getUserData', payload);
            let data1 = res.data;
        }

        doPostRequest();


        var seq = (Math.floor(Math.random() * 1000000000) + 1000000000).toString().substring()



        let collection = {
            IDphoto: profilePicture, fullname: fullname,
            dateOfBirth: dateOfBirth, phone: convert_Number, city: city, age: age,
            email: email, gender: gender, nationality: nationality,
            professoin: professoin, address: address, Latitude: Latitude,
            Longitude: Longitude, organisation: ID,
            status: status, createdBY: ID, createdBY: ID,
            nextFOKinName: nextFOKinName,
            nextFOKniPhone: nextFOKniPhone,
            landSize: landSize,
            residance: residace,
            locaDocument: local,
            landRegistration: land,
            digitalrefID: seq,
            assetType: assetType, assetID: assetID,
            assetAddress: assetAddress, assetLongitude: assetLongitude,
            assetLatitude: assetLatitude

        }

        let create = await temp_Cust.create(collection)

        return res.status(201).send({ status: true, msg: "data created succesfully", data: create, })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Customer Register",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/createCustomerByOrg/:token"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(500).send({ status: false, message: error })
    }
}


let verifyCustomer = async (req, res) => {
    try {

        const OTP = req.body.OTP
        const phoneNo1 = req.body.phoneNo
        const phoneNo = phoneNo1

        console.log("321321")

        if (!phoneNo1) {
            return res.status(200).send({ Status: false, msg: "Please enter Phone No." })
        }

        if (!OTP) {
            return res.status(200).send({ Status: false, msg: "Please enter OTP" })
        }

        let trim = phoneNo.replaceAll(' ', '')
        let remove_character = trim.replace('-', '')
        let convert_Number = parseInt(remove_character)



        var result = [];
        // async function doPostRequest() {
        let payload = {
            code: OTP,
            phoneNumber: `+${convert_Number}`
        }

        console.log(payload)

        let findCust = await temp_Cust.findOne({ phone: convert_Number })


        let res1 = axios.post('http://13.127.64.68:7008/api/mainnet/generate-digitalid', {
            code: OTP,
            phoneNumber: `+${convert_Number}`
        }).then(async respons => {


            let data1 = respons.data
            let cust_password = generateString1(10)



            let findCust = await temp_Cust.findOne({ phone: convert_Number })

            let newCust = {
                IDphoto: findCust.IDphoto, fullname: findCust.fullname,
                dateOfBirth: findCust.dateOfBirth, phone: findCust.phone, city: findCust.city, age: findCust.age,
                email: findCust.email, gender: findCust.gender, nationality: findCust.nationality, hash: data1.hash,
                owner: data1.response.owner, privateKey: data1.response.privateKey, walletAddress: data1.response.walletAddress,
                professoin: findCust.professoin, address: findCust.address, organisation: findCust.organisation,
                createdBY: findCust.createdBY, imageDescriptions: findCust.imageDescriptions, Latitude: findCust.Latitude,
                Longitude: findCust.Longitude, digitalrefID: findCust.digitalrefID, residance: findCust.residance,
                locaDocument: findCust.locaDocument, landRegistration: findCust.landRegistration, landSize: findCust.landSize,
                digitalID: findCust.digitalID, nextFOKniPhone: findCust.nextFOKniPhone, nextFOKinName: findCust.nextFOKinName,
                assetType: findCust.assetType, assetID: findCust.assetID,
                assetAddress: findCust.assetAddress, assetLongitude: findCust.assetLongitude,
                assetLatitude: findCust.assetLatitude, password: cust_password, facialIdentification: 1
            }



            let create = await cutomerModel.create(newCust)

            let OrganisationList = await org_Licenses.findOne({ OrganisationID: findCust.organisation })

            let totalLicenses = OrganisationList.totalLicenses

            let findreaminig = await customerModel.find({ organisation: findCust.organisation })

            let calculateRemainig = totalLicenses - findreaminig.length;

            let Remainig = calculateRemainig



            //----------------------------------------------------------------------------------------

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

            sentEmail();



            let updateLicenses = await org_Licenses.findOneAndUpdate({ OrganisationID: findCust.organisation }, { RemainingLicenses: Remainig }, { new: true })
            let cust_wallet = `00x${generateString1(43)}`
            let obj = {
                customer_ID: create._id,
                phone: create.phone,
                wallet_Address: cust_wallet
            }
            let create_Wallet = await cust_wallet_Model.create(obj)
            let delete_cust = await temp_Cust.findOneAndDelete({ phone: convert_Number })
            return res.status(200).send({ status: true, msg: "customer register sucessfully" })



        }).catch(async error => {
            let delete_cust = await temp_Cust.findOneAndDelete({ phone: convert_Number })

            return res.status(200).send({ status: false, error: error.message, msg: "failed please try again" })
        });

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Customer Register OTP Verification",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/verifyCustomer"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })
    }
}


const Resend_otp = async (req, res) => {
    try {

        let phone = req.params.phone;
        // console.log("phone", phone)
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

const resizer = require('node-image-resizer')
const globalImageUploader = async (req, res) => {
    try {

        let file = req.files;
        const Image2 = await resizer(file, file);
        const image = await uploadFile(Image2[0])
        return res.status(200).send({ status: true, data: image })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports = {
    createCustomerByOrg, verifyCustomer, Resend_otp, globalImageUploader
}   