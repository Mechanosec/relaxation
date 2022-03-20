import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserResponse } from './responseTransformer/user.response';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './DTO/update-user.dto';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private userRepository: UsersRepository,
  ) {}

  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:guid')
  get(@Param('guid') guid: string) {
    return this.userRepository
      .setRelations(['roles'])
      .findByGuid(guid)
      .then((user) => {
        return new UserResponse().item(user);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Get list' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    this.userRepository
      .findList()
      .then((users) => {
        return new UserResponse().items(users);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .create(createUserDto)
      .then((user) => {
        return new UserResponse().item(user);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:guid')
  update(@Param('guid') guid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService
      .update(guid, updateUserDto)
      .then((user) => {
        return new UserResponse().item(user);
      })
      .catch((error) => {
        return error;
      });
  }
}
