import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Types

import { GroupDocument } from './groups.schema';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<GroupDocument>,
  ) {}
  async getGroups() {
    const groups = await this.groupModel
      .aggregate()
      .lookup({
        from: 'industries',
        localField: 'industry_id',
        foreignField: '_id',
        as: 'industry',
      })
      .exec();
    return groups;
  }

  async getGroup(groupId: string) {
    // .match({ _id: Types.ObjectId(groupId) })
    const group = await this.findGroup(groupId);
    return {
      id: group.id,
      picture_url: group.picture_url,
      name: group.name,
      url: group.url,
      industry_id: group.industry_id,
    };
  }

  async saveGroup(
    name: string,
    url: string,
    picture_url: string,
    industry_id: string,
  ) {
    const newGroup = new this.groupModel({
      name,
      url,
      picture_url,
      industry_id,
    });
    const result = await newGroup.save();
    return result.id as string;
  }

  async updateGroup(
    groupId: string,
    picture_url: string,
    name: string,
    url: string,
    industry_id: string,
  ) {
    const updateGroup = await this.findGroup(groupId);
    if (picture_url) {
      updateGroup.picture_url = picture_url;
    }
    if (name) {
      updateGroup.name = name;
    }
    if (url) {
      updateGroup.url = url;
    }
    if (industry_id) {
      updateGroup.industry_id = industry_id;
    }
    updateGroup.save();
  }

  async deleteGroup(groupId: string) {
    await this.groupModel.deleteOne({ _id: groupId }).exec();
  }

  private async findGroup(groupId: string): Promise<GroupDocument> {
    let industry;
    try {
      industry = await this.groupModel.findById(groupId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find industry');
    }
    if (!industry) {
      throw new NotFoundException('Could not find industry');
    }
    return industry;
  }
}
