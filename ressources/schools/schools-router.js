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
      res.status(201).json(school);
    } catch (e) {
      res
        .status(500)
        .json({errorMessage: `Server error couldn't create school`});
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const schools = await db.getSchools();
    res.status(200).json(schools);
  } catch (e) {
    res.status(500).json({
      errorMessage: `Server error couldn't retrieve the schools from the database.`
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundSchool = await db.getShoolById(req.params.id);
    if (!foundSchool) {
      res
        .status(404)
        .json({errorMessage: `No school with ID ${req.params.id} was found.`});
    }
  } catch (e) {
    res.status(500).json({
      errorMessage: `Server error couldn't retrive the school from the database`
    });
  }
});

router.put(
  '/:id',
  checkRoles('administrator'),
  schoolValidation,
  async (req, res) => {
    try {
      const editedSchool = await db.editSchool(req.params.id, req.body);
      if (!editedSchool) {
        res.status(404).json({
          errorMessage: `No school with ID ${req.params.id} was found.`
        });
      } else {
        res.status(200).json(editedSchool);
      }
    } catch (e) {
      res.status(500).json({errorMessage: `Server couldn't edit the school.`});
    }
  }
);

router.delete(
  '/:id',
  checkRoles('administrator'),
  schoolValidation,
  async (req, res) => {
    try {
      const deletedSchool = await db.deleteSchool(req.params.id);
      if (!deletedSchool) {
        res.status(404).json({
          errorMessage: `School with ID ${req.params.id} was not found.`
        });
      } else {
        res.status(200).json({message: 'School successfully deleted.'});
      }
    } catch (e) {
      res
        .status(500)
        .json({errorMessage: `Server couldn't delete the school.`});
    }
  }
);

module.exports = router;
