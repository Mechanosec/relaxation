import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Получение одного' })
  @Get('/:id')
  get(@Param('id') id: number) {
    return this.userService.getId(id);
  }

  @ApiOperation({ summary: 'Получение списка' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('user')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
