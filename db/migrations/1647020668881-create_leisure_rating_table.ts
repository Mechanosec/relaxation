import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createLeisureRatingTable1647020668881
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'leisure_rating',
        foreignKeys: [
          {
            name: 'leisure_rating_leisure_guid',
            columnNames: ['leisure_guid'],
            referencedTableName: 'leisure',
            referencedColumnNames: ['guid'],
          },
          {
            name: 'leisure_rating_user_guid',
            columnNames: ['user_guid'],
            referencedTableName: 'users',
            referencedColumnNames: ['guid'],
          },
        ],
        columns: [
          {
            name: 'leisure_guid',
            type: 'uuid',
          },
          {
            name: 'user_guid',
            type: 'uuid',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('leisure_rating');
  }
}
