const db = require('../../data/dbConfig.js');

module.exports = {
  getPosts,
  getPostById,
  getPostByTitle,
  addPost,
  editPost,
  deletePost
};

function getPosts() {
  return db('posts');
}

function getPostById(id) {
  return db('posts')
    .where({id})
    .first();
}

function getPostByTitle(title) {
  return db('posts')
    .where({title})
    .first();
}

async function addPost(post) {
  const [id] = await db('posts').insert(post, 'id');
  return db('posts')
    .where({id})
    .first();
}

function editPost(id, post) {
  return db('posts')
    .where({id})
    .update(post)
    .then(post => (post > 0 ? this.get(id) : null));
}

function deletePost(id) {
  return db('posts')
    .where({id})
    .del();
}
