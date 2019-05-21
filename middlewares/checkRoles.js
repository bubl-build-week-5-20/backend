const jwt = require('jsonwebtoken');

module.exports = role => {
  return function(req, res, next) {
    // console.log(req.decodedToken.role);
    req.decodedToken && req.decodedToken.role && req.decodedToken.role === role
      ? next()
      : res.status(403).json({
          message:
            'You need to be an administrator to create a school or a bubl!'
        });
  };
};
