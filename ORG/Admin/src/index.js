const express = require('express')
const route = require('./routes/route')
const facebook = require("./routes/facebook")
const google = require("./routes/googleLogin")
const twitter = require("./routes/TwitterLogin")
const mongoose = require('mongoose')
const mysql = require("mysql")
const bodyParser = require('body-parser')
const app = express()
const cookieSession = require('cookie-session')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swag_routes = require("../src/routes/route")



const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://ec2-13-233-63-235.ap-south-1.compute.amazonaws.com:3300",
            },
        ],
    },
    apis: ["routes/route.js"],
};

const specs = swaggerJsDoc(options);


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
app.use(multer().any())


mongoose.connect("mongodb+srv://satyamRandawa:Loveyam@cluster0.tfry3tr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true })

    .then(() => {
        console.log("MongoDb connected")
    }).catch((err) => {
        console.log(err.message)
    });

app.use('/', route);
app.use('/', facebook)
app.use('/', google)
app.use('/', twitter)




app.listen(process.env.Port || 3300, function () {
    console.log('App running on port ' + (process.env.PORT || 3300))
});


