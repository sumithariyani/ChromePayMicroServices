const fastGateway = require('fast-gateway')

const server = fastGateway({
    routes :[
        
        {
            prefix:'v1/auth',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2000",
            hooks:{   
            } 
        },
        {

            prefix:'v1/DID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2007",
            hooks:{
            }
        },
        {
            
            prefix:'v1/view/DID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2002",
            hooks:{
            }
        },
        {
            
            prefix:'v1/views/DID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2003",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Detail/DID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2004",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Commission/DID',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2005",
            hooks:{
            }
        },
        {
            
            prefix:'v1/settings',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2006",
            hooks:{
            }
        },
        {
            
            prefix:'v1/Agnet',
            target: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:2001",
            hooks:{
            }
        }
    ]
});


server.start(5000,()=>{
    console.log(`gateway started at ${5000}`);
})

