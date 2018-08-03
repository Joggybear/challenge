import { Author } from '../../../src/api/models/author';
import { RepositoryMock } from '../lib/RepositoryMock';

export class AuthorRepositoryMock extends RepositoryMock<Author> {

    public findByNameMock = jest.fn();

    public findByName(firstName: string, lastName: string): Promise<Author[]> {
      this.findByNameMock(firstName, lastName);
      return Promise.resolve(this.list);
    }

}
