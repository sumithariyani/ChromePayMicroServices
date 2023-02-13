const express = require('express');
const router = express.Router();
const {
    AgentAwaiting, Agent_dash_main
} = require('../controller/Awaiting');


router.post("/awaitingList", AgentAwaiting)
router.post("/Agent_dash_main", Agent_dash_main)


module.exports = router