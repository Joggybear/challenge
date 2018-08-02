import { Connection } from 'typeorm';
import { Author } from '../../../src/api/models/Author';
import { Book } from '../../../src/api/models/Book';
import { Factory, Seed, times } from '../../lib/seed';

export class CreateBooks implements Seed {

  public async seed(factory: Factory, connection: Connection): Promise<any> {
    const em = connection.createEntityManager();
    await times(10, async (n) => {
      const book = await factory(Book)().seed();
      const author = await factory(Author)().make();
      author.books = [book];
      return await em.save(author);
    });
  }

}
