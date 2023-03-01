const Face_model = require("../models/Customer_Face_data")
const customerModel = require("../models/customer")
const { uploadFile } = require("../aws/aws.js");
const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const { promisify } = require("util");



const cust_Face_ditect = async (req, res) => {
    try {


        const custID = req.params.custID;
        let files = req.files

        if (files.length == 0) {
            return res.status(200).send({ status: false, msg: "Please provide image" })
        }
        if (!custID) {
            return res.status(200).send({ status: false, msg: "Please enter customer ID" })
        }

        if (custID.length != 24) {
            return res.status(200).send({ status: false, msg: "Please enter vallid customer ID" })
        }

        let findCust = await customerModel.findOne({ _id: custID })
        let Cust_Name = findCust.fullname

        if (!findCust) {
            return res.status(200).send({ status: false, msg: "customer not found" })
        }

        const profilePicture = await uploadFile(files[0])


        //----------------------------------Check_faec_data-------------------------------------------------------------------------------------

        async function LoadModels() {
            await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        }
        LoadModels();


 

        let faces = await Face_model.find();

        for (i = 0; i < faces.length; i++) {


            for (j = 0; j < faces[i].descriptions.length; j++) {
                faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
            }

            faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].name, faces[i].descriptions);
        }


        const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
        const img = await canvas.loadImage(profilePicture);
        let temp = faceapi.createCanvasFromMedia(img);
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(temp, displaySize);
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
        for (let items of results) {
            if (items._label === "unknown") {
                const descriptions = []
                const img1 = await canvas.loadImage(profilePicture);
                const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections1.descriptor);
                const obj = {
                    customerID: custID,
                    name: Cust_Name,
                    descriptions: descriptions,
                }
                let createFce = await Face_model.create(obj)
                let update_face_data = await customerModel.findOneAndUpdate({ _id: custID }, { facialIdentification: 1 })
                return res.status(200).send({ status: true, msg: "Face identify Successfully" })
            } else {
                return res.status(200).send({ status: false, msg: "Face already register ", results })
            }

        }

        //------------------------------------------------- store-face-regnization------------------------------------------------------------------

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}


const pre_cust_Face_ditect = async (req, res) => {
    try {


       
        let files = req.files

        if (!files) {
            return res.status(200).send({ sttaus: false, msg: "Please provide image" })

        }

        if (files.length == 0) {
            return res.status(200).send({ sttaus: false, msg: "Please provide image" })
        }
       

        const profilePicture = await uploadFile(files[0])


        //----------------------------------Check_faec_data-------------------------------------------------------------------------------------

        async function LoadModels() {
            await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/modelsface");
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/modelsface");
        }
        LoadModels();



        let faces = await Face_model.find();

        for (i = 0; i < faces.length; i++) {

            for (j = 0; j < faces[i].descriptions.length; j++) {
                faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
            }

            faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].name, faces[i].descriptions);
        }


        const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
        const img = await canvas.loadImage(profilePicture);
        let temp = faceapi.createCanvasFromMedia(img);
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(temp, displaySize);
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
        if (results.length == 0) {
            return res.status(200).send({ status: true, msg: "Face identify Successfully" })
        }
        for (let items of results) {
            if (items._label === "unknown") {
                return res.status(200).send({ status: true, msg: "Face identify Successfully" })
            } else {
                return res.status(200).send({ status: true, msg: "Face identify Successfully ", results })
            }

        }

        //------------------------------------------------- store-face-regnization------------------------------------------------------------------

    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: false, msg: error.messege })
    }
}



module.exports.pre_cust_Face_ditect = pre_cust_Face_ditect
module.exports.cust_Face_ditect = cust_Face_ditect
