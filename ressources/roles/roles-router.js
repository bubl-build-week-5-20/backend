const router = require('express').Router();
const db = require('./roles-model.js');
const restricted = require('../../middlewares/restricted.js');

router.post('/', restricted, async (req, res) => {
  try {
    const role = await db.addRole(req.body);
    res.status(201).json(role);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't create the role.`});
  }
});

router.get('/', restricted, async (req, res) => {
  try {
    const role = await db.getRoles();
    res.status(200).json(role);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the roles`});
  }
});

router.get('/:id', restricted, async (req, res) => {
  try {
    const foundRole = await db.getRoleById(req.params.id);
    const users = await db.getRoleUsers(req.params.id);
    if (!foundRole) {
      res
        .status(404)
        .json({errorMessage: `Roles with ID ${req.params.id} not found.`});
    } else {
      const role = {...foundRole, users};
      res.status(200).json(role);
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the role`});
  }
});

router.put('/:id', restricted, async (req, res) => {
  try {
    const editedRole = await db.editRole(req.params.id, req.body);
    if (!editedRole) {
      res
        .status(404)
        .json({errorMessage: `Role with ID ${req.params.id} doesn't exist.`});
    } else {
      res.status(200).json(editedRole);
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't edit the role.`});
  }
});

router.delete('/:id', restricted, async (req, res) => {
  try {
    const deletedRole = await db.deleteRole(req.params.id);
    if (!deletedRole) {
      res
        .status(404)
        .json({errorMessage: `Role with ID ${req.params.id} not found.`});
    } else {
      res.status(200).json({message: 'Role successfully deleted!'});
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't delete the role.`});
  }
});

router.post('/change', restricted, async (req, res) => {
  try {
    const user = req.decodedToken;
    const role = req.body;
    const changeRole = await db.changeRole(role, user);
    res.status(200).json({message: `Your role as been updated!`});
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: `Server error couldn't change user role.`});
  }
});

module.exports = router;
