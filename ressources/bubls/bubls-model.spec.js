const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig.js');

describe('Bubls routes', () => {
  afterEach(async () => {
    await db('bubls').del();
  });

  let token;

  it('should return 201', async () => {
    const user = {username: 'Guillaume10', password: '123456'};
    await request(server)
      .post('/api/auth/register')
      .send(user)
      .expect(201);

    const gentoken = await request(server)
      .post('/api/auth/login')
      .send(user)
      .expect(200);

    token = gentoken.body.token;

    const bubl = {
      bubl_name: 'New name',
      max_students_allowed: 60,
      is_active: true,
      FK_school_id: 1
    };

    await request(server)
      .post('/api/bubls')
      .send(bubl)
      .expect(401);
  });
});
