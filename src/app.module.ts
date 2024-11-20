import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule'; // Import ScheduleModule
import { TransactionEntity } from './transaction-api-mock/transaction.entity';
import { TransactionApiMockModule } from './transaction-api-mock/transaction-api-mock.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AggregationModule } from './aggregation/aggregation.module';


@Module({
  imports: [
    TransactionApiMockModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'transactions.db',
      entities: [TransactionEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    ScheduleModule.forRoot(),
    AggregationModule, // Enable scheduling
  ],
})
export class AppModule {}