const express = require('express');
const router = express.Router();
const {
    createCustomerByOrg, verifyCustomer, Resend_otp, globalImageUploader
} = require('../controller/DIDController');


router.post("/createCustomerByOrg", createCustomerByOrg)
router.post("/verifyCustomer", verifyCustomer)
router.post("/Resend_otp/:phone", Resend_otp)
router.post("/globalImageUploader", globalImageUploader)




module.exports = router