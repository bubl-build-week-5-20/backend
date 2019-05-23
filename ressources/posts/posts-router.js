const router = require('express').Router();
const db = require('./posts-model.js');
const postValidation = require('../../middlewares/postValidation.js');
const restricted = require('../../middlewares/restricted.js');

// router.post('/', restricted, async (req, res) => {
//   try {
//     const user = req.decodedToken;

//     const post = req.body;
//     post.author = user.username;
//     post.FK_user_id = user.subject;
//     const data = await db.addPost(post);
//     res.status(201).json(post);
//   } catch (e) {
//     const {message} = e;
//     res.status(500).json({
//       message,
//       errorMessage: 'Server error while creating the post.'
//     });
//   }
// });

router.get('/', restricted, async (req, res) => {
  try {
    const posts = await db.getPosts();
    res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: 'Server error while retrieving the posts.'});
  }
});

router.get('/:id', restricted, async (req, res) => {
  try {
    const foundPost = await db.getPosts(req.params.id);
    if (!foundPost) {
      res
        .status(404)
        .json({errorMessage: `No post with ID ${req.params.id} was found.`});
    } else {
      res.status(200).json(foundPost);
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: 'Server error while retrieving the post.'});
  }
});

router.put('/:id', restricted, async (req, res) => {
  try {
    const editedPost = await db.editPost(req.params.id, req.body);
    if (!editedPost) {
      res.status(404).json({errorMessage: `No post with ${id} was found.`});
    } else {
      res.status(200).json(editedPost);
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: `Server error couldn't update post`});
  }
});

router.delete('/:id', restricted, async (req, res) => {
  try {
    const deletedPost = await db.deletePost(req.params.id);
    if (!deletedPost) {
      res
        .status(404)
        .json({errorMessage: `No post with ID ${req.params.id} was found.`});
    } else {
      res.status(200).json({message: 'Post successfully deleted.'});
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: `Server error couldn't delete post.`});
  }
});

module.exports = router;
