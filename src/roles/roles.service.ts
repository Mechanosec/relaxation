import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './DTO/create-role.dto';
import { Role } from './roles.entity';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private roleRepository: RolesRepository) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(dto);
  }
}
