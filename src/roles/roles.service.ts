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

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async getById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
