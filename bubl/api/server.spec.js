const request = require('supertest');
const server = require('./server.js');

describe('Server', () => {
  it('Should return a status code 200 OK', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('Should return a content type of JSON', async () => {
    const res = await request(server).get('/');
    expect(res.type).toBe('application/json');
  });

  it(`Should return a body content of {api: 'up'}`, async () => {
    const res = await request(server).get('/');
    expect(res.body).toEqual({api: 'up'});
  });
});
