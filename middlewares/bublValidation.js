const Joi = require('@hapi/joi');

module.exports = function bublValidation(req, res, next) {
  const schema = Joi.object().keys({
    bubl_name: Joi.string()
      .min(3)
      .max(200)
      .required(),
    max_students_allowed: Joi.number().integer()
  });
  Joi.validate(req.body, schema, (e, result) => {
    console.log(req.body);
    if (e) {
      res.status(400).json({errorMessage: 'Please provide a name!'});
    } else {
      next();
    }
  });
};
