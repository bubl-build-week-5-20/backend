const request = require('supertest');
const server = require('../api/server.js');
const User = require('./users-model.js');
const db = require('../../data/dbConfig.js');

describe('GET /', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  it('Should return a status code of 200 OK', async () => {
    await request(server)
      .get('/api/users')
      .expect(200);
  });

  it('Should return a status code of 200 OK after finding the user by the ID', async () => {
    const res = await request(server).get('/api/users/1');
    const user = await User.getUserById(1);
    expect(res.status).toBe(200);
  });
});
