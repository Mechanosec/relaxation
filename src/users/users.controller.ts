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
  async get(@Param('uuid') uuid: string) {
    return new UserResponse().item(await this.userService.getId(uuid));
  }

  @ApiOperation({ summary: 'Получение списка' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return new UserResponse().items(await this.userService.getAll());
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserResponse().item(
      await this.userService.createUser(createUserDto),
    );
  }
}
