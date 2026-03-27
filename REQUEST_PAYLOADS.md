# API Request Payloads

## Auth Controller

### Register User
```json
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

### Login
```json
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Users Controller

### Update User Profile
```json
PATCH /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

## Restaurants Controller

### Create Restaurant (Requires RESTAURANT_OWNER or ADMIN role)
```json
POST /restaurants
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Burger King",
  "description": "Best burgers in town",
  "address": "123 Main Street, New York, NY",
  "imageUrl": "https://example.com/burger-king.jpg"
}
```

### Update Restaurant
```json
PATCH /restaurants/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Burger King Updated",
  "description": "Now with more burgers!",
  "address": "456 New Street, New York, NY",
  "imageUrl": "https://example.com/bk-new.jpg"
}
```

---

## Categories Controller

### Create Category
```json
POST /restaurants/:restaurantId/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Burgers"
}
```

### Update Category
```json
PATCH /restaurants/:restaurantId/categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Premium Burgers"
}
```

---

## Products Controller

### Create Product
```json
POST /categories/:categoryId/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Whopper",
  "description": "Flame-grilled beef burger with fresh vegetables",
  "price": 29.90,
  "imageUrl": "https://example.com/whopper.jpg"
}
```

### Update Product
```json
PATCH /categories/:categoryId/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Whopper Deluxe",
  "description": "Flame-grilled beef burger with premium ingredients",
  "price": 34.90,
  "imageUrl": "https://example.com/whopper-deluxe.jpg"
}
```

---

## Orders Controller

### Create Order
```json
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurantId": "restaurant-uuid-here",
  "items": [
    {
      "productId": "product-uuid-1",
      "quantity": 2
    },
    {
      "productId": "product-uuid-2",
      "quantity": 1
    }
  ]
}
```

### Update Order Status (Restaurant Owner only)
```json
PATCH /orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "CONFIRMED"
}
```

**Available Status Values:**
- `PENDING`
- `CONFIRMED`
- `PREPARING`
- `READY`
- `DELIVERED`
- `CANCELLED`

---

## Example Flow

### 1. Register a Restaurant Owner
```json
POST /auth/register
{
  "name": "Restaurant Owner",
  "email": "owner@example.com",
  "password": "password123",
  "role": "RESTAURANT_OWNER"
}
```

### 2. Login to Get Token
```json
POST /auth/login
{
  "email": "owner@example.com",
  "password": "password123"
}
```

### 3. Create a Restaurant
```json
POST /restaurants
Authorization: Bearer <token>
{
  "name": "My Restaurant",
  "description": "Great food",
  "address": "123 Food Street"
}
```

### 4. Create Categories
```json
POST /restaurants/:restaurantId/categories
Authorization: Bearer <token>
{ "name": "Burgers" }

POST /restaurants/:restaurantId/categories
Authorization: Bearer <token>
{ "name": "Drinks" }
```

### 5. Create Products
```json
POST /categories/:categoryId/products
Authorization: Bearer <token>
{
  "name": "Classic Burger",
  "description": "Beef burger with cheese",
  "price": 15.90
}
```

### 6. Register a Customer
```json
POST /auth/register
{
  "name": "Customer Jane",
  "email": "jane@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

### 7. Customer Creates Order
```json
POST /orders
Authorization: Bearer <customer_token>
{
  "restaurantId": "restaurant-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "quantity": 2
    }
  ]
}
```

### 8. Restaurant Owner Updates Order Status
```json
PATCH /orders/:orderId/status
Authorization: Bearer <owner_token>
{
  "status": "CONFIRMED"
}
```
