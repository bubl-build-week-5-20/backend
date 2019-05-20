const router = require('express').Router();
const db = require('./users-model.js');
const authValidation = require('../../middlewares/authValidation.js');

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const foundUser = await db.getUserById(req.params.id);
    if (!foundUser) {
      res
        .status(404)
        .json({errorMessage: `No user found with ID ${req.params.id}.`});
    } else {
      res.status(200).json(foundUser);
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: 'Server error while retrieving the user from the database.'
    });
  }
});

router.post('/', authValidation, async (req, res) => {
  try {
    let user = req.body;
    const newUser = await db.addUser(user);
    res.status(200).json({message: 'User was successfully created'}, newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: 'Server error while adding the new user to the database.'
    });
  }
});

router.put('/:id', authValidation, async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
