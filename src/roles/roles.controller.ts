import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './DTO/create-role.dto';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { RoleResponse } from './responseTransformer/role.response';
import { RolesRepository } from './roles.repository';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private roleService: RolesService,
    private roleRepository: RolesRepository,
  ) {}

  @ApiOperation({ summary: 'Получение списка' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.roleRepository.findList().then((entities) => {
      return new RoleResponse().items(entities);
    });
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.create(roleDto);
  }
}
