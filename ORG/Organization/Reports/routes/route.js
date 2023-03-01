const express = require('express');
const router = express.Router();
const {
    get_num_of_Agnet, OrgPerreort, agentPerformanceReport, get_agent_cut_month, agentDash, OrgDashSection, get_org_cust_data_graph
} = require('../controller/dashboard');


router.post("/get_num_of_Agnet", get_num_of_Agnet)
router.post("/org-per-repo", OrgPerreort)
router.post("/agent-Per-report/:agentID", agentPerformanceReport)
router.post("/get_agent_cut_month/:agentID", get_agent_cut_month)
router.post("/agnetDash/:agentID", agentDash)
router.post("/org-detail", OrgDashSection)
router.post("/get_org_cust_data_graph", get_org_cust_data_graph)






module.exports = router