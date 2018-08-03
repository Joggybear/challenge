import { Book } from '../../../src/api/models/book';
import { BookService } from '../../../src/api/services/BookService';
import { LogMock } from '../lib/LogMock';
import { BookRepositoryMock } from '../repositories/BookRepositoryMock';

describe('BookService', () => {

  test('Find should return a list of books', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    repo.list = [book];
    const bookService = new BookService(repo as any, log);
    const list = await bookService.find();
    expect(list[0].title).toBe(book.title);
    expect(list[0].year).toBe(book.year);
    expect(list[0].pages).toBe(book.pages);
    expect(list[0].authorId).toBe(book.authorId);
    done();
  });
  test('Find should return a list of books by title', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    repo.list = [book];
    const bookService = new BookService(repo as any, log);
    const list = await bookService.find(book.title);
    expect(list[0].title).toBe(book.title);
    expect(list[0].year).toBe(book.year);
    expect(list[0].pages).toBe(book.pages);
    expect(list[0].authorId).toBe(book.authorId);
    done();
  });
  test('Find should return a list of books by author', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    repo.list = [book];
    const bookService = new BookService(repo as any, log);
    const list = await bookService.findByAuthor(book.authorId);
    expect(list[0].title).toBe(book.title);
    expect(list[0].year).toBe(book.year);
    expect(list[0].pages).toBe(book.pages);
    expect(list[0].authorId).toBe(book.authorId);
    done();
  });

  test('FindOne should return a book', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    repo.one = book;
    const bookService = new BookService(repo as any, log);
    const result = await bookService.findOne(book.id);
    expect(result.id).toBe(book.id);
    expect(result.title).toBe(book.title);
    expect(result.year).toBe(book.year);
    expect(result.pages).toBe(book.pages);
    expect(result.authorId).toBe(book.authorId);
    done();
  });

  test('Create should return book', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    const bookService = new BookService(repo as any, log);
    const result = await bookService.create(book);
    expect(result.id).toBe(book.id);
    expect(result.title).toBe(book.title);
    expect(result.year).toBe(book.year);
    expect(result.pages).toBe(book.pages);
    expect(result.authorId).toBe(book.authorId);
    done();
  });

  test('Update should return an updated book', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    repo.one = book;
    const updateBook = new Book();
    updateBook.title = 'New World';
    updateBook.year = 2000;
    updateBook.pages = 444;
    updateBook.authorId = '3';
    const bookService = new BookService(repo as any, log);
    const result = await bookService.update(book.id, updateBook);
    expect(result.id).toBe(book.id);
    expect(result.title).toBe(updateBook.title);
    expect(result.year).toBe(updateBook.year);
    expect(result.pages).toBe(updateBook.pages);
    expect(result.authorId).toBe(updateBook.authorId);
    done();
  });

  test('Delete should return true', async (done) => {
    const log = new LogMock();
    const repo = new BookRepositoryMock();
    const book = new Book();
    book.id = '1';
    book.title = 'World';
    book.year = 1999;
    book.pages = 333;
    book.authorId = '2';
    repo.one = book;
    const bookService = new BookService(repo as any, log);
    const result = await bookService.delete(book.id);
    expect(result.done).toBe(true);
    done();
  });

});
