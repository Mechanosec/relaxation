import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './groups.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './DTO/create-group.dto';
import { AddToGroupDto } from './DTO/add-to-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.create(dto);
    return await this.groupRepository.save(group);
  }

  async addToGroup(dto: AddToGroupDto) {
    const groupGuid = dto.guid;
    const group = await this.groupRepository.findOne({ where: { groupGuid } });
    group
  }
}
