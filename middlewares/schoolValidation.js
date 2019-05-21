const Joi = require('@hapi/joi');

module.exports = function schoolValidation(req, res, next) {
  const schema = Joi.object().keys({
    school_name: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  Joi.validate(req.body, schema, (e, result) => {
    if (e) {
      res.status(400).json({errorMessage: 'Please provide a school name!'});
    } else {
      next();
    }
  });
};
