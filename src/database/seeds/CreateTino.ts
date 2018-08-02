import { Connection } from 'typeorm';
import { Author } from '../../../src/api/models/Author';
import { Factory, Seed } from '../../lib/seed/types';

export class CreateTino implements Seed {

  public async seed(factory: Factory, connection: Connection): Promise<Author> {
    const em = connection.createEntityManager();

    const user = new Author();
    user.firstName = 'Tino';
    user.lastName = 'Ampov';
    return await em.save(user);
  }

}
