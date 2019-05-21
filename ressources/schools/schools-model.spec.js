const request = require('supertest');
const server = require('../../api/server.js');
const Schools = require('./schools-model.js');
const db = require('../../data/dbConfig.js');

describe('School routes', () => {
  beforeEach(() => {
    return db('schools').truncate();
  });

  it('POST / should return a status code 201 created', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await request(server)
      .post('/api/schools')
      .send(school)
      .expect(201);
  });

  it('GET / should return a status code 200 OK', async () => {
    await request(server)
      .get('/api/schools')
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

  it('PUT /:id should return a status code 200 OK', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await Schools.addSchool(school);

    let foundSchool = await Schools.getShoolById(1);
    await request(server)
      .put(`/api/schools/${foundSchool.id}`)
      .send({...foundSchool, school_name: 'Bloomfield Middle School'})
      .expect(200);
  });

  it('DELETE /:id should return a status code of code 200 OK', async () => {
    const school = {
      school_name: 'Stowe Middle School'
    };

    await Schools.addSchool(school);

    let foundSchool = await Schools.getShoolById(1);
    await request(server)
      .delete(`/api/schools/${foundSchool.id}`)
      .expect(200);
  });
});
