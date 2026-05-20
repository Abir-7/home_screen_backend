# Home Screen Backend

## How to Run the Project

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run with Docker (Recommended)
This command starts the NestJS app, PostgreSQL database, and MinIO (local S3).

1. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Start the services:**
   ```bash
   docker-compose up --build
   ```

### Accessing the Services
- **NestJS App:** [http://localhost:3000](http://localhost:3000) (Hot-reload enabled)
- **PostgreSQL:** `localhost:5432`
- **MinIO Console:** [http://localhost:9001](http://localhost:9001) (User: `minioadmin`, Pass: `minioadmin`)
- **MinIO API (S3):** `http://localhost:9000`

---

### Local Development (Without Docker)
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run in development mode:**
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
