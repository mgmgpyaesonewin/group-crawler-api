import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      username: user.username,
    };
  }

  async getUserByName(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();
    return {
      id: user.id,
      username: user.username,
      password: user.password,
    };
  }

  async saveUser(username: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async updateUser(userId: string, username: string, password: string) {
    const updateUser = await this.findUser(userId);
    if (username) {
      updateUser.username = username;
    }
    if (password) {
      const hashedPassword = await this.hashPassword(password);
      updateUser.password = hashedPassword;
    }
    updateUser.save();
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async findUser(userId: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 2);
  }
}
