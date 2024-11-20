import { Controller, Get, Param } from '@nestjs/common';
import { AggregationService } from './aggregation.service';

@Controller('aggregation')
export class AggregationController {
  constructor(private readonly aggregationService: AggregationService) {}

  @Get('user/:userId')
  async getAggregatedData(@Param('userId') userId: string) {
    return this.aggregationService.getAggregatedDataByUserId(userId);
  }

  @Get('payouts')
  async getListOfRequestedPayouts() {
    return this.aggregationService.getListOfRequestedPayouts();
  }
}