const mongoose = require('mongoose')

const dummy_images = new mongoose.Schema({
    image: {
        type: String,

    }
}, { timestamps: true })

module.exports = mongoose.model('dummy_image', dummy_images)