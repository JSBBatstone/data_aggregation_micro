import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TransactionApiMockService } from './transaction-api-mock.service';

@Injectable()
export class TransactionTaskService {
  private readonly logger = new Logger(TransactionTaskService.name);

  constructor(private readonly transactionApiMockService: TransactionApiMockService) {}

  @Cron('*/30 * * * * *') // Runs every 30 seconds
  async fetchAndSaveTransactions() {
    const startDate = new Date(Date.now() - 30 * 1000).toISOString();
    const endDate = new Date().toISOString();

    try {
      this.logger.log('Fetching and saving transactions...');
      const transactions = await this.fetchTransactionsWithRetry(startDate, endDate);
      this.logger.log(`Fetched and saved ${transactions.length} transactions.`);
    } catch (error) {
      this.logger.error('Failed to fetch transactions after retries:', error);
    }
  }

  private async fetchTransactionsWithRetry(startDate: string, endDate: string, retries = 1): Promise<any[]> {
    let attempts = 0;
    let success = false;
    let allTransactions = [];

    while (!success && attempts <= retries) {
      try {
        attempts++;
        this.logger.log(`Attempt ${attempts} to fetch transactions.`);
        allTransactions = await this.fetchPaginatedTransactions(startDate, endDate);
        success = true;
      } catch (error) {
        this.logger.error(`Attempt ${attempts} failed:`, error);
        if (attempts > retries) {
          throw new Error('Exceeded maximum retry attempts');
        }
        await this.delay(10000); // Wait for 10 seconds before retrying
      }
    }

    return allTransactions;
  }

  private async fetchPaginatedTransactions(startDate: string, endDate: string): Promise<any[]> {
    const pageSize = 1000; // Number of items per page
    let allTransactions = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      this.logger.log(`Fetching page ${page} of transactions.`);
      const response = await this.transactionApiMockService.getTransactions(startDate, endDate, page, pageSize);
      allTransactions = allTransactions.concat(response.items);

      if (response.meta.currentPage >= response.meta.totalPages) {
        hasMorePages = false;
      } else {
        page++;
      }
    }

    return allTransactions;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}