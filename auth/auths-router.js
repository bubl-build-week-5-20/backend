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

router.get('/decode', async (req, res) => {
  try {
    const token = await req.headers.authorization;
    if (token) {
      await jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({message: 'uh oh something went wrong'});
        } else {
          res.status(200).json(decodedToken);
        }
      });
    } else {
      res.status(401).json({message: 'error no token provided'});
    }
  } catch (error) {
    res.status(500).json({message: 'error getting info'});
  }
});

module.exports = router;
