import * as Faker from 'faker';
import { Author } from '../../../src/api/models/Author';
import { define } from '../../lib/seed';

define(Author, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const author = new Author();
  author.firstName = firstName;
  author.lastName = lastName;
  return author;
});
