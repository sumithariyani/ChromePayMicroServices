const express = require('express');
const router = express.Router();
const {
    custdetail, calculate_final_activities , send_cust_otp_data_view, verify_cust_view_OTP
} = require('../controller/viewCustomer');


router.post("/cust-Detail/:custID", custdetail)
router.post("/customer-financial-activity/:custID", calculate_final_activities)
router.post("/send_cust_otp_data_view", send_cust_otp_data_view)
router.post("/verify_cust_view_OTP", verify_cust_view_OTP)



module.exports = router