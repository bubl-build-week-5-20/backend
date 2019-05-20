const Joi = require('@hapi/joi');

module.exports = function commentValidation(req, res, next) {
  const schema = Joi.object().keys({
    body: Joi.string()
      .min(6)
      .max(255)
  });
  Joi.validate(req.body, schema, (e, result) => {
    if (e) {
      res.status(400).json({
        errorMessage: 'In order to comment you have to write something!'
      });
    } else {
      next();
    }
  });
};
