const router = require('express').Router();
const db = require('./hashtags-model.js');

router.post('/', async (req, res) => {
  try {
    const hashtag = await db.addHashtag(req.body);
    res.status(201).json(hashtag);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error coudn't create the hashtag`});
  }
});

router.get('/', async (req, res) => {
  try {
    const hashtags = await db.getHashtags();
    res.status(200).json(hashtags);
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the hashtags.`});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundhashtag = await db.getHashtagById(req.params.id);
    if (!foundhashtag) {
      res.status(404).json({errorMessage: `Hasthag not found.`});
    } else {
      const posts = await db.getHashtagPosts(req.params.id);
      const comments = await db.getHashtagComments(req.params.id);
      const hashtag = {...foundhashtag, posts, comments};
      res.status(200).json(hashtag);
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't retrieve the hashtags.`});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const editedHashtag = await db.editHashtag(req.params.id);
    if (!editedHashtag) {
      res.status(404).json({errorMessage: 'Hashtag not found.'});
    } else {
      res.status(200).json(editedHashtag);
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't edit the hashtag`});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedHashtag = await db.deleteHashtag(req.params.id);
    if (!deletedHashtag) {
      res
        .status(404)
        .json({errorMessage: `Server error couldn't delete the hashtag.`});
    } else {
      res.status(200).json({errorMessage: 'Hashtag successfully deleted!'});
    }
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: `Server error couldn't delete the hashtag.`});
  }
});

module.exports = router;
