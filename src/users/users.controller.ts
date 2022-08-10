import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import UserResponse from './responseTransformer/user.response';
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
  async get(@Param('guid') guid: string) {
    try {
      const user = await this.userRepository
        .setRelations(['roles'])
        .findByGuid(guid);
      return new UserResponse().item(user);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Get list' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    try {
      const users = await this.userRepository.findList();
      return new UserResponse().items(users);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return new UserResponse().item(user);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:guid')
  async update(
    @Param('guid') guid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.update(guid, updateUserDto);
      return new UserResponse().item(user);
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:guid')
  async delete(@Param('guid') guid: string) {
    try {
      await this.userService.delete(guid);
      return 'User was update';
    } catch (error) {
      return error;
    }
  }
}
