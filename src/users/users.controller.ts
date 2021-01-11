import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    const users = this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    const user = this.usersService.getUser(userId);
    return user;
  }

  @Post()
  async addUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.usersService.saveUser(username, password);
    return {
      id: generatedId,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    await this.usersService.updateUser(id, username, password);
    return {
      message: 'Updated Successfully',
    };
  }

  @Delete(':id')
  async deleteIndustry(@Param('id') industryId: string) {
    await this.usersService.deleteUser(industryId);
    return {
      message: 'Delete Successfully',
    };
  }
}
