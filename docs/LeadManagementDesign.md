# Lead Management Design

## 1. Overview

Lead Management is responsible for storing, tracking, assigning, qualifying, and converting potential customers within a tenant.

The Lead module must be fully multi-tenant and must follow the existing authentication and RBAC architecture.

Each lead belongs to exactly one tenant.

---

## 2. Goals

The Lead Management module should support:

- Create leads
- View leads
- View a single lead
- Update leads
- Delete leads
- Assign leads to users
- Track lead status
- Track lead source
- Track lead priority
- Store contact information
- Store company information
- Add lead notes
- Track lead creation and update timestamps
- Convert qualified leads into customers
- Maintain tenant isolation
- Enforce role-based permissions

---

## 3. Lead Data Model

Each Lead should contain:

- name
- email
- phone
- company
- jobTitle
- source
- status
- priority
- assignedTo
- notes
- tenantId
- createdAt
- updatedAt

---

## 4. Lead Fields

### name

Type:

```text
String
Required:

Yes

Description:

Name of the potential customer/contact.

email

Type:

String

Required:

Yes

Description:

Email address of the lead.

Email should be normalized where appropriate.

phone

Type:

String

Required:

No

Description:

Contact phone number.

company

Type:

String

Required:

No

Description:

Company or organization associated with the lead.

jobTitle

Type:

String

Required:

No

Description:

Job title or position of the lead contact.

source

Type:

String

Allowed values:

website
referral
social_media
advertisement
email
cold_call
event
other

Default:

other

Description:

Where the lead originated.

status

Type:

String

Allowed values:

new
contacted
qualified
proposal
converted
lost

Default:

new

Description:

Current stage of the lead.

priority

Type:

String

Allowed values:

low
medium
high

Default:

medium

Description:

Priority assigned to the lead.

assignedTo

Type:

ObjectId

Required:

No

Description:

User responsible for handling the lead.

The assigned user must belong to the same tenant as the lead.

notes

Type:

String

Required:

No

Description:

Additional information about the lead.

tenantId

Type:

ObjectId

Required:

Yes

Description:

Identifies the tenant that owns the lead.

The tenantId must NEVER be trusted from the client request body.

It must always come from:

req.user.tenantId
5. Multi-Tenant Rules

Every lead must belong to exactly one tenant.

All Lead queries must be tenant-scoped.

Examples:

Find all leads:
tenantId = req.user.tenantId
Find one lead:
_id = leadId
AND
tenantId = req.user.tenantId
Update lead:
_id = leadId
AND
tenantId = req.user.tenantId
Delete lead:
_id = leadId
AND
tenantId = req.user.tenantId

A user from Tenant A must never be able to access a lead belonging to Tenant B.

6. Lead Assignment Rules

A lead may optionally be assigned to a user.

When assigning a lead:

Find the target user.
Verify that the user exists.
Verify that the user belongs to the authenticated user's tenant.
Only then assign the user to the lead.

A user from another tenant must never be assignable.

7. Lead Status Workflow

Initial status:

new

Possible workflow:

new
  ↓
contacted
  ↓
qualified
  ↓
proposal
  ↓
converted

Alternative path:

new → lost
contacted → lost
qualified → lost
proposal → lost

A converted lead represents a successful lead conversion into a customer.

8. Lead Conversion

Lead conversion will be supported.

When a lead is converted:

Verify the lead belongs to the authenticated user's tenant.
Verify the lead has not already been converted.
Create a Customer using the lead's relevant information.
Assign the same tenantId to the new Customer.
Update lead status to:
converted
Store a reference to the created customer.

The conversion process must preserve tenant isolation.

9. Customer Reference

The Lead model may contain:

convertedCustomerId

Type:

ObjectId

This field remains empty until the lead is successfully converted.

After conversion:

lead.convertedCustomerId = customer._id
10. Permissions

Add the following permissions to the existing:

constants/permissions.js

Permissions:

LEAD_CREATE
LEAD_VIEW
LEAD_UPDATE
LEAD_DELETE
LEAD_ASSIGN
LEAD_CONVERT

Use permission strings following the existing project convention:

lead.create
lead.view
lead.update
lead.delete
lead.assign
lead.convert
11. Role Permissions

Update the existing:

constants/rolePermissions.js
Owner

Owner should have:

lead.create
lead.view
lead.update
lead.delete
lead.assign
lead.convert
Admin

Admin should have:

lead.create
lead.view
lead.update
lead.delete
lead.assign
lead.convert
Manager

Manager should have:

lead.create
lead.view
lead.update
lead.delete
lead.assign
lead.convert
Employee

Employee should initially have:

lead.view

Employee should NOT initially have:

lead.create
lead.update
lead.delete
lead.assign
lead.convert

This keeps the existing RBAC pattern consistent with Customer Management.

12. API Endpoints

Base route:

/api/leads
Create Lead
POST /api/leads

Permission:

lead.create
Get All Leads
GET /api/leads

Permission:

lead.view
Get Lead By ID
GET /api/leads/:id

Permission:

lead.view
Update Lead
PATCH /api/leads/:id

Permission:

lead.update
Delete Lead
DELETE /api/leads/:id

Permission:

lead.delete
Assign Lead
PATCH /api/leads/:id/assign

Permission:

lead.assign
Convert Lead
POST /api/leads/:id/convert

Permission:

lead.convert
13. Controller Responsibilities

The controller should:

Read authenticated user information
Validate request input
Pass tenantId from req.user.tenantId
Call the appropriate service
Return appropriate HTTP responses
Handle service errors
Never trust tenantId from request body
14. Service Responsibilities

The service should contain business logic for:

Creating leads
Getting tenant leads
Getting a single tenant lead
Updating tenant leads
Deleting tenant leads
Assigning leads
Converting leads
Validating assigned users
Validating tenant ownership

Controllers should remain thin.

15. Route Protection

All Lead routes must use the existing authentication middleware.

Example structure:

authenticate
     ↓
permissionMiddleware
     ↓
controller
     ↓
service

Do not create a new authentication system for Lead Management.

Use the existing JWT authentication implementation.

16. Tenant Isolation

Every Lead operation must enforce tenant isolation.

For example:

Lead.find({
    tenantId: req.user.tenantId
});

For a specific lead:

Lead.findOne({
    _id: leadId,
    tenantId: req.user.tenantId
});

Never use:

Lead.findById(leadId);

for protected tenant-scoped operations without additionally verifying tenant ownership.

17. Validation

The Lead model should validate:

Required name
Required email
Valid status values
Valid priority values
Valid source values

The service should additionally validate:

Assigned user belongs to the same tenant
Lead belongs to authenticated tenant
Lead cannot be converted twice
18. Error Handling

Expected errors include:

Lead not found
Permission denied
Assigned user not found
Assigned user does not belong to tenant
Lead already converted
Invalid lead status
Invalid lead priority
Invalid lead source

Use the existing project error-handling pattern.

19. Testing Strategy

Lead Management must be tested using Postman.

Testing sequence:

Owner
Create      ✅
View        ✅
Update      ✅
Delete      ✅
Assign      ✅
Convert     ✅
Admin
Create      ✅
View        ✅
Update      ✅
Delete      ✅
Assign      ✅
Convert     ✅
Manager
Create      ✅
View        ✅
Update      ✅
Delete      ✅
Assign      ✅
Convert     ✅
Employee
View        ✅
Create      ❌
Update      ❌
Delete      ❌
Assign      ❌
Convert     ❌
20. Tenant Isolation Testing

Create a Lead under Tenant A.

Then use a Tenant B user to attempt:

GET lead
UPDATE lead
DELETE lead
ASSIGN lead
CONVERT lead

All cross-tenant operations must fail.

Expected behavior:

Lead not found

or the existing equivalent tenant-safe response.

21. Lead Conversion Testing

Create a Lead:

status = qualified

Then convert it.

Verify:

Customer is created.
Customer has the same tenantId.
Lead status becomes:
converted
Lead contains:
convertedCustomerId
Converting the same lead again is rejected.
22. Security Requirements

The Lead module must:

Never accept tenantId from client input
Always use authenticated tenantId
Verify assigned users belong to the tenant
Protect every route with authentication
Protect every operation with permissions
Prevent cross-tenant access
Prevent duplicate lead conversion
Avoid exposing sensitive internal errors
23. File Structure

Follow the existing project structure.

Expected files:

models/
    Lead.js


services/
    leadService.js


controllers/
    leadController.js


routes/
    leadRoutes.js

Existing files to update:

constants/
    permissions.js
    rolePermissions.js
24. Implementation Order

Implement in this exact order:

1. LeadManagementDesign.md
2. Lead.js
3. leadService.js
4. leadController.js
5. leadRoutes.js
6. permissions.js
7. rolePermissions.js
8. Register leadRoutes
9. Test Create Lead
10. Test Get All Leads
11. Test Get Lead By ID
12. Test Update Lead
13. Test Delete Lead
14. Test Lead Assignment
15. Test Lead Conversion
16. Test Owner RBAC
17. Test Admin RBAC
18. Test Manager RBAC
19. Test Employee RBAC
20. Test Tenant Isolation
21. Git commit
22. Git push
25. Future AI Integration

Lead Management is intentionally designed so AI features can be added later.

Potential AI features:

AI Lead Scoring
Lead conversion probability
Next Best Action
Automatic follow-up suggestions
Lead summarization
AI-generated follow-up emails
Natural language lead search

These features will be implemented after the core Lead Management system is stable.

26. Future Analytics Integration

Lead data should later support:

Lead conversion rate
Leads by source
Leads by status
Leads by priority
Leads by assigned employee
Conversion trends
Sales pipeline analytics

The current Lead module should therefore keep the data structured and consistent.

27. Design Principle

Lead Management must not be treated as simple CRUD.

The module should demonstrate:

Real business logic
Multi-tenant architecture
RBAC
Secure data access
Lead lifecycle management
User assignment
Customer conversion
Future AI readiness
Future analytics readiness

The goal is to build a production-style SaaS CRM module rather than a basic tutorial CRUD implementation.