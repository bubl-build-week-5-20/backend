const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig.js');
const Bubls = require('./bubls-model.js');

describe('Bubls routes', () => {
  it('POST / should return a status code of 201 created.', async () => {
    const bubl = {
      bubl_name: 'New name',
      max_students_allowed: 60,
      is_active: true,
      FK_school_id: 1
    };

    await request(server)
      .post('/api/bubls')
      .send(bubl)
      .expect(201);
  });

  it('GET / should return a status code of 200 OK', async () => {
    await request(server)
      .get('/api/bubls')
      .expect(200);
  });
});
