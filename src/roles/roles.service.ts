import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './DTO/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getById(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async getAll() {
    return await this.roleRepository.findAll();
  }
}
