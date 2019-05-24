const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

describe('Register', () => {
  afterEach(() => {
    return db('users').del();
  });

  it('Should return 201 created', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({username: 'Joe', password: '123456'})
      .expect(201);
  });

  it('should return 200 OK', async () => {
    const gentoken = await request(server)
      .post('/api/auth/login')
      .send({username: 'Joe', password: '123456'})
      .expect(200);
    token = gentoken.body.token;

    await request(server)
      .post('/api/roles/change')
      .set('Authorization', token)
      .expect(200);
  });
});
