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

## 6. The Database and Relationships
We use **SQLite** (via Prisma ORM), which supports relational integrity.
- `User` has a one-to-many relationship with `ServiceRequest` (as requester).
- `Role` has a one-to-many relationship with `User`.
- `RequestCategory` has a one-to-many relationship with `ServiceRequest`.
- `Assignment` links `ServiceRequest` and `User` (officer).
- `StatusUpdate` logs changes to a `ServiceRequest`.

## 7. API Documentation
The API is documented using Swagger. It can be accessed at `/api-docs` when running the backend server locally (`http://localhost:4000/api-docs`).

## 8. Screenshots of Major Interfaces
*(Please insert screenshots here before submitting: Login, Dashboard, Request Form, Admin View)*

## 9. Testing Evidence
Automated testing is implemented for both frontend and backend.
- **Backend Tests:** Built using Jest and Supertest. Successfully tested registration, login, request creation, and listing.
- **Frontend Tests:** Built using Vitest and React Testing Library. Successfully tested UI components and Login form rendering.

*(Please insert screenshots of `npm test` passing in terminal)*

## 10. Deployment Information
The application is configured to be deployed using Render.com via Infrastructure-as-Code (`render.yaml`).
The backend serves the API and the frontend is built as a static site. 
*(Replace this with your deployed links once hosted)*

## 11. Challenges Encountered and Solutions
- **Challenge:** Managing complex state for service requests across different user roles.
- **Solution:** Utilized TanStack Query to cache queries uniquely based on the user's role and search parameters.
- **Challenge:** Documenting all API endpoints clearly.
- **Solution:** Implemented `swagger-jsdoc` to generate OpenAPI specs directly from code comments.

## 12. Conclusion
CampusFix successfully addresses the manual inefficiencies in the university's maintenance reporting system by providing a scalable, secure, and user-friendly digital platform.
