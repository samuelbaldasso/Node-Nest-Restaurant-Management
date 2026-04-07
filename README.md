# Restaurant API — iFood-like MVP

A production-ready NestJS backend for a food delivery platform, modeled after services like iFood and Deliveroo. It supports multi-tenant restaurant management, product catalogs, customer ordering, JWT authentication, Google OAuth 2.0, and role-based access control.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Domain Model & Database Schema](#domain-model--database-schema)
5. [Modules](#modules)
6. [Authentication & Authorization](#authentication--authorization)
7. [API Reference](#api-reference)
8. [Configuration](#configuration)
9. [Docker & Infrastructure](#docker--infrastructure)
10. [Testing](#testing)
11. [Architectural Decisions & Tradeoffs](#architectural-decisions--tradeoffs)
12. [Known Gaps & Future Improvements](#known-gaps--future-improvements)
13. [Getting Started](#getting-started)

---

## Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | NestJS | 11.x | Modular, decorator-driven Node.js framework |
| Language | TypeScript | 5.x | Compiled to CommonJS (ES2021 target) |
| Database | PostgreSQL | 13 | Production; SQLite via `better-sqlite3` for local dev |
| ORM | Prisma | 6.x | Type-safe queries, migrations, Studio |
| Auth — Local | JWT + Passport | — | `passport-jwt`, `@nestjs/jwt` |
| Auth — OAuth | Passport Google OAuth 2.0 | — | `passport-google-oauth20` |
| Validation | class-validator + class-transformer | — | Applied globally via `ValidationPipe` |
| API Docs | Swagger / OpenAPI | 11.x | Auto-generated at `/api/docs` |
| Password Hashing | bcrypt | 6.x | 10 salt rounds |
| Rate Limiting | @nestjs/throttler | 6.x | Dual-tier burst + medium protection |
| Security Headers | helmet | 8.x | XSS, HSTS, content sniffing, etc. |
| Testing | Jest + Supertest | — | Unit (`*.spec.ts`) and E2E (`*.e2e-spec.ts`) |
| Containerization | Docker | — | `node:20-slim` base image |
| Orchestration | Docker Compose | — | App + PostgreSQL services |

---

## Architecture Overview

The application follows a **modular layered architecture** consistent with NestJS conventions. Each domain is encapsulated in its own feature module, with clear boundaries between transport (controllers), business logic (services), and data access (Prisma).

```
┌──────────────────────────────────────────────────────────────────────┐
│                          HTTP Clients                                │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────────┐
│                     NestJS HTTP Pipeline                              │
│  Helmet (headers) → ThrottlerGuard → Guards → Pipes → Controller     │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────────┐
│                     Feature Modules                                   │
│   Auth | Users | Restaurants | Categories | Products | Orders | Health│
└────────────────────────────┬─────────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────────┐
│                  PrismaService (Global Module)                        │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────────┐
│              PostgreSQL (Docker) / SQLite (local dev)                 │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Principles

- **Module isolation**: Each business domain owns its controllers, services, and DTOs.
- **Global infrastructure**: `PrismaModule` and `ConfigModule` are marked `@Global()`, available everywhere without re-importing.
- **Ownership-based authorization**: In addition to role checks, service methods verify the requesting user owns the resource before mutation.
- **Stateless API**: All state is in the database. JWTs are self-contained (no server-side session store).

---

## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env                          # Local dev env vars (git-ignored)
├── prisma.config.ts              # Prisma config with dotenv
├── jest.config.js                # Unit test config
├── jest-e2e.json                 # E2E test config
├── tsconfig.json
├── package.json
├── REQUEST_PAYLOADS.md           # API usage examples
├── prisma/
│   ├── schema.prisma             # Data model + provider config
│   ├── dev.db                    # SQLite local dev database (git-ignored)
│   └── migrations/
│       ├── 20260327183411_init/
│       └── 20260329183114_update_monetary_fields/
├── src/
│   ├── main.ts                   # Bootstrap: Helmet, CORS, Swagger, pipes
│   ├── app.module.ts             # Root module: imports all feature modules
│   ├── database.module.ts        # Unused legacy provider (see tradeoffs)
│   ├── database.providers.ts     # Unused legacy provider
│   ├── config/
│   │   └── configuration.ts      # Typed config factory
│   ├── prisma/
│   │   ├── prisma.module.ts      # @Global() module
│   │   └── prisma.service.ts     # PrismaClient wrapper with lifecycle hooks
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts   # @CurrentUser() param decorator
│   │   │   └── roles.decorator.ts          # @Roles() metadata decorator
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts    # Error normalizer (not globally registered)
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts           # Extends AuthGuard('jwt')
│   │       └── roles.guard.ts             # Reads @Roles() metadata
│   └── modules/
│       ├── auth/
│       │   ├── auth.controller.ts
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts
│       │   ├── dto/
│       │   │   ├── login.dto.ts
│       │   │   └── register.dto.ts
│       │   └── strategies/
│       │       ├── jwt.strategy.ts
│       │       └── google.strategy.ts
│       ├── users/
│       ├── restaurants/
│       ├── categories/
│       ├── products/
│       ├── orders/
│       └── health/
└── test/
    └── app.e2e-spec.ts
```

---

## Domain Model & Database Schema

### Entity Relationship Diagram

```
User ──────────────────< Restaurant
User ──────────────────< Order

Restaurant ────────────< Category
Restaurant ────────────< Order

Category ──────────────< Product    (CASCADE DELETE)

Product ───────────────< OrderItem
Order ─────────────────< OrderItem  (CASCADE DELETE)
```

### Models

#### `User`
| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (UUID) | PK |
| `email` | String | UNIQUE, NOT NULL |
| `password` | String? | Nullable — OAuth users have no password |
| `name` | String | NOT NULL |
| `role` | `Role` enum | Default: `CUSTOMER` |
| `googleId` | String? | UNIQUE, nullable |
| `avatar` | String? | URL |
| `createdAt` | DateTime | auto-set |
| `updatedAt` | DateTime | auto-updated |

#### `Restaurant`
| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (UUID) | PK |
| `name` | String | NOT NULL |
| `description` | String? | |
| `address` | String | NOT NULL |
| `imageUrl` | String? | |
| `userId` | String | FK → User |
| `createdAt` | DateTime | auto-set |
| `updatedAt` | DateTime | auto-updated |

#### `Category`
| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (UUID) | PK |
| `name` | String | NOT NULL |
| `restaurantId` | String | FK → Restaurant (CASCADE DELETE) |

#### `Product`
| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (UUID) | PK |
| `name` | String | NOT NULL |
| `description` | String? | |
| `price` | Int | Stored as **integer cents** |
| `imageUrl` | String? | |
| `categoryId` | String | FK → Category (CASCADE DELETE) |

#### `Order`
| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (UUID) | PK |
| `userId` | String | FK → User |
| `restaurantId` | String | FK → Restaurant |
| `status` | `OrderStatus` enum | Default: `PENDING` |
| `total` | Int | Stored as **integer cents** |
| `createdAt` | DateTime | auto-set |
| `updatedAt` | DateTime | auto-updated |

#### `OrderItem`
| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (UUID) | PK |
| `orderId` | String | FK → Order (CASCADE DELETE) |
| `productId` | String | FK → Product |
| `quantity` | Int | NOT NULL |
| `price` | Int | **Price snapshot at order time** |

### Enums

```typescript
enum Role           { CUSTOMER, RESTAURANT_OWNER, ADMIN }
enum OrderStatus    { PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED }
```

### Migration History

| Migration | Changes |
|-----------|---------|
| `20260327183411_init` | Creates all tables with `REAL` (float) for monetary fields |
| `20260329183114_update_monetary_fields` | Alters `Product.price`, `Order.total`, `OrderItem.price` from `Float` → `Int` (integer cents) |

---

## Modules

### Auth Module

Handles identity: registration, local login, Google OAuth, and current-user lookup.

**Endpoints**: `POST /auth/register`, `POST /auth/login`, `GET /auth/google`, `GET /auth/google/callback`, `GET /auth/me`

**Registration flow**: hash password with bcrypt (10 rounds) → create `User` record → return signed JWT.

**Login flow**: look up user by email → compare bcrypt hash → return JWT on success.

**Google OAuth flow**:
1. Redirect to Google consent screen.
2. On callback, upsert user: match by `googleId` → match by `email` (link account) → create new user.
3. Sign JWT, redirect to `http://localhost:3001/auth/callback?token=<jwt>`.

---

### Users Module

CRUD over user profiles. All routes require `JwtAuthGuard`. Passwords are never returned — all Prisma queries use field-level `select` to whitelist safe columns.

Notable: the `/users` listing has no role restriction — any authenticated user can retrieve any other user profile. This is an intentional MVP simplification.

---

### Restaurants Module

Manages restaurant entities. Public reads; authenticated writes with ownership enforcement.

- `GET /restaurants` — returns full graph: restaurant + categories + products + owner info.
- `GET /restaurants/:id/menu` — lightweight menu view (categories with nested products).
- Write operations (`POST`, `PATCH`, `DELETE`) verify the JWT user matches `restaurant.userId`.
- `POST /restaurants` requires `RESTAURANT_OWNER` or `ADMIN` role via `RolesGuard`.

---

### Categories Module

Product categories scoped to a restaurant, nested under `/restaurants/:restaurantId/categories`.

All mutation methods verify the requesting user owns the parent restaurant before proceeding.

---

### Products Module

Products scoped to a category, nested under `/categories/:categoryId/products`.

Ownership verification traverses the chain: `product → category → restaurant → user`.

---

### Orders Module

Customer order placement and lifecycle management.

**Order creation**:
1. Validate all `productId`s belong to `restaurantId`.
2. Fetch current product prices.
3. Snapshot each price into `OrderItem.price`.
4. Calculate total.
5. Persist `Order` + all `OrderItem` rows inside a `prisma.$transaction()`.

**Order listing** (`GET /orders`):
- `ADMIN`: sees all orders.
- `RESTAURANT_OWNER`: sees orders placed at their restaurants.
- `CUSTOMER`: sees their own orders.
- Paginated: `?page=1&limit=20`.

**Status updates** (`PATCH /orders/:id/status`): restricted to `RESTAURANT_OWNER` and `ADMIN`.

---

### Health Module

`GET /health` — no authentication required. Runs a raw `SELECT 1` via `prisma.$queryRaw` and returns:

```json
{ "status": "ok", "timestamp": "...", "database": "connected" }
```

---

## Authentication & Authorization

### JWT Strategy

- Tokens are extracted from `Authorization: Bearer <token>`.
- Payload: `{ sub: userId, email }`.
- Default expiry: `7d`.
- On each request, the strategy fetches the user from the DB and attaches `{ id, email, name, role }` to `req.user`.

### Google OAuth 2.0 Strategy

- Scopes: `email`, `profile`.
- Account linking: if a Google account's email matches an existing local account, the `googleId` and `avatar` are linked to that account automatically.
- The frontend callback URL is currently hardcoded to `http://localhost:3001/auth/callback` in `auth.controller.ts`. This should be driven by an environment variable in production.

### Guards

| Guard | Behavior |
|-------|----------|
| `JwtAuthGuard` | Extends `AuthGuard('jwt')`. Throws `UnauthorizedException('Invalid or expired token')` if no user is resolved. |
| `RolesGuard` | Reads `@Roles()` metadata via `Reflector`. Passes if no roles declared; otherwise requires `user.role` to match one of the declared roles. Must be used after `JwtAuthGuard`. |

### Custom Decorators

```typescript
@CurrentUser()           // returns full req.user object
@CurrentUser('id')       // returns req.user.id
@CurrentUser('role')     // returns req.user.role
@Roles(Role.ADMIN)       // sets roles metadata for RolesGuard
```

### Rate Limiting

Two tiers are configured in `AppModule`:

| Tier | Window | Limit |
|------|--------|-------|
| `short` | 1 second | 3 requests |
| `medium` | 10 seconds | 20 requests |

---

## API Reference

Interactive docs are available at `http://localhost:3000/api/docs` (Swagger UI with Bearer auth support).

### Auth

| Method | Path | Auth | Roles | Description |
|--------|------|------|-------|-------------|
| POST | `/auth/register` | — | — | Register a new user |
| POST | `/auth/login` | — | — | Login and receive a JWT |
| GET | `/auth/google` | — | — | Initiate Google OAuth |
| GET | `/auth/google/callback` | — | — | OAuth callback (redirects with token) |
| GET | `/auth/me` | JWT | — | Get the currently authenticated user |

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users` | JWT | List all users |
| GET | `/users/me` | JWT | Get own profile |
| PATCH | `/users/me` | JWT | Update own profile |
| GET | `/users/:id` | JWT | Get user by ID |
| PATCH | `/users/:id` | JWT | Update user by ID |
| DELETE | `/users/:id` | JWT | Delete user by ID |

### Restaurants

| Method | Path | Auth | Roles | Description |
|--------|------|------|-------|-------------|
| GET | `/restaurants` | — | — | List all restaurants |
| GET | `/restaurants/:id` | — | — | Get restaurant by ID |
| GET | `/restaurants/:id/menu` | — | — | Get menu (categories + products) |
| POST | `/restaurants` | JWT | RESTAURANT_OWNER, ADMIN | Create a restaurant |
| PATCH | `/restaurants/:id` | JWT | — | Update restaurant (owner only) |
| DELETE | `/restaurants/:id` | JWT | — | Delete restaurant (owner only) |

### Categories

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/restaurants/:restaurantId/categories` | JWT | List categories |
| POST | `/restaurants/:restaurantId/categories` | JWT | Create category (owner only) |
| GET | `/restaurants/:restaurantId/categories/:id` | JWT | Get category by ID |
| PATCH | `/restaurants/:restaurantId/categories/:id` | JWT | Update category (owner only) |
| DELETE | `/restaurants/:restaurantId/categories/:id` | JWT | Delete category (owner only) |

### Products

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/categories/:categoryId/products` | JWT | List products |
| POST | `/categories/:categoryId/products` | JWT | Create product (owner only) |
| GET | `/categories/:categoryId/products/:id` | JWT | Get product by ID |
| PATCH | `/categories/:categoryId/products/:id` | JWT | Update product (owner only) |
| DELETE | `/categories/:categoryId/products/:id` | JWT | Delete product (owner only) |

### Orders

| Method | Path | Auth | Roles | Description |
|--------|------|------|-------|-------------|
| GET | `/orders` | JWT | — | List orders (role-filtered, paginated) |
| POST | `/orders` | JWT | — | Create order |
| GET | `/orders/:id` | JWT | — | Get order (access-controlled) |
| PATCH | `/orders/:id/status` | JWT | RESTAURANT_OWNER, ADMIN | Update order status |

Query params for `GET /orders`: `?page=1&limit=20`

### Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | — | Database connectivity probe |

---

## Configuration

All configuration is loaded via `ConfigModule.forRoot()` using the typed factory in `src/config/configuration.ts`.

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP listening port |
| `DATABASE_URL` | — | Prisma connection string |
| `JWT_SECRET` | `default-secret` | JWT signing key — **must be overridden in production** |
| `JWT_EXPIRES_IN` | `7d` | Token TTL |
| `GOOGLE_CLIENT_ID` | — | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | — | Google OAuth app client secret |
| `GOOGLE_CALLBACK_URL` | — | OAuth redirect URI |

For local development (without Docker), create a `.env` file:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-local-secret"
JWT_EXPIRES_IN="7d"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
PORT=3000
```

Docker Compose injects `DATABASE_URL` pointing at the `db` service automatically — no `.env` file needed when running via Docker.

---

## Docker & Infrastructure

### Dockerfile

```dockerfile
FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate    # Generates the Prisma client
RUN npm run build          # Compiles TypeScript → dist/
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Docker Compose

Two services:

| Service | Image | Port | Notes |
|---------|-------|------|-------|
| `api` | Built from `Dockerfile` | `3000:3000` | Runs `prisma migrate deploy` before start |
| `db` | `postgres:13` | `5432:5432` | Data persisted in named volume `postgres_data` |

The `api` service uses a `command` override to run migrations atomically before starting the app:

```yaml
command: sh -c "npx prisma migrate deploy && npm start"
```

This ensures the schema is always in sync with the running application on every container start.

### Running

```bash
docker-compose up --build
```

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`
- PostgreSQL: `localhost:5432`

---

## Testing

### Unit Tests

Located alongside the source files as `*.spec.ts`. Each module's service has a corresponding spec file.

```bash
npm test
# or with coverage
npm test -- --coverage
```

> **Note**: The unit test files instantiate `PrismaService` directly without mocking. This means they require a live database connection to pass fully. The recommended improvement is to use `jest.mock` or a test database.

### E2E Tests

Located in `test/app.e2e-spec.ts`. Boots the full `AppModule` and tests against a live application.

```bash
npm run test:e2e
```

> Requires the application to be running (via `docker-compose up`) because it targets a live PostgreSQL database.

Currently, E2E coverage is limited to `GET /health`. Expanding this to cover the auth and order flows would significantly improve confidence.

---

## Architectural Decisions & Tradeoffs

### Prisma as ORM

**Decision**: Use Prisma instead of TypeORM or MikroORM.

**Rationale**: Prisma provides type-safe query building via generated client code, an explicit migration system with SQL visibility, and a schema-first workflow. The `schema.prisma` file serves as a single source of truth for the data model.

**Tradeoff**: Prisma's generated client is not a standard repository pattern — services access `this.prisma.user.findMany()` directly rather than through a repository abstraction. This couples services to Prisma. The benefit is reduced boilerplate; the cost is lower testability (harder to mock) and tighter ORM coupling.

---

### Ownership-Based Authorization in Services

**Decision**: Rather than encoding all authorization in guards/decorators at the controller level, mutation services (restaurants, categories, products, orders) perform ownership checks inside service methods.

**Rationale**: Ownership is a business rule, not purely an access control rule. Putting it in the service keeps the policy close to the data and avoids leaking domain logic into the HTTP layer.

**Tradeoff**: Authorization becomes implicit — it's not visible from the route declaration alone. A `PATCH /restaurants/:id` route with only `JwtAuthGuard` in the controller signature does not reveal that an ownership check happens in the service. This can surprise developers expecting all access control to be at the controller level.

---

### Integer Cents for Monetary Values

**Decision**: `Product.price`, `Order.total`, and `OrderItem.price` are stored as `Int` (integer cents), not `Float` or `Decimal`.

**Rationale**: Floating-point arithmetic is inherently imprecise for money. Storing as integer cents (or the smallest currency unit) eliminates rounding errors in calculations and comparisons.

**Tradeoff**: The API must document that monetary fields are in cents. Clients are responsible for converting to display values (e.g., dividing by 100 for USD). The current Swagger docs and DTOs do not explicitly call this out.

---

### Price Snapshotting in Orders

**Decision**: `OrderItem.price` captures the product price at order creation time.

**Rationale**: Product prices can change over time. An order must reflect the price agreed upon at purchase, not the current price. This is standard e-commerce behavior.

**Tradeoff**: Slightly more storage per order item. If a price correction is needed retroactively, it must be done at the `OrderItem` level, not the `Product` level.

---

### Dual Database Setup (SQLite dev / PostgreSQL prod)

**Decision**: Local development uses SQLite via `better-sqlite3`; Docker/production uses PostgreSQL 13.

**Rationale**: SQLite requires no external service for local development, lowering the barrier to entry.

**Tradeoff**: SQLite and PostgreSQL have different SQL dialects and feature sets. Migrations written against one may not behave identically on the other. The `migration_lock.toml` references `sqlite` as the provider, while `schema.prisma` declares `postgresql`. This inconsistency means migrations applied locally may not accurately reflect what runs in production. The recommended practice is to use a local PostgreSQL instance (e.g., via Docker) for development.

---

### Global PrismaModule

**Decision**: `PrismaModule` is decorated `@Global()`.

**Rationale**: The database client is needed by every feature module. Making it global avoids repetitive `imports: [PrismaModule]` in every feature module.

**Tradeoff**: Global modules reduce the explicitness of the dependency graph. It becomes harder to determine which modules depend on Prisma by reading their module definitions alone.

---

### Nested Resource Routing

**Decision**: Categories are nested under restaurants (`/restaurants/:restaurantId/categories`) and products under categories (`/categories/:categoryId/products`).

**Rationale**: Reflects the natural domain hierarchy and makes it clear that a category belongs to a restaurant and a product belongs to a category.

**Tradeoff**: The nesting is inconsistent — products skip the restaurant prefix and only include the category. Deeply nested routes can also become verbose. An alternative is a flat routing scheme with query parameters for filtering (`GET /products?categoryId=...`).

---

### Rate Limiting Strategy

**Decision**: Two throttle tiers — burst (3 req/s) and medium (20 req/10s) — applied globally.

**Rationale**: Burst protection prevents rapid-fire attacks. The medium tier catches sustained abuse that stays under the burst limit.

**Tradeoff**: The limits are fixed and apply uniformly to all endpoints. Public, read-heavy endpoints (like `GET /restaurants`) may need higher limits; sensitive endpoints (like `POST /auth/login`) may need stricter limits. Per-route throttle configuration is not currently applied.

---

## Known Gaps & Future Improvements

| Area | Issue | Recommendation |
|------|-------|----------------|
| **Authorization** | Any authenticated user can list, read, or modify any other user via `/users` | Add `RolesGuard` or ownership check to user endpoints |
| **Error handling** | `HttpExceptionFilter` is defined but not registered globally in `main.ts` | Call `app.useGlobalFilters(new HttpExceptionFilter())` in bootstrap |
| **Dead code** | `src/database.module.ts` and `src/database.providers.ts` are never imported | Remove or document their purpose |
| **Test coverage** | Unit tests use the real `PrismaService` (no mocking) | Introduce a test `PrismaService` mock or use `jest.mock` |
| **E2E coverage** | Only `GET /health` is covered | Add tests for auth, restaurant creation, ordering flow |
| **OAuth hardcoding** | Frontend callback URL is hardcoded to `localhost:3001` in `auth.controller.ts` | Drive from an environment variable |
| **Monetary display** | Integer cents are not documented in Swagger or DTOs | Add `@ApiProperty({ description: 'Amount in cents' })` to relevant fields |
| **CORS** | `origin: '*'` is permissive | Restrict to known frontend origins in production |
| **JWT secret fallback** | `jwt.strategy.ts` falls back to `'default-secret'` | Remove fallback; throw on missing secret at startup |
| **Structured logging** | No logging library configured | Integrate `pino` or NestJS built-in `Logger` with request correlation IDs |
| **Schema provider mismatch** | `schema.prisma` has `provider = "postgresql"` but `migration_lock.toml` shows `sqlite` | Use PostgreSQL locally (via Docker) and update the lock file |
| **Pagination** | Only orders are paginated | Apply pagination to restaurants and products listings |
| **Image storage** | `imageUrl` fields store raw strings with no upload handling | Integrate S3 or similar object storage for image uploads |

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose

### Run with Docker Compose

```bash
# Clone the repository
git clone https://github.com/samuelbaldasso/Node-Nest-Restaurant-Management.git
cd Node-Nest-Restaurant-Management

# Build and start the API + PostgreSQL
docker-compose up --build
```

The startup sequence:
1. PostgreSQL container starts.
2. API container builds, generates the Prisma client, and compiles TypeScript.
3. On start, `prisma migrate deploy` applies any pending migrations.
4. The API begins listening on port `3000`.

| Endpoint | URL |
|----------|-----|
| API | `http://localhost:3000` |
| Swagger UI | `http://localhost:3000/api/docs` |
| Health check | `http://localhost:3000/health` |

### Local Development (without Docker)

```bash
npm install

# Configure environment
cp .env.example .env   # or create .env manually (see Configuration section)

# Apply migrations (requires DATABASE_URL to be set)
npx prisma migrate dev

# Start in watch mode
npm run start:dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start with `ts-node` in watch mode |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled output |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run prisma:generate` | Re-generate Prisma client after schema changes |
| `npm run prisma:migrate` | Create and apply a new migration |
| `npm run prisma:studio` | Open Prisma Studio (visual DB browser) |

---

## License

ISC
