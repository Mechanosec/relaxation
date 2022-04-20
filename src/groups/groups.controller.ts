import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './DTO/create-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Group } from './groups.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import GroupResponse from './responseTransformer/group.response';
import { GroupsRepository } from './groups.repository';
import { UsersToGroupDto } from './DTO/users-to-group.dto';

@ApiTags('Groups')
// @UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(
    private groupService: GroupsService,
    private groupRepository: GroupsRepository,
  ) {}

  @ApiOperation({ summary: 'Get group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get('/:guid')
  async get(@Param('guid') guid: string) {
    return this.groupRepository
      .findByGuid(guid)
      .then((group) => {
        return new GroupResponse().item(group);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Get group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get()
  async getAll() {
    return this.groupRepository
      .setRelations(['users'])
      .findList()
      .then((groups) => {
        return new GroupResponse().items(groups);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService
      .create(createGroupDto)
      .then((group) => {
        return new GroupResponse().item(group);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Delete group' })
  @ApiResponse({ status: 200 })
  @Delete('/:guid')
  async delete(@Param('guid') guid: string) {
    return this.groupService
      .delete(guid)
      .then(() => {
        return 'Group was delete';
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Add users to group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Post('/add-users/:guid')
  async addTo(
    @Param('guid') guid: string,
    @Body() usersToGroupDto: UsersToGroupDto,
  ) {
    return this.groupService
      .addTo(guid, usersToGroupDto)
      .then((group) => {
        return new GroupResponse().item(group);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Unset users from group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Post('/unset-users/:guid')
  async unsetFrom(
    @Param('guid') guid: string,
    @Body() usersToGroupDto: UsersToGroupDto,
  ) {
    return this.groupService
      .unsetFrom(guid, usersToGroupDto)
      .then((group) => {
        return new GroupResponse().item(group);
      })
      .catch((error) => {
        return error;
      });
  }
}
