# Tenant Onboarding Flow

## Project

NexusOne Platform

## Version

1.0

## Status

Sprint 2 - Tenant Management


# 1. Purpose

The onboarding flow allows a new organization to create an account on NexusOne.

The process creates:

- A new Tenant (Company)
- An Owner User
- Relationship between User and Tenant
- Authentication session


# 2. Onboarding Concept

NexusOne follows a SaaS workspace onboarding approach.

A company signs up once and becomes a Tenant.

The first user who creates the organization becomes the Tenant Owner.


# 3. User Journey

Flow:

Signup

↓

Enter Company Details

↓

Enter Owner Details

↓

Create Tenant

↓

Create Owner User

↓

Link User with Tenant

↓

Generate Authentication Token

↓

Access Platform


# 4. Data Creation Flow

During onboarding:

Step 1:
Create Tenant record.

Step 2:
Create Owner User record.

Step 3:
Assign tenantId to User.

Step 4:
Assign owner role.

Step 5:
Generate JWT tokens.

Step 6:
Return authenticated response.


# 5. Tenant Ownership

The first registered user becomes:

Role:

owner

Permissions:

- Manage company settings
- Manage users
- Access tenant data


# 6. Security Rules

Rules:

- Every user must belong to a tenant.
- Tenant data must remain isolated.
- Users cannot access another tenant.
- All future modules must use tenantId filtering.
- Authentication is required for protected resources.


# 7. Failure Handling

If onboarding fails:

- Tenant creation should not leave incomplete data.
- User creation failure should be handled.
- Future implementation will use database transactions.


# 8. Future Scope

Future improvements:

- Email verification
- Invitation system
- Subscription plans
- Trial period
- Billing integration
- Workspace customization


# 9. Summary

The onboarding flow establishes the foundation of the multi-tenant SaaS architecture.

Every organization joining NexusOne starts with a Tenant and an Owner User relationship.