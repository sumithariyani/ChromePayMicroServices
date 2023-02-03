const express = require('express');
const router = express.Router();
const {
    agent_login_new, forgotpassword, ForgetPassVerifyOtp, ForgotchangePass
} = require('../controller/auth');


router.post("/Login", agent_login_new)
router.post("/ForgotPassword",forgotpassword )
router.post("/ForgetPassVerifyOtp", ForgetPassVerifyOtp)
router.post("/ForgotchangePass", ForgotchangePass)



module.exports = router