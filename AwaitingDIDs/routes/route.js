const express = require('express');
const router = express.Router();
const {
    AgentAwaiting
} = require('../controller/Awaiting');


router.post("/awaitingList", AgentAwaiting)


module.exports = router