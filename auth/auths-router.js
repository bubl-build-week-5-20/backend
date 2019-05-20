const router = require('express').Router();
const bcrypt = require('bcrypt');
const authValidation = require('../middlewares/authValidation.js');
const db = require('../ressources/users/users-model.js');
const generateToken = require('./generateToken.js');

router.post('/register', authValidation, async (req, res) => {
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
      .json({errorMessage: 'Server error while registering a new user.'});
  }
});

router.post('/login', authValidation, async (req, res) => {
  try {
    const {username, password} = req.body;
    const foundUser = await db.getUserByName(username);
    if (foundUser) {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        const token = generateToken(foundUser);
        res
          .status(200)
          .json({message: `Welcome ${foundUser.username}!`, token});
      } else {
        res.status(400).json({message: 'Invalid credentials!'});
      }
    } else {
      res.status(404).json({message: 'User not found!'});
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: `Server error couldn't login!`});
  }
});

module.exports = router;
