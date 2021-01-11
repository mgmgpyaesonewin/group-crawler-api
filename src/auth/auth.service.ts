import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserByName(username);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      return result;
    }
    return null;
  }
}
