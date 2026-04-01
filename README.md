# Restaurant API - iFood-like MVP

A NestJS backend for a food delivery platform similar to iFood/Deliveroo, now fully containerized with Docker and using PostgreSQL as the database.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | NestJS | 11.x |
| Language | TypeScript | 6.x |
| Database | PostgreSQL | 13 |
| ORM | Prisma | 6.x |
| Authentication | JWT + Passport | - |
| OAuth | Passport Google OAuth 2.0 | - |
| Validation | class-validator + class-transformer | - |
| API Docs | Swagger/OpenAPI | - |
| Password Hashing | bcrypt | 6.x |
| Rate Limiting | @nestjs/throttler | - |
| Security Headers | helmet | - |
| Testing | Jest & Supertest | 30.x |
| Containerization | Docker | - |
| Orchestration | Docker Compose | - |

## Architecture

The project follows a modular, layer-based architecture. For detailed information, refer to the original `README.md` file.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation & Running the Application

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/samuelbaldasso/Node-Nest-Restaurant-Management.git
    cd Node-Nest-Restaurant-Management
    ```

2.  **Environment Setup:**

    The application is configured to run with Docker Compose, which uses the environment variables defined in the `docker-compose.yml` file. No `.env` file is required for local development.

3.  **Run with Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command will:
    - Build the Docker image for the application.
    - Start the application and the PostgreSQL database.
    - Apply database migrations automatically.

    The API will be available at `http://localhost:3000`.

### Swagger Documentation

Access the interactive API docs at `http://localhost:3000/api/docs`.

## Testing

The application includes both unit and end-to-end (E2E) tests.

-   **Unit Tests:** Focus on individual services and business logic.
-   **E2E Tests:** Test the full application flow, from API endpoints to the database.

### Running Tests

1.  **Unit Tests:**

    ```bash
    npm test
    ```

2.  **End-to-End (E2E) Tests:**

    ```bash
    npm run test:e2e
    ```

    **Note:** Ensure the application is running via `docker-compose up` before executing E2E tests, as they target a live database.

## Production Considerations

The original `README.md` contains a comprehensive list of production considerations. Key points include:

-   Using a robust secret management strategy for JWT secrets and other credentials.
-   Configuring CORS for specific origins.
-   Implementing structured logging.

## Future Improvements

Refer to the original `README.md` for a list of future improvements.

## License

ISC
