import { Test, TestingModule } from '@nestjs/testing';
import { TransactionApiMockService } from './transaction-api-mock.service';

describe('TransactionApiMockService', () => {
  let service: TransactionApiMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionApiMockService],
    }).compile();

    service = module.get<TransactionApiMockService>(TransactionApiMockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
