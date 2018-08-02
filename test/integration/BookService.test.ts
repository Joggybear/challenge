import { Container } from 'typedi';
import { Connection } from 'typeorm';
import { Book } from '../../src/api/models/book';
import { BookService } from '../../src/api/services/BookService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';

describe('BookService', () => {

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

  test('should return a list of books', async (done) => {
    const book = new Book();
    book.title = 'World of warcraft';
    book.year = 1999;
    book.pages = 333;
    const bookTwo = new Book();
    bookTwo.title = 'World of warcraft 2';
    bookTwo.year = 2004;
    bookTwo.pages = 444;
    const service = Container.get<BookService>(BookService);
    await service.create(book);
    await service.create(bookTwo);

    const resultFind = await service.find();
    if (resultFind) {
      expect(resultFind.length).toBe(2);
    } else {
      fail('Could not find books');
    }

    done();
  });

  test('should return an book with title that contains `World`', async (done) => {
    const book = new Book();
    book.title = 'World of warcraft';
    book.year = 1999;
    book.pages = 333;
    const service = Container.get<BookService>(BookService);
    await service.create(book);

    const search = 'World';
    const resultFind = await service.find(search);
    if (resultFind) {
      expect(resultFind.length).toBe(1);
      expect(resultFind[0].title).toBe(book.title);
      expect(resultFind[0].year).toBe(book.year);
      expect(resultFind[0].pages).toBe(book.pages);
    } else {
      fail('Could not find author');
    }

    done();
  });

  test('should create a new book in the database', async (done) => {
    const book = new Book();
    book.title = 'World of warcraft';
    book.year = 1999;
    book.pages = 333;
    const service = Container.get<BookService>(BookService);
    const resultCreate = await service.create(book);
    expect(resultCreate.title).toBe(book.title);
    expect(resultCreate.year).toBe(book.year);
    expect(resultCreate.pages).toBe(book.pages);

    const resultFind = await service.findOne(resultCreate.id);
    if (resultFind) {
      expect(resultFind.title).toBe(book.title);
      expect(resultFind.year).toBe(book.year);
      expect(resultFind.pages).toBe(book.pages);
    } else {
      fail('Could not find book');
    }
    done();
  });

  test('should update book in the database', async (done) => {
    let book = new Book();
    book.title = 'World of warcraft';
    book.year = 1999;
    book.pages = 333;
    const service = Container.get<BookService>(BookService);
    book = await service.create(book);

    book.title = 'World of warcraft 2';
    book.year = 2004;
    book.pages = 444;
    const resultUpdate = await service.update(book.id, book);
    expect(resultUpdate.title).toBe(book.title);
    expect(resultUpdate.year).toBe(book.year);
    expect(resultUpdate.pages).toBe(book.pages);

    const resultFind = await service.findOne(resultUpdate.id);
    if (resultFind) {
      expect(resultFind.title).toBe(book.title);
      expect(resultFind.year).toBe(book.year);
      expect(resultFind.pages).toBe(book.pages);
    } else {
      fail('Could not find author');
    }
    done();
  });

  test('should delete book in the database', async (done) => {
    let book = new Book();
    book.title = 'World of warcraft';
    book.year = 1999;
    book.pages = 333;
    const service = Container.get<BookService>(BookService);
    book = await service.create(book);

    const resultDelete = await service.delete(book.id);
    expect(resultDelete).toBe(true);

    const resultFind = await service.findOne(book.id);
    if (!resultFind) {
      expect(resultFind).toBe(undefined);
    } else {
      fail('Deleted author should not be found');
    }
    done();
  });

});
