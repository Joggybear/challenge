import * as Faker from 'faker';
import { Book } from '../../../src/api/models/Book';
import { define } from '../../lib/seed';

define(Book, (faker: typeof Faker) => {
  const title = faker.name.title();
  const year = faker.random.number();
  const pages = faker.random.number();

  const book = new Book();
  book.title = title;
  book.year = year;
  book.pages = pages;
  return book;
});
