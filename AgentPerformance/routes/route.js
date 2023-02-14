const express = require('express');
const router = express.Router();
const {
    get_agent_cut_month, get_agent_cut_month_react
} = require('../controller/DIDController');


router.post("/agnetPerformance", get_agent_cut_month)
router.post("/get_agent_cut_month_react", get_agent_cut_month_react)



module.exports = router