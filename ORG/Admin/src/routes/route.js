const express = require('express');
const router = express.Router();

const adminController = require("../controller/adminontroller");

 const adminauth = require("../middleware/adminAUth");

const apihis = require("../middleware/apihistory");
//const BlocckIPs = require("../controller/BlockIPS")
const MatchIPc = require("../middleware/blockeIPs")
const Face_ditection = require("../controller/cust_face_controller")


//-----------------------------------------------------------ADMIN---------------------------------------------

router.post("/Admin", MatchIPc.findBlockIPs, adminController.createAdmin, apihis.apiHistory);
router.post("/adminLogin", MatchIPc.findBlockIPs, adminController.AdminLogin, apihis.apiHistory);
//router.get("/getAdminHistory",adminauth.adminAUth, MatchIPc.findBlockIPs, adminController.getHistory, apihis.apiHistory);
router.post("/adminlogin2", MatchIPc.findBlockIPs, adminController.admin_login)
router.post("/otpVerificationAdmin/:ID", MatchIPc.findBlockIPs, adminController.verifyOTP)
router.post("/OrganisationList", MatchIPc.findBlockIPs, adminController.OrganisationList)
router.put("/suspend/:OrganisationID", MatchIPc.findBlockIPs, adminController.SuspendOrganisation)
router.put("/unsuspend/:OrganisationID", MatchIPc.findBlockIPs, adminController.Un_suspend_Organisation)
router.delete("/deleteOrganization/:OrganisationID", MatchIPc.findBlockIPs, adminController.deleteOrganisation)
router.post("/CustomerList", MatchIPc.findBlockIPs, adminController.AdminCustomerList)
router.put("/suspendcustomer/:ID/:adminID", MatchIPc.findBlockIPs, adminController.suspendCustomer);
router.put("/Unsuspendcustomer/:ID/:adminID", MatchIPc.findBlockIPs, adminController.UnsuspendCustomer);
router.delete("/deleteCustomer/:ID/:adminID", MatchIPc.findBlockIPs, adminController.DeleteCustomer);
router.delete("/unBlockIP/:adminID/:ID", adminController.UnBlockIP)
router.post("/admintransectionfillter/:adminID", MatchIPc.findBlockIPs, adminController.admintransectionfillter);
router.get("/adminProfile/:adminID", MatchIPc.findBlockIPs, adminController.adminProfile);
router.post("/changePassword/:adminID", MatchIPc.findBlockIPs, adminController.changePassword);
router.post("/forgotpassword", MatchIPc.findBlockIPs, adminController.forgotpassword)
router.post("/changePasswordotp", MatchIPc.findBlockIPs, adminController.changePasswordotp)
router.post("/blockIPList/:adminID", adminController.blockIPList)
router.put("/updatelimits/:adminID", adminController.updatelimits)
router.get("/viewtransection/:ID", MatchIPc.findBlockIPs, adminController.viewtransection)
router.post("/adminProfileUpdate/:adminID", adminController.adminProfileUpdate)
router.post("/updateAgentTransection/:adminID", adminController.updateAgentTransection)
router.get("/admindash", adminController.admindash)
router.post("/custdetail/:custID", adminController.custdetail)
router.post("/approvalDIDs", adminController.approvalDIDs)
router.post("/blockedIDS", adminController.blockedIDS)
router.post("/blockedOrglist", adminController.blockedOrglist)
router.post("/getAllDIDs", adminController.getAllDIDs)
router.get("/recentUser", adminController.recentUser)
router.get("/recentTransection", adminController.recentTransection)
router.post("/adminAgent/:adminID", adminController.adminAgent)
router.get("/viewAdminAgent", adminController.viewAdminAgent)
router.put("/updateAdminAgent/:agentID", adminController.updateAdminAgent)
router.put("/deleteAgent/:agentID", adminController.deleteAgent)
router.post("/blockedAgentsList", adminController.blockedAgentsList)
router.post("/addSubAdmin/:adminID", adminController.addSubAdmin)
router.get("/Sub_admin_profil/:sub_adminID", adminController.Sub_admin_profil)
router.post("/addsubadminrole/:adminID/:subAdminID", adminController.add_sub_admin_role)
router.post("/updateSubAdminRoles/:subAdminID", adminController.updateSubAdminRoles)
router.post("/customerVerify/:custID/:adminID", adminController.customerVerify)
router.post("/orgVerify/:orgID/:adminID", adminController.orgVerify)
router.post("/OrgCust/:custID", adminController.OrgCust)
router.post("/addFeeSetup/:adminID", adminController.addFeeSetup)
router.post("/createCustomerByAdmin/:ID", adminController.createCustomerByAdmin)
router.post("/pendingCust", adminController.pendingCust)
router.post("/AgentReport", adminController.AgentReport)
router.post("/recentAgentUser/:ID", adminController.recentAgentUser)
router.post("/findSubAdmin", adminController.findSubAdmin)
router.post("/subAdminRole/:adminID", adminController.subAdminRole)

router.post("/AdminCust", adminController.AdminCust)
router.post("/AdminOrg", adminController.AdminOrg)
router.post("/AdminBlockedCust", adminController.AdminBlockedCust)
router.post("/agentPerformanceReport/:agentID", adminController.agentPerformanceReport)


//AdminOrganisation

router.post("/orgLicenses/:orgID", adminController.orgLicenses)
router.post("/findLicenses/:orgID", adminController.findLicenses)
router.post("/add_Licenses/:orgID", adminController.add_Licenses)
router.get("/viewFee/:orgID", adminController.viewFee)
router.post("/updateFee/:orgID", adminController.updateFee)
router.post("/addOrgDocument/:orgID", adminController.addOrgDocument)
router.get("/find_Org_RemainingLicenses/:orgID", adminController.find_Org_RemainingLicenses)
router.post("/viewDoc/:orgID", adminController.viewDoc)
router.post("/findlowLicenseOrganisattions", adminController.findlowLicenseOrganisattions)
router.post("/emailRequestsByOrg", adminController.emailRequestsByOrg)

router.post("/agentEmailRequest", adminController.agentEmailRequest)
router.post("/customer_bank/:custID", adminController.customer_bank)
router.post("/bankWithCust/:BankID", adminController.bankWithCust)
router.post("/Block_Bank/:BankID", adminController.Block_Bank)
router.post("/Un_Block_Bank/:BankID", adminController.Un_Block_Bank)
router.post("/OrgChart", adminController.OrgChart)
router.post("/OrgTransectionChart", adminController.OrgTransectionChart)
router.post("/cust_organisation/:custID", adminController.cust_organisation)
router.post("/chrome_pay_logs", adminController.chrome_pay_logs)
router.post("/get_all_loans", adminController.get_all_loans)
router.post("/Block_sub_admin/:sub_admin_ID", adminController.Block_sub_admin)
router.post("/Unblock_sub_admin/:sub_admin_ID", adminController.Unblock_sub_admin)
router.post("/admin_read_notification/:ID", adminController.admin_read_notification)
router.post("/get_admin_cust_data_graph", adminController.get_admin_cust_data_graph)
router.post("/view_all_agents", adminController.view_all_agents)
router.post("/fileUpload", adminController.globalImageUploader);
router.get("/orgDashSection/:ID", MatchIPc.findBlockIPs, adminController.OrgDashSection)
router.get("/get_org_transections_months/:orgID", adminController.get_org_transections_months)
router.post("/get_transctions/:orgID", adminController.get_transctions)
router.post("/OrgPerreort/:orgID", adminController.OrgPerreort)
router.post("/org_add_cust/:orgID", adminController.org_add_cust)



//---------------------------------------------Cust_Face_ditection---------------------------------------------------------------------------------

router.post("/cust_Face_ditect/:custID", Face_ditection.cust_Face_ditect)
router.post("/pre_cust_Face_ditect", Face_ditection.pre_cust_Face_ditect)
// router.post("/get_items", Face_ditection.get_items)


module.exports = router;