import { Repository } from 'typeorm';
import { Group } from './groups.entity';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../extensions/base.repository';

@Injectable({ scope: Scope.REQUEST })
export class GroupsRepository extends BaseRepository{

  constructor(@InjectRepository(Group) private repository: Repository<Group>) {
    super();
  }

  async findByGuid(guid: string): Promise<Group> {
    return await this.repository.findOne({
      where: { guid: guid },
      relations: this.relations,
    });
  }

  async findList(): Promise<Group[]> {
    return await this.repository.find({ relations: this.relations });
  }
}
