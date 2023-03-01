const fastGateway = require('fast-gateway')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// app.use(cors('http://localhost:3000'))



const server = fastGateway({
    routes: [

        {
            prefix: 'v1/org/dash',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3001",
            hooks: {
            }
        },

        {
            prefix: 'v1/org/auth',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3005",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/DID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3002",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/Cust',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3003",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/ActiveDID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3004",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/CRM',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3007",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/reports',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3006",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/orgManage',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3008",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/Agent',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3009",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/Export',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3010",
            hooks: {
            }
        }

        ,
        {
            prefix: 'v1/org/settings',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3011",
            hooks: {
            }
        }

        ,
        {
            prefix: 'v1/org/logs',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3012",
            hooks: {
            }
        }

    ]
});


server.start(9000, () => {
    console.log(`gateway started at ${9000}`);
})

