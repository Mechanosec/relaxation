import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../../src/roles/roles.entity';

export class seedRoles1645918887437 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const admin = queryRunner.manager.create(Role, {
            id: 1,
            role: 'admin',
            description: 'Administrator role',
        });
        await queryRunner.manager.save(admin);

        const user = queryRunner.manager.create(Role, {
            id: 2,
            role: 'user',
            description: 'User role',
        });
        await queryRunner.manager.save(user);

        // await queryRunner.manager.save(
        //   queryRunner.manager.create<Role>(Role, {
        //     id: 1,
        //     role: 'admin',
        //     description: 'Administrator role',
        //   }),
        // );
        //
        // await queryRunner.manager.save(
        //   queryRunner.manager.create<Role>(Role, {
        //     id: 2,
        //     role: 'user',
        //     description: 'User role',
        //   }),
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.manager.delete(Role, [1, 2]);
    }
}
