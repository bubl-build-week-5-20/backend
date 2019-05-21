const jwt = require('jsonwebtoken');

const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          errorMessage: 'Access Unhauthorized you must have a valid token!'
        });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({errorMessage: 'Require to be logged in!'});
  }
};
