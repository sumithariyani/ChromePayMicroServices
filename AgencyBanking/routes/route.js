const express = require('express');
const router = express.Router();
const {
    sendAgencyOTP, verifyOTP
} = require('../controller/DIDController');


router.post("/send-otp", sendAgencyOTP)
router.post("/verify-otp", verifyOTP)



module.exports = router