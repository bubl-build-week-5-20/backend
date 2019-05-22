const db = require('../../data/dbConfig.js');
const mapper = require('../mapper.js');

module.exports = {
  getHashtags,
  getHashtagById,
  getHashtagPosts,
  getHashtagComments,
  addHashtag,
  editHashtag,
  deleteHashtag
};

function getHashtags() {
  return db('hashtags');
}

function getHashtagById(id) {
  return db('hashtags')
    .where({id})
    .first();
}

function getHashtagPosts(id) {
  return db('post_hashtags_mapping')
    .where('post_hashtags_mapping.FK_hashtags_id', id)
    .then(posts => posts.map(post => mapper.hashtagToBody(post)));
}

function getHashtagComments(id) {
  return db('comment_hashtags_mapping')
    .where('comment_hashtags_mapping.FK_hashtags_id', id)
    .then(comments => comments.map(comment => mapper.hashtagToBody(comment)));
}

async function addHashtag(hashtag) {
  const [id] = await db('hashtags').insert(hashtag);
  return getHashtagById(id);
}

function editHashtag(id, hashtag) {
  return db('hashtags')
    .where('id', id)
    .update(hashtag);
}

function deleteHashtag(id) {
  return db('hashtags')
    .where('id', id)
    .del();
}
