import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async saveUser(username: string, password: string) {
    const newUser = new this.userModel({
      username,
      password,
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
      updateUser.password = password;
    }
    updateUser.save();
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async findUser(userId: string): Promise<UserDocument> {
    let industry;
    try {
      industry = await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find industry');
    }
    if (!industry) {
      throw new NotFoundException('Could not find industry');
    }
    return industry;
  }
}
