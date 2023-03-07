const fastGateway = require('fast-gateway')
//ghh
const server = fastGateway({
    routes :[
        
        {
            prefix:'v1/auth',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2000",
            hooks:{   
            } 
        },
        {
            
            prefix:'v1/DID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2001",
            hooks:{
            }
        },
        {
            
            prefix:'v1/view/DID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2002",
            hooks:{
            }
        },
        {
            
            prefix:'v1/views/DID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2003",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Detail/DID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2004",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Commission/DID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2005",
            hooks:{
            }
        },
        {
            
            prefix:'v1/settings',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2006",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Agnet',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2007",
            hooks:{
            }
        },
        {

            prefix: 'v1/AgencyBanking',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2008",
            hooks: {
            }
        },
        {

            prefix: 'v1/swegger',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:2009",
            hooks: {
            }
        },

        //Org Apis

        {
            prefix: 'v1/org/dash',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3001",
            hooks: {
            }
        },

        {
            prefix: 'v1/org/auth',
            target: "http://localhost:3005",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/DID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3002",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/Cust',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3003",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/ActiveDID',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3004",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/CRM',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3007",
            hooks: {
            }
        },
        {
            prefix: 'v1/org/reports',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3006",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/orgManage',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3008",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/Agent',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3009",
            hooks: {
            }
        }
        ,
        {
            prefix: 'v1/org/Export',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3010",
            hooks: {
            }
        }

        ,
        {
            prefix: 'v1/org/settings',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3011",
            hooks: {
            }
        }

        ,
        {
            prefix: 'v1/org/logs',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3012",
            hooks: {
            }
        }

        ,
        {
            prefix: 'v1/admin',
            target: "http://ec2-43-205-35-164.ap-south-1.compute.amazonaws.com:3300",
            hooks: {
            }
        }
    ]
});


server.start(5000,()=>{
    console.log(`gateway started at ${5000}`);
})

