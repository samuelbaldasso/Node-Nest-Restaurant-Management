# Restaurant API - iFood-like MVP

A NestJS backend for a food delivery platform similar to iFood/Deliveroo.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | NestJS | 11.x |
| Language | TypeScript | 6.x |
| Database | SQLite | - |
| ORM | Prisma | 6.x |
| Authentication | JWT + Passport | - |
| OAuth | Passport Google OAuth 2.0 | - |
| Validation | class-validator + class-transformer | - |
| API Docs | Swagger/OpenAPI | - |
| Password Hashing | bcrypt | 6.x |
| Rate Limiting | @nestjs/throttler | - |
| Security Headers | helmet | - |
| Testing | Jest | 30.x |

## Architecture

### Project Structure (Layer-based)

```
src/
├── main.ts                          # Application bootstrap
├── app.module.ts                    # Root module
├── prisma/
│   ├── prisma.module.ts            # Global database module
│   └── prisma.service.ts           # Prisma client wrapper
├── config/
│   └── configuration.ts            # Environment configuration
├── common/                          # Shared resources
│   ├── decorators/
│   │   ├── current-user.decorator.ts  # Extract current user
│   │   └── roles.decorator.ts         # Role-based access
│   ├── guards/
│   │   ├── jwt-auth.guard.ts          # JWT authentication
│   │   └── roles.guard.ts             # Role verification
│   └── filters/
│       └── http-exception.filter.ts   # Global error handling
└── modules/                          # Feature modules
    ├── auth/                         # Authentication (JWT + Google)
    ├── users/                         # User management
    ├── restaurants/                   # Restaurant CRUD
    ├── categories/                    # Menu categories
    ├── products/                      # Menu products
    ├── orders/                        # Order management
    └── health/                       # Health check
```

### Design Patterns Used

1. **Module Pattern**: Each feature is encapsulated in its own module
2. **Repository Pattern**: Prisma Service acts as repository for database operations
3. **DTO Pattern**: Data Transfer Objects for input validation
4. **Guard Pattern**: Authentication and authorization guards
5. **Decorator Pattern**: Custom decorators for extracting current user and roles

### Engineering Best Practices Implemented

1. **Database Performance**
   - N+1 query prevention: Products fetched in single query using `findMany({ in: [...] })`
   - Pagination: All list endpoints support `page`/`limit` parameters
   - ACID Transactions: Order creation wrapped in `$transaction`

2. **Data Integrity**
   - Monetary values stored as integers (cents) to avoid floating-point precision issues
   - Proper validation of product ownership via `category.restaurantId`

3. **Security**
   - Rate limiting with @nestjs/throttler (short & medium strategies)
   - Security headers via helmet middleware

4. **Code Quality**
   - Unit tests for critical business logic (OrdersService)
   - Type-safe queries with Prisma

## Database Schema

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    User     │       │  Restaurant  │       │   Order     │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ id          │       │ id           │       │ id          │
│ email       │◄──────│ userId       │◄──────│ userId      │
│ password    │       │ name         │       │ restaurantId│
│ name        │       │ description  │       │ status      │
│ role        │       │ address      │       │ total       │
│ googleId    │       │ imageUrl     │       │ createdAt   │
│ avatar      │       │ createdAt    │       └──────┬──────┘
│ createdAt   │       └──────┬───────┘              │
└─────────────┘              │                      │
              ┌───────────────┴───────────────┐      │
              │          Category             │      │
              ├──────────────────────────────┤      │
              │ id                           │      │
              │ name                         │      │
              │ restaurantId                 │      │
              └──────────────┬───────────────┘      │
                             │                      │
              ┌──────────────┴───────────────┐      │
              │         Product              │      │
              ├──────────────────────────────┤      │
              │ id                           │      │
              │ name                         │      │
              │ description                  │      │
              │ price                        │      │
              │ imageUrl                     │      │
              │ categoryId                   │      │
              └──────────────┬───────────────┘      │
                             │                      │
              ┌──────────────┴───────────────┐      │
              │        OrderItem             │      │
              ├──────────────────────────────┤      │
              │ id                           │      │
              │ orderId                      │      │
              │ productId                    │      │
              │ quantity                     │      │
              │ price                        │      │
              └──────────────────────────────┘
```

## Trade-offs & Decisions

### 1. SQLite vs PostgreSQL

**Decision**: SQLite for development

**Rationale**:
- Zero configuration required
- No external database server needed
- Faster local development setup
- Suitable for MVP/demo purposes

**Trade-off**: Not suitable for production with high concurrency

### 2. Prisma ORM

**Decision**: Prisma 6.x

**Rationale**:
- Type-safe database queries
- Automatic migrations
- Easy schema management
- Good developer experience

**Trade-off**: Slightly slower than raw SQL queries

### 3. Monetary Values (Integer/Cents)

**Decision**: Store prices as integers (cents)

**Rationale**:
- Avoids floating-point precision issues (e.g., 0.1 + 0.2 !== 0.3)
- Industry standard for financial systems
- Works seamlessly with SQLite

**Trade-off**: Display requires division by 100

### 4. JWT Authentication

**Decision**: JWT with local storage

**Rationale**:
- Stateless authentication
- Easy to implement
- Works well with mobile APIs
- No session management needed

**Trade-off**: Token invalidation is challenging (requires token blacklist or short expiry)

### 5. Google OAuth

**Decision**: Passport.js with Google OAuth 2.0

**Rationale**:
- Industry standard for social login
- Reduces friction for user registration
- Secure authentication

**Trade-off**: Requires Google Cloud Console setup

### 6. Layer-based vs Feature-based Architecture

**Decision**: Layer-based

**Rationale**:
- Clear separation of concerns
- Easier to understand for teams new to NestJS
- Consistent pattern across modules

**Trade-off**: May lead to larger modules as application grows

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register with email/password | No |
| POST | /auth/login | Login with email/password | No |
| GET | /auth/google | Initiate Google OAuth | No |
| GET | /auth/google/callback | Google OAuth callback | No |
| GET | /auth/me | Get current user | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /users | List all users | Yes |
| GET | /users/me | Get current user profile | Yes |
| PATCH | /users/me | Update current user | Yes |
| GET | /users/:id | Get user by ID | Yes |
| PATCH | /users/:id | Update user | Yes |
| DELETE | /users/:id | Delete user | Yes |

### Restaurants
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /restaurants | List all restaurants | No |
| GET | /restaurants/:id | Get restaurant | No |
| GET | /restaurants/:id/menu | Get restaurant menu | No |
| POST | /restaurants | Create restaurant | Yes* |
| PATCH | /restaurants/:id | Update restaurant | Yes |
| DELETE | /restaurants/:id | Delete restaurant | Yes |

*Requires RESTAURANT_OWNER or ADMIN role

### Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /restaurants/:id/categories | List categories | No |
| POST | /restaurants/:id/categories | Create category | Yes |
| PATCH | /restaurants/:id/categories/:id | Update category | Yes |
| DELETE | /restaurants/:id/categories/:id | Delete category | Yes |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /categories/:id/products | List products | No |
| POST | /categories/:id/products | Create product | Yes |
| PATCH | /categories/:id/products/:id | Update product | Yes |
| DELETE | /categories/:id/products/:id | Delete product | Yes |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /orders?page=1&limit=20 | List orders (paginated) | Yes |
| POST | /orders | Create order | Yes |
| GET | /orders/:id | Get order | Yes |
| PATCH | /orders/:id/status | Update order status | Yes* |

*Requires RESTAURANT_OWNER or ADMIN role

**Pagination Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### Health
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /health | Health check | No |

## User Roles

| Role | Description |
|------|-------------|
| CUSTOMER | Can browse restaurants, create orders |
| RESTAURANT_OWNER | Can manage their restaurants, categories, products, and orders |
| ADMIN | Full system access |

## Order Status Flow

```
PENDING → CONFIRMED → PREPARING → READY → DELIVERED
                         ↓
                     CANCELLED
```

## Getting Started

### Prerequisites

- Node.js 20.x+
- npm 10.x+

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
```

### Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start
```

The API will be available at `http://localhost:3000`

### Swagger Documentation

Access the interactive API docs at `http://localhost:3000/api/docs`

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API / People API
4. Create OAuth 2.0 credentials
5. Set authorized redirect URI to `http://localhost:3000/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

- **OrdersService**: 15 unit tests covering:
  - Pagination logic
  - Order creation with validation
  - Product/restaurant validation
  - Transaction handling
  - Authorization checks
  - Status updates

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run start:dev` | Start development server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio |

## Production Considerations

1. **Database**: Switch to PostgreSQL for production
2. **JWT Secret**: Use a strong, random secret
3. **HTTPS**: Enable SSL/TLS
4. **Rate Limiting**: Already implemented with @nestjs/throttler
5. **Logging**: Implement structured logging (e.g., nestjs-pino, winston)
6. **CORS**: Restrict CORS origins
7. **Environment Variables**: Use proper secret management
8. **Security Headers**: Already implemented with helmet
9. **Decimal Precision**: Already implemented (Int for cents)

## Future Improvements

- [x] Pagination for list endpoints
- [ ] File upload for images (restaurant/product images)
- [ ] Email notifications
- [ ] Real-time order status updates (WebSockets)
- [ ] Payment integration (Stripe, Mercado Pago)
- [ ] Review/Rating system
- [ ] Search functionality with filters
- [ ] Analytics dashboard for restaurants
- [ ] Structured logging (nestjs-pino/winston)
- [ ] E2E tests

## License

ISC
