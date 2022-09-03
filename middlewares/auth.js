const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: 'Must provide an authorization header' });
    return;
  }
  // authorization = "Bearer klja89shjf98hna897hasi4hfias87yi4f..."
  const token = authorization.replace('Bearer ', '');
  // token = klja89shjf98hna897hasi4hfias87yi4f...
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Invalid token' });
      return;
    }
    req.user = decoded; // { id: ... }
    next();
  });
}
exports.auth = auth;