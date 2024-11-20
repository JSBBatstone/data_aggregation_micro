import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AggregationService } from './aggregation.service';
import { TransactionEntity } from '../transaction-api-mock/transaction.entity';

describe('AggregationService', () => {
  let service: AggregationService;
  let repository: Repository<TransactionEntity>;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AggregationService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useClass: Repository, // Mock the repository
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'ONE_SCR_TO_EUR') return 1.0; // Mock exchange rate
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AggregationService>(AggregationService);
    repository = module.get<Repository<TransactionEntity>>(getRepositoryToken(TransactionEntity));
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('getAggregatedDataByUserId', () => {
    it('should return aggregated data for a user', async () => {
      const userId = '12345';

      const mockResult = {
        earned: '100.00',
        spent: '50.00',
        payout: '24.00', // 20 * 1.2
        paid_out: '12.00', // 10 * 1.2
        balance: '26.00',
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(mockResult),
      } as any);

      const result = await service.getAggregatedDataByUserId(userId);
      expect(result).toEqual(mockResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('transaction');
    });
  });

  describe('getListOfRequestedPayouts', () => {
    it('should return aggregated list of requested payouts', async () => {
      const mockResult = [
        { userId: '12345', payoutAmount: '40.00' },
        { userId: '67890', payoutAmount: '25.00' },
      ];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockResult),
      } as any);

      const result = await service.getListOfRequestedPayouts();
      expect(result).toEqual(mockResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('transaction');
    });
  });
});