module.exports = role => {
  return function(req, res, next) {
    if (req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      res
        .status(403)
        .json({
          errorMessage:
            'You need to be an administrator to create a school or a bubl!'
        });
    }
  };
};
