# Home Screen Backend

## How to Run the Project

### Prerequisites
- Node.js (v20+)
- PostgreSQL
- MinIO (or AWS S3 compatible storage)
- Redis (for BullMQ)

### Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Ensure your `.env` file points to your external services (PostgreSQL, MinIO, Redis, etc.).

3. **Run in development mode:**
   ```bash
   npm run start:dev
   ```

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```
