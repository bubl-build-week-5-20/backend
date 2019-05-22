const router = require('express').Router();
const db = require('./users-model.js');
const authValidation = require('../../middlewares/authValidation.js');
const restricted = require('../../middlewares/restricted.js');

router.get('/', restricted, async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: 'Server error while retrieving the users from the database.'
    });
  }
});

router.get('/:id', restricted, async (req, res) => {
  try {
    const foundUser = await db.getUserById(req.params.id);
    const bubls = await db.getUserBubls(req.params.id);
    if (!foundUser) {
      res
        .status(404)
        .json({errorMessage: `No user found with ID ${req.params.id}.`});
    } else {
      const user = {...foundUser, bubls};
      res.status(200).json(user);
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: 'Server error while retrieving the user from the database.'
    });
  }
});

router.post('/', restricted, authValidation, async (req, res) => {
  try {
    let user = req.body;
    const newUser = await db.addUser(user);
    res.status(200).json({message: 'User was successfully created'}, newUser);
  } catch (e) {
    res.status(500).json({
      errorMessage: 'Server error while adding the new user to the database.'
    });
  }
});

router.put('/:id', restricted, authValidation, async (req, res) => {
  try {
    const editedUser = await db.editUser(req.params.id, req.body);
    if (!editedUser) {
      res
        .status(404)
        .json({errorMessage: `No user with ID ${req.params.id} was found.`});
    } else {
      res.status(201).json(editedUser);
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: 'Server error while editing the user infos'});
  }
});

router.delete('/:id', restricted, async (req, res) => {
  try {
    const deletedUser = await db.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({errorMessage: `No user with ID ${req.params.id}`});
    } else {
      res.status(204).end();
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: 'Server error while deleting the user from the database.'
    });
  }
});

module.exports = router;
