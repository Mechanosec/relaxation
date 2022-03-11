import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createLeisureTable1647019907872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'leisure',
        foreignKeys: [
          {
            name: 'leisure_category_id',
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
          },
        ],
        columns: [
          {
            name: 'guid',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'category_id',
            type: 'int',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'event_date_start',
            type: 'timestamp',
            length: '0',
            isNullable: true,
          },
          {
            name: 'event_date_end',
            type: 'timestamp',
            length: '0',
            isNullable: true,
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
    await queryRunner.dropTable('leisure');
  }
}
