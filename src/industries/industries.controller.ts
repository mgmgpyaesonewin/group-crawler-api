import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

import { IndustriesService } from './industries.service';

@Controller('/industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  async getIndustries() {
    const industries = await this.industriesService.getIndustries();
    return industries;
  }

  @Get(':id')
  getIndustry(@Param('id') industryId: string) {
    return this.industriesService.getIndustry(industryId);
  }

  @Post()
  async addIndustry(@Body('name') name: string) {
    const generatedId = await this.industriesService.saveIndustry(name);
    return {
      id: generatedId,
    };
  }

  @Patch(':id')
  async updateIndustry(@Param('id') id: string, @Body('name') name: string) {
    await this.industriesService.updateIndustry(id, name);
    return {
      message: 'Updated Successfully',
    };
  }
}
