import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthorTable1533149139833 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'author',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '255',
          isPrimary: true,
          isNullable: false,
        }, {
          name: 'firstName',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false,
        }, {
          name: 'lastName',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: false,
        },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('author');
  }

}
