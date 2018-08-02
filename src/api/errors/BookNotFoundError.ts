import { HttpError } from 'routing-controllers';

export class BookNotFoundError extends HttpError {
  constructor() {
    super(404, 'Book not found!');
  }
}
