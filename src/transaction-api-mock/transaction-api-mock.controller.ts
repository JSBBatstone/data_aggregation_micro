import { Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionApiMockService } from './transaction-api-mock.service';

@Controller('transactions')
export class TransactionApiMockController {
  constructor(private readonly transactionApiMockService: TransactionApiMockService) {}

  @Get()
  async getTransactions(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.transactionApiMockService.getTransactions(startDate, endDate);
  }

}