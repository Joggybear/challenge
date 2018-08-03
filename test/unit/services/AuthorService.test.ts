import { Author } from '../../../src/api/models/author';
import { AuthorService } from '../../../src/api/services/AuthorService';
import { LogMock } from '../lib/LogMock';
import { AuthorRepositoryMock } from '../repositories/AuthorRepositoryMock';

describe('AuthorService', () => {

  test('Find should return a list of authors', async (done) => {
    const log = new LogMock();
    const repo = new AuthorRepositoryMock();
    const author = new Author();
    author.id = '1';
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    repo.list = [author];
    const authorService = new AuthorService(repo as any, log);
    const list = await authorService.find();
    expect(list[0].firstName).toBe(author.firstName);
    done();
  });
  test('Find should return a list of authors with first name like', async (done) => {
    const log = new LogMock();
    const repo = new AuthorRepositoryMock();
    const author = new Author();
    author.id = '1';
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    repo.list = [author];
    const authorService = new AuthorService(repo as any, log);
    const list = await authorService.find(author.firstName);
    expect(list[0].firstName).toBe(author.firstName);
    done();
  });

  test('FindOne should return an author', async (done) => {
    const log = new LogMock();
    const repo = new AuthorRepositoryMock();
    const author = new Author();
    author.id = '1';
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    repo.one = author;
    const authorService = new AuthorService(repo as any, log);
    const result = await authorService.findOne(author.id);
    expect(result.id).toBe(author.id);
    expect(result.firstName).toBe(author.firstName);
    expect(result.lastName).toBe(author.lastName);
    done();
  });

  test('Create should return author', async (done) => {
    const log = new LogMock();
    const repo = new AuthorRepositoryMock();
    const author = new Author();
    author.id = '1';
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    const authorService = new AuthorService(repo as any, log);
    const result = await authorService.create(author);
    expect(result.id).toBe(author.id);
    expect(result.firstName).toBe(author.firstName);
    expect(result.lastName).toBe(author.lastName);
    done();
  });

  test('Update should return an updated author', async (done) => {
    const log = new LogMock();
    const repo = new AuthorRepositoryMock();
    const author = new Author();
    author.id = '1';
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    repo.one = author;
    author.firstName = 'Newtino';
    author.lastName = 'Newampov';
    const authorService = new AuthorService(repo as any, log);
    const result = await authorService.update(author.id, author);
    expect(result.id).toBe(author.id);
    expect(result.firstName).toBe(author.firstName);
    expect(result.lastName).toBe(author.lastName);
    done();
  });

  test('Delete should return true', async (done) => {
    const log = new LogMock();
    const repo = new AuthorRepositoryMock();
    const author = new Author();
    author.id = '1';
    author.firstName = 'Tino';
    author.lastName = 'Ampov';
    repo.one = author;
    const authorService = new AuthorService(repo as any, log);
    const result = await authorService.delete(author.id);
    expect(result.done).toBe(true);
    done();
  });

});
