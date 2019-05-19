const router = require('express').Router();
const bcrypt = require('bcrypt');
const authvalidation = require('../middlewares/authValidation.js');

router.post('/register', authvalidation, async (req, res) => {
  try {
    const {username, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
