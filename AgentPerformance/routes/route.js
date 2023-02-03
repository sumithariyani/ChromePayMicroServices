const express = require('express');
const router = express.Router();
const {
    get_agent_cut_month
} = require('../controller/DIDController');


router.post("/agnetPerformance", get_agent_cut_month)



module.exports = router