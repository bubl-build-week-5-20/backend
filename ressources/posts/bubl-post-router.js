const router = require('express').Router();
const db = require('./posts-model.js');
const commentValidaton = require('../../middlewares/commentValidation.js');
const restricted = require('../../middlewares/restricted.js');

router.post('/:bubl_id/posts', restricted, async (req, res) => {
  try {
    const user = req.decodedToken;
    const post = req.body;
    post.author = user.username;
    post.FK_user_id = user.subject;
    post.FK_bubl_id = parseInt(req.params.bubl_id);
    const data = db.addPost(post);
    res.status(201).json(post);
  } catch (e) {
    const {message} = e;
    res.status(500).json({
      message,
      errorMessage: `Server error couldn't create new post.`
    });
  }
});

module.exports = router;
