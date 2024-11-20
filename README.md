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

## Describe Testing Strategy
For an app like this, I’d go with a mix of unit, integration, and end-to-end tests to cover all the bases. Unit tests would handle the nitty-gritty stuff, like making sure TransactionApiMockService works properly on its own, while integration tests would check how things play together—like the database and API endpoints. E2E tests would focus on making sure everything flows smoothly, like with the /aggregation/user/:userId endpoint. If I had more time, I’d start with TDD by writing tests for the key features first (like aggregation and pagination), then write just enough code to pass them. Along the way, I’d do manual checks at every step—running SQL queries and scribbling down expected results on pen and paper to double-check the data. I’d also make sure to account for things like retries failing or odd edge cases with the data.

## License

Nest is [MIT licensed](LICENSE).
