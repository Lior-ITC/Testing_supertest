const jwt = require('jsonwebtoken');

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET,
    async (err, decoded) => {
        if (err) {
          throw err;
        }
        return decoded;
      });
}

exports.verifyToken = verifyToken;