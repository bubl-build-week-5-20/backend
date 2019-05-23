const router = require('express').Router();
const db = require('./bubls-model.js');
const bublValidation = require('../../middlewares/bublValidation.js');
const checkRoles = require('../../middlewares/checkRoles.js');
const restricted = require('../../middlewares/restricted.js');

router.post('/', restricted, checkRoles('administrator'), async (req, res) => {
  try {
    const bubl = await db.addBubl(req.body);
    res.status(201).json(bubl);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: `Server error couldn't create the bubl.`
    });
  }
});

router.get('/', restricted, async (req, res) => {
  try {
    const bubls = await db.getBubls();
    res.status(200).json(bubls);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the bubls.`});
  }
});

router.get('/:id', restricted, async (req, res) => {
  try {
    const foundBubl = await db.getBublById(req.params.id);

    if (!foundBubl) {
      res
        .status(404)
        .json({errorMessage: `Bubl with ID ${req.params.id} not found.`});
    } else {
      const users = await db.getBublUsers(req.params.id);
      const bubl = {...foundBubl, users};
      res.status(200).json(bubl);
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the bubl.`});
  }
});

router.put(
  '/:id',
  restricted,
  checkRoles('administrator'),
  async (req, res) => {
    try {
      const editedBubl = await db.editBubl(req.params.id, req.body);
      if (!editedBubl) {
        res
          .status(404)
          .json({errorMessage: `Bubl with ID ${req.params.id} not found.`});
      } else {
        res.status(200).json(editedBubl);
      }
    } catch (e) {
      res
        .status(500)
        .json({errorMessage: `Server error couldn't edit the Bubl.`});
    }
  }
);

router.delete(
  '/:id',
  restricted,
  checkRoles('administrator'),
  async (req, res) => {
    try {
      const deletedBubl = await db.deleteBubl(id);
      if (!deletedBubl) {
        res
          .status(404)
          .json({errorMessage: `Bubl with ID ${req.params.id} not found.`});
      } else {
        res.status(200).json({message: 'Buble successfully deleted!'});
      }
    } catch (e) {
      res
        .status(500)
        .json({errorMessage: `Server error couldn't delete the Bubl.`});
    }
  }
);

router.post('/:id/join', restricted, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.decodedToken;
    // const id = req.body;
    const join = await db.joinBubl(user, id);
    res.status(200).json(join);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: `Server error couldn't join the bubl`});
  }
});

module.exports = router;
