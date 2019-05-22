const db = require('../../data/dbConfig.js');
const mapper = require('..//mapper.js');

module.exports = {
  getPosts,
  getPostByTitle,
  addPost,
  editPost,
  deletePost,
  getPostComments,
  getPostHashtags
};

function getPosts(id) {
  let query = db('posts as p');

  if (id) {
    query.where('p.id', id).first();

    const promises = [query, this.getPostComments(id)];

    return Promise.all(promises).then(function(results) {
      let [post, comments] = results;

      if (comments) {
        post.comments = comments;

        return mapper.postToBody(post);
      } else {
        return null;
      }
    });
  }

  return query.then(posts => {
    return posts.map(post => mappers.postToBody(post));
  });
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

function editPost(id, editedPost) {
  return db('posts')
    .where('id', id)
    .update(editedPost)
    .then(count => (count > 0 ? this.getPosts(id) : null));
}

function deletePost(id) {
  return db('posts')
    .where('id', id)
    .del();
}

function getPostComments(id) {
  return db('comments')
    .where('post_id', id)
    .then(comments => comments.map(comment => mapper.commentToBody(comment)));
}

function getPostHashtags(id) {
  return db('post_hashtags_mapping')
    .where('FK_post_id', id)
    .then(hashtags => hashtags.map(hashtag => mapper.hashtagToBody(hashtag)));
}
