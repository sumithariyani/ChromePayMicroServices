const express = require('express');
const router = express.Router();
const {
    get_agent_LogHistory, get_user_LogHistory, Org_cust, Org_Agents, org_blocked_custmers   
} = require('../controller/dashboard');


router.post("/get_agent_LogHistory", get_agent_LogHistory)
router.post("/get_user_LogHistory", get_user_LogHistory)
router.post("/Org_cust", Org_cust)
router.post("/Org_Agents", Org_Agents)
router.post("/org_blocked_custmers", org_blocked_custmers)






module.exports = router