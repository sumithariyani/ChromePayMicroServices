const express = require('express');
const router = express.Router();
const {
    agentProfile, agentProfileUpdate, agentchangePassword
} = require('../controller/settings');


router.get("/agentProfile", agentProfile)
router.post("/agentProfileUpdate", agentProfileUpdate)
router.post("/agentchangePassword", agentchangePassword)


module.exports = router