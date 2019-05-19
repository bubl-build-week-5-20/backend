const router = require('express').Router();
const bcrypt = require('bcrypt');
const authvalidation = require('../middlewares/authValidation.js');
const db = require('./auths-model.js');

router.post('/register', authvalidation, async (req, res) => {
  try {
    let user = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const newUser = await db.addUser(user);
    res
      .status(201)
      .json({message: `${user.username} was successfully registered!`});
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: 'Server error while registering the new user.'});
  }
});

module.exports = router;
