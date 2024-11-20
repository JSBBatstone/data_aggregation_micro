import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionApiMockService } from './transaction-api-mock.service';
import { TransactionEntity } from './transaction.entity';
import { Repository } from 'typeorm';

describe('TransactionApiMockService', () => {
  let service: TransactionApiMockService;
  let repository: Repository<TransactionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionApiMockService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useClass: Repository, // Mock the repository
        },
      ],
    }).compile();

    service = module.get<TransactionApiMockService>(TransactionApiMockService);
    repository = module.get<Repository<TransactionEntity>>(getRepositoryToken(TransactionEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add additional tests as needed
});