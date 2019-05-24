const request = require('supertest');
const server = require('../../api/server.js');
const Posts = require('./posts-model.js');
const db = require('../../data/dbConfig.js');

describe('Ressource: posts', () => {
  afterEach(() => {
    return db('users').del();
  });

  let token;

  it('should return a status code of 200 OK', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({username: 'Joey', password: '123456', role: 'administrator'})
      .expect(201);

    const gentoken = await request(server)
      .post('/api/auth/login')
      .send({username: 'Joey', password: '123456'})
      .expect(200);

    token = gentoken.body.token;

    await request(server)
      .get('/api/comments')
      .set('Authorization', token)
      .expect(200);
  });
  it('should return a status code of 200 but returns 400 because of Joi validator', async () => {
    const post = {
      title: 'My post',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    await request(server)
      .post('/api/bubls/2/posts')
      .set('Authorization', token)
      .send(post);
  });

  it('should return a status code of 201 created', async () => {
    const post = {
      title: 'My post',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    await request(server)
      .post('/api/bubls/2/posts')
      .set('Authorization', token)
      .send(post)
      .expect(201);
  });
});
