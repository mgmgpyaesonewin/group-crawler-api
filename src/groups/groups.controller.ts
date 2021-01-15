import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get()
  async getGroups() {
    const groups = await this.groupService.getGroups();
    return groups;
  }

  @Get(':id')
  async getGroup(@Param('id') groupId: string) {
    return this.groupService.getGroup(groupId);
  }

  @Post()
  async addGroup(
    @Body('name') name: string,
    @Body('url') url: string,
    @Body('picture_url') picture_url: string,
    @Body('industry_id') industry_id: string,
  ) {
    const generatedId = await this.groupService.saveGroup(
      name,
      url,
      picture_url,
      industry_id,
    );
    return {
      id: generatedId,
    };
  }

  @Patch(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body('picture_url') picture_url: string,
    @Body('name') name: string,
    @Body('url') url: string,
    @Body('industry_id') industry_id: string,
  ) {
    await this.groupService.updateGroup(
      id,
      picture_url,
      name,
      url,
      industry_id,
    );
    return {
      message: 'Updated Successfully',
    };
  }

  @Delete(':id')
  async deleteGroup(@Param('id') groupId: string) {
    await this.groupService.deleteGroup(groupId);
    return {
      message: 'Delete Successfully',
    };
  }
}
