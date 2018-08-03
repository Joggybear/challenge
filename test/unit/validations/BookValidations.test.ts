import { validate } from 'class-validator';
import { Book } from '../../../src/api/models/book';

describe('BookValidations', () => {

  test('Book should always have a title', async (done) => {
    const book = new Book();
    const errorsOne = await validate(book);
    book.title = 'TestTitle';
    const errorsTwo = await validate(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Book should always have a year', async (done) => {
    const book = new Book();
    const errorsOne = await validate(book);
    book.year = 1999;
    const errorsTwo = await validate(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });
  test('Book should always have number of pages', async (done) => {
    const book = new Book();
    const errorsOne = await validate(book);
    book.pages = 333;
    const errorsTwo = await validate(book);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Book validation should succeed with all required fields', async (done) => {
    const book = new Book();
    book.title = 'TestTitle';
    book.year = 1999;
    book.pages = 333;
    const errors = await validate(book);
    expect(errors.length).toEqual(0);
    done();
  });

});
