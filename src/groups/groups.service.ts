import { Injectable } from '@nestjs/common';
import { Group } from './groups.entity';
import { CreateGroupDto } from './DTO/create-group.dto';
import { AddToGroupDto } from './DTO/add-to-group.dto';
import { GroupsRepository } from './groups.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class GroupsService {
  constructor(
    private groupRepository: GroupsRepository,
    private userRepository: UsersRepository,
  ) {}

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    return await this.groupRepository.save(dto);
  }

  async addToGroup(dto: AddToGroupDto): Promise<Group> {
    const group = await this.groupRepository.findByGuid(dto.guid);
    group.users = await this.userRepository.findByGuids(dto.userGuids);
    return await this.groupRepository.save(group);
  }
}
