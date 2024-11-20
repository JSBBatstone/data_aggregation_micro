import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionApiMockController } from './transaction-api-mock.controller';
import { TransactionApiMockService } from './transaction-api-mock.service';
import { TransactionTaskService } from './transaction-task.service' // Import Task Service
import { TransactionEntity } from './transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [TransactionApiMockController],
  providers: [TransactionApiMockService, TransactionTaskService], // Add Task Service
})
export class TransactionApiMockModule {}