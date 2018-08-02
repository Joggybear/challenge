import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  public firstName: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @OneToMany(type => Book, book => book.author)
  public books: Book[];

  public toString(): string {
    return `${this.firstName} ${this.lastName}`;
  }

}
