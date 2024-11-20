# Data Aggregation Microservice

## Description

Recruiting Challenge for backend developer

## Assumptions/Notes

1. **Data Capture**  
   - Data capture began at an arbitrary date/time, with no legacy data imported.  
   - As a result, some users may request payouts or spend SCR without having earned it, potentially resulting in a negative balance.

2. **Payout Processing**  
   - Payout requests are processed instantly with 100% accuracy, simulating a perfect banking system.

3. **Inflation**  
   - Inflation will affect the game economy in the future, meaning the current exchange rate of **1 SCR = 1 EUR** is subject to change.

4. **Currency Format**  
   - **Payout Amount**: Denoted in scores (SCR).  
   - **Paid Out**: Denoted in euros (EUR).

5. **API Request Limitations**  
   - Pre-condition specifies:  
     - Maximum of **5 requests per minute**.  
     - Each request can retrieve up to **1000 transactions**.

6. **Transaction Volume**  
   - The system assumes there are no more than **5000 transactions per minute**.

7. **Testing Database**  
   - The DevOps team indicated that it is not possible to spin up a new database specifically for running tests.

8. **Environment Variables**  
   - Due to a modification in GitHub's source code (allegedly), only people with the repository link can view the `.env` file, even in a public repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Requested Endpoints
```bash
# Get aggregated data by user Id: balance, earned, spent, payout, paid out
$ curl -X GET http://localhost:3000/aggregation/user/{user_id}

# Get list of requested payouts (user ID, payout amount), if there are several payouts requested by a user, then the amount will be aggregated into one.
$ curl -X GET http://localhost:3000/aggregation/payouts
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
