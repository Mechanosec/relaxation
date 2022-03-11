import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './DTO/create-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Group } from './groups.entity';
import { AddToGroupDto } from './DTO/add-to-group.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GroupResponse } from './responseTransformer/group.response';

@ApiTags('Groups')
@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @ApiOperation({ summary: 'Get group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get('/:guid')
  async get(@Param('guid') guid: string) {
    return this.groupService
      .getByGuid(guid)
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
    return this.groupService
      .getAll()
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
      .createGroup(createGroupDto)
      .then((group) => {
        return new GroupResponse().item(group);
      })
      .catch((error) => {
        return error;
      });
  }

  @ApiOperation({ summary: 'Add users to group' })
  @ApiResponse({ status: 200, type: [Group] })
  @Post('/add-users')
  async addToGroup(@Body() addToGroupDto: AddToGroupDto) {
    return this.groupService
      .addToGroup(addToGroupDto)
      .then((group) => {
        return new GroupResponse().item(group);
      })
      .catch((error) => {
        return error;
      });
  }
}
