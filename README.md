# Inventory Warehouse

Production-like warehouse management SPA for incomes, products, groups and users.

## Stack

React 19, TypeScript, Vite, Redux Toolkit, React Router, Axios, Apollo GraphQL, Tailwind CSS, Socket.IO, Express, Prisma, MySQL, Vitest and Playwright.

## Features

- Orders/incomes with calculated totals, currencies, details panel, creation and confirmation delete.
- Full product CRUD with Zod validation, type filtering and global search.
- Group and user CRUD with edit forms, confirmation delete and role management.
- REST API for commands and health checks; GraphQL for nested order/product reads.
- Socket.IO active sessions and realtime data refresh through an in-memory event bus.
- Web Worker statistics, PWA manifest/service worker, i18n (RU/EN/UK) and Web Storage.
- Responsive Tailwind/BEM interface with loading, error, empty and toast states.

## Architecture

```text
UI -> Redux/API -> REST or GraphQL -> controller -> service -> repository -> Prisma/MySQL
Browser -> Socket.IO -> session manager -> sessions/data broadcasts
Controller -> EventBus -> websocket and logging side effects
```

Frontend is feature-oriented: `app`, `pages`, `widgets`, `features`, `entities` and `shared`. Backend follows route -> controller -> service -> repository separation.

## Local development

Requirements: Node.js 22+, npm 10+.

```bash
npm install
copy .env.example .env
npm run db:generate
npm run dev
```

Frontend: `http://localhost:5173`. API: `http://localhost:4000`.

## Docker and MySQL

Docker Desktop must be running.

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f backend
```

Compose starts `mysql`, `backend` and `frontend`. Backend uses `USE_DATABASE=true`, runs `prisma migrate deploy` before startup and connects to MySQL through the internal service name. To seed the database after the containers start:

```bash
docker compose exec backend npm run db:seed
```

The migration and seed are in `server/prisma`. Never use `docker compose down -v` unless you intentionally want to delete the local MySQL volume.

## API

REST endpoints:

```text
GET    /health
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
DELETE /api/orders/:id
GET    /api/products
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
GET/POST/PATCH/DELETE /api/groups
GET/POST/PATCH/DELETE /api/users
```

GraphQL is available at `POST /graphql` with `orders`, `order(id)`, `products` and `deleteOrder(id)`. REST is kept for resource commands and health checks; GraphQL is used where nested reads are convenient.

## Testing and scripts

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run format
```

Unit/selector tests cover totals, currency conversion, dates, reducers and product filtering. Playwright covers order deletion, product filtering and active sessions between browser contexts. Install browsers once with `npx playwright install`.

## Environment

Copy `.env.example` to `.env`. Database credentials and API URLs are environment variables; secrets are not committed.

## PWA and deployment

`public/manifest.webmanifest` and `public/sw.js` provide installability and a basic offline fallback. Build the frontend with `npm run build` and serve `dist`; run the backend with `npm run build:server && npm start`. For production, use Docker/VPS for the API and MySQL and Vercel/Netlify or Nginx for the SPA.
JWT authentication is implemented for protected routes and user sessions. Maps are integrated using react-leaflet to display warehouse locations.

A standalone database schema file (`database-schema.sql`) is included in the root directory for easy inspection in MySQL Workbench.
