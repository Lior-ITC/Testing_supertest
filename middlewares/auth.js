const jwt = require('jsonwebtoken');
const { verifyToken } = require('../lib/jwt');

async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: 'Must provide an authorization header' });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  try{
    const data = await verifyToken(token);
    req.user = data;
    next();
  }
  catch(err){
    res.status(401).send({ message: 'Invalid token' });
  }
  //   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
  //   if (err) {
  //     res.status(401).send({ message: 'Invalid token' });
  //     return;
  //   }
  //   req.user = decoded; // { id: ... }
  //   next();
  // });
}
exports.auth = auth;