import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam } from 'routing-controllers';
import { AuthorNotFoundError } from '../errors/AuthorNotFoundError';
import { Author } from '../models/author';
import { AuthorService } from '../services/AuthorService';

@JsonController('/authors')
export class AuthorController {

  constructor(
    private authorService: AuthorService
  ) { }

  @Get()
  public find(@QueryParam('firstName') firstName?: string, @QueryParam('lastName') lastName?: string): Promise<Author[]> {
    return this.authorService.find(firstName, lastName);
  }

  @Get('/:id')
  @OnUndefined(AuthorNotFoundError)
  public one(@Param('id') id: string): Promise<Author | undefined> {
    return this.authorService.findOne(id);
  }

  @Post()
  public create(@Body() author: Author): Promise<Author> {
    return this.authorService.create(author);
  }

  @Put('/:id')
  @OnUndefined(AuthorNotFoundError)
  public update(@Param('id') id: string, @Body() author: Author): Promise<Author> {
    return this.authorService.update(id, author);
  }

  @Delete('/:id')
  @OnUndefined(AuthorNotFoundError)
  public delete(@Param('id') id: string): Promise<{done: boolean}> {
    return this.authorService.delete(id);
  }

}
