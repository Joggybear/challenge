import * as nock from 'nock';
import * as request from 'supertest';
import { Author } from '../../../src/api/models/Author';
import { Book } from '../../../src/api/models/Book';
import { CreateTino } from '../../../src/database/seeds/CreateTino';
import { runSeed } from '../../../src/lib/seed';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';

describe('/api/books', () => {

  let author: Author;
  let newBook: Book;
  let settings: BootstrapSettings;

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  beforeAll(async () => {
    settings = await prepareServer({ migrate: true });
    author = await runSeed<Author>(CreateTino);
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

  test('POST: / should return error when creating a book without title', async (done) => {
    await request(settings.app)
      .post('/api/books')
      .send({ year: 2004, pages: 537, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  test('POST: / should return error when creating a book without year', async (done) => {
    await request(settings.app)
      .post('/api/books')
      .send({ title: 'World of warcraft', pages: 537, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  test('POST: / should return error when creating a book without pages', async (done) => {
    await request(settings.app)
      .post('/api/books')
      .send({ title: 'World of warcraft', year: 2004, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  test('POST: / should return error when creating a book without authorId', async (done) => {
    await request(settings.app)
      .post('/api/books')
      .send({ title: 'World of warcraft', year: 2004, pages: 537 })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });

  // test('POST: / should return error when creating a book with invalid authorId (author does not exists)', async (done) => {
  //   await request(settings.app)
  //     .post('/api/books')
  //     .send({ title: 'World of warcraft', year: 2004, pages: 537, authorId: 'fake' })
  //     .expect('Content-Type', /json/)
  //     .expect(400);
  //   done();
  // });

  test('POST: / should return a newly created book', async (done) => {
    const response = await request(settings.app)
      .post('/api/books')
      .send({ title: 'World of warcraft', year: 2004, pages: 537, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(200);

    newBook = response.body;
    expect(response.body.title).toBe('World of warcraft');
    expect(response.body.year).toBe(2004);
    expect(response.body.pages).toBe(537);
    expect(response.body.authorId).toBe(author.id);
    done();
  });

  test('GET: / should return a list of books', async (done) => {
    const response = await request(settings.app)
      .get('/api/books')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(1);
    done();
  });

  test('GET: /?title= should return a list of books by title', async (done) => {
    const response = await request(settings.app)
      .get('/api/books?title=world')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(1);
    done();
  });

  test('GET: /author/:id should return a list of books by author', async (done) => {
    const response = await request(settings.app)
      .get('/api/books/author/' + author.id)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(1);
    done();
  });

  test('GET: /:fakeId should return error when getting book with invalid ID', async (done) => {
    await request(settings.app)
      .get(`/api/books/fake`)
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });

  test('GET: /:id should return world of warcraft', async (done) => {
    const response = await request(settings.app)
      .get(`/api/books/${newBook.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(newBook.id);
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.year).toBe(newBook.year);
    expect(response.body.pages).toBe(newBook.pages);
    expect(response.body.authorId).toBe(author.id);
    done();
  });

  test('PUT: /:fakeId should return error when updating book with invalid book ID', async (done) => {
    await request(settings.app)
      .put('/api/books/fakeId')
      .send({ title: 'World of warcraft 2', year: 2004, pages: 444, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });
  test('PUT: /:id should return error when updating book without title', async (done) => {
    await request(settings.app)
      .put('/api/books/' + newBook.id)
      .send({ year: 2004, pages: 444, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
  test('PUT: /:id should return error when updating book without year', async (done) => {
    await request(settings.app)
      .put('/api/books/' + newBook.id)
      .send({ title: 'World of warcraft 2', pages: 444, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
  test('PUT: /:id should return error when updating book without pages', async (done) => {
    await request(settings.app)
      .put('/api/books/' + newBook.id)
      .send({ title: 'World of warcraft 2', year: 2004, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
  test('PUT: /:id should return error when updating book without authorId', async (done) => {
    await request(settings.app)
      .put('/api/books/' + newBook.id)
      .send({ title: 'World of warcraft 2', year: 2004, pages: 444 })
      .expect('Content-Type', /json/)
      .expect(400);
    done();
  });
  // test('PUT: /:id should return error when updating book with invalid authorId (author does not exist)', async (done) => {
  //   await request(settings.app)
  //     .put('/api/books/' + newBook.id)
  //     .send({ title: 'World of warcraft 2', year: 2004, pages: 444, authorId: 'fakeId' })
  //     .expect('Content-Type', /json/)
  //     .expect(400);
  //   done();
  // });

  test('PUT: /:id should return a updated book', async (done) => {
    const response = await request(settings.app)
      .put('/api/books/' + newBook.id)
      .send({ title: 'World of warcraft 2', year: 2004, pages: 444, authorId: author.id })
      .expect('Content-Type', /json/)
      .expect(200);

    newBook = response.body;
    expect(response.body.title).toBe('World of warcraft 2');
    expect(response.body.year).toBe(2004);
    expect(response.body.pages).toBe(444);
    done();
  });

  test('DELETE: /:fakeId should return error when deleting book with invalid ID', async (done) => {
    await request(settings.app)
      .delete('/api/books/fakeId')
      .expect('Content-Type', /json/)
      .expect(404);
    done();
  });

  test('DELETE: /:id should delete book', async (done) => {
    const response = await request(settings.app)
      .delete('/api/books/' + newBook.id)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.done).toBe(true);
    done();
  });

});
