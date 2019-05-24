const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig.js');

describe('Comments router', () => {
  afterEach(() => {
    return db('users').del();
  });
  let token;
  it('should return 201', async () => {
    const user = {username: 'Guillaume', password: '123456'};
    await request(server)
      .post('/api/auth/register')
      .send(user)
      .expect(201);

    const gentoken = await request(server)
      .post('/api/auth/login')
      .send(user)
      .expect(200);

    token = gentoken.body.token;

    await request(server)
      .post('/api/post/1/comments')
      .set('Authorization', token)
      .send(user)
      .expect(200);
  });
});
