import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../src/transaction-api-mock/transaction.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<TransactionEntity>;

  // List of seeded IDs for selective deletion
  const seededIds = ['1', '2', '3', '4'];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the repository to seed data
    repository = moduleFixture.get<Repository<TransactionEntity>>(
      getRepositoryToken(TransactionEntity),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Seed the database with mock data
    await repository.save([
      {
        id: '1',
        userId: '12345',
        amount: 100,
        type: 'earned',
        createdAt: new Date(),
      },
      {
        id: '2',
        userId: '12345',
        amount: 50,
        type: 'spent',
        createdAt: new Date(),
      },
      {
        id: '3',
        userId: '12345',
        amount: 20,
        type: 'payout',
        createdAt: new Date(),
      },
      {
        id: '4',
        userId: '67890',
        amount: 25,
        type: 'payout',
        createdAt: new Date(),
      },
    ]);
  });

  afterEach(async () => {
    // Delete only the seeded test data by IDs
    await repository.delete(seededIds);
  });

  it('/aggregation/user/:userId (GET) should return aggregated data', async () => {
    const response = await request(app.getHttpServer())
      .get('/aggregation/user/12345')
      .expect(200);

    expect(response.body).toEqual({
      earned: 100, // Numeric format
      spent: 50,
      payout: 20,
      'paid_out(€)': 20, // Updated field name to match the response
      balance: 30,
    });
  });

  it('/aggregation/payouts (GET) should return list of requested payouts', async () => {
    const response = await request(app.getHttpServer())
      .get('/aggregation/payouts')
      .expect(200);
  
    // Filter only the seeded users
    const filteredResponse = response.body.filter((item: any) =>
      ['12345', '67890'].includes(item.userId),
    );
  
    expect(filteredResponse).toEqual([
      { userId: '12345', payoutAmount: 20 }, // Numeric format
      { userId: '67890', payoutAmount: 25 },
    ]);
  });
});