const router = require('express').Router();
const checkRoles = require('../../middlewares/checkRoles.js');
const schoolValidation = require('../../middlewares/schoolValidation.js');
const db = require('./schools-model.js');

router.post(
  '/',
  checkRoles('administrator'),
  schoolValidation,
  async (req, res) => {
    try {
      const school = await db.addSchool(req.body);
      res.status(200).json(school);
    } catch (e) {
      res
        .status(500)
        .json({errorMessage: `Server error couldn't create school`});
    }
  }
);

module.exports = router;
