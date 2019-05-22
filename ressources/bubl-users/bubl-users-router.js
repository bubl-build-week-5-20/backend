const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json();
  }
});

module.exports = router;
