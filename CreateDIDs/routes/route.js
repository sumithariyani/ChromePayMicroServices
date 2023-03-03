const express = require('express');
const router = express.Router();
const {
    createCustomerByOrg1, createCustomerByOrg2, new_verify_customer, Cust_Linked_Srevice_send_OTP, Cust_Linked_Srevice, Resend_otp, orgList, globalImageUploader,
    Store_Face_Data, Get_Face_Data
} = require('../controller/DIDController');


router.post("/registerDID1", createCustomerByOrg1)
router.post("/registerDID2",createCustomerByOrg2 )
router.post("/verifyOTP", new_verify_customer)
router.post("/Linked-send-otp", Cust_Linked_Srevice_send_OTP)
router.post("/Linked-service", Cust_Linked_Srevice)
router.post("/Resend_otp/:phone", Resend_otp)
router.get("/orgList", orgList)
router.post("/ImageUploader",globalImageUploader)
router.post("/Store_Face_Data",Store_Face_Data)
router.get("/Get_Face_Data", Get_Face_Data)



module.exports = router