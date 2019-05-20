const request = require('supertest');
const server = require('../../api/server.js');
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
});
