import { Controller, Post, Body } from '@nestjs/common';

import { IndustriesService } from './industries.service';

@Controller('/industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}
  @Post()
  async addIndustry(@Body('name') name: string) {
    const generatedId = await this.industriesService.saveIndustry(name);
    return {
      id: generatedId,
    };
  }
}
