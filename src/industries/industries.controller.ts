import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { runInThisContext } from 'vm';

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

  @Delete(':id')
  async deleteIndustry(@Param('id') industryId: string) {
    await this.industriesService.deleteIndustry(industryId);
    return {
      message: 'Delete Successfully',
    };
  }
}
