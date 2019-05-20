const db = require('../../data/dbConfig.js');

module.exports = {
  getComments,
  getCommentById,
  addComment,
  editComment,
  deleteComment
};

function getComments() {
  return db('comments');
}

function getCommentById(id) {
  return db('comments')
    .where({id})
    .first();
}

async function addComment(comment) {
  const [id] = await db('comments').insert(comment, 'id');
  return db('comments')
    .where({id})
    .first();
}

function editComment(id, comment) {
  return db('comments')
    .where('id', id)
    .update(comment)
    .then(count => (count > 0 ? this.getCommentById(id) : null));
}

function deleteComment(id) {
  return db('comments')
    .where('id', id)
    .del();
}
