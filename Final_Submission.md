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

![Architecture Diagram](https://mermaid.ink/img/Z3JhcGggVEQKICAgIENsaWVudFtSZWFjdCBGcm9udGVuZFxuVml0ZSArIFRhaWx3aW5kICsgUmVhY3QgUXVlcnldIC0tPnxSRVNUIEFQSSB2aWEgTmdpbnggUHJveHl8IEFQSVtFeHByZXNzIEJhY2tlbmQgQVBJXQogICAgQVBJIC0tPnxQcmlzbWEgT1JNfCBEQlsoU1FMaXRlIFBlcnNpc3RlbnQgVm9sdW1lKV0KICAgIEFQSSAtLT4gQXV0aFtKV1QgQXV0aGVudGljYXRpb24gJiBSQkFDXQogICAgCiAgICBzdWJncmFwaCBDb250YWluZXJpemVkIERlcGxveW1lbnQKICAgICAgTmdpbnhbTmdpbnggV2ViIFNlcnZlcl0KICAgICAgRXhwcmVzc1tOb2RlLmpzIFNlcnZlcl0KICAgIGVuZA==)

## 7. The Database and Relationships (Deep Dive)
We use **SQLite** (via Prisma ORM), which supports relational integrity and provides a portable file-based database ideal for this MVP. 

![Entity-Relationship Diagram](https://mermaid.ink/img/ZXJEaWFncmFtCiAgICBVc2VyIHx8LS1veyBTZXJ2aWNlUmVxdWVzdCA6ICJzdWJtaXRzIgogICAgUm9sZSB8fC0tb3sgVXNlciA6ICJiZWxvbmdzIHRvIgogICAgUmVxdWVzdENhdGVnb3J5IHx8LS1veyBTZXJ2aWNlUmVxdWVzdCA6ICJjYXRlZ29yaXplcyIKICAgIFNlcnZpY2VSZXF1ZXN0IHx8LS1veyBBc3NpZ25tZW50IDogImhhcyIKICAgIFVzZXIgfHwtLW97IEFzc2lnbm1lbnQgOiAiaXMgYXNzaWduZWQiCiAgICBTZXJ2aWNlUmVxdWVzdCB8fC0tb3sgU3RhdHVzVXBkYXRlIDogImhhcyB0aW1lbGluZSBvZiIKICAgIFVzZXIgfHwtLW97IFN0YXR1c1VwZGF0ZSA6ICJhdXRob3Igb2YiCgogICAgVXNlciB7CiAgICAgICAgaW50IGlkIFBLCiAgICAgICAgc3RyaW5nIGVtYWlsCiAgICAgICAgc3RyaW5nIHBhc3N3b3JkSGFzaAogICAgICAgIGludCByb2xlSWQgRksKICAgIH0KICAgIFNlcnZpY2VSZXF1ZXN0IHsKICAgICAgICBpbnQgaWQgUEsKICAgICAgICBzdHJpbmcgdGl0bGUKICAgICAgICBzdHJpbmcgc3RhdHVzCiAgICAgICAgaW50IHJlcXVlc3RlcklkIEZLCiAgICB9)

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
  <img width="1958" height="1183" alt="image" src="https://github.com/user-attachments/assets/2031e504-6e7f-4abd-b2b7-91f9f268ec83" />


## 9. Screenshots of Major Interfaces
<img width="2202" height="1308" alt="image" src="https://github.com/user-attachments/assets/b2d94f92-610b-4c68-be84-ffb059f72ea1" />
<img width="2119" height="1243" alt="image" src="https://github.com/user-attachments/assets/231dd7e1-d731-4032-9d62-1a01a9568aac" />
<img width="2053" height="1086" alt="image" src="https://github.com/user-attachments/assets/de28fb64-495b-4336-b645-c2ce1b612db8" />
<img width="1998" height="978" alt="image" src="https://github.com/user-attachments/assets/37a8c7b6-8b38-40fb-8027-788b59f9b463" />





## 10. Testing Evidence
Automated testing is implemented for both frontend and backend.
- **Backend Tests:** Built using Jest and Supertest. Successfully tested registration, login, request creation, and listing.
- **Frontend Tests:** Built using Vitest and React Testing Library. Successfully tested UI components and Login form rendering.

<img width="1429" height="444" alt="image" src="https://github.com/user-attachments/assets/727ed9e5-734b-44bf-ba1e-351629527505" />
<img width="1439" height="533" alt="image" src="https://github.com/user-attachments/assets/6d87b71b-f87c-4a2d-a925-7beaa71e5bd3" />


## 11. Deployment Information
The application can be deployed with Docker Compose. The React frontend is built into
an Nginx image, which serves the single-page application and proxies `/api` and
`/api-docs` to the Express API container. The API applies Prisma migrations at startup,
seeds required roles and reference data, and stores the SQLite database in a persistent
Docker volume. Run `docker compose up --build -d` and access the local deployment at
`http://localhost:8080`.


The repository also includes `render.yaml` for a Render.com deployment.
<img width="1767" height="1027" alt="image" src="https://github.com/user-attachments/assets/95f27adb-747b-42e9-8ecc-dbd570a7ee17" />
https://miva-request.samueladebodun.com/dashboard

## 12. Challenges Encountered and Solutions
- **Challenge:** Managing complex state for service requests across different user roles.
- **Solution:** Utilized TanStack Query to cache queries uniquely based on the user's role and search parameters.
- **Challenge:** Documenting all API endpoints clearly.
- **Solution:** Implemented `swagger-jsdoc` to generate OpenAPI specs directly from code comments.

## 13. Conclusion
CampusFix successfully addresses the manual inefficiencies in the university's maintenance reporting system by providing a scalable, secure, and user-friendly digital platform.


<div style="page-break-after: always;"></div>

# Appendix: Full Source Code

The following section contains the complete source code of the CampusFix application.

### File: `server/.dockerignore`

```
node_modules
.env
npm-debug.log*
prisma/*.db
prisma/*.db-journal
coverage

```

### File: `server/.env`

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-only-change-me-in-production-please"
PORT=4000
CLIENT_ORIGIN="http://localhost:5173"

```

### File: `server/.env.example`

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="replace-with-a-long-random-string"
PORT=4000
CLIENT_ORIGIN="http://localhost:5173"

```

### File: `server/Dockerfile`

```dockerfile
FROM node:20-alpine

# Install OpenSSL for Prisma's Rust engines on Alpine
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose API port
EXPOSE 4000

# Push schema to postgres and start server
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm run seed && npm start"]

```

### File: `server/package.json`

```json
{
  "name": "campusfix-server",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "CampusFix backend API (MVP core slice)",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "prisma:generate": "prisma generate",
    "migrate": "prisma migrate dev",
    "seed": "node prisma/seed.js",
    "db:reset": "prisma migrate reset --force",
    "test": "cross-env DATABASE_URL=\"postgresql://postgres:postgrespassword@db:5432/campusfix?schema=test\" npx prisma db push --skip-generate --accept-data-loss && cross-env DATABASE_URL=\"postgresql://postgres:postgrespassword@db:5432/campusfix?schema=test\" NODE_OPTIONS=--experimental-vm-modules jest --runInBand"
  },
  "prisma": {
    "seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.2",
    "express-rate-limit": "^7.4.1",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "cross-env": "^10.1.0",
    "jest": "^30.4.2",
    "nodemon": "^3.1.7",
    "prisma": "^5.22.0",
    "supertest": "^7.2.2"
  }
}

```

### File: `server/prisma/schema.prisma`

```prisma
// CampusFix — Prisma schema (MVP core slice, PostgreSQL).
// The schema uses validated Strings instead of native enums for maximum portability.
// Constants live in src/utils/constants.js.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Role {
  id    Int    @id @default(autoincrement())
  name  String @unique // REQUESTER | OFFICER | ADMIN
  users User[]
}

model User {
  id            Int      @id @default(autoincrement())
  fullName      String
  email         String   @unique
  passwordHash  String
  phone         String?
  userType      String?  // STUDENT | STAFF (requesters)
  department    String?
  isActive      Boolean  @default(true)
  role          Role     @relation(fields: [roleId], references: [id])
  roleId        Int
  requests      ServiceRequest[] @relation("Requester")
  assignments   Assignment[]     @relation("Officer")
  statusUpdates StatusUpdate[]
  createdAt     DateTime @default(now())
}

model RequestCategory {
  id          Int     @id @default(autoincrement())
  name        String  @unique
  description String?
  requests    ServiceRequest[]
}

model ServiceRequest {
  id            Int      @id @default(autoincrement())
  title         String
  description   String
  location      String
  priority      String   @default("MEDIUM") // LOW | MEDIUM | HIGH | URGENT
  status        String   @default("PENDING") // see constants.js
  requester     User     @relation("Requester", fields: [requesterId], references: [id])
  requesterId   Int
  category      RequestCategory @relation(fields: [categoryId], references: [id])
  categoryId    Int
  assignments   Assignment[]
  statusUpdates StatusUpdate[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([status])
  @@index([categoryId])
  @@index([requesterId])
}

model Assignment {
  id           Int      @id @default(autoincrement())
  request      ServiceRequest @relation(fields: [requestId], references: [id])
  requestId    Int
  officer      User     @relation("Officer", fields: [officerId], references: [id])
  officerId    Int
  assignedById Int
  note         String?
  isActive     Boolean  @default(true)
  assignedAt   DateTime @default(now())
}

model StatusUpdate {
  id          Int      @id @default(autoincrement())
  request     ServiceRequest @relation(fields: [requestId], references: [id])
  requestId   Int
  updatedBy   User     @relation(fields: [updatedById], references: [id])
  updatedById Int
  oldStatus   String
  newStatus   String
  comment     String?
  createdAt   DateTime @default(now())
}

```

### File: `server/prisma/seed.js`

```javascript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ROLE_NAMES = ['REQUESTER', 'OFFICER', 'ADMIN'];
const CATEGORIES = [
  ['Electrical', 'Faulty wiring, sockets, lighting, power issues'],
  ['Plumbing', 'Leaking pipes, taps, drainage, water supply'],
  ['Furniture', 'Damaged desks, chairs, beds, cupboards'],
  ['Internet', 'Wi-Fi, network, and connectivity problems'],
  ['Classroom Equipment', 'Projectors, boards, AC, lab equipment'],
  ['Hostel', 'General hostel maintenance issues'],
  ['Other', 'Anything not covered above'],
];

async function main() {
  console.log('Seeding database...');

  // Roles
  const roles = {};
  for (const name of ROLE_NAMES) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Categories
  const categories = {};
  for (const [name, description] of CATEGORIES) {
    categories[name] = await prisma.requestCategory.upsert({
      where: { name },
      update: { description },
      create: { name, description },
    });
  }

  const passwordHash = await bcrypt.hash('password123', 10);

  const upsertUser = (email, data) =>
    prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, passwordHash, ...data },
    });

  // Admin
  const admin = await upsertUser('admin@university.edu', {
    fullName: 'Ada Admin',
    roleId: roles.ADMIN.id,
    department: 'Facilities Management',
  });

  // Officers
  const officer1 = await upsertUser('officer1@university.edu', {
    fullName: 'Ola Officer',
    roleId: roles.OFFICER.id,
    department: 'Maintenance',
  });
  const officer2 = await upsertUser('officer2@university.edu', {
    fullName: 'Efe Engineer',
    roleId: roles.OFFICER.id,
    department: 'Maintenance',
  });

  // Requesters
  const student = await upsertUser('student@university.edu', {
    fullName: 'Sam Student',
    roleId: roles.REQUESTER.id,
    userType: 'STUDENT',
    department: 'Hostel B',
  });
  const staff = await upsertUser('staff@university.edu', {
    fullName: 'Stella Staff',
    roleId: roles.REQUESTER.id,
    userType: 'STAFF',
    department: 'Registry',
  });

  // Only seed sample requests once (skip if any already exist).
  const existing = await prisma.serviceRequest.count();
  if (existing > 0) {
    console.log(`Seed complete (kept ${existing} existing requests).`);
    return;
  }

  const samples = [
    { title: 'Broken socket in Room 214', description: 'The wall socket sparks when plugged in.', location: 'Hostel B, Room 214', categoryId: categories.Electrical.id, priority: 'HIGH', requesterId: student.id, status: 'PENDING' },
    { title: 'Leaking pipe under sink', description: 'Water pooling in the kitchenette.', location: 'Hostel B, Kitchen 2', categoryId: categories.Plumbing.id, priority: 'URGENT', requesterId: student.id, status: 'PENDING' },
    { title: 'Projector not turning on', description: 'LT-3 projector shows no signal.', location: 'Lecture Theatre 3', categoryId: categories['Classroom Equipment'].id, priority: 'MEDIUM', requesterId: staff.id, status: 'ASSIGNED', officerId: officer1.id },
    { title: 'Wi-Fi keeps dropping', description: 'Connection drops every few minutes in Registry.', location: 'Registry Building', categoryId: categories.Internet.id, priority: 'MEDIUM', requesterId: staff.id, status: 'IN_PROGRESS', officerId: officer2.id },
    { title: 'Cracked desk in Room 101', description: 'Desk surface is split and unsafe.', location: 'Block A, Room 101', categoryId: categories.Furniture.id, priority: 'LOW', requesterId: student.id, status: 'COMPLETED', officerId: officer1.id },
    { title: 'Flickering corridor lights', description: 'Lights flicker on the 2nd floor corridor.', location: 'Hostel B, Floor 2', categoryId: categories.Electrical.id, priority: 'MEDIUM', requesterId: student.id, status: 'CANCELLED' },
  ];

  for (const s of samples) {
    const { officerId, status, ...data } = s;
    const request = await prisma.serviceRequest.create({ data: { ...data, status } });

    // Build a plausible status history + assignment for non-pending items.
    if (status === 'CANCELLED') {
      await prisma.statusUpdate.create({
        data: { requestId: request.id, updatedById: request.requesterId, oldStatus: 'PENDING', newStatus: 'CANCELLED', comment: 'No longer needed' },
      });
    }

    if (officerId) {
      await prisma.assignment.create({
        data: { requestId: request.id, officerId, assignedById: admin.id, note: 'Please handle promptly', isActive: true },
      });
      await prisma.statusUpdate.create({
        data: { requestId: request.id, updatedById: admin.id, oldStatus: 'PENDING', newStatus: 'ASSIGNED', comment: 'Assigned to officer' },
      });
      if (status === 'IN_PROGRESS' || status === 'COMPLETED') {
        await prisma.statusUpdate.create({
          data: { requestId: request.id, updatedById: officerId, oldStatus: 'ASSIGNED', newStatus: 'IN_PROGRESS', comment: 'Work started' },
        });
      }
      if (status === 'COMPLETED') {
        await prisma.statusUpdate.create({
          data: { requestId: request.id, updatedById: officerId, oldStatus: 'IN_PROGRESS', newStatus: 'COMPLETED', comment: 'Fixed and verified' },
        });
      }
    }
  }

  console.log('Seed complete.');
  console.log('Login with any of these (password: password123):');
  console.log('  admin@university.edu | officer1@university.edu | student@university.edu');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

```

### File: `server/src/app.js`

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { setupSwagger } from './config/swagger.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import categoriesRoutes from './modules/categories/categories.routes.js';
import requestsRoutes from './modules/requests/requests.routes.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigin, credentials: true }));
  app.use(express.json());

  setupSwagger(app);

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', time: new Date().toISOString() } });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/categories', categoriesRoutes);
  app.use('/api/requests', requestsRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

```

### File: `server/src/config/env.js`

```javascript
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'insecure-dev-secret',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};

if (!process.env.JWT_SECRET) {
  console.warn('[env] JWT_SECRET not set — using an insecure development default.');
}

```

### File: `server/src/config/prisma.js`

```javascript
import { PrismaClient } from '@prisma/client';

// Single shared Prisma client for the whole process.
export const prisma = new PrismaClient();

```

### File: `server/src/config/swagger.js`

```javascript
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CampusFix API',
      version: '0.1.0',
      description: 'API documentation for the CampusFix University Maintenance System',
    },
    servers: [
      {
        url: '/',
        description: 'Current server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.js'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

```

### File: `server/src/middleware/auth.js`

```javascript
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import { unauthorized, forbidden } from '../utils/http.js';

// Verifies the Bearer token, loads the user, rejects deactivated accounts.
export async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw unauthorized('Missing Bearer token');

    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      throw unauthorized('Invalid or expired token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true },
    });
    if (!user) throw unauthorized('User no longer exists');
    if (!user.isActive) throw forbidden('Account is deactivated');

    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role.name,
    };
    next();
  } catch (err) {
    next(err);
  }
}

// Restricts a route to the given roles.
export function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role)) {
      return next(forbidden(`Requires one of: ${roles.join(', ')}`));
    }
    next();
  };
}

```

### File: `server/src/middleware/errorHandler.js`

```javascript
import { ApiError } from '../utils/http.js';

export function notFoundHandler(_req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  });
}

// Central error handler — must keep 4 args so Express recognises it.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  // Prisma unique-constraint violation
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: { code: 'CONFLICT', message: 'A record with that value already exists' },
    });
  }

  console.error('[error]', err);
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL', message: 'Something went wrong' },
  });
}

```

### File: `server/src/middleware/validate.js`

```javascript
import { badRequest } from '../utils/http.js';

// Validates req.body against a Zod schema, replacing it with the parsed value.
export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      }));
      return next(badRequest('Validation failed', details));
    }
    req.body = result.data;
    next();
  };
}

```

### File: `server/src/modules/auth/auth.controller.js`

```javascript
import * as service from './auth.service.js';
import { ok, created } from '../../utils/http.js';

export async function register(req, res, next) {
  try {
    const result = await service.register(req.body);
    created(res, result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await service.login(req.body);
    ok(res, result);
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await service.me(req.user.id);
    ok(res, user);
  } catch (err) {
    next(err);
  }
}

```

### File: `server/src/modules/auth/auth.routes.js`

```javascript
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as controller from './auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import { registerSchema, loginSchema } from './auth.schema.js';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, fullName]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               role:
 *                 type: string
 *                 description: 'REQUESTER or OFFICER'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', authLimiter, validate(registerSchema), controller.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', authLimiter, validate(loginSchema), controller.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 */
router.get('/me', authenticate, controller.me);

export default router;

```

### File: `server/src/modules/auth/auth.schema.js`

```javascript
import { z } from 'zod';
import { USER_TYPE_VALUES } from '../../utils/constants.js';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(USER_TYPE_VALUES),
  department: z.string().min(1).optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required'),
});

```

### File: `server/src/modules/auth/auth.service.js`

```javascript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.js';
import { env } from '../../config/env.js';
import { ROLES } from '../../utils/constants.js';
import { conflict, unauthorized } from '../../utils/http.js';

// Strip the password hash before a user object leaves the service.
function publicUser(user) {
  const { passwordHash, roleId, ...rest } = user;
  return { ...rest, role: user.role?.name };
}

function signToken(user) {
  return jwt.sign({ userId: user.id, role: user.role.name }, env.jwtSecret, {
    expiresIn: '24h',
  });
}

export async function register(input) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw conflict('An account with that email already exists');

  const requesterRole = await prisma.role.findUnique({ where: { name: ROLES.REQUESTER } });
  const passwordHash = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      passwordHash,
      userType: input.userType,
      department: input.department,
      phone: input.phone,
      roleId: requesterRole.id,
    },
    include: { role: true },
  });

  return { token: signToken(user), user: publicUser(user) };
}

export async function login(input) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: { role: true },
  });
  if (!user) throw unauthorized('Invalid email or password');
  if (!user.isActive) throw unauthorized('Account is deactivated');

  const match = await bcrypt.compare(input.password, user.passwordHash);
  if (!match) throw unauthorized('Invalid email or password');

  return { token: signToken(user), user: publicUser(user) };
}

export async function me(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
  return publicUser(user);
}

```

### File: `server/src/modules/auth/auth.test.js`

```javascript
import request from 'supertest';
import { createApp } from '../../app.js';
import { prisma } from '../../config/prisma.js';
import bcrypt from 'bcryptjs';

const app = createApp();

describe('Auth API Endpoints', () => {
  beforeAll(async () => {
    await prisma.statusUpdate.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.role.createMany({
      data: [{ name: 'REQUESTER' }, { name: 'OFFICER' }, { name: 'ADMIN' }]
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testregister@example.com',
        password: 'password123',
        fullName: 'Test Register',
        userType: 'STUDENT',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    // create user
    const role = await prisma.role.findUnique({ where: { name: 'REQUESTER' } });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    await prisma.user.create({
      data: {
        email: 'testlogin@example.com',
        passwordHash,
        fullName: 'Test Login',
        roleId: role.id
      }
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testlogin@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });
});

```

### File: `server/src/modules/categories/categories.routes.js`

```javascript
import { Router } from 'express';
import { prisma } from '../../config/prisma.js';
import { authenticate } from '../../middleware/auth.js';
import { ok } from '../../utils/http.js';

const router = Router();

router.get('/', authenticate, async (_req, res, next) => {
  try {
    const categories = await prisma.requestCategory.findMany({ orderBy: { name: 'asc' } });
    ok(res, categories);
  } catch (err) {
    next(err);
  }
});

export default router;

```

### File: `server/src/modules/requests/requests.controller.js`

```javascript
import * as service from './requests.service.js';
import { ok, created } from '../../utils/http.js';

export async function create(req, res, next) {
  try {
    const request = await service.createRequest(req.user, req.body);
    created(res, request);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const { data, meta } = await service.listRequests(req.user, req.query);
    ok(res, data, meta);
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    const request = await service.getRequest(req.user, Number(req.params.id));
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

export async function cancel(req, res, next) {
  try {
    const request = await service.cancelRequest(req.user, Number(req.params.id));
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

export async function assign(req, res, next) {
  try {
    const request = await service.assignOfficer(req.user, Number(req.params.id), req.body);
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const request = await service.transitionStatus(
      req.user,
      Number(req.params.id),
      req.body.newStatus,
      req.body.comment
    );
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

```

### File: `server/src/modules/requests/requests.routes.js`

```javascript
import { Router } from 'express';
import * as controller from './requests.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { createRequestSchema, assignSchema, statusSchema } from './requests.schema.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new service request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, location, categoryId]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               priority:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Request created successfully
 */
router.post('/', authorize(ROLES.REQUESTER, ROLES.ADMIN), validate(createRequestSchema), controller.create);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests (role scoped)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get request details by ID
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request details
 */
router.get('/:id', controller.detail);

/**
 * @swagger
 * /api/requests/{id}/cancel:
 *   post:
 *     summary: Cancel a request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request cancelled
 */
router.post('/:id/cancel', authorize(ROLES.REQUESTER, ROLES.ADMIN), controller.cancel);

/**
 * @swagger
 * /api/requests/{id}/assign:
 *   post:
 *     summary: Assign a request to an officer (Admin only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [officerId]
 *             properties:
 *               officerId:
 *                 type: integer
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request assigned successfully
 */
router.post('/:id/assign', authorize(ROLES.ADMIN), validate(assignSchema), controller.assign);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   post:
 *     summary: Update request status (Officer/Admin only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.post('/:id/status', authorize(ROLES.OFFICER, ROLES.ADMIN), validate(statusSchema), controller.updateStatus);


export default router;

```

### File: `server/src/modules/requests/requests.schema.js`

```javascript
import { z } from 'zod';
import { PRIORITY_VALUES, STATUS_VALUES } from '../../utils/constants.js';

export const createRequestSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Please describe the issue'),
  location: z.string().min(2, 'Location is required'),
  categoryId: z.coerce.number().int().positive('Category is required'),
  priority: z.enum(PRIORITY_VALUES).optional(),
});

export const assignSchema = z.object({
  officerId: z.coerce.number().int().positive('Officer is required'),
  note: z.string().optional(),
});

export const statusSchema = z.object({
  newStatus: z.enum(STATUS_VALUES),
  comment: z.string().optional(),
});

```

### File: `server/src/modules/requests/requests.service.js`

```javascript
import { prisma } from '../../config/prisma.js';
import { ROLES, STATUS } from '../../utils/constants.js';
import { canTransition } from '../../utils/statusMachine.js';
import { badRequest, forbidden, notFound } from '../../utils/http.js';

const requestInclude = {
  category: true,
  requester: { select: { id: true, fullName: true, email: true, department: true } },
  assignments: {
    where: { isActive: true },
    include: { officer: { select: { id: true, fullName: true, email: true } } },
    orderBy: { assignedAt: 'desc' },
  },
  statusUpdates: {
    include: { updatedBy: { select: { id: true, fullName: true, role: { select: { name: true } } } } },
    orderBy: { createdAt: 'asc' },
  },
};

export async function createRequest(user, input) {
  const category = await prisma.requestCategory.findUnique({ where: { id: input.categoryId } });
  if (!category) throw badRequest('Invalid category');

  return prisma.serviceRequest.create({
    data: {
      title: input.title,
      description: input.description,
      location: input.location,
      priority: input.priority || 'MEDIUM',
      requesterId: user.id,
      categoryId: input.categoryId,
    },
    include: requestInclude,
  });
}

// Role-scoped listing with filters + pagination.
export async function listRequests(user, query) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const where = {};
  if (user.role === ROLES.REQUESTER) {
    where.requesterId = user.id;
  } else if (user.role === ROLES.OFFICER) {
    where.assignments = { some: { officerId: user.id, isActive: true } };
  }
  // ADMIN: no scope filter.

  if (query.status) where.status = String(query.status);
  if (query.categoryId) where.categoryId = Number(query.categoryId);
  if (query.priority) where.priority = String(query.priority);
  if (query.search) {
    where.OR = [
      { title: { contains: String(query.search) } },
      { description: { contains: String(query.search) } },
      { location: { contains: String(query.search) } },
    ];
  }

  const [total, data] = await Promise.all([
    prisma.serviceRequest.count({ where }),
    prisma.serviceRequest.findMany({
      where,
      include: {
        category: true,
        requester: { select: { id: true, fullName: true } },
        assignments: {
          where: { isActive: true },
          include: { officer: { select: { id: true, fullName: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
  ]);

  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

// Object-level access: requester (owner), assigned officer, or admin.
export async function getRequest(user, id) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: requestInclude,
  });
  if (!request) throw notFound('Request not found');

  const isOwner = request.requesterId === user.id;
  const isAssignedOfficer = request.assignments.some((a) => a.officer.id === user.id);
  if (user.role !== ROLES.ADMIN && !isOwner && !isAssignedOfficer) {
    throw forbidden('You cannot view this request');
  }
  return request;
}

export async function cancelRequest(user, id) {
  const request = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!request) throw notFound('Request not found');
  if (user.role !== ROLES.ADMIN && request.requesterId !== user.id) {
    throw forbidden('You can only cancel your own requests');
  }
  if (request.status !== STATUS.PENDING) {
    throw badRequest('Only pending requests can be cancelled');
  }

  return transitionStatus(user, id, STATUS.CANCELLED, 'Cancelled by requester');
}

export async function assignOfficer(user, id, input) {
  const request = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!request) throw notFound('Request not found');

  const officer = await prisma.user.findUnique({
    where: { id: input.officerId },
    include: { role: true },
  });
  if (!officer || officer.role.name !== ROLES.OFFICER) {
    throw badRequest('Selected user is not an officer');
  }

  if (!canTransition(request.status, STATUS.ASSIGNED, user.role)) {
    throw badRequest(`Cannot assign a request that is ${request.status}`);
  }

  return prisma.$transaction(async (tx) => {
    // Deactivate any previous active assignment (reassignment).
    await tx.assignment.updateMany({
      where: { requestId: id, isActive: true },
      data: { isActive: false },
    });
    await tx.assignment.create({
      data: {
        requestId: id,
        officerId: officer.id,
        assignedById: user.id,
        note: input.note,
      },
    });
    await tx.statusUpdate.create({
      data: {
        requestId: id,
        updatedById: user.id,
        oldStatus: request.status,
        newStatus: STATUS.ASSIGNED,
        comment: input.note || `Assigned to ${officer.fullName}`,
      },
    });
    return tx.serviceRequest.update({
      where: { id },
      data: { status: STATUS.ASSIGNED },
      include: requestInclude,
    });
  });
}

export async function transitionStatus(user, id, newStatus, comment) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: { assignments: { where: { isActive: true } } },
  });
  if (!request) throw notFound('Request not found');

  // Officers may only act on their own active assignment.
  if (user.role === ROLES.OFFICER) {
    const isAssigned = request.assignments.some((a) => a.officerId === user.id);
    if (!isAssigned) throw forbidden('This request is not assigned to you');
  }

  if (!canTransition(request.status, newStatus, user.role)) {
    throw badRequest(`Cannot change status from ${request.status} to ${newStatus}`);
  }

  return prisma.$transaction(async (tx) => {
    await tx.statusUpdate.create({
      data: {
        requestId: id,
        updatedById: user.id,
        oldStatus: request.status,
        newStatus,
        comment,
      },
    });
    return tx.serviceRequest.update({
      where: { id },
      data: { status: newStatus },
      include: requestInclude,
    });
  });
}

```

### File: `server/src/modules/requests/requests.test.js`

```javascript
import request from 'supertest';
import { createApp } from '../../app.js';
import { prisma } from '../../config/prisma.js';

const app = createApp();
let userToken = '';

describe('Requests API Endpoints', () => {
  beforeAll(async () => {
    await prisma.serviceRequest.deleteMany();
    await prisma.requestCategory.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    const role = await prisma.role.create({ data: { name: 'REQUESTER' } });
    await prisma.requestCategory.create({ data: { name: 'Electrical', description: 'Elec issues' } });

    // Register a user to get token
    const res = await request(app).post('/api/auth/register').send({
      email: 'requester@example.com',
      password: 'password123',
      fullName: 'Req User',
      userType: 'STUDENT'
    });
    userToken = res.body.data.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new service request', async () => {
    const category = await prisma.requestCategory.findFirst();
    const res = await request(app)
      .post('/api/requests')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Broken Light',
        description: 'Light in hallway is broken',
        location: 'Hallway A',
        categoryId: category.id,
        priority: 'MEDIUM'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Broken Light');
  });

  it('should list service requests', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

```

### File: `server/src/modules/users/users.routes.js`

```javascript
import { Router } from 'express';
import { prisma } from '../../config/prisma.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { ok } from '../../utils/http.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

// Admin: list users, optionally filtered by role (used to pick officers).
router.get('/', authenticate, authorize(ROLES.ADMIN), async (req, res, next) => {
  try {
    const where = {};
    if (req.query.role) where.role = { name: String(req.query.role) };

    const users = await prisma.user.findMany({
      where,
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        department: true,
        isActive: true,
        role: { select: { name: true } },
      },
    });
    ok(res, users.map((u) => ({ ...u, role: u.role.name })));
  } catch (err) {
    next(err);
  }
});

export default router;

```

### File: `server/src/server.js`

```javascript
import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.port, () => {
  console.log(`CampusFix API listening on http://localhost:${env.port}`);
  console.log(`Health check: http://localhost:${env.port}/api/health`);
});

```

### File: `server/src/utils/constants.js`

```javascript
// Enum-like constants (SQLite stores these as plain strings).

export const ROLES = {
  REQUESTER: 'REQUESTER',
  OFFICER: 'OFFICER',
  ADMIN: 'ADMIN',
};

export const STATUS = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED',
};

export const PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

export const USER_TYPE = {
  STUDENT: 'STUDENT',
  STAFF: 'STAFF',
};

export const STATUS_VALUES = Object.values(STATUS);
export const PRIORITY_VALUES = Object.values(PRIORITY);
export const USER_TYPE_VALUES = Object.values(USER_TYPE);

```

### File: `server/src/utils/http.js`

```javascript
// Helpers for the consistent { success, data|error, meta? } response envelope.

export function ok(res, data, meta) {
  const body = { success: true, data };
  if (meta) body.meta = meta;
  return res.json(body);
}

export function created(res, data) {
  return res.status(201).json({ success: true, data });
}

// Throwable API error picked up by the central error handler.
export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (msg, details) => new ApiError(400, 'BAD_REQUEST', msg, details);
export const unauthorized = (msg = 'Authentication required') => new ApiError(401, 'UNAUTHORIZED', msg);
export const forbidden = (msg = 'You do not have access to this resource') => new ApiError(403, 'FORBIDDEN', msg);
export const notFound = (msg = 'Resource not found') => new ApiError(404, 'NOT_FOUND', msg);
export const conflict = (msg) => new ApiError(409, 'CONFLICT', msg);

```

### File: `server/src/utils/statusMachine.js`

```javascript
import { STATUS, ROLES } from './constants.js';

// Allowed transitions: from -> [{ to, roles }]
const TRANSITIONS = {
  [STATUS.PENDING]: [
    { to: STATUS.ASSIGNED, roles: [ROLES.ADMIN] },
    { to: STATUS.CANCELLED, roles: [ROLES.REQUESTER, ROLES.ADMIN] },
    { to: STATUS.REJECTED, roles: [ROLES.ADMIN] },
  ],
  [STATUS.ASSIGNED]: [
    { to: STATUS.IN_PROGRESS, roles: [ROLES.OFFICER, ROLES.ADMIN] },
    { to: STATUS.ASSIGNED, roles: [ROLES.ADMIN] }, // reassignment
    { to: STATUS.REJECTED, roles: [ROLES.ADMIN] },
  ],
  [STATUS.IN_PROGRESS]: [
    { to: STATUS.COMPLETED, roles: [ROLES.OFFICER, ROLES.ADMIN] },
    { to: STATUS.REJECTED, roles: [ROLES.ADMIN] },
  ],
  [STATUS.COMPLETED]: [],
  [STATUS.CANCELLED]: [],
  [STATUS.REJECTED]: [],
};

export function canTransition(oldStatus, newStatus, role) {
  const options = TRANSITIONS[oldStatus] || [];
  return options.some((t) => t.to === newStatus && t.roles.includes(role));
}

```

### File: `client/.dockerignore`

```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
dist
coverage

```

### File: `client/.env`

```
VITE_API_URL=http://localhost:4000/api

```

### File: `client/.env.example`

```
VITE_API_URL=http://localhost:4000/api

```

### File: `client/Dockerfile`

```dockerfile
# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Pass API URL as build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the static files
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Remove default nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

```

### File: `client/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CampusFix — University Maintenance</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### File: `client/nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to the backend container
    location /api/ {
        proxy_pass http://backend:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Proxy Swagger docs to the backend container
    location /api-docs/ {
        proxy_pass http://backend:4000/api-docs/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}

```

### File: `client/package.json`

```json
{
  "name": "campusfix-client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.59.0",
    "axios": "^1.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.27.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "jsdom": "^29.1.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.10",
    "vitest": "^4.1.10"
  }
}

```

### File: `client/postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

### File: `client/src/api/client.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// Attach the JWT from localStorage to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('campusfix_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise the { success, data, error } envelope into thrown errors / plain data.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const apiError = error.response?.data?.error;
    const message = apiError?.message || error.message || 'Request failed';
    // Auto-logout on auth failure.
    if (error.response?.status === 401) {
      localStorage.removeItem('campusfix_token');
    }
    return Promise.reject(Object.assign(new Error(message), { details: apiError?.details }));
  }
);

export default api;

```

### File: `client/src/api/resources.js`

```javascript
import api from './client.js';

export const authApi = {
  login: (body) => api.post('/auth/login', body).then((r) => r.data.data),
  register: (body) => api.post('/auth/register', body).then((r) => r.data.data),
  me: () => api.get('/auth/me').then((r) => r.data.data),
};

export const categoriesApi = {
  list: () => api.get('/categories').then((r) => r.data.data),
};

export const usersApi = {
  officers: () => api.get('/users?role=OFFICER').then((r) => r.data.data),
};

export const requestsApi = {
  list: (params) => api.get('/requests', { params }).then((r) => r.data),
  get: (id) => api.get(`/requests/${id}`).then((r) => r.data.data),
  create: (body) => api.post('/requests', body).then((r) => r.data.data),
  cancel: (id) => api.post(`/requests/${id}/cancel`).then((r) => r.data.data),
  assign: (id, body) => api.post(`/requests/${id}/assign`, body).then((r) => r.data.data),
  updateStatus: (id, body) => api.post(`/requests/${id}/status`, body).then((r) => r.data.data),
};

```

### File: `client/src/App.jsx`

```javascript
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Requests from './pages/Requests.jsx';
import RequestDetail from './pages/RequestDetail.jsx';
import NewRequest from './pages/NewRequest.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
      <Route path="/requests/new" element={<ProtectedRoute roles={['REQUESTER', 'ADMIN']}><NewRequest /></ProtectedRoute>} />
      <Route path="/requests/:id" element={<ProtectedRoute><RequestDetail /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

```

### File: `client/src/components/Layout.jsx`

```javascript
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function navClass({ isActive }) {
  return `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
  }`;
}

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">CampusFix</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
            <NavLink to="/requests" className={navClass}>Requests</NavLink>
            {user?.role === 'REQUESTER' && (
              <NavLink to="/requests/new" className={navClass}>New Request</NavLink>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">{user?.fullName}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

```

### File: `client/src/components/ProtectedRoute.jsx`

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner } from './ui.jsx';
import Layout from './Layout.jsx';

// Requires authentication; optionally restricts to specific roles.
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return (
      <Layout>
        <div className="rounded-lg bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-800">Access denied</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your role ({user.role}) cannot view this page.
          </p>
        </div>
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
}

```

### File: `client/src/components/ui.jsx`

```javascript
// Small shared UI primitives kept in one file for the MVP.

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function Input(props) {
  return (
    <input
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      {...props}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      {...props}
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      {...props}
    >
      {children}
    </select>
  );
}

const STATUS_STYLES = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ASSIGNED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-slate-200 text-slate-600',
  REJECTED: 'bg-red-100 text-red-800',
};

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

const PRIORITY_STYLES = {
  LOW: 'text-slate-500',
  MEDIUM: 'text-blue-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600 font-semibold',
};

export function PriorityTag({ priority }) {
  return <span className={`text-xs ${PRIORITY_STYLES[priority] || ''}`}>{priority}</span>;
}

export function Spinner() {
  return (
    <div className="flex justify-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
    </div>
  );
}

export function EmptyState({ title, subtitle }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white py-12 text-center">
      <p className="font-medium text-slate-700">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-semibold text-slate-800">{title}</h3>
        {children}
      </div>
    </div>
  );
}

```

### File: `client/src/context/AuthContext.jsx`

```javascript
import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/resources.js';

const AuthContext = createContext(null);

const TOKEN_KEY = 'campusfix_token';
const USER_KEY = 'campusfix_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  // On load, if we have a token, confirm it's still valid.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((fresh) => {
        setUser(fresh);
        localStorage.setItem(USER_KEY, JSON.stringify(fresh));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persist(token, u) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }

  async function login(credentials) {
    const { token, user: u } = await authApi.login(credentials);
    persist(token, u);
    return u;
  }

  async function register(body) {
    const { token, user: u } = await authApi.register(body);
    persist(token, u);
    return u;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

```

### File: `client/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-slate-50 text-slate-800 antialiased;
}

```

### File: `client/src/main.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

```

### File: `client/src/pages/Dashboard.jsx`

```javascript
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { requestsApi } from '../api/resources.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner, StatusBadge, Button } from '../components/ui.jsx';

const STATUSES = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'];

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent || 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  // Fetch a wide page to compute simple counts client-side (MVP).
  const { data, isLoading } = useQuery({
    queryKey: ['requests', 'dashboard'],
    queryFn: () => requestsApi.list({ limit: 50 }),
  });

  if (isLoading) return <Spinner />;

  const requests = data?.data || [];
  const total = data?.meta?.total ?? requests.length;
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = requests.filter((r) => r.status === s).length;
    return acc;
  }, {});

  const greeting = {
    REQUESTER: 'Track your maintenance requests',
    OFFICER: 'Your assigned jobs',
    ADMIN: 'System overview',
  }[user.role];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {user.fullName.split(' ')[0]}</h1>
          <p className="text-sm text-slate-500">{greeting}</p>
        </div>
        {user.role === 'REQUESTER' && (
          <Link to="/requests/new"><Button>+ New Request</Button></Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total" value={total} accent="text-indigo-600" />
        <StatCard label="Pending" value={counts.PENDING} accent="text-yellow-600" />
        <StatCard label="In Progress" value={counts.IN_PROGRESS} accent="text-indigo-600" />
        <StatCard label="Completed" value={counts.COMPLETED} accent="text-green-600" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h2 className="font-semibold text-slate-700">Recent activity</h2>
          <Link to="/requests" className="text-sm text-indigo-600 hover:underline">View all →</Link>
        </div>
        {requests.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">No requests yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {requests.slice(0, 6).map((r) => (
              <li key={r.id} className="flex items-center justify-between px-5 py-3">
                <Link to={`/requests/${r.id}`} className="min-w-0">
                  <p className="truncate font-medium text-slate-700 hover:text-indigo-600">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.category?.name} · {r.location}</p>
                </Link>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

```

### File: `client/src/pages/Login.jsx`

```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { Button, Field, Input } from '../components/ui.jsx';

const DEMO = [
  ['Admin', 'admin@university.edu'],
  ['Officer', 'officer1@university.edu'],
  ['Requester', 'student@university.edu'],
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">CampusFix</h1>
          <p className="text-sm text-slate-500">University Maintenance & Service Requests</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Field label="Email">
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@university.edu"
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </Field>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>

          <p className="text-center text-sm text-slate-500">
            No account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
          </p>
        </form>

        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
          <p className="mb-1 font-medium">Demo accounts (password: password123)</p>
          {DEMO.map(([role, email]) => (
            <button
              key={email}
              onClick={() => setForm({ email, password: 'password123' })}
              className="mr-2 mt-1 rounded bg-white px-2 py-1 hover:bg-indigo-50"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

```

### File: `client/src/pages/NewRequest.jsx`

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { requestsApi, categoriesApi } from '../api/resources.js';
import { Button, Field, Input, Textarea, Select, Spinner } from '../components/ui.jsx';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function NewRequest() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.list });

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    categoryId: '',
    priority: 'MEDIUM',
  });
  const [errors, setErrors] = useState([]);

  const mutation = useMutation({
    mutationFn: (body) => requestsApi.create(body),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success('Request submitted!');
      navigate(`/requests/${created.id}`);
    },
    onError: (err) => {
      if (err.details) setErrors(err.details);
      toast.error(err.message);
    },
  });

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    mutation.mutate({ ...form, categoryId: Number(form.categoryId) });
  }

  const fieldError = (name) => errors.find((d) => d.field === name)?.message;

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-slate-800">New Service Request</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <Field label="Title" error={fieldError('title')}>
          <Input required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Short summary of the issue" />
        </Field>

        <Field label="Description" error={fieldError('description')}>
          <Textarea required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the problem in detail" />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Category" error={fieldError('categoryId')}>
            <Select required value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)}>
              <option value="">Select a category…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>

          <Field label="Priority" error={fieldError('priority')}>
            <Select value={form.priority} onChange={(e) => update('priority', e.target.value)}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
        </div>

        <Field label="Location" error={fieldError('location')}>
          <Input required value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Hostel B, Room 214" />
        </Field>

        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting…' : 'Submit request'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

```

### File: `client/src/pages/NotFound.jsx`

```javascript
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-5xl font-bold text-slate-300">404</h1>
      <p className="text-slate-500">This page doesn’t exist.</p>
      <Link to="/dashboard" className="text-indigo-600 hover:underline">Go to dashboard</Link>
    </div>
  );
}

```

### File: `client/src/pages/Register.jsx`

```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { Button, Field, Input, Select } from '../components/ui.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'STUDENT',
    department: '',
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);
    try {
      await register(form);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      if (err.details) setErrors(err.details);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (name) => errors.find((d) => d.field === name)?.message;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">Create your account</h1>
          <p className="text-sm text-slate-500">Register as a student or staff requester</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Field label="Full name" error={fieldError('fullName')}>
            <Input required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
          </Field>
          <Field label="Email" error={fieldError('email')}>
            <Input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
          </Field>
          <Field label="Password" error={fieldError('password')}>
            <Input type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} />
          </Field>
          <Field label="I am a" error={fieldError('userType')}>
            <Select value={form.userType} onChange={(e) => update('userType', e.target.value)}>
              <option value="STUDENT">Student</option>
              <option value="STAFF">Staff</option>
            </Select>
          </Field>
          <Field label="Department / Hostel" error={fieldError('department')}>
            <Input value={form.department} onChange={(e) => update('department', e.target.value)} placeholder="e.g. Hostel B" />
          </Field>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Creating…' : 'Register'}
          </Button>
          <p className="text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

```

### File: `client/src/pages/RequestDetail.jsx`

```javascript
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { requestsApi, usersApi } from '../api/resources.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner, StatusBadge, PriorityTag, Button, Modal, Field, Select, Textarea } from '../components/ui.jsx';

// Which next statuses each role can move a request to, given its current status.
const OFFICER_NEXT = { ASSIGNED: ['IN_PROGRESS'], IN_PROGRESS: ['COMPLETED'] };

function Timeline({ updates }) {
  if (!updates?.length) {
    return <p className="text-sm text-slate-500">No status history yet.</p>;
  }
  return (
    <ol className="relative space-y-4 border-l border-slate-200 pl-5">
      {updates.map((u) => (
        <li key={u.id} className="relative">
          <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white" />
          <div className="flex items-center gap-2">
            <StatusBadge status={u.newStatus} />
            <span className="text-xs text-slate-400">
              {new Date(u.createdAt).toLocaleString()}
            </span>
          </div>
          {u.comment && <p className="mt-1 text-sm text-slate-600">{u.comment}</p>}
          <p className="text-xs text-slate-400">by {u.updatedBy?.fullName}</p>
        </li>
      ))}
    </ol>
  );
}

export default function RequestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null); // 'assign' | 'status' | null

  const { data: request, isLoading, error } = useQuery({
    queryKey: ['request', id],
    queryFn: () => requestsApi.get(id),
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ['request', id] });
    queryClient.invalidateQueries({ queryKey: ['requests'] });
  }

  const cancelMutation = useMutation({
    mutationFn: () => requestsApi.cancel(id),
    onSuccess: () => { invalidate(); toast.success('Request cancelled'); },
    onError: (e) => toast.error(e.message),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  const activeAssignment = request.assignments?.[0];
  const isOwner = request.requester?.id === user.id;
  const canCancel = isOwner && request.status === 'PENDING';
  const canAssign = user.role === 'ADMIN' && ['PENDING', 'ASSIGNED'].includes(request.status);
  const officerNext = user.role === 'OFFICER' ? OFFICER_NEXT[request.status] : null;
  const canUpdateStatus =
    (user.role === 'ADMIN' && !['COMPLETED', 'CANCELLED', 'REJECTED'].includes(request.status)) ||
    (officerNext && officerNext.length > 0);

  return (
    <div className="space-y-6">
      <Link to="/requests" className="text-sm text-indigo-600 hover:underline">← Back to requests</Link>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-3 flex items-start justify-between gap-4">
              <h1 className="text-xl font-bold text-slate-800">{request.title}</h1>
              <StatusBadge status={request.status} />
            </div>
            <p className="whitespace-pre-wrap text-slate-600">{request.description}</p>

            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
              <div><dt className="text-slate-400">Category</dt><dd className="font-medium text-slate-700">{request.category?.name}</dd></div>
              <div><dt className="text-slate-400">Location</dt><dd className="font-medium text-slate-700">{request.location}</dd></div>
              <div><dt className="text-slate-400">Priority</dt><dd><PriorityTag priority={request.priority} /></dd></div>
              <div><dt className="text-slate-400">Submitted</dt><dd className="font-medium text-slate-700">{new Date(request.createdAt).toLocaleDateString()}</dd></div>
              <div><dt className="text-slate-400">Requester</dt><dd className="font-medium text-slate-700">{request.requester?.fullName}</dd></div>
              <div><dt className="text-slate-400">Assigned officer</dt><dd className="font-medium text-slate-700">{activeAssignment?.officer?.fullName || '—'}</dd></div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-slate-700">Status timeline</h2>
            <Timeline updates={request.statusUpdates} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 font-semibold text-slate-700">Actions</h2>
            <div className="space-y-2">
              {canAssign && (
                <Button className="w-full" onClick={() => setModal('assign')}>
                  {activeAssignment ? 'Reassign officer' : 'Assign officer'}
                </Button>
              )}
              {canUpdateStatus && (
                <Button variant="secondary" className="w-full" onClick={() => setModal('status')}>
                  Update status
                </Button>
              )}
              {canCancel && (
                <Button variant="danger" className="w-full" disabled={cancelMutation.isPending} onClick={() => cancelMutation.mutate()}>
                  Cancel request
                </Button>
              )}
              {!canAssign && !canUpdateStatus && !canCancel && (
                <p className="text-sm text-slate-500">No actions available for your role.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {modal === 'assign' && <AssignModal request={request} onClose={() => setModal(null)} onDone={invalidate} />}
      {modal === 'status' && (
        <StatusModal request={request} role={user.role} onClose={() => setModal(null)} onDone={invalidate} />
      )}
    </div>
  );
}

function AssignModal({ request, onClose, onDone }) {
  const [officerId, setOfficerId] = useState('');
  const [note, setNote] = useState('');
  const { data: officers = [] } = useQuery({ queryKey: ['officers'], queryFn: usersApi.officers });

  const mutation = useMutation({
    mutationFn: () => requestsApi.assign(request.id, { officerId: Number(officerId), note: note || undefined }),
    onSuccess: () => { onDone(); toast.success('Officer assigned'); onClose(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Modal title="Assign officer" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Officer">
          <Select value={officerId} onChange={(e) => setOfficerId(e.target.value)}>
            <option value="">Select an officer…</option>
            {officers.map((o) => <option key={o.id} value={o.id}>{o.fullName} ({o.department})</option>)}
          </Select>
        </Field>
        <Field label="Note (optional)">
          <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={!officerId || mutation.isPending} onClick={() => mutation.mutate()}>
            {mutation.isPending ? 'Assigning…' : 'Assign'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function StatusModal({ request, role, onClose, onDone }) {
  // Admins get broad control; officers get their allowed next steps.
  const ADMIN_OPTIONS = {
    PENDING: ['ASSIGNED', 'REJECTED'],
    ASSIGNED: ['IN_PROGRESS', 'REJECTED'],
    IN_PROGRESS: ['COMPLETED', 'REJECTED'],
  };
  const options = role === 'OFFICER' ? OFFICER_NEXT[request.status] || [] : ADMIN_OPTIONS[request.status] || [];

  const [newStatus, setNewStatus] = useState(options[0] || '');
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationFn: () => requestsApi.updateStatus(request.id, { newStatus, comment: comment || undefined }),
    onSuccess: () => { onDone(); toast.success('Status updated'); onClose(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Modal title="Update status" onClose={onClose}>
      <div className="space-y-4">
        <Field label="New status">
          <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            {options.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </Select>
        </Field>
        <Field label="Comment (optional)">
          <Textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={!newStatus || mutation.isPending} onClick={() => mutation.mutate()}>
            {mutation.isPending ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

```

### File: `client/src/pages/Requests.jsx`

```javascript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { requestsApi, categoriesApi } from '../api/resources.js';
import { Spinner, StatusBadge, PriorityTag, EmptyState, Input, Select, Button } from '../components/ui.jsx';

const STATUSES = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'];

export default function Requests() {
  const [filters, setFilters] = useState({ search: '', status: '', categoryId: '', page: 1 });

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.list });
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['requests', filters],
    queryFn: () =>
      requestsApi.list({
        search: filters.search || undefined,
        status: filters.status || undefined,
        categoryId: filters.categoryId || undefined,
        page: filters.page,
        limit: 10,
      }),
    keepPreviousData: true,
  });

  function update(key, value) {
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));
  }

  const requests = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Service Requests</h1>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <Input
          placeholder="Search title, description, location…"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />
        <Select value={filters.status} onChange={(e) => update('status', e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </Select>
        <Select value={filters.categoryId} onChange={(e) => update('categoryId', e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : requests.length === 0 ? (
        <EmptyState title="No requests found" subtitle="Try adjusting your filters." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link to={`/requests/${r.id}`} className="font-medium text-slate-700 hover:text-indigo-600">
                      {r.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{r.category?.name}</td>
                  <td className="px-4 py-3 text-slate-500">{r.location}</td>
                  <td className="px-4 py-3"><PriorityTag priority={r.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Page {meta.page} of {meta.totalPages} · {meta.total} total
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={filters.page <= 1 || isFetching}
              onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={filters.page >= meta.totalPages || isFetching}
              onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

```

### File: `client/src/tests/Login.test.jsx`

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../pages/Login.jsx';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    login: vi.fn(),
    user: null,
  })
}));

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /CampusFix/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@university.edu/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });
});

```

### File: `client/src/tests/setup.js`

```javascript
import '@testing-library/jest-dom';

```

### File: `client/src/tests/ui.test.jsx`

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button, Input } from '../components/ui.jsx';

describe('UI Components', () => {
  it('renders a Button with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders an Input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });
});

```

### File: `client/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

### File: `client/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    globals: true
  },
  server: {
    port: 5173,
  },
});

```

### File: `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:15-alpine
    container_name: campusfix-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: campusfix
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: campusfix-backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgrespassword@db:5432/campusfix?schema=public
      - JWT_SECRET=super_secret_jwt_key_in_docker
      - PORT=4000
      - CLIENT_ORIGIN=http://localhost:3000
    depends_on:
      - db
    restart: unless-stopped

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
      args:
        - VITE_API_URL=/api
    container_name: campusfix-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  postgres_data:

```

