import { Connection } from 'typeorm/connection/Connection';
import { Author } from '../../../src/api/models/Author';
import { Factory, Seed } from '../../lib/seed/types';

export class CreateAuthors implements Seed {

  public async seed(factory: Factory, connection: Connection): Promise<any> {
    await factory(Author)().seedMany(10);
  }
}
