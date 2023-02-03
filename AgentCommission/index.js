const express = require('express')
const router = require('./routes/route')
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')
 const app = express()
 const cors = require('cors')
 const {isAuth} = require("./middleware/auth")


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
app.use(multer().any())

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://satyamRandawa:Loveyam@cluster0.tfry3tr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true })

    .then(() => {
        console.log("MongoDb connected")
    }).catch((err) => {
        console.log(err.message)
    });

 app.use('/',isAuth, router);


app.listen(process.env.Port || 2005, function () {
    console.log('App running on port ' + (process.env.PORT || 2005))
});
