const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig.js');
const Comments = require('./comments-model.js');

describe('GET /', () => {
  it('should return a status code of 200', async () => {
    await request(server)
      .get('/api/comments')
      .expect(200);
  });
});
