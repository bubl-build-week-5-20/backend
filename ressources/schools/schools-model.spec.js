const request = require('supertest');
const server = require('../../api/server.js');
const Schools = require('./schools-model.js');
const db = require('../../data/dbConfig.js');
let token = require('../../api/server.spec.js');

describe('School routes', () => {
  // beforeEach(async () => {
  //   await db('schools').truncate();
  // });

  it('POST / should return a status code 401', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await request(server)
      .post('/api/auth/register')
      .send({username: 'Joey', password: '123456', role: 'administrator'})
      .expect(201);

    const gentoken = await request(server)
      .post('/api/auth/login')
      .send({username: 'Joey', password: '123456'})
      .expect(200);

    token = gentoken.body.token;

    await request(server)
      .get('/api/comments')
      .set({Authorization: token})
      .expect(200);

    await request(server)
      .post('/api/schools')
      .set({Authorization: token})
      .send(school)
      .expect(401);
  });

  it('GET / should return a status code 200 OK', async () => {
    await request(server)
      .get('/api/schools')
      .set({Authorization: token})
      .expect(200);
  });

  it('GET /:id should return a status code 200 OK', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await request(server)
      .post('/api/schools')
      .send(school);

    let foundSchool = await Schools.getShoolById(1);

    await request(server)
      .get(`/api/schools/${foundSchool.id}`)
      .expect(200);
  });

  it('PUT /:id should return a status code 403', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await Schools.addSchool(school);

    let foundSchool = await Schools.getShoolById(1);
    await request(server)
      .put(`/api/schools/${foundSchool.id}`)
      .set({Authorization: token})
      .send({...foundSchool, school_name: 'Bloomfield Middle School'})
      .expect(403);
  });

  it('DELETE /:id should return a status code of code 200 OK', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await Schools.addSchool(school);

    let foundSchool = await Schools.getShoolById(1);
    await request(server)
      .delete(`/api/schools/${foundSchool.id}`)
      .set({Authorization: token})
      .expect(200);
  });
});
