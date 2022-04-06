import { Injectable } from '@nestjs/common';
import { Group } from './groups.entity';
import { CreateGroupDto } from './DTO/create-group.dto';
import { AddToGroupDto } from './DTO/add-to-group.dto';
import { GroupsRepository } from './groups.repository';
import { UsersRepository } from '../users/users.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    private groupRepository: GroupsRepository,
    private userRepository: UsersRepository,
  ) {}

  @Transaction()
  async createGroup(
    createGroupDto: CreateGroupDto,
    @TransactionManager() entityManager: EntityManager = null,
  ): Promise<Group> {
    const group = entityManager.create(Group, createGroupDto);
    return await entityManager.save(group);
  }

  @Transaction()
  async addToGroup(
    addToGroupDto: AddToGroupDto,
    @TransactionManager() entityManager: EntityManager = null,
  ): Promise<Group> {
    const group = await this.groupRepository.findByGuid(addToGroupDto.guid);
    group.users = await this.userRepository.findByGuids(
      addToGroupDto.userGuids,
    );
    return await entityManager.save(group);
  }
}
