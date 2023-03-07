const express = require('express');
const router = express.Router();
const {
    OrganisationCustomerTest, blockCustomer, UnblockCustomer, DeleteCustomer, get_Cust_wallet, Chrome_pay_transection, latest_transecitons, Transection_detail
} = require('../controller/DIDController');


router.post("/Filter-cust", OrganisationCustomerTest)
router.post("/Block-cust/:ID", blockCustomer)
router.post("/Un-block-cust/:ID", UnblockCustomer)
router.post("/Delete-cust/:ID", DeleteCustomer)

router.post("/get_Cust_wallet/:custID", get_Cust_wallet)
router.post("/Chrome_pay_transection/:custID", Chrome_pay_transection)
router.post("/latest_transecitons/:custID", latest_transecitons)
router.post("/Transection_detail/:transection_ID", Transection_detail)





module.exports = router