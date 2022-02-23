import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './DTO/create-role.dto';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    return this.roleRepository.create(dto);
  }

  async getById(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async getAll() {
    return await this.roleRepository.find();
  }
}
