const request = require('supertest');
const server = require('../../api/server.js');
const User = require('./users-model.js');
const db = require('../../data/dbConfig.js');

describe('GET /', () => {
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
  });
  it('Should return a status code of 200', async () => {
    await request(server)
      .get('/api/users')
      .set('Authorization', token)
      .expect(200);
  });
});
