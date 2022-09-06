import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group } from './groups.entity';
import { CreateGroupDto } from './DTO/create-group.dto';
import { GroupsRepository } from './groups.repository';
import { UsersRepository } from '../users/users.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UpdateGroupDto } from './DTO/update-group.dto';
import { UsersToGroupDto } from './DTO/users-to-group.dto';

@Injectable()
export class GroupsService {
    constructor(private groupRepository: GroupsRepository, private userRepository: UsersRepository) {}

    @Transaction()
    async create(
        createGroupDto: CreateGroupDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Group> {
        const group = entityManager.create(Group, createGroupDto);
        return await entityManager.save(group);
    }

    @Transaction()
    async update(
        guid: string,
        updateGroupDto: UpdateGroupDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Group> {
        const group = await this.groupRepository.findByGuid(guid);
        group.title = updateGroupDto.title;
        group.description = updateGroupDto.description;
        return await entityManager.save(group);
    }

    @Transaction()
    async delete(guid: string, @TransactionManager() entityManager: EntityManager = null) {
        const group = await this.groupRepository.findByGuid(guid);
        group.deletedAt = new Date().toISOString();
        await entityManager.save(group);
    }

    @Transaction()
    async addTo(
        guid: string,
        usersToGroupDto: UsersToGroupDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Group> {
        const group = await this.groupRepository.findByGuid(guid);
        group.users = await this.userRepository.findByGuids(usersToGroupDto.userGuids);
        if (!group.users.length) {
            throw new HttpException('Users is not exist', HttpStatus.BAD_REQUEST);
        }
        return await entityManager.save(group);
    }

    @Transaction()
    async unsetFrom(
        guid: string,
        usersToGroupDto: UsersToGroupDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Group> {
        const group = await this.groupRepository.setRelations(['users']).findByGuid(guid);
        group.users = group.users.filter((elem) => {
            return !usersToGroupDto.userGuids.includes(elem.guid);
        });
        return await entityManager.save(group);
    }
}
