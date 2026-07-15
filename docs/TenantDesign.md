# Tenant Design Document

## Project

NexusOne Platform

## Version

1.0

## Status

Sprint 2 – Tenant Management


# 1. Purpose

A Tenant represents an organization (company) using the NexusOne platform.

Each tenant has completely isolated data.

Users belonging to one tenant cannot access another tenant's data.


# 2. What is a Tenant?

A tenant is a company registered on the platform.

Examples:

- Amazon UK
- Microsoft
- Infosys
- Google

All companies use the same application but their data remains completely isolated.


# 3. Tenant Structure

Each tenant contains:

- Company Information
- Users
- Departments (Future)
- Customers (Future)
- Leads (Future)
- Settings


# 4. Tenant Information

Each tenant stores:

- Company Name
- Company Slug
- Industry
- Company Size
- Country
- Time Zone
- Logo
- Status
- Created Date
- Updated Date


# 5. User-Tenant Relationship

One Tenant

↓

Many Users

Each user belongs to exactly one tenant.

Every user record contains a tenantId reference.


# 6. Tenant Creation Flow

Platform Owner

↓

Create Tenant

↓

Tenant Created

↓

Create Owner User

↓

Owner Assigned

↓

Owner Logs In

↓

Owner Manages Company


# 7. APIs

Version 1

POST /api/tenants

GET /api/tenants/:id

PUT /api/tenants/:id

Delete operation will be added in a future sprint.


# 8. Security Rules

Every tenant has isolated data.

Rules:

- Users cannot access another tenant.
- Every database query must include tenantId.
- Owner manages only their own tenant.
- Authentication is required.
- Authorization is required.


# 9. Future Scope

Future versions will support:

- Multiple branches
- Multiple departments
- Billing
- Subscription plans
- White labeling
- Custom domains
- Advanced permissions
- Audit logs


# 10. Summary

The Tenant module forms the foundation of the multi-tenant architecture.

Every business module in NexusOne will be linked to a tenant through tenantId.