import { Controller, Post, Body, Get } from '@nestjs/common';

import { IndustriesService } from './industries.service';

@Controller('/industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  async getIndustries() {
    const industries = await this.industriesService.getIndustries();
    return industries;
  }

  @Post()
  async addIndustry(@Body('name') name: string) {
    const generatedId = await this.industriesService.saveIndustry(name);
    return {
      id: generatedId,
    };
  }
}
