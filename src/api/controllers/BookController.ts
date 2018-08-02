import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam } from 'routing-controllers';
import { BookNotFoundError } from '../errors/BookNotFoundError';
import { Book } from '../models/book';
import { BookService } from '../services/BookService';

@JsonController('/books')
export class BookController {

  constructor(
    private bookService: BookService
  ) { }

  @Get()
  public find(@QueryParam('title') title: string): Promise<Book[]> {
    return this.bookService.find(title);
  }

  @Get('/author/:id')
  public findByAuthor(@Param('id') id: string): Promise<Book[]> {
    return this.bookService.findByAuthor(id);
  }

  @Get('/:id')
  @OnUndefined(BookNotFoundError)
  public one(@Param('id') id: string): Promise<Book | undefined> {
    return this.bookService.findOne(id);
  }

  @Post()
  public create(@Body() book: Book): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put('/:id')
  @OnUndefined(BookNotFoundError)
  public update(@Param('id') id: string, @Body({validate: true}) book: Book): Promise<Book> {
    return this.bookService.update(id, book);
  }

  @Delete('/:id')
  @OnUndefined(BookNotFoundError)
  public delete(@Param('id') id: string): Promise<{done: boolean}> {
    return this.bookService.delete(id);
  }

}
