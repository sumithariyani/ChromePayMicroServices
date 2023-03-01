const express = require('express');
const router = express.Router();
const {
    createAgent, viewAgent, deleteAgent, agentsuspend, unSuspendagent, blockedAgent, Agent_dash_main, registerAdmin, viewAdmins, get_emaployees
} = require('../controller/dashboard');


router.post("/register-agent", createAgent)
router.post("/view-agent", viewAgent)
router.post("/delete-agent/:agentID", deleteAgent)
router.post("/suspend-agent/:agentID", agentsuspend)
router.post("/Unsuspend-agent/:agentID", unSuspendagent)
router.post("/view-blockedAgent", blockedAgent)
router.post("/Agent_dash_main/:agentId", Agent_dash_main)
router.post("/register-admin", registerAdmin)
router.post("/view-admin", viewAdmins)
router.post("/view-employee", get_emaployees)





module.exports = router