const express = require('express');
const router = express.Router();
const {
    findLicenses, orgLicenses, changePassword, org_update, vieworg
} = require('../controller/auth');


router.post("/findLicenses", findLicenses)
router.post("/License-request", orgLicenses)
router.post("/Change-Pass", changePassword)
router.post("/org-update", org_update)
router.post("/view-org", vieworg)




module.exports = router