import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DoesAuthorExists } from '../validators/BookAuthorConstraint';
import { Author } from './Author';

@Entity()
export class Book {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  public year: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  public pages: number;

  @IsNotEmpty()
  @IsString()
  @DoesAuthorExists({
    message: 'Author $value does not exist.',
  })
  @Column({ nullable: true })
  public authorId: string;

  @ManyToOne(type => Author, author => author.books)
  @JoinColumn({ name: 'authorId' })
  public author: Author;

  public toString(): string {
    return `${this.title}`;
  }

}
