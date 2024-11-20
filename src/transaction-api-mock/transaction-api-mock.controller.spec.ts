import { Test, TestingModule } from '@nestjs/testing';
import { TransactionApiMockController } from './transaction-api-mock.controller';
import { TransactionApiMockService } from './transaction-api-mock.service';

describe('TransactionApiMockController', () => {
  let controller: TransactionApiMockController;
  let service: TransactionApiMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionApiMockController],
      providers: [
        {
          provide: TransactionApiMockService,
          useValue: {
            // Mock the methods of TransactionApiMockService
            saveTransactionsToDB: jest.fn(),
            getTransactions: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionApiMockController>(TransactionApiMockController);
    service = module.get<TransactionApiMockService>(TransactionApiMockService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add additional tests as needed
});