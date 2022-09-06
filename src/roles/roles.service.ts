import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './DTO/create-role.dto';
import { Role } from './roles.entity';
import { RolesRepository } from './roles.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(private roleRepository: RolesRepository) {}

    @Transaction()
    async create(
        createRoleDto: CreateRoleDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Role> {
        const role = entityManager.create(Role, createRoleDto);
        return entityManager.save(role);
    }
}
