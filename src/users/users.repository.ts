import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseRepository } from '../extensions/base.repository';

@Injectable({ scope: Scope.REQUEST })
export class UsersRepository extends BaseRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
    super();
  }

  async findByGuid(guid: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { guid: guid },
      relations: this.relations,
    });
    if (!user) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findByGuids(guids: string[]): Promise<User[]> {
    return await this.repository.find({
      where: { guid: In(guids) },
      relations: this.relations,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email: email },
      relations: this.relations,
    });
    if (!user) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findList(): Promise<User[]> {
    return await this.repository.find({ relations: this.relations });
  }
}
