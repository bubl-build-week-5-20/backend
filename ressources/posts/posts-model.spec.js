const request = require('supertest');
const server = require('../../api/server.js');
const Posts = require('./posts-model.js');
const db = require('../../data/dbConfig.js');

describe('Ressource: posts', () => {
  beforeEach(() => {
    return db('posts').truncate();
  });

  it('should return a status code of 200 OK', async () => {
    await request(server)
      .get('/api/posts')
      .expect(200);
  });

  it('should return a status code of 201 created', async () => {
    const post = {
      title: 'My post',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    await request(server)
      .post('/api/posts')
      .send(post)
      .expect(201);
  });

  it('should return a status code of 200 but returns 400 because of Joi validator', async () => {
    const post = {
      title: 'My post',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    await request(server)
      .post('/api/posts')
      .send(post);

    let foundPost = await Posts.getPostById(1);

    await request(server)
      .put(`/api/posts/${foundPost.id}`)
      .send({...foundPost, title: 'My amazing post'})
      .expect(400);
  });
});
