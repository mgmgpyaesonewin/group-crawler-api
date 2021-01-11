import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
