import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async saveUser(username: string, password: string) {
    const newUser = new this.userModel({
      username,
      password,
    });
    const result = await newUser.save();
    return result.id as string;
  }
}
