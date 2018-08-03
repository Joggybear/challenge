import { validate } from 'class-validator';
import { Author } from '../../../src/api/models/author';

describe('AuthorValidations', () => {

  test('Author should always have a first name', async (done) => {
    const author = new Author();
    const errorsOne = await validate(author);
    author.firstName = 'Tino';
    const errorsTwo = await validate(author);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Author should always have a last name', async (done) => {
    const author = new Author();
    const errorsOne = await validate(author);
    author.lastName = 'TestName';
    const errorsTwo = await validate(author);
    expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    done();
  });

  test('Author validation should succeed with all required fields', async (done) => {
    const author = new Author();
    author.firstName = 'TestName';
    author.lastName = 'TestName';
    const errors = await validate(author);
    expect(errors.length).toEqual(0);
    done();
  });

});
