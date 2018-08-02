import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Author } from '../models/Author';
import { AuthorRepository } from '../repositories/AuthorRepository';

@Service()
export class AuthorService {

  constructor(
    @OrmRepository(Author) private authorRepository: AuthorRepository,
    @Logger(__filename) private log: LoggerInterface
  ) { }

  public async find(firstName?: string, lastName?: string): Promise<Author[]> {
    if (!firstName && !lastName) {
      this.log.info('Find all authors');
      return await this.authorRepository.find();
    } else {
      this.log.info(`Find all authors with first name = ${firstName} and last name = ${lastName}`);
      return await this.authorRepository.findByName(firstName, lastName);
    }
  }

  public async findOne(id: string): Promise<Author | undefined> {
    this.log.info(`Find author with id ${id}`);
    return await this.authorRepository.findOne({ id });
  }

  public async create(author: Author): Promise<Author> {
    this.log.info(`Create a new author => ${author.toString()}`);
    const newAuthor = await this.authorRepository.save(author);
    return newAuthor;
  }

  public async update(id: string, author: Author): Promise<Author> {
    const authorExists = await this.authorRepository.findOne({ id });
    if (!authorExists) {
      return undefined;
    }

    this.log.info('Update an author');
    author.id = id;
    return await this.authorRepository.save(author);
  }

  public async delete(id: string): Promise<{ done: boolean }> {
    const authorExists = await this.authorRepository.findOne({ id });
    if (!authorExists) {
      return undefined;
    }

    this.log.info('Delete an author');
    await this.authorRepository.delete(id);
    return { done: true };
  }

}
