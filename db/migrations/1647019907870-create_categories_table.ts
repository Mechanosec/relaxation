import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCategoriesTable1647019907870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            length: '0',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            length: '0',
            default: 'NOW()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            length: '0',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
