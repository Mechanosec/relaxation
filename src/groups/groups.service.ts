import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './groups.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './DTO/create-group.dto';
import { AddToGroupDto } from './DTO/add-to-group.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private userService: UsersService,
  ) {}

  async getByGuid(guid: string): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { guid },
      relations: ['users'],
    });
  }

  async getAll(): Promise<Group[]> {
    return await this.groupRepository.find({ relations: ['users'] });
  }

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.create(dto);
    return await this.groupRepository.save(group);
  }

  async addToGroup(dto: AddToGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { guid: dto.guid },
    });
    group.users = await this.userService.getByGuids(dto.userGuids);
    return await this.groupRepository.save(group);
  }
}
