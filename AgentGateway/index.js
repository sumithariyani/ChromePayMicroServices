const fastGateway = require('fast-gateway')

const server = fastGateway({
    routes :[
        
        {
            prefix:'v1/auth',
            target:"http://localhost:2000",
            hooks:{   
            } 
        },
        {

            prefix:'v1/DID',
            target: "http://localhost:2001",
            hooks:{
            }
        },
        {
            
            prefix:'v1/view/DID',
            target: "http://localhost:2002",
            hooks:{
            }
        },
        {
            
            prefix:'v1/views/DID',
            target: "http://localhost:2003",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Detail/DID',
            target: "http://localhost:2004",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Commission/DID',
            target: "http://localhost:2005",
            hooks:{
            }
        },
        {
            
            prefix:'v1/settings',
            target: "http://localhost:2006",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Agnet',
            target: "http://localhost:2007",
            hooks:{
            }
        }
    ]
});


server.start(5000,()=>{
    console.log(`gateway started at ${5000}`);
})

