const Joi = require('@hapi/joi');

module.exports = function validation(req, res, next) {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(128)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{6,255}$/)
      .required(),
    role: Joi.string()
  });

  Joi.validate(req.body, schema, (e, result) => {
    if (e) {
      res
        .status(400)
        .json({errorMessage: 'Please provide username and password!'});
    } else {
      next();
    }
  });
};
