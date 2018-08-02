import { EntityRepository, Repository } from 'typeorm';
import { Author } from '../models/Author';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {

  public findByName(firstName: string, lastName: string): Promise<Author[]> {
    return this.createQueryBuilder('author')
      .select()
      .where('author.firstName like :firstName', { firstName: '%' + firstName + '%' })
      .orWhere('author.lastName like :lastName', { lastName: '%' + lastName + '%' })
      .getMany();
  }

}
