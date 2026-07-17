# CampusFix - Advanced Web Application Development (MIT 8333)

## 1. Introduction and Problem Statement
The university currently receives maintenance complaints manually through phone calls, paper forms, WhatsApp, and office visits. This process causes delays, missing records, poor tracking, and lack of accountability. CampusFix is a full-stack digital platform where students and staff can submit service requests, maintenance officers can view assigned requests and update progress, and administrators can manage users and tasks.

## 2. System Objectives
- Provide a centralized platform for reporting and tracking university maintenance issues.
- Implement Role-Based Access Control (RBAC) to ensure correct permissions for Requesters, Officers, and Admins.
- Ensure data integrity, user authentication, and clear assignment workflows.

## 3. Requirement Analysis
- **User Roles:** Student/Staff (Requesters), Maintenance Officer, Administrator.
- **Features:** Registration, Login, Dashboard, Request submission, Tracking, Assignment, Status Updates.
- **Advanced Features Implemented:**
  1. JWT/session-based authentication
  2. Role-based access control
  3. Search, filter, and pagination
  4. API documentation using Swagger

## 4. Frontend Technologies Used
- React 18, React Router DOM, Vite
- Tailwind CSS for styling
- TanStack Query (React Query) for data fetching and caching
- React Hot Toast for user feedback

## 5. Backend Technologies Used
- Node.js, Express.js
- Prisma ORM
- Zod for request validation
- JWT (jsonwebtoken) and bcryptjs for authentication
- Swagger UI Express for API documentation

## 6. Architecture Diagram

![Architecture Diagram](./assets/architecture.png)

## 7. The Database and Relationships (Deep Dive)
We use **SQLite** (via Prisma ORM), which supports relational integrity and provides a portable file-based database ideal for this MVP. 

![Entity-Relationship Diagram](./assets/er_diagram.png)

- **User & Role**: A `User` belongs to one `Role` (REQUESTER, OFFICER, ADMIN). This enforces Role-Based Access Control (RBAC) at the database level.
- **ServiceRequest**: The core entity. It links to the `User` who created it (`requesterId`) and the `RequestCategory` it falls under.
- **Assignment**: A junction table that allows an Admin to assign a `ServiceRequest` to a specific `User` (acting as an Officer).
- **StatusUpdate**: Acts as an audit log/timeline for a `ServiceRequest`. Whenever the status changes (e.g., PENDING -> IN_PROGRESS), a new record is created linking the request, the user who changed it, and an optional comment.

## 8. API Documentation Depth
The backend exposes a deeply documented RESTful API using **Swagger UI** (`swagger-ui-express` and `swagger-jsdoc`). 

- **Access**: Available at `/api-docs` (e.g. `http://localhost:8080/api-docs`).
- **Structure**: All routes are annotated using OpenAPI 3.0 JSDoc comments. This includes request bodies, required fields, parameter types, and expected response codes (200, 201, 400, etc.).
- **Security**: The Swagger UI is configured to accept Bearer tokens (JWT) so that protected endpoints can be tested directly from the documentation interface.
- **Validation**: API endpoints are guarded by a Zod validation middleware (`validate(schema)`) which ensures that payloads match strict schemas before hitting the controllers. This guarantees data integrity.

## 9. Screenshots of Major Interfaces
*(Please insert screenshots here before submitting: Login, Dashboard, Request Form, Admin View)*

## 10. Testing Evidence
Automated testing is implemented for both frontend and backend.
- **Backend Tests:** Built using Jest and Supertest. Successfully tested registration, login, request creation, and listing.
- **Frontend Tests:** Built using Vitest and React Testing Library. Successfully tested UI components and Login form rendering.

*(Please insert screenshots of `npm test` passing in terminal)*

## 11. Deployment Information
The application can be deployed with Docker Compose. The React frontend is built into
an Nginx image, which serves the single-page application and proxies `/api` and
`/api-docs` to the Express API container. The API applies Prisma migrations at startup,
seeds required roles and reference data, and stores the SQLite database in a persistent
Docker volume. Run `docker compose up --build -d` and access the local deployment at
`http://localhost:8080`.

The repository also includes `render.yaml` for a Render.com deployment.
*(Insert the final public deployment link and a screenshot of the live application before submission.)*

## 12. Challenges Encountered and Solutions
- **Challenge:** Managing complex state for service requests across different user roles.
- **Solution:** Utilized TanStack Query to cache queries uniquely based on the user's role and search parameters.
- **Challenge:** Documenting all API endpoints clearly.
- **Solution:** Implemented `swagger-jsdoc` to generate OpenAPI specs directly from code comments.

## 13. Conclusion
CampusFix successfully addresses the manual inefficiencies in the university's maintenance reporting system by providing a scalable, secure, and user-friendly digital platform.
