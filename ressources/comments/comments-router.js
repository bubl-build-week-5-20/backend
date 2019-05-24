const router = require('express').Router();
const db = require('./comments-model.js');
const commentValidaton = require('../../middlewares/commentValidation.js');
const restricted = require('../../middlewares/restricted.js');

// router.post('/', restricted, async (req, res) => {
//   try {
//     const user = req.decodedToken;
//     const comment = req.body;
//     comment.author = user.username;
//     comment.FK_user_id = user.subject;
//     comment.FK_post_id = paseInt(req.params.post_id);
//     const data = db.addComment(comment);
//     res.status(201).json(comment);
//   } catch (e) {
//     res
//       .status(500)
//       .json({errorMessage: `Server error couldn't create new post. `});
//   }
// });

router.get('/', restricted, async (req, res) => {
  try {
    const comments = await db.getComments();
    res.status(200).json(comments);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the comments`});
  }
});

router.get('/:id', restricted, async (req, res) => {
  try {
    const foundComment = await db.getCommentById(req.params.id);
    if (!comment) {
      res.status(404).json({
        errorMessage: `Comment with ID ${req.params.id} doesn't exist.`
      });
    } else {
      res.status(200).json(foundComment);
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrive the comment.`});
  }
});

router.put(
  '/:post_id/comments/:id',
  restricted,
  commentValidaton,
  async (req, res) => {
    try {
      const editedComment = await db.editComment(req.params.id, req.body);
      if (!editedComment) {
        res.status(404).json({
          errorMessage: `Comment with ID ${req.params.id} doesn't exist.`
        });
      } else {
        res
          .status(200)
          .json({message: 'Comment successfully edited!'}, editedComment);
      }
    } catch (e) {
      res
        .status(500)
        .json({errorMessage: `Server error couldn't edit the comment.`});
    }
  }
);

router.delete('/:id', restricted, async (req, res) => {
  try {
    const deletedComment = await db.deleteComment(req.params.id);
    if (!deletedComment) {
      res.status(404).json({
        errorMessage: `Comment with ID ${req.params.id} doesn't exist.`
      });
    } else {
      res.status(200).json({message: 'Comment successfully deleted.'});
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't delete the comment.`});
  }
});

module.exports = router;
