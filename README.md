# ShopHub — Full-Stack E-Commerce Practice Project

## Stack
- **Frontend:** React + Vite + React Router + Axios
- **Backend:** Node.js + Express + MongoDB + Mongoose (yours to build!)

---

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev        # runs on http://localhost:5173
```

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on http://localhost:3000
```

---

## Backend API Contract

The frontend already calls these endpoints — you just need to implement them.

### Auth
| Method | Endpoint | Body | Returns |
|--------|----------|------|---------|
| POST | `/api/auth/register` | `{ name, email, password }` | `{ token, user }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user }` |
| GET  | `/api/auth/me` | — (Bearer token) | `{ user }` |

### Products
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET  | `/api/products` | Query: `search`, `category`, `sort`, `page`, `limit`, `minPrice`, `maxPrice` |
| GET  | `/api/products/:id` | Single product |
| POST | `/api/products` | Admin only |
| PUT  | `/api/products/:id` | Admin only |
| DELETE | `/api/products/:id` | Admin only |

**Response shape for GET /api/products:**
```json
{
  "products": [...],
  "total": 42,
  "totalPages": 6,
  "currentPage": 1
}
```

**Product object:**
```json
{
  "_id": "...",
  "name": "Nike Air Max",
  "description": "...",
  "price": 120.00,
  "stock": 50,
  "category": "Shoes",
  "image": "https://... or emoji",
  "createdAt": "..."
}
```

### Categories
| Method | Endpoint | Returns |
|--------|----------|---------|
| GET | `/api/categories` | `{ categories: [{ _id, name }] }` |
| POST | `/api/categories` | Admin only |

### Cart (requires auth)
| Method | Endpoint | Body | Notes |
|--------|----------|------|-------|
| GET    | `/api/cart` | — | `{ items: [{ product, quantity }] }` |
| POST   | `/api/cart` | `{ productId, quantity }` | Add item |
| PUT    | `/api/cart/:productId` | `{ quantity }` | Update qty |
| DELETE | `/api/cart/:productId` | — | Remove item |
| DELETE | `/api/cart` | — | Clear entire cart |

### Orders (requires auth)
| Method | Endpoint | Body | Notes |
|--------|----------|------|-------|
| POST | `/api/orders` | `{ shippingAddress, paymentMethod }` | Creates order from cart |
| GET  | `/api/orders/my` | — | `{ orders: [...] }` |
| GET  | `/api/orders/:id` | — | Single order |

**Order object:**
```json
{
  "_id": "...",
  "user": "userId",
  "items": [{ "product": {...}, "quantity": 2, "price": 120 }],
  "totalAmount": 240.00,
  "status": "pending | processing | shipped | delivered | cancelled",
  "shippingAddress": { "street", "city", "state", "zip", "country" },
  "paymentMethod": "card | mobile_money | cash_on_delivery",
  "createdAt": "..."
}
```

### Admin (requires auth + admin role)
| Method | Endpoint | Body |
|--------|----------|------|
| GET | `/api/admin/orders` | All orders |
| PUT | `/api/admin/orders/:id` | `{ status }` |

---

## MongoDB Models to Build

### User
```
name, email, password (hashed), role (user/admin), createdAt
```

### Product
```
name, description, price, stock, category, image, createdAt
```

### Category
```
name, createdAt
```

### Cart
```
user (ref), items: [{ product (ref), quantity }]
```

### Order
```
user (ref), items: [{ product (ref), quantity, price }],
totalAmount, status, shippingAddress, paymentMethod, createdAt
```

---

## Key Backend Concepts You'll Practice
1. **JWT Authentication** — register, login, protect routes with middleware
2. **Password hashing** — bcrypt
3. **Mongoose models & relationships** — refs, populate
4. **CRUD operations** — full product & order lifecycle
5. **Query parameters** — search, filter, sort, paginate
6. **Role-based access control** — admin vs user routes
7. **Cart logic** — upsert items, calculate totals
8. **Order creation** — snapshot prices, clear cart after order
