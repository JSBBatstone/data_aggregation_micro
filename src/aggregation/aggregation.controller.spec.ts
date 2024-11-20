import { Test, TestingModule } from '@nestjs/testing';
import { AggregationController } from './aggregation.controller';
import { AggregationService } from './aggregation.service';

describe('AggregationController', () => {
  let controller: AggregationController;
  let service: AggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AggregationController],
      providers: [
        {
          provide: AggregationService,
          useValue: {
            // Mock the methods of AggregationService
            getAggregatedDataByUserId: jest.fn(),
            getListOfRequestedPayouts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AggregationController>(AggregationController);
    service = module.get<AggregationService>(AggregationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add additional tests as needed
});