import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TransactionEntity } from '../transaction-api-mock/transaction.entity';

@Injectable()
export class AggregationService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  async getAggregatedDataByUserId(userId: string) {
    // Retrieve the exchange rate from environment variables
    const exchangeRate = this.configService.get<number>('ONE_SCR_TO_EUR', 1);

    const result = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('ROUND(SUM(CASE WHEN transaction.type = \'earned\' THEN transaction.amount ELSE 0 END), 2)', 'earned')
      .addSelect('ROUND(SUM(CASE WHEN transaction.type = \'spent\' THEN transaction.amount ELSE 0 END), 2)', 'spent')
      .addSelect(
        `ROUND(SUM(CASE WHEN transaction.type = 'payout' THEN transaction.amount ELSE 0 END), 2)`,
        'payout',
      )
      .addSelect(
        `ROUND(SUM(CASE WHEN transaction.type = 'payout' THEN transaction.amount * ${exchangeRate} ELSE 0 END), 2)`,
        'paid_out(€)',
      )
      .addSelect(
        `ROUND(
          SUM(CASE WHEN transaction.type = 'earned' THEN transaction.amount ELSE 0 END) - 
          SUM(CASE WHEN transaction.type = 'spent' THEN transaction.amount ELSE 0 END) - 
          SUM(CASE WHEN transaction.type = 'payout' THEN transaction.amount ELSE 0 END),
          2
        )`,
        'balance',
      )
      .where('transaction.userId = :userId', { userId })
      .getRawOne();

    return result;
  }

  async getListOfRequestedPayouts() {
    const result = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.userId', 'userId')
      .addSelect('ROUND(SUM(transaction.amount), 2)', 'payoutAmount') // Round to 2 decimal places
      .where('transaction.type = :type', { type: 'payout' })
      .groupBy('transaction.userId')
      .getRawMany();

    return result;
  }
}