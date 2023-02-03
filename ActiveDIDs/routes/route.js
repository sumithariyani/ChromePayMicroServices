const express = require('express');
const router = express.Router();
const {
    agentCustomerList
} = require('../controller/viewCustomer');


router.post("/view-customer", agentCustomerList)


module.exports = router