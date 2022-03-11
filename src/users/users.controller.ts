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

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:guid')
  async get(@Param('guid') guid: string) {
    return new UserResponse().item(await this.userService.getGuid(guid));
  }

  @ApiOperation({ summary: 'Get list' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    return new UserResponse().items(await this.userService.getAll());
  }

  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, type: User })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .createUser(createUserDto)
      .then((user) => {
        return new UserResponse().item(user);
      })
      .catch((error) => {
        return error;
      });
  }
}
