module.exports = function checkRoles(role) {
  return function(req, res, next) {
    if (role !== 'administrator') {
      res
        .status(403)
        .json({
          errorMessage: 'You need to be an administrator to create a school!'
        });
    } else {
      next();
    }
  };
};
