import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Book } from '../models/Book';
import { BookRepository } from '../repositories/BookRepository';

@Service()
export class BookService {

  constructor(
    @OrmRepository(Book) private bookRepository: BookRepository,
    @Logger(__filename) private log: LoggerInterface
  ) { }

  public async find(title?: string): Promise<Book[]> {
    if (!title) {
      this.log.info('Find all books');
      return await this.bookRepository.find();
    } else {
      this.log.info(`Find all books of title = ${title}`);
      return await this.bookRepository.findByTitle(title);
    }
  }

  public async findOne(id: string): Promise<Book | undefined> {
    this.log.info(`Find book with id ${id}`);
    return await this.bookRepository.findOne({ id });
  }

  public async findByAuthor(authorId: string): Promise<Book[]> {
    this.log.info(`Find all books of the author with ID = ${authorId}`);
    return await this.bookRepository.findByAuthor(authorId);
  }

  public async create(book: Book): Promise<Book> {
    this.log.info(`Create a new book => ${book.toString()}`);
    const newBook = await this.bookRepository.save(book);
    return newBook;
  }

  public async update(id: string, book: Book): Promise<Book> {
    const bookExists = await this.bookRepository.findOne({ id });
    if (!bookExists) {
      return undefined;
    }

    this.log.info('Update a book');
    book.id = id;
    return await this.bookRepository.save(book);
  }

  public async delete(id: string): Promise<{ done: boolean }> {
    const bookExists = await this.bookRepository.findOne({ id });
    if (!bookExists) {
      return undefined;
    }

    this.log.info('Delete a book');
    await this.bookRepository.delete(id);
    return { done: true };
  }

}
