import { Controller, Get, Param } from '@nestjs/common';
import { OutageService } from './outage.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('outage')
export class OutageController {
  constructor(private readonly outageService: OutageService) {}

  @ApiOperation({
    summary: 'Outages for a specific site to be posted to it',
  })
  @Get('/outage-calculate/:siteId')
  async outageCalculate(@Param('siteId') siteId: string) {
    const result = await this.outageService.calculateOutages(siteId);
    return result ? result.data : null;
  }
}
