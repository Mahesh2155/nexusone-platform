# Customer Management Design

## 1. Overview

The Customer Management module allows authenticated tenant users to create, view, update, and manage customers within their own tenant.

All customer data must be strictly isolated by `tenantId`.

A user must never be able to access or modify a customer belonging to another tenant.

---

## 2. Customer Fields

Each customer will contain the following fields:

- `name` - Customer name (required)
- `email` - Customer email (optional)
- `phone` - Customer phone number (optional)
- `company` - Company or organisation name (optional)
- `address` - Customer address (optional)
- `status` - Customer status
- `tenantId` - Tenant reference (required)
- `createdAt` - Automatically generated timestamp
- `updatedAt` - Automatically generated timestamp

---

## 3. Customer Status

Allowed values:

- `active`
- `inactive`

Default value:

- `active`

---

## 4. Tenant Relationship

Every customer must belong to exactly one tenant.

```text
Tenant
   |
   └── Customers
          |
          ├── Customer 1
          ├── Customer 2
          └── Customer 3
The tenantId field is required and indexed.

All customer queries must include the authenticated user's tenantId.

## 5. Customer Operations

## 5.1 Create Customer

Create a new customer inside the authenticated user's tenant.

The tenantId must come from the authenticated user and must not be trusted from the request body.

## 5.2 Get Customers

Return all customers belonging to the authenticated user's tenant.

Customers from other tenants must never be returned.

## 5.3 Get Customer

Return a specific customer only when the customer belongs to the authenticated user's tenant.

## 5.4 Update Customer

Update customer information only when the customer belongs to the authenticated user's tenant.

## 5.5 Delete Customer

Delete a customer only when the customer belongs to the authenticated user's tenant.

## 6. RBAC Permissions
Owner

Owner can:

Create customer
View customers
Update customer
Delete customer
Admin

Admin can:

Create customer
View customers
Update customer
Delete customer
Manager

Manager can:

Create customer
View customers
Update customer
Delete customer
Employee

Employee can:

View customers

Employee cannot:

Create customer
Update customer
Delete customer

## 7. Customer Permissions

The following permissions will be used:

CUSTOMER_CREATE
CUSTOMER_VIEW
CUSTOMER_UPDATE
CUSTOMER_DELETE

These permissions will be integrated with the existing RBAC permission system.

## 8. API Endpoints

POST   /api/customers
GET    /api/customers
GET    /api/customers/:customerId
PATCH  /api/customers/:customerId
DELETE /api/customers/:customerId

Authentication

All customer endpoints require a valid access token.

Authorization: Bearer <accessToken>

## 9. Security

All customer routes must use authentication middleware.

Role/permission middleware will control access to customer operations.

Tenant isolation must be enforced at the service/database query level.

A user must never be able to:

View another tenant's customers
Update another tenant's customer
Delete another tenant's customer
Create a customer for another tenant

The system must always use the authenticated user's tenantId.

## 10. Validation Rules
Name

Required.

Type: String
Required: true
Trim: true
Email

Optional.

If provided, it must be a valid email address.

Phone

Optional.

Stored as a string to support international phone numbers.

Company

Optional.

Address

Optional.

Status

Allowed values:

active
inactive

Default:

active
Tenant ID

Required.

Must reference an existing Tenant.

## 11. Database Design

Customer will be represented using a Mongoose model.

Relationship:

Tenant 1 ──────────── * Customer

The tenantId field will reference the Tenant model.

Example:

tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
    index: true
}

## 12. Service Layer

# Customer business logic will be implemented in:

customerService.js

Expected service functions:

getTenantCustomers()
getCustomerById()
createCustomer()
updateCustomer()
removeCustomer()

All service functions that access a specific customer must verify tenantId.

## 13. Controller Layer

# Customer request handling will be implemented in:

customerController.js

The controller will:

Receive HTTP requests
Read authenticated user information
Pass validated data to the service layer
Return consistent API responses
Handle service errors

## 14. Routes

# Customer routes will be implemented in:

customerRoutes.js

Routes will use:

authMiddleware
permissionMiddleware

and appropriate permission protection.

## 15. Testing Requirements

# The following tests must pass before Sprint completion.

Functional Tests
Create customer
Get customers
Get customer by ID
Update customer
Delete customer
RBAC Tests
Owner customer CRUD
Admin customer CRUD
Manager customer CRUD
Employee customer view
Employee create denied
Employee update denied
Employee delete denied
Tenant Isolation Tests
Tenant A cannot view Tenant B customer
Tenant A cannot update Tenant B customer
Tenant A cannot delete Tenant B customer
Customer creation always uses authenticated user's tenant

## 16. Sprint Completion Criteria

# Customer Management will be considered complete when:

Customer model is implemented
Customer service is implemented
Customer controller is implemented
Customer routes are implemented
Routes are registered
CRUD APIs work
RBAC permissions work
Tenant isolation works
Validation works
Security tests pass
Changes are committed and pushed to Git
