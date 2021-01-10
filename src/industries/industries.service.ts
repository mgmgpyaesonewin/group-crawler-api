import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IndustryDocument } from './industry.schema';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectModel('Industry')
    private readonly industryModel: Model<IndustryDocument>,
  ) {}
  async getIndustries() {
    const industries = await this.industryModel.find().exec();
    return industries;
  }

  async getIndustry(industryId: string) {
    const industry = await this.industryModel.findById(industryId).exec();
    if (!industry) {
      throw new NotFoundException('Could not find industry');
    }
    return {
      id: industry.id,
      name: industry.name,
    };
  }

  async saveIndustry(name: string) {
    const newIndustry = new this.industryModel({
      name,
    });
    const result = await newIndustry.save();
    return result.id as string;
  }
}
