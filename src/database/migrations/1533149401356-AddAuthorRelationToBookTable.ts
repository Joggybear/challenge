import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddAuthorRelationToBookTable1533149401356 implements MigrationInterface {

  private tableForeignKey = new TableForeignKey({
    name: 'fk_author_book',
    columnNames: ['authorId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'author',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey('book', this.tableForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('book', this.tableForeignKey);
  }

}
