# User Management Design Document

## Project

NexusOne Platform

## Version

1.0

## Status

Sprint 4 - User Management


# 1. Purpose

The User Management module allows authorized users to manage users within their tenant.

All user operations must respect tenant isolation and RBAC authorization.


# 2. User Management Flow

Authenticated User

↓

Identify Tenant

↓

Check Role / Permission

↓

Validate Target User

↓

Perform Action

↓

Return Response


# 3. Features

## Get Tenant Users

Authorized users can retrieve users belonging to their tenant.

Users from other tenants must never be returned.


## Create User

Authorized users can create a new user inside their tenant.

Required information:

- Name
- Email
- Role
- Tenant ID


## Update User Role

The Owner can update the role of a user within the same tenant.

Allowed roles:

- Admin
- Manager
- Employee


## Remove User

The Owner can remove a user from the tenant.

The Owner cannot remove themselves through this endpoint.


# 4. Authorization Rules

| Action | Owner | Admin | Manager | Employee |
|--------|-------|-------|---------|----------|
| View Users | Yes | Yes | No | No |
| Create User | Yes | Yes | No | No |
| Update User Role | Yes | No | No | No |
| Remove User | Yes | No | No | No |


# 5. Tenant Isolation

Every user management operation must be restricted to the authenticated user's tenant.

The system must always verify:

- Authenticated user has a valid tenant ID.
- Target user belongs to the same tenant.
- Users cannot access users from another tenant.
- Users cannot modify users from another tenant.


# 6. Architecture

The module will follow the existing layered architecture.

Routes

↓

Authentication Middleware

↓

Authorization Middleware

↓

Controller

↓

Service

↓

User Model


# 7. Components

## User Model

Existing User model will be reused.

No duplicate user model will be created.


## User Service

File:

`userService.js`

Responsibilities:

- Get tenant users
- Create user
- Update user role
- Remove user


## User Controller

File:

`userController.js`

Responsibilities:

- Validate request
- Call user service
- Return API response


## User Routes

File:

`userRoutes.js`

Responsibilities:

- Define user management endpoints
- Apply authentication middleware
- Apply RBAC middleware


# 8. API Endpoints

## Get Users

GET `/api/users`

Required permission:

`user.view`


## Create User

POST `/api/users`

Required permission:

`user.create`


## Update User Role

PATCH `/api/users/:userId/role`

Owner only.


## Remove User

DELETE `/api/users/:userId`

Owner only.


# 9. Security Rules

- Authentication is required for all endpoints.
- Tenant isolation must be enforced at the service/database query level.
- Users cannot access another tenant's users.
- Users cannot modify another tenant's users.
- Owner cannot remove themselves.
- Invalid user IDs must return an appropriate error.
- Unauthorized requests return HTTP 403.
- Missing authentication returns HTTP 401.


# 10. Definition of Done

Sprint 4 is complete when:

- Tenant users can be listed.
- Authorized users can create users.
- Owner can update user roles.
- Owner can remove users.
- Tenant isolation is enforced.
- RBAC protection is applied.
- APIs are tested successfully.
- No cross-tenant access is possible.
- Changes are committed and pushed to Git.