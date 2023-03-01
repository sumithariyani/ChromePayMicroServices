const express = require('express');
const router = express.Router();
const {
    organisationLogin , orgforgotpassword, orgchangePasswordotp
} = require('../controller/auth');


router.post("/Login", organisationLogin)
router.post("/Forgot-Pass", orgforgotpassword)
router.post("/Forgot-Pass-OTP", orgchangePasswordotp)




module.exports = router