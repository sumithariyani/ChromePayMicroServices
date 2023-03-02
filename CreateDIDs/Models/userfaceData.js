const mongoose = require('mongoose')


const userFaceData = new mongoose.Schema({
    Face_data: {
        type: Object
    }
}, { timestamps: true })

module.exports = new mongoose.model('userFaceData', userFaceData)