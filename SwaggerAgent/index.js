const express = require('express')
const router = require('./routes/route')
//  const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
//  const {isAuth} = require("./middleware/auth")


const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
// const swag_routes = require("./routes/route")


//swegger code
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "agent setting API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{
            bearerAuth: []
        }],

    },

    apis: ["./routes/route.js"],
};

const specs = swaggerJsDoc(options);

 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));




app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
app.use(multer().any())

// mongoose.set('strictQuery', false);
// mongoose.connect("mongodb+srv://satyamRandawa:Loveyam@cluster0.tfry3tr.mongodb.net/?retryWrites=true&w=majority",
//     { useNewUrlParser: true })

//     .then(() => {
//         console.log("MongoDb connected")
//     }).catch((err) => {
//         console.log(err.message)
//     });

app.use('/', router);


app.listen(process.env.Port || 2009, function () {
    console.log('App running on port ' + (process.env.PORT || 2009))
});
