




const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    try {

        let authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            
        

        const decoded = jwt.verify(token, 'Admin')

        if (!decoded) {
            return res.status(200).send({ status: false, message: `Invalid authentication token in request` });
        }

        req.userId = decoded.agentID

        next()
    }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.auth = auth;