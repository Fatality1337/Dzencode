# Inventory Warehouse

Production-like warehouse SPA: React/Vite frontend, typed Redux state, Express API, GraphQL, Socket.IO, Prisma/MySQL and Docker.

## Features

- Orders with detail panel, calculated totals, currencies and confirmation delete.
- Products with selector-based filtering and warranty dates.
- Lazy React Router routes, 404, i18n RU/EN/UK, Web Storage, Web Worker and PWA offline fallback.
- REST, GraphQL, Socket.IO active sessions, EventBus and Prisma `Order 1:N Product` schema.

## Architecture

```text
UI -> Redux/API -> REST or GraphQL -> controller -> service -> repository -> Prisma/MySQL
Browser -> Socket.IO -> session manager -> broadcast
Controller -> EventBus -> websocket side effects
```

```text
src/{app, pages, widgets, shared/{api,components,data,hooks,i18n,types,utils,workers}}
server/src/{controllers,events,graphql,repositories,routes,services,websocket}
server/prisma/{schema.prisma,seed.ts}
test/  e2e/
```

## Installation

Requires Node.js 22+ and npm 10+.

```bash
npm install
copy .env.example .env
npm run db:generate
npm run dev
```

Vite runs on `5173`; API runs on `4000`. Environment variables are documented in `.env.example`.

## REST API

`GET /health`, `GET /api/orders`, `GET /api/orders/:id`, `GET /api/products`, `DELETE /api/orders/:id`.

REST is used for resource operations and health checks. Controllers delegate to services/repositories and production errors do not expose stack traces.

## GraphQL API

`POST /graphql` supports `orders`, `order(id)`, `products` and `deleteOrder(id)`. GraphQL is useful for nested order/product reads; REST remains simpler for commands and health checks.

## WebSocket and events

Socket.IO is the source of truth for active connections. `sessions:changed` is broadcast on connect/disconnect. `ORDER_DELETED` travels through the in-memory EventBus and becomes `orders:changed`.

## Database and Docker

```bash
npm run db:migrate
npm run db:seed
docker compose up --build
```

Compose starts frontend `5173`, backend `4000` and MySQL `3306`. Prisma schema is in `server/prisma/schema.prisma`.

## PWA, i18n and Worker

`public/manifest.webmanifest` and `public/sw.js` provide installability and offline fallback. `orderStatistics.worker.ts` performs aggregate calculations outside the UI thread. Translations live in `src/shared/i18n`; language preference uses Web Storage.

## Testing and scripts

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm run build:server
npm run format
```

Unit tests cover totals, currency conversion, date formatting and reducers. Playwright covers navigation, order selection/delete surface and product flow. Run `npx playwright install` before E2E.

The repository has a working in-memory repository so the API can run without MySQL; Prisma schema and seed are ready for the database adapter. JWT/maps were not added because this task has no auth or geospatial workflow.

## Verification

The repository passes `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` and `npm run build:server`.
