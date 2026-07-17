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

Open two terminals.

### 1. Backend

```bash
cd server
npm install
npx prisma migrate dev          # creates SQLite db + runs migrations
npm run seed                    # seeds roles, categories, users, sample requests
npm run dev                     # http://localhost:4000  (health: /api/health)
```

### 2. Frontend

```bash
cd client
npm install
npm run dev                     # http://localhost:5173
```

Open http://localhost:5173 and sign in with a demo account.

## Docker Compose deployment

The container setup runs the React application behind Nginx and proxies API traffic
to the Express container. SQLite data is stored in the named `campusfix_data` volume,
so requests and users survive container restarts and image rebuilds.

```bash
docker compose up --build -d
```

Open:

- Application: `http://localhost:8080`
- Swagger API documentation: `http://localhost:8080/api-docs`
- API health check: `http://localhost:8080/api/health`

The API container automatically applies committed Prisma migrations and safely runs
the idempotent seed script before starting. Stop the application with
`docker compose down`. This keeps the database volume. Use
`docker compose down -v` only when you intentionally want to delete all application data.

For a non-local deployment, copy `.env.docker.example` to `.env`, set a strong
`JWT_SECRET`, set `CLIENT_ORIGIN` to the public application URL, and optionally change
`APP_PORT`. Keep `VITE_API_URL=/api` when the web and API containers use the supplied
Nginx proxy.

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
