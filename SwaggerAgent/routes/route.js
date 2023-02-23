const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     agent:
 *       type: object
 *       required:
 *         - image
 *         - name
 *         - email
 *         - password
 *         - phone  
 *         - agentCode
 *         - country
 *         - address
 *         - city
 *         - postCode
 *         - transectionLimit
 *         - Addsubagent
 *         - organisationID
 *         - token
 *         - isDeleted
 *         - role
 *       properties:
 *         FisrtName:
 *           type: string
 *           description: name for agent
 *         email:
 *           type: string
 *           description: email for agent
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         FirstName: adminName
 *         lastName: adminName
 *         email: xyz.gmail.com
 *         password: test@123
 *         phone: 548939832
 *         address: xyz
 *         state: xyz
 *         city: xyz
 *         postCode: xyz
 *         role: abc
 */


/**
 * @swagger
 * tags:
 *   name: Agent
 *   description: The Agent Managing Api's
 */

/**
 * @swagger
 * tags:
 *   name: Organization
 *   description: The Organization Managing Api's
 */


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin Managing Api's
 */


/**
 * @swagger
 * /v1/auth/Login:
 *   post:
 *     summary: Agent Login
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *                 default: virendra@gmail.com
 *               password:
 *                 type: string
 *                 default: Virendra@123
 *     responses:
 *       200:
 *         description: login sucessfully completed
 *       400:
 *         description: bad request
 *       500:
 *         description: some server error
 */


/**
 * @swagger
 * /v1/auth/ForgotPassword:
 *   post:
 *     summary: Agent forgot password
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 default: virendra@gmail.com
 *     responses:
 *       200:
 *         description: opt send successfully
 *       400:
 *         description: bad request
 *       500:
 *         description: some server error
 */

/**
 * @swagger
 * /v1/auth/ForgetPassVerifyOtp:
 *   post:
 *     summary: Agent verify otp
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 default: virendra@gmail.com
 *               otp:
 *                 type: number
 *                 default: 123
 *     responses:
 *       200:
 *         description: successfully verified otp
 *       400:
 *         description: bad request
 *       500:
 *         description: some server error
 */


/**
 * @swagger
 * /v1/auth/ForgotchangePass:
 *   post:
 *     summary: Agent chenge password
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 default: virendra@gmail.com
 *               newPassword:
 *                  type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully changed password
 *       400:
 *         description: bad request
 *       500:
 *         description: some server error
 */


/**
 * @swagger
 * /registerDID1:
 *   post:
 *     summary: create a new DID
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               fullname:
 *                 type: string
 *                 default: ARR
 *               dateOfBirth:
 *                 type: string
 *                 default: 01/01/1999
 *               phone:
 *                 type: number
 *                 default: 919877487381
 *               email:
 *                 type: string
 *                 default: email789@gmail.com
 *               gender:
 *                 type: string
 *                 default: male
 *               nationality:
 *                 type: string
 *                 default: india
 *               professoin:
 *                 type: string
 *                 default: farmer
 *               address:
 *                 type: string
 *                 default: indore
 *               Latitude:
 *                 type: string
 *                 default: 5464
 *               Longitude:
 *                 type: string
 *                 default: 545465
 *               nextFOKniPhone:
 *                 type: number
 *                 default: 987654787878
 *               nextFOKinName:
 *                 type: string
 *                 default: nikihil
 *               IDphoto:
 *                 type: string
 *                 default: htyuytfhgughb
 *     responses:
 *       200:
 *         description: successfully added did
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /registerDID2:
 *   post:
 *     summary: create a new DID2
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               landSize:
 *                 type: number
 *                 default: 12
 *               assetType:
 *                 type: string
 *                 default: 45
 *               assetID:
 *                 type: string
 *                 default: 456
 *               phone:
 *                 type: number
 *                 default: 919877487381
 *               age:
 *                 type: number
 *                 default: 31
 *               city:
 *                 type: string
 *                 default: indore
 *               email:
 *                 type: string
 *                 default: sat@gmail.com
 *               residace:
 *                 type: string
 *               local:
 *                 type: string
 *               land:
 *                 type: string  
 *     responses:
 *       200:
 *         description: successfully added did2 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/DID/verifyOTP:
 *   post:
 *     summary: verify otp
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               phoneNo:
 *                 type: number
 *                 default: 9877487381
 *               otp:
 *                 type: number
 *                 default: 17566
 *     responses:
 *       200:
 *         description: successfully verified otp
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /Linked-send-otp:
 *   post:
 *     summary: send otp
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               DIDref:
 *                 type: string
 *                 default: 1713423543
 *     responses:
 *       200:
 *         description: successfully send otp 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /Linked-service:
 *   post:
 *     summary: send otp and register agent 
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               DIDref:
 *                 type: string
 *                 default: 1713423543
 *               otp:
 *                 type: number
 *     responses:
 *       200:
 *         description: successfully register agent
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /Resend_otp/{phone}:
 *   post:
 *     summary: send otp and register agent 
 *     tags: [Agent]
 *     parameters:
 *       - in: path
 *         name: phone
 *     responses:
 *       200:
 *         description: successfully register agent
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/DID/orgList:
 *   get:
 *     summary: create a new DID
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: successfully add license 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /ImageUploader:
 *   post:
 *     summary: upload an image 
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully uploaded image
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/view/DID/awaitingList:
 *   post:
 *     summary: view a list of  agents awaiting
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: number
 *     responses:
 *       200:
 *         description: successfully view awaiting agents
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/view/DID/Agent_dash_main:
 *   post:
 *     summary: view a list of  agents awaiting
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: successfully view awaiting agents
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/views/DID/view-customer:
 *   post:
 *     summary: view customer list
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: successfully view customer list 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/Detail/DID/cust-Detail/{custID}:
 *   post:
 *     summary: agent view customer details
 *     tags: [Agent]
 *     parameters:
 *       - in: path
 *         name: custID
 *         default: 638f25a32e597739c9586852
 *     responses:
 *       200:
 *         description: successfully viewed customer details
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/Detail/DID/customer-financial-activity/{custID}:
 *   post:
 *     summary: agent view customer financial activity
 *     tags: [Agent]
 *     parameters:
 *       - in: path
 *         name: custID
 *         default: 638f25a32e597739c9586852
 *     responses:
 *       200:
 *         description: successfully viewed customer financial activity
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/Detail/DID/send_cust_otp_data_view:
 *   post:
 *     summary:  send otp 
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               phoneNo:
 *                 type: number
 *                 default: 6263817082
 *     responses:
 *       200:
 *         description: successfully send otp 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/Detail/DID/verify_cust_view_OTP:
 *   post:
 *     summary:  agent verify_cust_view_OTP
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               phoneNo:
 *                 type: number
 *                 default: 6263817082
 *               OTP:
 *                 type: number
 *     responses:
 *       200:
 *         description: successfully verified otp
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/Agnet/agnetPerformance:
 *   post:
 *     summary: view the agent performance by monthly
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               filter:
 *                 type: string
 *                 default: Month
 *     responses:
 *       200:
 *         description: successfully view the agent performance
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/Agnet/get_agent_cut_month_react:
 *   post:
 *     summary: agent performance report by yearly
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               filter:
 *                 type: string
 *                 default: Year
 *     responses:
 *       200:
 *         description: successfully view agent performance 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/settings/agentProfile:
 *   get:
 *     summary: get  agent profile
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: successfully view  agent profile
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/settings/agentProfileUpdate:
 *   post:
 *     summary: agent profile update
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               country:
 *                 type: string
 *                 default: ethiopia
 *     responses:
 *       200:
 *         description: successfully updated agent profile
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/settings/agentchangePassword:
 *   post:
 *     summary: agent change password
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               oldPassword:
 *                 type: string
 *                 default: abc@123
 *               newPassword:
 *                 type: string
 *                 default: Xyz@123
 *               confirmPassword:
 *                 type: string
 *                 default: Xyz@123
 *     responses:
 *       200:
 *         description: successfully change password
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/Commission/DID/commissionlist:
 *   post:
 *     summary: view agent commission List
 *     tags: [Agent]
  *     requestBody:
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: number
 *                 default: 1
 *               toDate:
 *                 type: string
 *                 format: date
 *               fromDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: successfully viewed commission list
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/AgencyBanking/send-otp:
 *   post:
 *     summary: send otp
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               ID:
 *                 type: number
 *                 default: 1900175516
 *     responses:
 *       200:
 *         description: successfully send otp
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/AgencyBanking/verify-otp:
 *   post:
 *     summary: verify otp
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               ID:
 *                 type: number
 *                 default: 1900175516
 *               OTP:
 *                 type: number
 *                 default: 17566
 *     responses:
 *       200:
 *         description: successfully verified otp
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */



router.post("/v1/org/auth/Login")
router.post("/v1/org/auth/ForgotPassword")
router.post("/v1/org/auth/ForgetPassVerifyOtp")
router.post("/v1/org/auth/ForgotchangePass")

router.post("/v1/DID/registerDID1")
router.post("/v1/DID/registerDID2")
router.post("/v1/DID/verifyOTP")
router.post("/v1/DID/Linked-send-otp")
router.post("/v1/DID/Linked-service")
router.post("/v1/DID/Resend_otp/:phone")
router.get("/v1/DID/orgList")
router.post("/v1/DID/ImageUploader")

router.post("/v1/view/DID/awaitingList")
router.post("/v1/view/DID/Agent_dash_main")

router.post("/v1/views/DID/view-customer")


router.post("/v1/Detail/DID/cust-Detail/:custID")
router.post("/v1/Detail/DID/customer-financial-activity/:custID")
router.post("/v1/Detail/DID/send_cust_otp_data_view")
router.post("/v1/Detail/DID/verify_cust_view_OTP")

router.post("/v1/Agnet/agnetPerformance")
router.post("/v1/Agnet/get_agent_cut_month_react")

router.get("/v1/settings/agentProfile")
router.post("/v1/settings/agentProfileUpdate")
router.post("/v1/settings/agentchangePassword")

router.post("/v1/Commission/DID/commissionlist")

router.post("/v1/AgencyBanking/send-otp")
router.post("/v1/AgencyBanking/verify-otp")

module.exports = router