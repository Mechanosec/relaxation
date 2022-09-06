import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersRoles1646757282611 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_roles',
                foreignKeys: [
                    {
                        name: 'users_roles_user_guid',
                        columnNames: ['user_guid'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['guid'],
                    },
                    {
                        name: 'users_roles_role_id',
                        columnNames: ['role_id'],
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                    },
                ],
                columns: [
                    {
                        name: 'user_guid',
                        type: 'uuid',
                    },
                    {
                        name: 'role_id',
                        type: 'int',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_roles');
    }
}
