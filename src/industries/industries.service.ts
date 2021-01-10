import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IndustryDocument } from './industry.schema';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectModel('Industry')
    private readonly industryModel: Model<IndustryDocument>,
  ) {}
  async saveIndustry(name: string) {
    const newIndustry = new this.industryModel({
      name,
    });
    const result = await newIndustry.save();
    return result.id as string;
  }
}
