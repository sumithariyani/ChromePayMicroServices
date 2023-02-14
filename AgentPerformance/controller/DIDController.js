const cutomerModel = require("../Models/customer")
const moment = require('moment')





const get_agent_cut_month = async (req, res) => {
    try {

        let agentID = req.agentId;
        let Field = req.body.filter
        let date = new Date()
        let date1 = new Date



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await cutomerModel.find({ createdBY: agentID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })
        let find_cust_Years = await cutomerModel.find({ createdBY: agentID });


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


            let find_last_seven_days = await cutomerModel.find(
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

            let find_last_seven_days = await cutomerModel.find(
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

            let find_last_seven_days = await cutomerModel.find(
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


            let find_last_seven_days = await cutomerModel.find(
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


            let find_last_seven_days = await cutomerModel.find(
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





            let find_last_seven_days = await cutomerModel.find(
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




            let find_last_seven_days = await cutomerModel.find({ createdBY: agentID },
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
        let find_last_seven_days = await cutomerModel.find(
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



const get_agent_cut_month_react = async (req, res) => {
    try {

        let agentID = req.agentId;
        let Field = req.body.filter
        let date = new Date()
        let date1 = new Date
        console.log("12312")



        var fromDate = new Date(Date.now() - 334 * 24 * 60 * 60 * 1000);

        let find_cust = await cutomerModel.find({ createdBY: agentID, $or: [{ "createdAt": { $gt: fromDate } }, { "createdAt": { $eq: '' } }] })
        let find_cust_Years = await cutomerModel.find({ createdBY: agentID });


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


            let find_last_seven_days = await cutomerModel.find(
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

            let find_last_seven_days = await cutomerModel.find(
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

            let find_last_seven_days = await cutomerModel.find(
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


            let find_last_seven_days = await cutomerModel.find(
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


            let find_last_seven_days = await cutomerModel.find(
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





            let find_last_seven_days = await cutomerModel.find(
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




            let find_last_seven_days = await cutomerModel.find({ createdBY: agentID },
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
        let find_last_seven_days = await cutomerModel.find(
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

        return res.status(200).send({ status: true, obj1 })

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.message })
    }
}

module.exports = { get_agent_cut_month, get_agent_cut_month_react }