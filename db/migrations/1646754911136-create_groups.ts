import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createGroups1646754911136 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'groups',
                columns: [
                    {
                        name: 'guid',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'title',
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
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('groups');
    }
}
