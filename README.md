# Musajil

Enterprise event management platform: guest-first registration, real-time check-in operations, and predictive analytics. React + Vite frontend, Vercel serverless API (`/api/**`), Neon Postgres with Drizzle ORM, JWT session cookies.

## Stack

- **Frontend:** React 18, Vite, Wouter, TanStack Query, Tailwind, shadcn/ui
- **API:** Vercel serverless functions (`@vercel/node`)
- **Data:** Neon Postgres via `@neondatabase/serverless` + Drizzle ORM
- **Auth:** `jose` JWT in HttpOnly cookie, `bcryptjs` password hashing

## Quick start

```bash
cp .env.example .env       # fill in DATABASE_URL and JWT_SECRET
npm install
npm run db:migrate         # provisions fresh schema (destructive — dev only)
npm run dev                # vite dev on :3000 (proxies /api → :3001)
```

For local API development, run Vercel's dev server alongside vite:

```bash
npx vercel dev             # serves /api/** on :3001
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server. |
| `npm run build` | Production bundle → `dist/public`. |
| `npm run start` | Preview the production bundle. |
| `npm run check` | TypeScript typecheck. |
| `npm run db:push` | Push Drizzle schema diff (non-destructive). |
| `npm run db:migrate` | Reset & recreate tables (destructive). |
| `npm run smoke` | Smoke test a deployed URL (see `scripts/smoke-prod.mjs`). |

## Environment variables

See `.env.example`. Required at runtime:

- `DATABASE_URL` — Neon pool connection string.
- `JWT_SECRET` — ≥16 chars. Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

## Project layout

```
api/              Vercel serverless routes (auth, events, registrations)
client/           React SPA
  src/pages/      Home, Login, Register, Dashboard, EventDetail, PublicRegister
  src/components/ MusajilLogo, shadcn/ui primitives
lib/              Shared server code (db, auth helpers)
shared/           Drizzle schema + Zod validation schemas
scripts/          Migrations, smoke tests
```

## Deploy

Push to the main branch connected to Vercel. The included `vercel.json` configures the build command, SPA rewrites, cache headers, and function `maxDuration`. Set `DATABASE_URL` and `JWT_SECRET` in the Vercel project settings before the first deploy, then run `npm run db:migrate` locally against the production DB (or `npm run db:push` for non-destructive updates).
