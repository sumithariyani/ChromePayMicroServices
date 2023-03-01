const express = require('express');
const router = express.Router();
const {
    OrganisationCustomerTest, blockCustomer, UnblockCustomer, DeleteCustomer
} = require('../controller/DIDController');


router.post("/Filter-cust", OrganisationCustomerTest)
router.post("/Block-cust/:ID", blockCustomer)
router.post("/Un-block-cust/:ID", UnblockCustomer)
router.post("/Delete-cust/:ID", DeleteCustomer)





module.exports = router