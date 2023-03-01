const express = require('express');
const router = express.Router();
const {
    org_dash_main, get_org_cust_data_graph
} = require('../controller/dashboard');


router.post("/detail", org_dash_main)
router.post("/get_org_cust_data_graph", get_org_cust_data_graph)






module.exports = router