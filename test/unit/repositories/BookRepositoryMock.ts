import { Book } from '../../../src/api/models/Book';
import { RepositoryMock } from '../lib/RepositoryMock';

export class BookRepositoryMock extends RepositoryMock<Book> {

  public findByTitleMock = jest.fn();
  public findByAuthorMock = jest.fn();

  public findByTitle(title: string): Promise<Book[]> {
    this.findByTitleMock(title);
    return Promise.resolve(this.list);
  }

  public findByAuthor(authorId: string): Promise<Book[]> {
    this.findByAuthorMock(authorId);
    return Promise.resolve(this.list);
  }

}
