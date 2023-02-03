const express = require('express');
const router = express.Router();
const {
    commissionlist
} = require('../controller/commission');


router.post("/commissionlist", commissionlist)


module.exports = router