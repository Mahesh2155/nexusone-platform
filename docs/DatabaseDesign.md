# Database Design Document

## Project Name

NexusOne Platform

## Version

1.0

## Status

Sprint 0 - Planning & Architecture

# 1. Database Overview

NexusOne uses MongoDB as the primary database.

The database follows a multi-tenant architecture where multiple organizations share the same application infrastructure while maintaining complete data isolation.

Database:

- MongoDB Atlas
- ODM: Mongoose

# 2. Multi-Tenant Strategy fff

NexusOne uses:

## Shared Database + Shared Collections

All tenants use the same database collections.

Every business-related document contains:

tenantId

Example:

# json
{
  "name": "ABC Customer",
  "email": "customer@example.com",
  "tenantId": "tenant_123"
}

This ensures:

Data isolation
Simple scalability
Easy maintenance


# 3. Core Collections
## 3.1 Tenants Collection

Purpose:

Stores registered companies using NexusOne.

Example Structure:
{
  "_id": "ObjectId",
  "name": "ABC Ltd",
  "ownerEmail": "owner@abc.com",
  "plan": "free",
  "isActive": true,
  "createdAt": "Date",
  "updatedAt": "Date"
}

Fields:

| Field      | Type    | Description       |
| ---------- | ------- | ----------------- |
| name       | String  | Company name      |
| ownerEmail | String  | Owner email       |
| plan       | String  | Subscription plan |
| isActive   | Boolean | Account status    |


# 3.2 Users Collection

Purpose:

Stores employees and users.

Example:
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "hashedPassword",
  "roleId": "ObjectId",
  "tenantId": "ObjectId"
}

Fields:

| Field    | Type     | Description        |
| -------- | -------- | ------------------ |
| name     | String   | User name          |
| email    | String   | Login email        |
| password | String   | Encrypted password |
| roleId   | ObjectId | User role          |
| tenantId | ObjectId | Organization       |

# 3.3 Roles Collection

Purpose:

Defines user access levels.

Example:
{
  "name": "Manager",
  "permissions": [
    "create_customer",
    "update_customer"
  ]
}

# 3.4 Permissions Collection

Purpose:

Stores system permissions.

Example:
{
  "name": "create_customer",
  "description": "Allows customer creation"
}

# 3.5 Customers Collection

Purpose:

Stores business customers.

Example:
{
  "name": "XYZ Company",
  "email": "contact@xyz.com",
  "phone": "123456789",
  "tenantId": "ObjectId"
}

Fields:

| Field    | Type     |
| -------- | -------- |
| name     | String   |
| email    | String   |
| phone    | String   |
| company  | String   |
| status   | String   |
| tenantId | ObjectId |


# 3.6 Leads Collection

Purpose:

Stores potential customers.

Fields:
| Field      | Type     |
| ---------- | -------- |
| name       | String   |
| email      | String   |
| source     | String   |
| status     | String   |
| assignedTo | ObjectId |
| tenantId   | ObjectId |

# 3.7 Activities Collection

Purpose:

Stores customer interactions.

Examples:

Calls
Meetings
Notes
Emails

Fields:
| Field       | Type     |
| ----------- | -------- |
| type        | String   |
| description | String   |
| customerId  | ObjectId |
| createdBy   | ObjectId |
| tenantId    | ObjectId |


# 3.8 Tasks Collection

Purpose:

Employee task management.

Fields:
| Field       | Type     |
| ----------- | -------- |
| title       | String   |
| description | String   |
| assignedTo  | ObjectId |
| status      | String   |
| dueDate     | Date     |
| tenantId    | ObjectId |


# 3.9 Refresh Tokens Collection

Purpose:

Stores authentication refresh tokens.

Fields:
| Field     | Type     |
| --------- | -------- |
| userId    | ObjectId |
| token     | String   |
| expiresAt | Date     |


# 4. Database Relationships
Tenant

 |
 |---- Users

 |
 |---- Customers

 |
 |---- Leads

 |
 |---- Tasks

 |
 |---- Activities

# 5. Index Strategy

Important indexes:

Users:
email
tenantId

Customers:
tenantId
email

Leads:
tenantId
status

Purpose:

Faster searches
Better performance
Scalable queries

# 6. Data Security Rules

Every query must include:
tenantId

Example:

Correct:
Customer.find({
 tenantId:user.tenantId
})

Incorrect:
Customer.find({})

The system must never expose data between different organizations.

# 7. Future Database Improvements

Possible future additions:

Database sharding
Redis caching
Analytics database
Search engine integration
