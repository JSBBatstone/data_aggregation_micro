import { Test, TestingModule } from '@nestjs/testing';
import { TransactionApiMockController } from './transaction-api-mock.controller';

describe('TransactionApiMockController', () => {
  let controller: TransactionApiMockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionApiMockController],
    }).compile();

    controller = module.get<TransactionApiMockController>(TransactionApiMockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
