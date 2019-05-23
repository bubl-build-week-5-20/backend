const router = require('express').Router();
const db = require('./bubl-users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secret.js');

router.post('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    let userId = null;
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      userId = decodedToken.subject;
    });
    console.log(userId);
    const addUser = await db.addUser(userId);
    // const addBubl = await db.addBubl(req.params.id);
    res.status(200).json({message: 'User is successfully added!'});
  } catch (e) {
    console.log(e);
    res.status(500).json({errorMessage: `Server error couldn't add the user.`});
  }
});

module.exports = router;
