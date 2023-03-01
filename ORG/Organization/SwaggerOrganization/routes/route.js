
/**
 * @swagger
 * components:
 *   schemas:   
 *     organization:
 *       type: object
 *       required:
 *         - name
 *         - logo
 *         - code
 *         - joiningDate
 *         - phoneNo  
 *         - email
 *         - country
 *         - city
 *         - postCode
 *         - address
 *         - password
 *         - totalLicense
 *         - status
 *         - blocked 
 *         - isDeleted
 *         - otp
 *         - WrongPassword
 *         - passwordLimit
 *         - otpLimit
 *         - recurringFee
 *         - totalLicenseFee
 *         - feePerLicence
 *         - LicenseUpdateStatus
 *         - accessKeyID
 *         - secretAccessKey
 *       properties:
 *         FisrtName:
 *           type: string
 *           description: name for admin
 *         email:
 *           type: string
 *           description: email for admin
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
 *         
 */


/**
 * @swagger
 * tags:
 *   name: organization
 *   description: the organization managing Api's
 */

/** 
* @swagger
 * /v1/org/auth/Login:
 *   post:
 *     summary: login organization 
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               email:
 *                 type: string
 *                 default: fuse@gmail.com
 *               password:
 *                 type: string
 *                 default: 12345
 *     responses:
 *       200:
 *         description: successfully login organization
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */

/** 
* @swagger
 * /v1/org/auth/Forgot-Pass:
 *   post:
 *     summary: send an otp 
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               email:
 *                 type: string
 *                 default: hdfc@gmail.com
 *     responses:
 *       200:
 *         description: successfully send otp
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */

/** 
* @swagger
 * /v1/org/auth/Forgot-Pass-OTP:
 *   post:
 *     summary: forgot password and otp
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               email:
 *                 type: string
 *                 default: hdfc@gmail.com
 *               newPassword: 
 *                 type: string
 *                 default: 123
 *               confirmPassword:
 *                 type: string
 *                 default: 123
 *               otp:
 *                 type: number
 *                 default: 133377
 *     responses:
 *       200:
 *         description: successfully 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */



/**
 * @swagger
 * /v1/org/ActiveDID/Filter-cust:
 *   post:
 *     summary: get filter customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully filter customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/org/ActiveDID/Block-cust/{ID}:
 *   post:
 *     summary: block customer by ID
 *     parameters:
 *       - in: path
 *         name: ID
 *         default: 637cb15130972aef8fd3cf10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully block customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/


/**
 * @swagger
 * /v1/org/ActiveDID/Un-block-cust/{ID}:
 *   post:
 *     summary: Unblock customer by ID
 *     parameters:
 *       - in: path
 *         name: ID
 *         default: 637cb15130972aef8fd3cf10
 *     responses:
 *       200:
 *         description: successfully Unblock customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/


/**
 * @swagger
 * /v1/org/ActiveDID/Delete-cust/{ID}:
 *   post:
 *     summary: delete customer by ID
 *     parameters:
 *       - in: path
 *         name: ID
 *         default: 637cb15130972aef8fd3cf10
 *     responses:
 *       200:
 *         description: successfully delete customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/ActiveDID/Filter-cust:
 *   post:
 *     summary: get filter customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully filter customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/org/ActiveDID/Block-cust/{ID}:
 *   post:
 *     summary: block customer by ID
 *     parameters:
 *       - in: path
 *         name: ID
 *         default: 637cb15130972aef8fd3cf10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully block customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/org/ActiveDID/Un-block-cust/{ID}:
 *   post:
 *     summary: Unblock customer by ID
 *     parameters:
 *       - in: path
 *         name: ID
 *         default: 637cb15130972aef8fd3cf10
 *     responses:
 *       200:
 *         description: successfully Unblock customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /v1/org/ActiveDID/Delete-cust/{ID}:
 *   post:
 *     summary: delete customer by ID
 *     parameters:
 *       - in: path
 *         name: ID
 *         default: 637cb15130972aef8fd3cf10
 *     responses:
 *       200:
 *         description: successfully delete customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/org/Agent/register-agent:
 *   post:
 *     summary: create a new Agent for org 
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               name:
 *                 type: string
 *                 default: ank
 *               email:
 *                 type: string
 *                 default: ank321@gmail.com
 *               phone:
 *                 type: number
 *                 default: 5845845785
 *               country:
 *                 type: string
 *                 default: india
 *               address:
 *                 type: string
 *                 default: sapna sangeeta
 *               city:
 *                 type: string
 *                 default: indore
 *               postCode:
 *                 type: number
 *                 default: 20006
 *               transectionLimit:
 *                 type: number
 *                 default: 45
 *               Addsubagent:
 *                 type: number
 *               performPayOut:
 *                 type: number
 *               cancelTarnsection:
 *                 type: number
 *               approveTransection:
 *                 type: number
 *               createdigitalID:
 *                 type: number
 *               cashierapprove:
 *                 type: number     
 *     responses:
 *       200:
 *         description: successfully created Agent
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/org/Agent/view-agent:
 *   post:
 *     summary: view agents details
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: number
 *                 defaul: 1
 *     responses:
 *       200:
 *         description: successfully view agents details
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
* @swagger
* /v1/org/Agent/delete-agent/{agentID}:
*   post:
*     summary: delete an agent by ID
*     tags: [organization]
*     parameters:
*       - in: path
*         name: agentID
*         default: 63ecb0b90f45da80889c6ca6
*     responses:
*       200:
*         description: successfully deleted an agent
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
* @swagger
* /v1/org/Agent/suspend-agent/{agentID}:
*   post:
*     summary: suspend agent by agent ID
*     tags: [organization]
*     parameters:
*       - in: path
*         name: agentID
*         default: 63ecb0b90f45da80889c6ca6
*     responses:
*       200:
*         description: successfully suspended agent
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
* @swagger
* /v1/org/Agent/Unsuspend-agent/{agentID}:
*   post:
*     summary: Unsuspend agent by agent ID
*     tags: [organization]
*     parameters:
*       - in: path
*         name: agentID
*         default: 63ecb0b90f45da80889c6ca6
*     responses:
*       200:
*         description: successfully Unsuspended agent
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
* @swagger
* /v1/org/Agent/view-blockedAgent:
*   post:
*     summary: view  Blocked agent list
*     tags: [organization]
*     responses:
*       200:
*         description: successfully view agent list
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
* @swagger
* /v1/org/Agent/Agent_dash_main/{agentId}:
*   post:
*     summary: view  agent dashboard
*     tags: [organization]
*     parameters:
*       - in: path
*         name: agentId
*         default: 63ecb0b90f45da80889c6ca6
*     responses:
*       200:
*         description: successfully viewed agent dashboard
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/




/**
 * @swagger
 * /v1/org/DID/createCustomerByOrg:
 *   post:
 *     summary: create a new DID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               IDphoto:
 *                 type: string
 *               fullname:
 *                 type: string
 *                 default: ARR
 *               dateOfBirth:
 *                 type: string
 *                 default: 01/01/1999
 *               phone:
 *                 type: number
 *                 default: 919877487381
 *               city:
 *                 type: string
 *                 default: indore
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
 *               status:
 *                 type: string
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
 *               landSize:
 *                 type: string
 *               assetType:
 *                 type: string
 *               assetID:
 *                 type: string
 *               assetAddress:
 *                 type: string
 *               assetLongitude:
 *                 type: string
 *               assetLatitude:
 *                 type: string
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
 * /v1/org/DID/verifyCustomer:
 *   post:
 *     summary: verify customer by otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               phoneNo:
 *                 type: number
 *               OTP:
 *                 type: number
 *     responses:
 *       200:
 *         description: successfully verified customer
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/DID/Resend_otp/{phone}:
 *   post:
 *     summary: send an otp
 *     parameters:
 *       - in: path
 *         name: phone
 *     responses:
 *       200:
 *         description: successfully send  otp
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/DID/globalImageUploader:
 *   post:
 *     summary: upload a global image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               Image:
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully added an image
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
/**
 * @swagger
 * /v1/org/CRM/Create-Employee:
 *   post:
 *     summary: create an employee 
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               first_name:
 *                 type: string
 *                 default: ank
 *               last_name:
 *                 type: string
 *                 default: xyz
 *               email:
 *                 type: string
 *                 default: ank321@gmail.com
 *               phone:
 *                 type: number
 *                 default: 5845845785  
 *               password:
 *                 type: string
 *                 default: 123
 *     responses:
 *       200:
 *         description: successfully created an employee
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/CRM/pending-cust:
 *   post:
 *     summary: get pending customers
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully view pending customers
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/CRM/Verify-cust/{custID}:
 *   post:
 *     summary: verify-cust by custID
 *     tags: [organization]
 *     parameters:
 *       - in: path
 *         name: custID
 *         default: 637cb2b030972aef8fd3d00a
 *     responses:
 *       200:
 *         description: successfully verified customer 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/CRM/Blocked-DIDs:
 *   post:
 *     summary: get all Blocked DIDs
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully view all blocked DID
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
/**
* @swagger
* /v1/org/Export/Org_cust:
*   post:
*     summary: get all customers of organization
*     tags: [organization]
*     responses:
*       200:
*         description: successfully get all customer
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/Export/Org_Agents:
 *   post:
 *     summary: get all agent of an organization
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully get all agents
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/


/**
 * @swagger
 * /v1/org/Export/org_blocked_custmers:
 *   post:
 *     summary: get all blocked customers
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully get all blocked customers
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/logs/get_agent_LogHistory:
 *   post:
 *     summary: view agents log history
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: number
 *                 defaul: 2
 *     responses:
 *       200:
 *         description: successfully view agents log history
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
/**
 * @swagger
 * /v1/org/logs/get_user_LogHistory:
 *   post:
 *     summary: view users log history
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: number
 *                 defaul: 2
 *     responses:
 *       200:
 *         description: successfully view users log history
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/dash/detail:
 *   post:
 *     summary: get details of organization
 *     responses:
 *       200:
 *         description: successfully view organization details
 *       400:
 *         description: bad request
 *       500:
 *         description: some server error
*/

/**
 * @swagger
 * /v1/org/dash/get_org_cust_data_graph:
 *   post:
 *     summary: get organization cust data graph
 *     responses:
 *       200:
 *         description: successfully view organization cust data graph
 *       400:
 *         description: bad request
 *       500:
 *         description: some server error
*/

/**
 * @swagger
 * /v1/org/orgManage/register-admin:
 *   post:
 *     summary: register admin for organisation
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               firstName:
 *                 type: string
 *                 default: ank
 *               lastName:
 *                 type: string
 *                 default: aj
 *               Image:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *                 default: ank321@gmail.com
 *               phone:
 *                 type: number
 *                 default: 5845845785
 *               address:
 *                 type: string
 *                 default: sapna sangeeta
 *               city:
 *                 type: string
 *                 default: indore     
 *     responses:
 *       200:
 *         description: successfully created admin for organisation
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
/**
 * @swagger
 * /v1/org/orgManage/view-admin:
 *   post:
 *     summary: view  OrgAdmins 
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               page:
 *                 type: number
 *                 default: 1
 *     responses:
 *       200:
 *         description: successfully get OrgAdmins
 *       400:
 *         description: bad request
 *       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
* @swagger
* /v1/org/orgManage/view-employee:
*   post:
*     summary: view  OrgAdmins 
*     tags: [organization]
*     responses:
*       200:
*         description: successfully get OrgAdmins
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/


/**
 * @swagger
 * /v1/org/reports/get_num_of_Agnet:
 *   post:
 *     summary: get number of agents
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully view agent list
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/reports/org-per-repo:
 *   post:
 *     summary: get organization report
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully view organization report
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/reports/agent-Per-report/{agentId}:
 *   post:
 *     summary: view  agent reports
 *     tags: [organization]
 *     parameters:
 *       - in: path
 *         name: agentId
 *         default: 63ecb0b90f45da80889c6ca6
 *     responses:
 *       200:
 *         description: successfully view agent reports 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
/**
 * @swagger
 * /v1/org/reports/get_agent_cut_month/{agentId}:
 *   post:
 *     summary: view  agent report monthally
 *     tags: [organization]
 *     parameters:
 *       - in: path
 *         name: agentId
 *         default: 63ecb0b90f45da80889c6ca6
 *     responses:
 *       200:
 *         description: successfully view agent reports 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
/**
 * @swagger
 * /v1/org/reports/agnetDash/{agentId}:
 *   post:
 *     summary: view  agent dashboard 
 *     tags: [organization]
 *     parameters:
 *       - in: path
 *         name: agentId
 *         default: 63ecb0b90f45da80889c6ca6
 *     responses:
 *       200:
 *         description: successfully view agent 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/reports/org-detail:
 *   post:
 *     summary: get organization details
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully view  organization details
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
*       500:
*         description: Internal server error
*/


/**
 * @swagger
 * /v1/org/reports/get_org_cust_data_graph:
 *   post:
 *     summary: get organization data graph information
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               filter:
 *                 type: string
 *                 defaul: Month
 *     responses:
 *       200:
 *         description: successfully view organization data graph 
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/settings/findLicenses:
 *   post:
 *     summary: find License
 *     tags: [organization]
 *     responses:
 *       200:
 *         description: successfully view license
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
 * @swagger
 * /v1/org/settings/Change-Pass:
 *   post:
 *     summary: change password 
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string 
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
 * /v1/org/settings/org-update:
 *   post:
 *     summary: organization update
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:  
 *               logo:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               phoneNo:
 *                 type: number
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               postCode:
 *                 type: number
 *               address:
 *                 type: string
 *               password:
 *                 type: string 
 *     responses:
 *       200:
 *         description: successfully updated organization
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

/**
* @swagger
* /v1/org/settings/view-org:
*   post:
*     summary: view org 
*     tags: [organization]
*     responses:
*       200:
*         description: successfully view org 
*       400:
*         description: bad request
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/


/** 
 * @swagger
 * /v1/org/Cust/Cust-detail:
 *   post:
 *     summary: get customer details
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:   
 *               custID::
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully view customer details
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
*/

/** 
 * @swagger
 * /v1/org/Cust/update-DID:
 *   post:
 *     summary: update customer DID
 *     tags: [organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:   
 *               custID::
 *                 type: string
 *     responses:
 *       200:
 *         description: successfully updated organization DID
 *       400:
 *         description: bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
*/

router.post("/v1/org/auth/Login")
router.post("/v1/org/auth/Forgot-Pass")
router.post("/v1/org/auth/Forgot-Pass-OTP")


router.post("/v1/org/ActiveDID/Filter-cust")
router.post("/v1/org/ActiveDID/Block-cust/:ID")
router.post("/v1/org/ActiveDID/Un-block-cust/:ID")
router.post("/v1/org/ActiveDID/Delete-cust/:ID")


router.post("/v1/org/Agent/register-agent")
router.post("/v1/org/Agent/view-agent")
router.post("/v1/org/Agent/delete-agent/:agentID")
router.post("/v1/org/Agent/suspend-agent/:agentID")
router.post("/v1/org/Agent/Unsuspend-agent/:agentID")
router.post("/v1/org/Agent/view-blockedAgent")
router.post("/v1/org/Agent/Agent_dash_main/:agentId")


router.post("/v1/org/DID/createCustomerByOrg")
router.post("/v1/org/DID/verifyCustomer")
router.post("/v1/org/DID/Resend_otp/:phone")
router.post("/v1/org/DID/globalImageUploader")


router.post("/v1/org/CRM/Create-Employee")
router.post("/v1/org/CRM/pending-cust")
router.post("/v1/org/CRM/Verify-cust/:custID")
router.post("/v1/org/CRM/Blocked-DIDs")


router.post("/v1/org/Export/Org_cust")
router.post("/v1/org/Export/Org_Agents")
router.post("/v1/org/Export/org_blocked_custmers")


router.post("/v1/org/logs/get_agent_LogHistory")
router.post("/v1/org/logs/get_user_LogHistory")


router.post("/v1/org/dash/detail")
router.post("/v1/org/dash/get_org_cust_data_graph")


router.post("/v1/org/orgManage/register-admin")
router.post("/v1/org/orgManage/view-admin")
router.post("/v1/org/orgManage/view-employee")


router.post("/v1/org/reports/get_num_of_Agnet")
router.post("/v1/org/reports/org-per-repo")
router.post("/v1/org/reports/agent-Per-report/:agentID")
router.post("/v1/org/reports/get_agent_cut_month/:agentID")
router.post("/v1/org/reports/agnetDash/:agentID")
router.post("/v1/org/reports/org-detail")
router.post("/v1/org/reports/get_org_cust_data_graph")


router.post("/v1/org/settings/findLicenses")
router.post("/v1/org/settings/License-request")
router.post("/v1/org/settings/Change-Pass")
router.post("/v1/org/settings/org-update")
router.post("/v1/org/settings/view-org")


router.post("/v1/org/Cust/Cust-detail")
router.post("/v1/org/Cust/update-DID")


module.exports = router;