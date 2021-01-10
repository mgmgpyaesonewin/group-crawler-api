import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IndustriesController } from './industries.controller';
import { IndustrySchema } from './industry.schema';
import { IndustriesService } from './industries.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Industry', schema: IndustrySchema }]),
  ],
  controllers: [IndustriesController],
  providers: [IndustriesService],
})
export class IndustriesModule {}
