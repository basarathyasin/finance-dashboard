# Finance Dashboard System

This project is a finance dashboard with:

- a modular Express + MongoDB backend in [`backend`](/Users/bbox/Finance%20Backend/finance-dashboard/backend)
- a React frontend in [`frontend`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend)

The main goal of the backend is to show clean structure, role-based access control, records management, and summary analytics for a dashboard use case.

## Backend Architecture

Backend source lives in [`backend/src`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src) and follows a feature-based modular structure:

- [`backend/src/modules/auth`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/modules/auth)
- [`backend/src/modules/users`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/modules/users)
- [`backend/src/modules/records`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/modules/records)
- [`backend/src/modules/dashboard`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/modules/dashboard)
- [`backend/src/middleware`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/middleware)
- [`backend/src/config`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/config)
- [`backend/src/utils`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src/utils)

Each module is split into:

- `*.model.js` for schema definition
- `*.service.js` for business logic and database work
- `*.controller.js` for request/response handling
- `*.routes.js` for route definitions

This separation keeps route handlers small and makes the business rules easier to follow.

## Backend Setup

Run the backend:

```bash
cd backend
npm install
npm start
```

Required environment variables in [`backend/.env`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/.env):

```env
PORT=8008
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## Frontend Setup

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:8008/api
```

## Core Backend Features

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Features:

- password hashing with `bcrypt`
- JWT authentication with `jsonwebtoken`
- `verifyToken` middleware for protected routes
- inactive users are blocked from protected routes

### User Management

- `POST /api/users`
- `GET /api/users`
- `PATCH /api/users/:id`

Features:

- admin-only user creation
- admin-only role updates
- admin-only status updates
- self-protection rule to prevent an admin from changing their own role or deactivating their own account

### Records

- `POST /api/records`
- `GET /api/records`
- `PATCH /api/records/:id`
- `DELETE /api/records/:id`

Features:

- record ownership through `createdBy`
- filters for `type`, `category`, and `date`
- pagination with `page` and `limit`
- role-based access:
  - `analyst` and `admin` can read records
  - only `admin` can create, update, or delete records

### Dashboard Analytics

- `GET /api/dashboard/summary`
- `GET /api/dashboard/categories`
- `GET /api/dashboard/trends`

Features:

- total income
- total expense
- net balance
- category aggregation
- monthly trends

MongoDB aggregation is used with `$match`, `$group`, and `$sum`.

## Role Model

Supported roles:

- `viewer`
- `analyst`
- `admin`

Supported status values:

- `active`
- `inactive`

Current access rules:

- `viewer` can access dashboard endpoints only
- `analyst` can access dashboard endpoints and read records
- `admin` can access dashboard endpoints, manage records, and manage users

## Business Rules And Assumptions

- the first public registration creates the initial `admin`
- after the first user is created, public registration is closed
- additional users are expected to be created by an admin from the users module
- records are user-owned through `createdBy`
- dashboard analytics are scoped to the logged-in user’s records
- this project is designed for assessment/demo use, not as a production-ready finance system

## Validation And Error Handling

The backend includes:

- required field validation
- enum validation for `role`, `status`, and record `type`
- ObjectId validation for update/delete endpoints
- number and date validation
- centralized error handling middleware
- consistent JSON response format

Success response example:

```json
{
  "success": true,
  "message": "Records fetched successfully",
  "data": {}
}
```

Error response example:

```json
{
  "success": false,
  "message": "Route not found"
}
```

## Tradeoffs

This backend intentionally stays simple:

- JWTs are stateless and there is no refresh-token flow
- records are physically deleted instead of using soft delete
- validation is handwritten instead of using a schema library like Joi or Zod
- the analytics layer is simple and built directly on MongoDB aggregation
- the project favors readability and clear structure over production-grade completeness

These tradeoffs were chosen to keep the code understandable for an intern-level backend assignment while still demonstrating practical backend design.

## Frontend Notes

The frontend uses:

- React
- React Router
- Context API for auth state
- a centralized Fetch API wrapper in [`frontend/src/services/api.js`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend/src/services/api.js)

Frontend features include:

- login and first-user registration flow
- protected routes
- role-based UI rendering
- records management UI
- dashboard analytics UI
- admin-only user management UI
