
const orgBadLogs = require("../Models/OrgBadLogs")
const customerModel = require("../Models/customer")
const org_Licenses = require("../Models/OrgLicenses")
const AgentModel = require("../Models/AgentModel")
const Loan_applay_customer = require("../Models/Loan_apllied_by")
const transectionModel = require("../models/transaction");
const License_fee = require("../Models/org_LicensesFees")
const Organisation = require("../Models/Organisation")
const ip = require('ip')
const moment = require('moment')




const get_num_of_Agnet = async (req, res) => {
    try {
        const OrgID = req.OrganisationID;
        console.log(OrgID)


        let pageNO = req.body.page;
        if (pageNO == 0) {
            pageNO = 1
        }
        
        let find_Agent1 = await AgentModel.find({ organisationID: OrgID, blocked: 0, isDeleted: 0 })
        let totlaRow = find_Agent1.length
        let find_Agent = await AgentModel.find({ organisationID: OrgID, blocked: 0, isDeleted: 0 })
        let find_Numbers = find_Agent.length

        return res.status(200).send({ status: true, totlaRow: totlaRow, currenPage: parseInt(pageNO), Agents: find_Numbers, data: find_Agent })

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Get Numbers Of Agents",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_num_of_Agnet/:token"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



const OrgPerreort = async (req, res) => {
    try {

        const orgID = req.OrganisationID;

        if (!orgID) {
            return res.status(200).send({ status: false, msg: "not getting organisation ID" })
        }

        if (orgID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting valid organisation ID" })

        }



        const LastMonthData = await customerModel.aggregate([
            {
                $match: {
                    organisation: orgID,
                    $expr: {
                        $and: [
                            {
                                "$eq": [
                                    {
                                        $month: "$createdAt"
                                    },
                                    {
                                        $month: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$eq": [
                                    {
                                        $year: "$createdAt"

                                    },

                                    {
                                        $year: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ])

        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const Current_Month = await customerModel.find({
            $and: [
                {
                    createdAt: {
                        $gte: startOfCurrentMonth,
                        $lt: startOfNextMonth
                    },
                    organisation: orgID
                },
            ],
        }).count();



        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()

        if (perDayLastMonth > perDayCurrMonth) {
            let Negetive = perDayLastMonth - perDayCurrMonth
            let nextMonthTarget = Negetive * 30
            let Target1 = nextMonthTarget + Last_Month
            let Target = Math.ceil(Target1)
            if (Target <= 0) {
                Target = 100
            }


            return res.status(200).send({ status: true, Negetive, Current_Month, Target, Last_Month, Today_date })

        } else {
            let positive = perDayCurrMonth - perDayLastMonth
            let nextMonthTarget = positive * 30
            let Target1 = nextMonthTarget + Last_Month
            let Target = Math.ceil(Target1)


            return res.status(200).send({ status: true, positive, Current_Month, Target, Last_Month, Today_date })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }

}

const agentPerformanceReport = async (req, res) => {
    try {

        const agentID = req.params.agentID
        // console.log("==>", agentID)

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter " })
        }

        if (agentID.length < 24) {
            return res.status(200).send({ status: false, msg: "Please enter valid ID" })
        }


        const LastMonthData = await customerModel.aggregate([
            {
                $match: {
                    createdBY: agentID,
                    $expr: {
                        $and: [
                            {
                                "$eq": [
                                    {
                                        $month: "$createdAt"
                                    },
                                    {
                                        $month: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$eq": [
                                    {
                                        $year: "$createdAt"
                                    },
                                    {
                                        $year: {
                                            $dateAdd: {
                                                startDate: new Date(),
                                                unit: "month",
                                                amount: -1
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
        )



        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const Current_Month = await customerModel.find({
            $and: [

                {
                    createdAt: {
                        $gte: startOfCurrentMonth,
                        $lt: startOfNextMonth
                    },
                    createdBY: agentID
                },
            ],
        }).count();



        let Last_Month = LastMonthData.length
        let perDayLastMonth = LastMonthData.length / 30
        let currentDays = startOfNextMonth.getDay()
        let perDayCurrMonth = Current_Month / currentDays

        let Today_date = new Date()


        if (perDayLastMonth > perDayCurrMonth) {


            let positive1 = `-${perDayLastMonth - perDayCurrMonth}`
            let positive = parseFloat(positive1)
            let nextMonthTarget = positive1 * 30
            let nexttarget1 = nextMonthTarget + Last_Month
            let nexttarget = Math.ceil(nexttarget1)
            if (nexttarget <= 0) {
                nexttarget = 100
            }


            return res.status(200).send({ status: true, positive, nexttarget, Current_Month, Last_Month, Today_date })

        } else {
            let positive = perDayCurrMonth - perDayLastMonth
            let nextMonthTarget = positive * 30
            let nexttarget1 = nextMonthTarget + Last_Month
            let nexttarget = Math.ceil(nexttarget1)
            return res.status(200).send({ status: true, positive, nexttarget, Current_Month, Last_Month, Today_date })
        }


    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

const get_agent_cut_month = async (req, res) => {
    try {

        let agentID = req.params.agentID;
        let Field = req.body.filter
        let date = new Date()
        let date1 = new Date



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await customerModel.find({ createdBY: agentID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })
        let find_cust_Years = await customerModel.find({ createdBY: agentID });


        January = 0, February = 0, March = 0, April = 0, May = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December = 0
        eighteen = 0, nineteen = 0, twenty = 0, twentyOne = 0, tewentyTwo = 0, twentyThree = 0, twentyfour = 0, twentyFive = 0, twentySix = 0



        for (let i of find_cust) {


            if (i.createdAt.getMonth() + 1 == 1) {
                January++
            } else if (i.createdAt.getMonth() + 1 == 2) {
                February++
            } else if (i.createdAt.getMonth() + 1 == 3) {
                March++
            } else if (i.createdAt.getMonth() + 1 == 4) {
                April++
            } else if (i.createdAt.getMonth() + 1 == 5) {
                May++
            } else if (i.createdAt.getMonth() + 1 == 6) {
                June++
            } else if (i.createdAt.getMonth() + 1 == 7) {
                July++
            } else if (i.createdAt.getMonth() + 1 == 8) {
                August++
            } else if (i.createdAt.getMonth() + 1 == 9) {
                September++
            } else if (i.createdAt.getMonth() + 1 == 10) {
                October++
            } else if (i.createdAt.getMonth() + 1 == 11) {
                November++
            } else if (i.createdAt.getMonth() + 1 == 12) {
                December++
            }
        }

        for (let i of find_cust_Years) {

            if (i.createdAt.getFullYear() == 2018) {
                eighteen++
            }
            else if (i.createdAt.getFullYear() == 2019) {
                nineteen++
            } else if (i.createdAt.getFullYear() == 2020) {
                twenty++


            } else if (i.createdAt.getFullYear() == 2021) {

                twentyOne++
            } else if (i.createdAt.getFullYear() == 2022) {

                tewentyTwo++
            } else if (i.createdAt.getFullYear() == 2023) {

                twentyThree++
            } else if (i.createdAt.getFullYear() == 2024) {
                twentyfour++

            } else if (i.createdAt.getFullYear() == 2025) {

                twentyFive++
            } else if (i.createdAt.getFullYear() == 2026) {
                twentySix++

            }
        }


        let obj = {
            January: January,
            February: February,
            March: March,
            April: April,
            May: May,
            June: June,
            July: July,
            August: August,
            September: September,
            October: October,
            November: November,
            December: December
        }


        let obj1 = {
            2018: eighteen,
            2019: nineteen,
            2020: twenty,
            2021: twentyOne,
            2022: tewentyTwo,
            2023: twentyThree,
            2024: twentyfour,
            2025: twentyFive,
            2026: twentySix
        }




        let days_Array = [{ "Monday": 0 }, { "Tuseday": 0, }, { "Wednesday": 0 }, { "Thrusday": 0 }, { "Friday": 0 }, { "Saturday": 0 },
        { "Sunday": 0 }]





        let get_day = date.getDay()




        if (get_day == 1) {

            days_Array[0] = { Monday: 0 }
            days_Array[1] = { Tuseday: 0 }
            days_Array[2] = { Wednesday: 0 }
            days_Array[3] = { Thrusday: 0 }
            days_Array[4] = { Friday: 0 }
            days_Array[5] = { Sataurday: 0 }
            days_Array[6] = { Sunday: 0 }
            days_Array[7] = { Monday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[0].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[1].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[2].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[3].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[4].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[5].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[6].Sunday++
                }
            }




        } else if (get_day == 2) {
            days_Array[0] = { Tuseday: 0 }
            days_Array[1] = { Wednesday: 0 }
            days_Array[2] = { Thrusday: 0 }
            days_Array[3] = { Friday: 0 }
            days_Array[4] = { Saturday: 0 }
            days_Array[5] = { Sunday: 0 }
            days_Array[6] = { Monday: 0 }
            days_Array[7] = { Tuseday: 0 }

            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[6].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[7].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[1].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[2].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[3].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[4].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[5].Sunday++
                }
            }




        } else if (get_day == 3) {
            days_Array[0] = { Wednesday: 0 }
            days_Array[1] = { Thrusday: 0 }
            days_Array[2] = { Friday: 0 }
            days_Array[3] = { Sataurday: 0 }
            days_Array[4] = { Sunday: 0 }
            days_Array[5] = { Monday: 0 }
            days_Array[6] = { Tuseday: 0 }
            days_Array[7] = { Wednesday: 0 }

            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[5].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[6].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[7].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[1].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[2].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[3].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[4].Sunday++
                }
            }

        } else if (get_day == 4) {
            days_Array[0] = { Thrusday: 0 }
            days_Array[1] = { Friday: 0 }
            days_Array[2] = { Sataurday: 0 }
            days_Array[3] = { Sunday: 0 }
            days_Array[4] = { Monday: 0 }
            days_Array[5] = { Tuseday: 0 }
            days_Array[6] = { Wednesday: 0 }
            days_Array[7] = { Thrusday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[4].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[5].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[6].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[7].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[1].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[2].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[3].Sunday++
                }
            }






        } else if (get_day == 5) {
            console.log("1231321321313212121FDRI")
            days_Array[0] = { Friday: 0 }
            days_Array[1] = { Saturday: 0 }
            days_Array[2] = { Sunday: 0 }
            days_Array[3] = { Monday: 0 }
            days_Array[4] = { Tuseday: 0 }
            days_Array[5] = { Wednesday: 0 }
            days_Array[6] = { Thrusday: 0 }
            days_Array[7] = { Friday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {

                console.log("Test_Over", i.createdAt.getDay())

                if (i.createdAt.getDay() === 1) {
                    console.log("123121321==ENTER")
                    days_Array[3].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[4].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[5].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[6].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[7].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[1].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[2].Sunday++
                }
            }






        } else if (get_day == 6) {
            days_Array[0] = { Sataurday: 0 }
            days_Array[1] = { Sunday: 0 }
            days_Array[2] = { Monday: 0 }
            days_Array[3] = { Tuseday: 0 }
            days_Array[4] = { Wednesday: 0 }
            days_Array[5] = { Thrusday: 0 }
            days_Array[6] = { Friday: 0 }
            days_Array[7] = { Sataurday: 0 }





            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[2].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[3].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[4].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[5].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[6].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[7].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[1].Sunday++
                }
            }







        } else if (get_day == 7) {


            days_Array[0] = { Sunday: 0 }
            days_Array[1] = { Monday: 0 }
            days_Array[2] = { Tuseday: 0 }
            days_Array[3] = { Wednesday: 0 }
            days_Array[4] = { Thrusday: 0 }
            days_Array[5] = { Friday: 0 }
            days_Array[6] = { Sataurday: 0 }
            days_Array[7] = { Sunday: 0 }




            let find_last_seven_days = await customerModel.find({ createdBY: agentID },
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[1].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[2].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[3].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[4].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[5].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[6].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[7].Sunday++
                }
            }

        }

        let last_date = new Date(new Date().setDate(new Date().getDate() - 7))
        let get_last_date = last_date.getDay();
        let find_last_seven_days = await customerModel.find(
            { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
        )



        let DaysData = Object.assign(days_Array[0], days_Array[1], days_Array[2], days_Array[3], days_Array[4], days_Array[5], days_Array[6], days_Array[7])

        if (Field == "Year") {
            return res.status(200).send({ status: true, Year: obj1 })

        } else if (Field == "Month") {
            return res.status(200).send({ status: true, Month: obj })

        } else if (Field == "Day") {
            return res.status(200).send({ status: true, Day: DaysData })

        } else {
            return res.status(200).send({ status: true, Month: obj })

        }

        return res.status(200).send({ status: true, obj1 })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


const agentDash = async (req, res) => {

    try {

        const agentID = req.params.agentID;

        if (!agentID) {
            return res.status(200).send({ status: false, msg: "Please enter agent ID" })
        }

        if (agentID.length !== 24) {
            return res.status(200).send({ status: false, msg: "not getting agentID" })
        }

        let findagent = await AgentModel.findOne({ _id: agentID })

        let image = findagent.image
        let agentName = findagent.name;
        let email = findagent.email
        let mobile = findagent.phone
        let country = findagent.country

        //======================================total=transection====

        let findAgentUsers = await customerModel.find({ createdBY: agentID })

        let data = []
        for (let i of findAgentUsers) {
            data.push(i._id)
        }


        let findtrans = await transectionModel.find({ senderID: data })

        let totalTransection = 0
        for (let i of findtrans) {
            totalTransection += i.sendingAmount
        }



        //------------


        let data1 = []
        for (let i of findAgentUsers) {
            data1.push(i._id)
        }

        let findtrans1 = await transectionModel.find({ recieverID: data1 })

        let receive = 0
        for (let i of findtrans1) {
            receive += i.sendingAmount
        }
        let totalAmount = totalTransection + receive
        let NumberOFUser = findAgentUsers.length
        //====================================================================================================

        return res.status(200).send({ status: true, NumberOFUser: NumberOFUser, image: image, agentName: agentName, email: email, country: country, mobile: mobile, totalTransection: totalAmount })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}



const OrgDashSection = async (req, res) => {
    try {

        const organisationID = req.OrganisationID;;
        if (!organisationID) {
            return res.status(200).send({ Status: false, msg: "Not Geting Organisation ID" })
        }
        let findName = await Organisation.findOne({ _id: organisationID })
        let orgName = findName.name
        let orgEmail = findName.email
        let country = findName.country

        let findUsers = await transectionModel.find({ OrganisationID: organisationID });




        //-------------------------users-and-totaltransections---------------------------
        let totalTransection = 0;
        let count = 0
        for (items of findUsers) {
            totalTransection += items.sendingAmount
            count++;
        }

        //--------------------------find-total-use--------------------------------------------

        let finduser = await customerModel.find({ organisation: organisationID })

        let numberOFUSer = 0;
        for (Element of finduser) {
            numberOFUSer++
        }

        let data = {
            name: findName.name,
            totlaLicense: findName.totlaLicense,
            totalUser: numberOFUSer,
            totalTransection: count,
            email: orgEmail,
            country: country,
            image: findName.logo,
            name: findName.name,
            code: findName.code,
            phone: findName.phoneNo,
            country: findName.country,
            city: findName.city,
            postCode: findName.postCode,
            joining_date: findName.createdAt,
            address: findName.address,
            totalTransection_amount: totalTransection
        }

        console.log("data", data)
        return res.status(200).send({ status: true, data: data })
    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization DashBoard Section",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/orgDashSection/:ID"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(500).send({ status: false, msg: error })
    }
}


const get_org_cust_data_graph = async (req, res) => {
    try {


        let orgID = req.OrganisationID;
        let Field = req.body.filter;
        let date = new Date();



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await customerModel.find({ organisation: orgID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })
        let find_cust_Years = await customerModel.find({ organisation: orgID });


        January = 0, February = 0, March = 0, April = 0, May = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December = 0
        eighteen = 0, nineteen = 0, twenty = 0, twentyOne = 0, tewentyTwo = 0, twentyThree = 0, twentyfour = 0, twentyFive = 0, twentySix = 0



        for (let i of find_cust) {

            if (i.createdAt.getMonth() + 1 == 1) {
                January++
            } else if (i.createdAt.getMonth() + 1 == 2) {
                February++
            } else if (i.createdAt.getMonth() + 1 == 3) {
                March++
            } else if (i.createdAt.getMonth() + 1 == 4) {
                April++
            } else if (i.createdAt.getMonth() + 1 == 5) {
                May++
            } else if (i.createdAt.getMonth() + 1 == 6) {
                June++
            } else if (i.createdAt.getMonth() + 1 == 7) {
                July++
            } else if (i.createdAt.getMonth() + 1 == 8) {
                August++
            } else if (i.createdAt.getMonth() + 1 == 9) {
                September++
            } else if (i.createdAt.getMonth() + 1 == 10) {
                October++
            } else if (i.createdAt.getMonth() + 1 == 11) {
                November++
            } else if (i.createdAt.getMonth() + 1 == 12) {
                December++
            }
        }

        for (let i of find_cust_Years) {

            if (i.createdAt.getFullYear() == 2018) {
                eighteen++
            }
            else if (i.createdAt.getFullYear() == 2019) {
                nineteen++
            } else if (i.createdAt.getFullYear() == 2020) {
                twenty++


            } else if (i.createdAt.getFullYear() == 2021) {

                twentyOne++
            } else if (i.createdAt.getFullYear() == 2022) {

                tewentyTwo++
            } else if (i.createdAt.getFullYear() == 2023) {

                twentyThree++
            } else if (i.createdAt.getFullYear() == 2024) {
                twentyfour++

            } else if (i.createdAt.getFullYear() == 2025) {

                twentyFive++
            } else if (i.createdAt.getFullYear() == 2026) {
                twentySix++

            }
        }


        let obj = {
            January: January,
            February: February,
            March: March,
            April: April,
            May: May,
            June: June,
            July: July,
            August: August,
            September: September,
            October: October,
            November: November,
            December: December
        }


        let obj1 = {
            2018: eighteen,
            2019: nineteen,
            2020: twenty,
            2021: twentyOne,
            2022: tewentyTwo,
            2023: twentyThree,
            2024: twentyfour,
            2025: twentyFive,
            2026: twentySix
        }




        let days_Array = [{ "Monday": 0 }, { "Tuseday": 0, }, { "Wednesday": 0 }, { "Thrusday": 0 }, { "Friday": 0 }, { "Saturday": 0 },
        { "Sunday": 0 }]





        let get_day = date.getDay()




        if (get_day == 1) {

            days_Array[0] = { Monday: 0 }
            days_Array[1] = { Tuseday: 0 }
            days_Array[2] = { Wednesday: 0 }
            days_Array[3] = { Thrusday: 0 }
            days_Array[4] = { Friday: 0 }
            days_Array[5] = { Sataurday: 0 }
            days_Array[6] = { Sunday: 0 }
            days_Array[7] = { Monday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[0].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[1].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[2].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[3].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[4].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[5].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[6].Sunday++
                }
            }




        } else if (get_day == 2) {
            days_Array[0] = { Tuseday: 0 }
            days_Array[1] = { Wednesday: 0 }
            days_Array[2] = { Thrusday: 0 }
            days_Array[3] = { Friday: 0 }
            days_Array[4] = { Sataurday: 0 }
            days_Array[5] = { Sunday: 0 }
            days_Array[6] = { Monday: 0 }
            days_Array[7] = { Tuseday: 0 }

            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[6].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[7].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[1].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[2].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[3].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[4].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[5].Sunday++
                }
            }




        } else if (get_day == 3) {
            days_Array[0] = { Wednesday: 0 }
            days_Array[1] = { Thrusday: 0 }
            days_Array[2] = { Friday: 0 }
            days_Array[3] = { Sataurday: 0 }
            days_Array[4] = { Sunday: 0 }
            days_Array[5] = { Monday: 0 }
            days_Array[6] = { Tuseday: 0 }
            days_Array[7] = { Wednesday: 0 }

            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[5].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[6].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[7].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[1].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[2].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[3].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[4].Sunday++
                }
            }




        } else if (get_day == 4) {
            days_Array[0] = { Thrusday: 0 }
            days_Array[1] = { Friday: 0 }
            days_Array[2] = { Sataurday: 0 }
            days_Array[3] = { Sunday: 0 }
            days_Array[4] = { Monday: 0 }
            days_Array[5] = { Tuseday: 0 }
            days_Array[6] = { Wednesday: 0 }
            days_Array[7] = { Thrusday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[4].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[5].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[6].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[7].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[1].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[2].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[3].Sunday++
                }
            }






        } else if (get_day == 5) {
            console.log("1231321321313212121FDRI")
            days_Array[0] = { Friday: 0 }
            days_Array[1] = { Saturday: 0 }
            days_Array[2] = { Sunday: 0 }
            days_Array[3] = { Monday: 0 }
            days_Array[4] = { Tuseday: 0 }
            days_Array[5] = { Wednesday: 0 }
            days_Array[6] = { Thrusday: 0 }
            days_Array[7] = { Friday: 0 }


            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {

                console.log("Test_Over", i.createdAt.getDay())

                if (i.createdAt.getDay() === 1) {
                    console.log("123121321==ENTER")
                    days_Array[3].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[4].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[5].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[6].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[7].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[1].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[2].Sunday++
                }
            }






        } else if (get_day == 6) {
            days_Array[0] = { Saturday: 0 }
            days_Array[1] = { Sunday: 0 }
            days_Array[2] = { Monday: 0 }
            days_Array[3] = { Tuseday: 0 }
            days_Array[4] = { Wednesday: 0 }
            days_Array[5] = { Thrusday: 0 }
            days_Array[6] = { Friday: 0 }
            days_Array[7] = { Saturday: 0 }





            let find_last_seven_days = await customerModel.find(
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[2].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[3].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[4].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[5].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[6].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[7].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[1].Sunday++
                }
            }







        } else if (get_day == 7) {


            days_Array[0] = { Sunday: 0 }
            days_Array[1] = { Monday: 0 }
            days_Array[2] = { Tuseday: 0 }
            days_Array[3] = { Wednesday: 0 }
            days_Array[4] = { Thrusday: 0 }
            days_Array[5] = { Friday: 0 }
            days_Array[6] = { Sataurday: 0 }
            days_Array[7] = { Sunday: 0 }




            let find_last_seven_days = await customerModel.find({ createdBY: agentID },
                { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
            )

            for (let i of find_last_seven_days) {
                if (i.createdAt.getDay() === 1) {
                    days_Array[1].Monday++
                } else if (i.createdAt.getDay() === 2) {
                    days_Array[2].Tuseday++
                } else if (i.createdAt.getDay() === 3) {
                    days_Array[3].Wednesday++
                } else if (i.createdAt.getDay() === 4) {
                    days_Array[4].Thrusday++
                } else if (i.createdAt.getDay() === 5) {
                    days_Array[5].Friday++
                } else if (i.createdAt.getDay() === 6) {
                    days_Array[6].Saturday++
                } else if (i.createdAt.getDay() === 7) {
                    days_Array[7].Sunday++
                }
            }






        }


        let last_date = new Date(new Date().setDate(new Date().getDate() - 7))
        let get_last_date = last_date.getDay();
        let find_last_seven_days = await customerModel.find(
            { "createdAt": { $gte: moment().startOf('day').subtract(7, 'days').toDate() } }
        )



        let DaysData = Object.assign(days_Array[0], days_Array[1], days_Array[2], days_Array[3], days_Array[4], days_Array[5], days_Array[6], days_Array[7])

        if (Field == "Year") {
            return res.status(200).send({ status: true, obj: obj1 })

        } else if (Field == "Month") {
            return res.status(200).send({ status: true, obj: obj })

        } else if (Field == "Day") {
            return res.status(200).send({ status: true, obj: DaysData })

        } else {
            return res.status(200).send({ status: true, obj: obj })

        }

    } catch (error) {
        let obj = {
            IP: ip.address(),
            description: error,
            api: "Organization Customer Data By Graph",
            apiUrl: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3000/get_org_cust_data_graph/:token"
        }
        let create = await orgBadLogs.create(obj)
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}


module.exports = {get_num_of_Agnet, OrgPerreort, agentPerformanceReport, get_agent_cut_month, agentDash, get_agent_cut_month, OrgDashSection, get_org_cust_data_graph}