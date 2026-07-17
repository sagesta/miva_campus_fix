# CampusFix — MVP (Core Full-Stack Slice)

University Maintenance & Service Request System. This MVP implements the core of the
[system design](../campusfix-system-design.md): JWT auth with role-based access,
service requests with role-scoped listing/search/filter/pagination, admin assignment,
an officer status-update flow with a validated state machine, and a React frontend.

> **Database:** This MVP runs on **SQLite** for zero-setup local development. The Prisma
> schema is kept Postgres-portable (enum fields are validated strings). To deploy on
> Postgres/Neon, change the `datasource` provider and `DATABASE_URL`, then re-migrate.

## What's included

**Backend** (`server/`) — Express + Prisma + SQLite
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/requests` — role-scoped (requester → own, officer → assigned, admin → all) with `?search=&status=&categoryId=&priority=&page=&limit=`
- `POST /api/requests`, `GET /api/requests/:id`, `POST /api/requests/:id/cancel`
- `POST /api/requests/:id/assign` (admin), `POST /api/requests/:id/status` (officer/admin)
- `GET /api/categories`, `GET /api/users?role=OFFICER` (admin)
- `authenticate` + `authorize` middleware, Zod validation, central error handler,
  helmet, CORS, auth rate-limiting, and a `canTransition()` status state machine.

**Frontend** (`client/`) — React 18 + Vite + Tailwind + TanStack Query
- Login / Register, role-aware Dashboard, Requests list (search/filter/pagination),
  New Request form, Request detail with status timeline and role-based actions
  (assign officer, update status, cancel), toast feedback, protected routes.

**Not in this slice** (per the design's full spec): Cloudinary image upload, in-app
notifications, reports/CSV export, Swagger docs, and the audit-log UI. The schema and
structure leave room to add these next.

## Prerequisites

- Node.js 18+ (built with Node 25)
- npm

## Quick start

The application is fully containerized using Docker. The setup runs the React frontend behind Nginx and proxies API traffic to the Express backend container. SQLite data is stored in a persistent Docker volume (`sqlite_data`), so your data survives container restarts.

```bash
docker-compose up --build -d
```

Open your browser to:
- **Application**: [http://localhost:3000](http://localhost:3000)
- **API Documentation (Swagger)**: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)
- **API Health Check**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

The API container will automatically apply database migrations, seed initial data (roles, admin users), and start the server. To stop the application, run `docker-compose down`. This will keep your database intact. Use `docker-compose down -v` only if you wish to reset all application data.

## Local Development (Baremetal)

If you prefer to run the application locally without Docker, open two terminals:

### 1. Backend
```bash
cd server
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```

## Demo accounts

All use password **`password123`** (click the buttons on the login page to autofill):

| Role | Email |
|---|---|
| Admin | `admin@university.edu` |
| Officer | `officer1@university.edu` (also `officer2@university.edu`) |
| Requester | `student@university.edu` (also `staff@university.edu`) |

New sign-ups are always created as **Requesters**. Officer/Admin accounts are seeded.

## Try the full lifecycle

1. **Requester** (`student@…`) → New Request → submit a fault. It appears as `PENDING`.
2. **Admin** (`admin@…`) → open the request → **Assign officer** → status becomes `ASSIGNED`.
3. **Officer** (the assigned one) → open the request → **Update status** →
   `IN_PROGRESS`, then `COMPLETED`. The requester sees the timeline update.

Invalid status jumps (e.g. `ASSIGNED → COMPLETED`) are rejected by the state machine.

## Environment variables

**`server/.env`** (a working default is committed as `.env` for local dev)
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-me"
PORT=4000
CLIENT_ORIGIN="http://localhost:5173"
```

**`client/.env`**
```
VITE_API_URL=http://localhost:4000/api
```

## Project layout

```
webbuild/
├── server/
│   ├── prisma/          # schema.prisma, migrations/, seed.js
│   └── src/
│       ├── config/      # env, prisma client
│       ├── middleware/  # authenticate, authorize, validate, errorHandler
│       ├── modules/     # auth/ users/ categories/ requests/  (routes+controller+service+schema)
│       ├── utils/       # constants, statusMachine, http helpers
│       ├── app.js       # express app (exported)
│       └── server.js    # listen()
└── client/
    └── src/
        ├── api/         # axios client + resource modules
        ├── context/     # AuthContext
        ├── components/  # Layout, ProtectedRoute, ui primitives
        └── pages/       # Login, Register, Dashboard, Requests, RequestDetail, NewRequest
```

## Useful scripts

**server/**
- `npm run dev` — start with reload (nodemon)
- `npm run seed` — (re)seed data
- `npm run db:reset` — drop, re-migrate, and re-seed the database

**client/**
- `npm run dev` — Vite dev server
- `npm run build` — production build
