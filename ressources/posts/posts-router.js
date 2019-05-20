const router = require('express').Router();
const db = require('./posts-model.js');
const postValidation = require('../../middlewares/postValidation.js');

router.post('/', postValidation, async (req, res) => {
  try {
    const post = await db.addPost(req.body);
    res.status(201).json(post);
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({errorMessage: 'Server error while creating the post.'});
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await db.getPosts();
    res.status(200).json(posts);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: 'Server error while retrieving the posts.'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundPost = await db.getPostById(req.params.id);
    if (!foundPost) {
      res
        .status(404)
        .json({errorMessage: `No post with ID ${req.params.id} was found.`});
    } else {
      res.status(200).json(foundPost);
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: 'Server error while retrieving the post.'});
  }
});

router.put('/:id', postValidation, async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
