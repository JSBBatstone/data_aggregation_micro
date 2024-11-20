import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TransactionApiMockService } from './transaction-api-mock.service';

@Injectable()
export class TransactionTaskService {
  private readonly logger = new Logger(TransactionTaskService.name);

  constructor(private readonly transactionApiMockService: TransactionApiMockService) {}

  
  @Cron('*/30 * * * * *') // Runs every 30 seconds
  async fetchAndSaveTransactions() {
    try {
      this.logger.log('Fetching and saving transactions...');
      const startDate = new Date(Date.now() - 30 * 1000).toISOString();
      const endDate = new Date().toISOString();

      // Call the getTransactions method
      const transactions = await this.transactionApiMockService.getTransactions(startDate, endDate);

      this.logger.log(`Fetched ${transactions.items.length} transactions.`);
    } catch (error) {
      this.logger.error('Error during transaction fetch/save:', error);
    }
  }
}