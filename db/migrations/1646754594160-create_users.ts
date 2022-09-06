import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1646754594160 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'guid',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '200',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '200',
                    },
                    {
                        name: 'second_name',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'birthday',
                        type: 'date',
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
        await queryRunner.dropTable('users');
    }
}
