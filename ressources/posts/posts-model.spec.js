const request = require('supertest');
const server = require('../../api/server.js');
const Posts = require('./posts-model.js');
const db = require('../../data/dbConfig.js');

describe('GET / ', () => {
  it('should return a status code of 200 OK', async () => {
    await request(server)
      .get('/api/posts')
      .expect(404);
  });
});
