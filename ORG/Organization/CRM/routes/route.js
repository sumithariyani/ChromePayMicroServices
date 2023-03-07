const express = require('express');
const router = express.Router();
const {
    create_employe, Org_pendingCust, customerVerify, Org_blockedIDS, customerDetail, updateDigitalID, get_cust_logs
} = require('../controller/dashboard');


router.post("/Create-Employee", create_employe)
router.post("/pending-cust", Org_pendingCust)
router.post("/Verify-cust/:custID", customerVerify)
router.post("/Blocked-DIDs", Org_blockedIDS)
router.post("/Cust-detail", customerDetail)
router.post("/update-DID", updateDigitalID)
router.post("/get_cust_logs/:custID", get_cust_logs)





module.exports = router