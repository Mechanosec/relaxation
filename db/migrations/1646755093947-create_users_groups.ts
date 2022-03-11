import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersGroups1646755093947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_groups',
        foreignKeys: [
          {
            name: 'users_groups_user_guid',
            columnNames: ['user_guid'],
            referencedTableName: 'users',
            referencedColumnNames: ['guid'],
          },
          {
            name: 'users_groups_group_guid',
            columnNames: ['group_guid'],
            referencedTableName: 'groups',
            referencedColumnNames: ['guid'],
          },
        ],
        columns: [
          {
            name: 'user_guid',
            type: 'uuid',
          },
          {
            name: 'group_guid',
            type: 'uuid',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_groups');
  }
}
