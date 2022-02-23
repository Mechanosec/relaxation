import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../guards/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserResponse } from './responseTransformer/user.response';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Получение одного' })
  @Roles('user')
  @UseGuards(RolesGuard)
  @Get('/:uuid')
  get(@Param('uuid') uuid: string) {
    return this.userService.getId(uuid).then((entity) => {
      return new UserResponse().item(entity);
    });
  }

  @ApiOperation({ summary: 'Получение списка' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.userService.getAll().then((entities) => {
      return new UserResponse().items(entities);
    });
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
