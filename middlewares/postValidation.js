const Joi = require('@hapi/joi');

module.exports = function postValidation(req, res, next) {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(3)
      .max(128)
      .required(),
    body: Joi.string()
      .min(6)
      .required()
  });

  Joi.validate(req.body, schema, (e, result) => {
    console.log(req.body);
    if (e) {
      console.log(e.message);
      res.status(400).json({
        errorMessage: 'Please provide a title and content for the post! '
      });
    } else {
      next();
    }
  });
};
