import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBookTable1533149147324 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'book',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '255',
          isPrimary: true,
          isNullable: false,
        }, {
          name: 'title',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false,
        }, {
          name: 'year',
          type: 'int',
          length: '255',
          isPrimary: false,
          isNullable: false,
        }, {
          name: 'pages',
          type: 'int',
          length: '255',
          isPrimary: false,
          isNullable: false,
        }, {
          name: 'authorId',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('book');
  }

}
