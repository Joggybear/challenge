import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../models/Book';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {

  public find(): Promise<Book[]> {
    return this.createQueryBuilder('book')
      .select()
      .leftJoinAndSelect('book.author', 'author')
      .getMany();
  }

  public findByTitle(title: string): Promise<Book[]> {
    return this.createQueryBuilder('book')
      .select()
      .leftJoinAndSelect('book.author', 'author')
      .where('book.title like :title', { title: '%' + title + '%' })
      .getMany();
  }

  public findByAuthor(authorId: string): Promise<Book[]> {
    return this.createQueryBuilder('book')
      .select()
      .leftJoinAndSelect('book.author', 'author', 'author.id = :authorId', { authorId })
      .getMany();
  }

}
