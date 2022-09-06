import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRolesTable1645918299248 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        length: '50',
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
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
    }
}
