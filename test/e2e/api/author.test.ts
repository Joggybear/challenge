import * as nock from 'nock';
import * as request from 'supertest';
import { Author } from '../../../src/api/models/Author';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';

describe('/api/authors', () => {

  let newAuthor: Author;
  let settings: BootstrapSettings;

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  beforeAll(async () => {
    settings = await prepareServer({ migrate: true });
  });

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(async () => {
    nock.cleanAll();
    await closeDatabase(settings.connection);
  });

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('POST: / should return error when creating author without first name', async (done) => {
    await request(settings.app)
      .post('/api/authors')
      .send({ lastName: 'Ampov' })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  test('POST: / should return error when creating author without last name', async (done) => {
    await request(settings.app)
      .post('/api/authors')
      .send({ firstName: 'Ampov' })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  test('POST: / should return a newly created author', async (done) => {
    const response = await request(settings.app)
      .post('/api/authors')
      .send({ firstName: 'Tino', lastName: 'Ampov' })
      .expect('Content-Type', /json/)
      .expect(200);

    newAuthor = response.body;
    expect(response.body.firstName).toBe('Tino');
    expect(response.body.lastName).toBe('Ampov');
    done();
  });

  test('GET: / should return a list of authors', async (done) => {
    const response = await request(settings.app)
      .get('/api/authors')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(1);
    done();
  });

  test('GET: /?firstName should return a list of authors by name', async (done) => {
    const response = await request(settings.app)
      .get('/api/authors?firstName=Tino')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(1);
    done();
  });

  test('GET: /:fakeId should return error when getting author with invalid ID', async (done) => {
    await request(settings.app)
      .get('/api/authors/fake')
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });

  test('GET: /:id should return tino', async (done) => {
    const response = await request(settings.app)
      .get(`/api/authors/${newAuthor.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(newAuthor.id);
    expect(response.body.firstName).toBe(newAuthor.firstName);
    expect(response.body.lastName).toBe(newAuthor.lastName);
    done();
  });

  test('PUT: /:fakeId should return error when updating author with invalid ID', async (done) => {
    await request(settings.app)
      .put('/api/authors/fake')
      .send({ firstName: 'Newtino', lastName: 'Newampov' })
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });

  test('PUT: /:id should return error when updating author without first name', async (done) => {
    await request(settings.app)
      .put('/api/authors/' + newAuthor.id)
      .send({ lastName: 'Newampov' })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
  test('PUT: /:id should return error when updating author without last name', async (done) => {
    await request(settings.app)
      .put('/api/authors/' + newAuthor.id)
      .send({ firstName: 'Newtino' })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  test('PUT: /:id should return a updated author', async (done) => {
    const response = await request(settings.app)
      .put('/api/authors/' + newAuthor.id)
      .send({ firstName: 'Newtino', lastName: 'Newampov' })
      .expect('Content-Type', /json/)
      .expect(200);

    newAuthor = response.body;
    expect(response.body.firstName).toBe('Newtino');
    expect(response.body.lastName).toBe('Newampov');
    done();
  });

  test('DELETE: /:fakeId should return error when deleting author with invalid ID', async (done) => {
    await request(settings.app)
      .delete('/api/authors/fake')
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });

  test('DELETE: /:id should delete author', async (done) => {
    const response = await request(settings.app)
      .delete('/api/authors/' + newAuthor.id)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.done).toBe(true);
    done();
  });

});
