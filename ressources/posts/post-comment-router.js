const router = require('express').Router();
const db = require('../comments/comments-model.js');
const commentValidaton = require('../../middlewares/commentValidation.js');
const restricted = require('../../middlewares/restricted.js');

router.post('/:post_id/comments', restricted, async (req, res) => {
  try {
    console.log(req.params.post_id);
    const user = req.decodedToken;
    const comment = req.body;
    comment.author = user.username;
    comment.FK_user_id = user.subject;
    comment.FK_post_id = paseInt(req.params.post_id);
    const data = db.addComment(comment);
    res.status(201).json(comment);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't create new post. `});
  }
});

module.exports = router;
