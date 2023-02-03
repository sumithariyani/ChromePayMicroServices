//require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {

  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({
      message: 'Authorization required',
      status: 0,
      data: null,
    });

    const token = authorization?.split(' ')[1];

    if (!token) return res.status(401).send({
      message: 'Authorization required',
      status: 0,
      data: null,
    });

    const decoded = jwt.verify(token, 'GDHSFVHDF785DF1234DGFVDHF456354R');
    console.log("tokens decode", decoded)
    req.agentId = decoded.agentID;
    req.orgId = decoded.orgID
    next();
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: err.message,
      status: 0,
      data: null,
    });
  }
};


module.exports = {
  isAuth
};
