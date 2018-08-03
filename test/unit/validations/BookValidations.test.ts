import { validateSync } from 'class-validator';
import { Book } from '../../../src/api/models/book';

describe('BookValidations', () => {

  test('Book should always have a title', async (done) => {
    const book = new Book();
    const errorsOne = await validateSync(book);
    book.title = 'TestTitle';
    const errorsTwo = await validateSync(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Book should always have a year', async (done) => {
    const book = new Book();
    const errorsOne = await validateSync(book);
    book.year = 1999;
    const errorsTwo = await validateSync(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });
  test('Book should always have number of pages', async (done) => {
    const book = new Book();
    const errorsOne = await validateSync(book);
    book.pages = 333;
    const errorsTwo = await validateSync(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Book validation should always have authorId', async (done) => {
    const book = new Book();
    const errorsOne = await validateSync(book);
    book.authorId = 'authorId';
    const errorsTwo = await validateSync(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Book validation should succeed with all required fields', async (done) => {
    const book = new Book();
    book.title = 'TestTitle';
    book.year = 1999;
    book.pages = 333;
    book.authorId = 'fake';
    const errors = await validateSync(book);
    expect(errors.length).toEqual(0);
    done();
  });

});
