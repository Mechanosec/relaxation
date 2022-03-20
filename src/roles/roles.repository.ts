import { Role } from './roles.entity';
import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './DTO/create-role.dto';
import { BaseRepository } from '../extensions/base.repository';

@Injectable({ scope: Scope.REQUEST })
export class RolesRepository extends BaseRepository {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {
    super();
  }

  async save(dto: CreateRoleDto) {
    const role = this.repository.create(dto);
    return this.repository.save(role);
  }

  async findById(id: number): Promise<Role> {
    const role = await this.repository.findOne({
      where: { id: id },
      relations: this.relations,
    });
    if (!role) {
      throw new HttpException('Role is not exist', HttpStatus.BAD_REQUEST);
    }
    return role;
  }

  async findList(): Promise<Role[]> {
    return await this.repository.find({ relations: this.relations });
  }
}
