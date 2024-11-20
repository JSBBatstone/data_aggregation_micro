import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class TransactionApiMockService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  // Helper method to generate randomized mock transactions
  private generateMockTransactions(startDate: string, endDate: string) {
    const types = ['earned', 'earned','earned', 'spent', 'payout']; //quick way to make sure earned is weighed heavier than others
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
  
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
  
    return Array.from({ length: randomInt(3, 10) }, () => ({
      id: uuidv4(), // Generate a valid UUID
      userId: `${randomInt(1, 100)}`,
      createdAt: new Date(randomInt(startTime, endTime)).toISOString(), // Random date within the range
      type: types[randomInt(0, types.length - 1)],
      amount: parseFloat((Math.random() * 100).toFixed(2)), // Random amount between 0 and 100
    }));
  }

  async getTransactions(startDate: string, endDate: string) {
    const mockTransactions = this.generateMockTransactions(startDate, endDate); // Generate randomized data
    const filtered = mockTransactions.filter((transaction) => {
      const createdAt = new Date(transaction.createdAt).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      return createdAt >= start && createdAt <= end;
    });
  
    // Save transactions to SQLite
    await this.transactionRepository.save(filtered);
  
    return {
      items: filtered,
      meta: {
        totalItems: mockTransactions.length,
        itemCount: filtered.length,
        itemsPerPage: filtered.length,
        totalPages: 1,
        currentPage: 1,
      },
    };
  }
}