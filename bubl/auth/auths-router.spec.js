const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');
const Auth = require('./auths-model.js');

describe('POST /register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  it('should return a ', () => {
    //
  });
});
