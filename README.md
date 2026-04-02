# Finance Dashboard System

This repository contains a full-stack finance dashboard system:

- `backend` for the Express + MongoDB API
- `frontend` for the React application

## Project Structure

### Backend

The backend uses a feature-based modular structure inside [`backend/src`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src):

- `modules/auth`
- `modules/users`
- `modules/records`
- `modules/dashboard`
- `middleware`
- `config`
- `utils`
- `app.js`

Each backend module follows:

- `*.model.js`
- `*.service.js`
- `*.controller.js`
- `*.routes.js`

### Frontend

The frontend uses a feature-based React structure inside [`frontend/src`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend/src):

- `modules/auth`
- `modules/dashboard`
- `modules/records`
- `modules/users`
- `components`
- `services`
- `hooks`
- `utils`
- `layouts`
- `App.jsx`

Each frontend module contains focused pages, components, and hooks where needed.

## Frontend Setup

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Optional environment variable:

```bash
VITE_API_BASE_URL=http://localhost:8008/api
```

If `VITE_API_BASE_URL` is not set, the frontend defaults to:

```bash
http://localhost:8008/api
```

## Backend Setup

Run the backend:

```bash
cd backend
npm install
npm start
```

Required backend environment variables in [`backend/.env`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/.env):

```env
PORT=8008
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Frontend Features

Current frontend features:

- authentication with login and register pages
- JWT persistence with `localStorage`
- protected routes for authenticated users
- role-based route access for admin users
- sidebar layout with topbar user info
- records CRUD UI
- dashboard analytics UI
- admin-only users management UI
- loading, error, and empty states

## API Usage

All frontend API requests go through the centralized fetch wrapper in [`frontend/src/services/api.js`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend/src/services/api.js).

It handles:

- API base URL
- JSON headers
- automatic JWT attachment
- JSON parsing
- global non-2xx error handling
- unauthorized-session handling

Additional feature services:

- [`frontend/src/services/dashboard.js`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend/src/services/dashboard.js)
- [`frontend/src/services/records.js`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend/src/services/records.js)
- [`frontend/src/services/users.js`](/Users/bbox/Finance%20Backend/finance-dashboard/frontend/src/services/users.js)

## Backend Features

### Auth

- register
- login
- JWT authentication
- password hashing with `bcrypt`
- current user lookup

### Users

- admin-only user listing
- admin-only role updates
- admin-only activate/deactivate control

### Records

- create record
- list records
- filter by `type`, `category`, and `date`
- pagination with `page` and `limit`
- update record
- delete record

### Dashboard

- total income
- total expense
- net balance
- category aggregation
- monthly trends

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `POST /api/users`
- `GET /api/users`
- `PATCH /api/users/:id`

### Records

- `POST /api/records`
- `GET /api/records`
- `PATCH /api/records/:id`
- `DELETE /api/records/:id`

Query params for `GET /api/records`:

- `type`
- `category`
- `date`
- `page`
- `limit`

### Dashboard

- `GET /api/dashboard/summary`
- `GET /api/dashboard/categories`
- `GET /api/dashboard/trends`

## Role System

Supported roles:

- `viewer`
- `analyst`
- `admin`

Supported statuses:

- `active`
- `inactive`

Frontend route access:

- `/dashboard` for authenticated users
- `/records` for authenticated users
- `/users` for admin users only

Backend admin routes use:

- `verifyToken`
- `authorizeRoles("admin")`

## Response Format

Successful responses:

```json
{
  "success": true,
  "message": "Records fetched successfully",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Route not found"
}
```
