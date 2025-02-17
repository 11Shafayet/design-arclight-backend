const jwt = require('jsonwebtoken');

const createToken = (jwtPayload, secret, expiresIn) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  createToken,
  verifyToken,
};
