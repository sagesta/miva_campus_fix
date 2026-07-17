# CampusFix Requirements Review

Reviewed against **MIT 8333 - Advanced Web Application Development (Virtual lab)**,
2026/2027 Continuous Assessment.

## Overall finding

CampusFix implements the assignment's core full-stack workflow and meets the database
entity requirement and the minimum of four advanced features. It is **not yet fully
submission-ready** because request CRUD is incomplete, test coverage is narrow, there
is no verified public deployment, and the required final PDF with screenshots and
evidence has not been produced.

## Requirement checklist

| Area | Status | Evidence and gaps |
|---|---|---|
| Registration and login | Meets | React registration/login pages and JWT-backed API endpoints are present. |
| Role-based dashboards | Meets | Requester, Officer, and Admin users receive role-scoped dashboard data and actions. Student and Staff share the Requester role. |
| Request submission and tracking | Meets | Request form, request list, detail view, filters, pagination, and status timeline are present. |
| Admin request management | Meets core scope | Admin can view all requests, assign/reassign officers, and change status. |
| Navigation, validation, and feedback | Meets | Protected routes, Zod validation, required form fields, error handling, and toast feedback are implemented. |
| Authentication and authorization | Meets | JWT authentication, bcrypt password hashing, role middleware, object-level access checks, and rate limiting are present. |
| REST API | Meets | Express REST endpoints are implemented. |
| Service request CRUD | Partial | Create and read are implemented. Cancellation and status transitions are domain actions, but general update and delete operations are absent. |
| Request assignment | Meets | Admin assignment and reassignment to maintenance officers are implemented. |
| Error handling and validation | Meets | Central error middleware and Zod schemas are present. |
| Required database entities | Meets | Users, Roles, Service Requests, Request Categories, Assignments, and Status Updates exist in Prisma. |
| Database relationships | Mostly meets | Core relations are defined. `Assignment.assignedById` is stored as an integer but is not declared as a foreign-key relation to `User`. |
| Four advanced features | Meets | JWT authentication, RBAC, search/filter/pagination, and Swagger documentation are present. The status timeline also provides a focused activity log. |
| Frontend component tests | Partial | Three tests pass, but they cover only basic UI controls and login rendering rather than the major role and request workflows. |
| Backend endpoint tests | Partial | Four tests pass for registration, login, request creation, and request listing. Assignment, status transitions, authorization failures, validation, and pagination are not tested. |
| Online deployment | Not evidenced | Docker Compose and Render configuration exist, but no working public URL or live database connection evidence is included. |
| Technical report | Partial | The report has the required headings, but screenshots, terminal test evidence, and final public deployment details remain placeholders. |
| Single submission PDF | Missing | The repository does not contain the required combined PDF containing the codebase, output screenshots, and project report. |

## Advanced features present

1. JWT authentication.
2. Role-based access control.
3. Search, filter, and pagination.
4. Swagger/OpenAPI documentation.
5. Status update history/activity timeline.

File upload, notifications, real-time push updates, and PDF/CSV export are not present,
but they are optional once at least four listed advanced features are implemented.

## Required work before final submission

1. Add general update and delete operations for service requests, with role rules,
   validation, frontend controls, Swagger entries, and tests.
2. Expand frontend tests to cover registration, request creation, filters, admin
   assignment, officer status changes, and protected routing.
3. Expand backend tests to cover RBAC, assignment, status transitions, validation,
   object-level access, and pagination/filtering.
4. Deploy the application publicly and verify that its persistent database works after
   a restart or redeployment.
5. Capture screenshots of the major role-specific interfaces, passing test output,
   Swagger documentation, and the live deployment.
6. Replace all report placeholders and produce the single required submission PDF with
   the codebase, screenshots, and report.
7. Confirm whether the introductory five-minute audiovisual PowerPoint instruction is
   an additional deliverable for this assessment and prepare it if required.

## Docker deployment added

The supplied Compose stack contains:

- `web`: a production React build served by Nginx.
- `api`: Express, Prisma migrations, and idempotent seed data.
- `campusfix_data`: a named volume that persists the SQLite database.

Nginx exposes the application, API, and Swagger documentation through one origin,
which avoids browser-side API host configuration for the default deployment.
