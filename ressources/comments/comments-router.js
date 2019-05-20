const router = require('express').Router();
const db = require('./comments-model.js');
const commentValidaton = require('../../middlewares/commentValidation.js');

router.post('/', async (req, res) => {
  try {
    const comment = db.addComment(req.body);
    res.status(201).json(comment);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't create new post. `});
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await db.getComments();
    res.status(200).json(comments);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the comments`});
  }
});

router.get('/:id', async (req, res) => {
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

router.put('/:id', commentValidaton, async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await db.deleteComment(req.params.id);
    if (!deletedComment) {
      res
        .status(404)
        .json({
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
