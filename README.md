# Finance Dashboard Backend

This project uses a feature-based modular backend architecture with Express and MongoDB.

## Architecture

The backend is organized by feature inside [`backend/src`](/Users/bbox/Finance%20Backend/finance-dashboard/backend/src):

- `modules/auth`
- `modules/users`
- `modules/records`
- `modules/dashboard`
- `middleware`
- `config`
- `utils`
- `app.js`

Each module follows the same structure:

- `*.model.js` for MongoDB schema definitions
- `*.service.js` for business logic
- `*.controller.js` for request/response handling
- `*.routes.js` for route registration

## Modules

### Auth

Handles:

- user registration
- login
- password hashing with `bcrypt`
- JWT generation
- current user lookup with token auth

### Users

Handles:

- admin-only user creation
- admin-only user listing
- admin-only role and status updates

### Records

Handles:

- record creation
- record listing
- filtering by `type`, `category`, and `date`
- pagination with `page` and `limit`
- record update
- record delete

### Dashboard

Handles analytics using MongoDB aggregation:

- summary totals
- category aggregation
- monthly trends

## Middleware

### `verifyToken`

- validates JWT
- loads the current user
- attaches the user to `req.user`

### `authorizeRoles(...roles)`

- restricts access by user role
- returns `403` for unauthorized roles

## Role System

Supported roles:

- `viewer`
- `analyst`
- `admin`

Supported statuses:

- `active`
- `inactive`

Admin-only routes use both:

- `verifyToken`
- `authorizeRoles("admin")`

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

### System

- `GET /`
- `GET /api/health`

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
