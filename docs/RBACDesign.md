# RBAC Design Document

## Project

NexusOne Platform

## Version

1.0

## Status

Sprint 3 - Role Based Access Control


# 1. Purpose

RBAC (Role-Based Access Control) controls what actions a user can perform inside their tenant.

Authentication identifies the user.

Authorization decides what the user is allowed to do.


# 2. RBAC Concept

Every user belongs to a tenant and has a specific role.

Flow:

User

↓

Tenant

↓

Role

↓

Permissions

↓

Access Decision


# 3. Roles

NexusOne supports four roles:


## Owner

Highest level access inside a tenant.

Responsibilities:

- Manage company settings
- Manage users
- Manage permissions
- Access all tenant resources


## Admin

Administrative access.

Responsibilities:

- Manage users
- Manage tenant operations
- Access business features


## Manager

Team-level access.

Responsibilities:

- Manage assigned resources
- View team information


## Employee

Basic user access.

Responsibilities:

- Access allowed resources
- Perform assigned tasks


# 4. Permission Model

Permissions define specific actions.

Examples:

- user.create
- user.view
- user.update
- tenant.update
- tenant.delete


Roles are assigned permissions.

Example:

Owner:

- user.create
- user.update
- tenant.update
- tenant.delete


Employee:

- user.view


# 5. Authorization Flow

Request

↓

Authentication Middleware

↓

Get User Information

↓

Check User Role

↓

Check Required Permission

↓

Allow / Reject Request


# 6. Security Rules

- Every user must have a role.
- Every user belongs to one tenant.
- Roles cannot bypass tenant isolation.
- Users cannot access another tenant's resources.
- Unauthorized access returns HTTP 403.


# 7. Future Scope

Future improvements:

- Custom roles
- Custom permissions
- Permission groups
- Audit logs
- Role management UI


# 8. Summary

RBAC provides controlled access management in NexusOne.

It ensures users can only perform actions allowed by their role while maintaining tenant security.