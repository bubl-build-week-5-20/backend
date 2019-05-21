const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');

module.exports = function generateToken(user) {
  console.log(user.role);
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret.jwtSecret, options);
};
