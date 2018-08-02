import { Container } from 'typedi';
import { Connection } from 'typeorm';
import { Author } from '../../src/api/models/author';
import { AuthorService } from '../../src/api/services/AuthorService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';

describe('AuthorService', () => {

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  let connection: Connection;
  beforeAll(async () => connection = await createDatabaseConnection());
  beforeEach(() => migrateDatabase(connection));

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(() => closeDatabase(connection));

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('should return a list of authors', async (done) => {
    const author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const authorTwo = new Author();
    authorTwo.firstName = 'Ampov';
    authorTwo.lastName = 'Tino';
    const service = Container.get<AuthorService>(AuthorService);
    await service.create(author);
    await service.create(authorTwo);

    const resultFind = await service.find();
    if (resultFind) {
      expect(resultFind.length).toBe(2);
    } else {
      fail('Could not find author');
    }

    done();
  });

  test('should return an author with first name `Tino`', async (done) => {
    const author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const service = Container.get<AuthorService>(AuthorService);
    await service.create(author);

    const resultFind = await service.find(author.firstName, author.lastName);
    if (resultFind) {
      expect(resultFind.length).toBe(1);
      expect(resultFind[0].firstName).toBe(author.firstName);
      expect(resultFind[0].lastName).toBe(author.lastName);
    } else {
      fail('Could not find author');
    }

    done();
  });

  test('should return an author with last name `Ampov`', async (done) => {
    const author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const service = Container.get<AuthorService>(AuthorService);
    await service.create(author);

    const resultFind = await service.find(undefined, author.lastName);
    if (resultFind) {
      expect(resultFind.length).toBe(1);
      expect(resultFind[0].firstName).toBe(author.firstName);
      expect(resultFind[0].lastName).toBe(author.lastName);
    } else {
      fail('Could not find author');
    }

    done();
  });

  test('should return an author with first name `Tino` and last name `Ampov`', async (done) => {
    const author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const service = Container.get<AuthorService>(AuthorService);
    await service.create(author);

    const resultFind = await service.find(author.firstName, author.lastName);
    if (resultFind) {
      expect(resultFind.length).toBe(1);
      expect(resultFind[0].firstName).toBe(author.firstName);
      expect(resultFind[0].lastName).toBe(author.lastName);
    } else {
      fail('Could not find author');
    }

    done();
  });

  test('should create a new author in the database', async (done) => {
    const author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const service = Container.get<AuthorService>(AuthorService);
    const resultCreate = await service.create(author);
    expect(resultCreate.firstName).toBe(author.firstName);
    expect(resultCreate.lastName).toBe(author.lastName);

    const resultFind = await service.findOne(resultCreate.id);
    if (resultFind) {
      expect(resultFind.firstName).toBe(author.firstName);
      expect(resultFind.lastName).toBe(author.lastName);
    } else {
      fail('Could not find author');
    }
    done();
  });

  test('should update author in the database', async (done) => {
    let author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const service = Container.get<AuthorService>(AuthorService);
    author = await service.create(author);

    author.firstName = 'Newtino';
    author.lastName = 'Newampov';
    const resultUpdate = await service.update(author.id, author);
    expect(resultUpdate.firstName).toBe(author.firstName);
    expect(resultUpdate.lastName).toBe(author.lastName);

    const resultFind = await service.findOne(resultUpdate.id);
    if (resultFind) {
      expect(resultFind.firstName).toBe(author.firstName);
      expect(resultFind.lastName).toBe(author.lastName);
    } else {
      fail('Could not find author');
    }
    done();
  });

  test('should delete author in the database', async (done) => {
    let author = new Author();
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const service = Container.get<AuthorService>(AuthorService);
    author = await service.create(author);

    const resultDelete = await service.delete(author.id);
    expect(resultDelete).toBe(true);

    const resultFind = await service.findOne(author.id);
    if (!resultFind) {
      expect(resultFind).toBe(undefined);
    } else {
      fail('Deleted author should not be found');
    }
    done();
  });

});
