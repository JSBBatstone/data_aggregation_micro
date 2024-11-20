import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AggregationService } from './aggregation.service';
import { AggregationController } from './aggregation.controller';
import { TransactionEntity } from '../transaction-api-mock/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [AggregationService],
  controllers: [AggregationController],
})
export class AggregationModule {}