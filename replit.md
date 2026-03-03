# Musajil — Event Management Platform

## Overview
Musajil is an enterprise-grade event management platform featuring guest-first registration, real-time operations command center, and predictive analytics.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS v3 + shadcn/ui + Recharts
- **Backend**: Express.js (Node.js) + TypeScript
- **Routing**: Wouter (client-side)
- **Data Fetching**: TanStack Query
- **Auth**: Session-based authentication with express-session + memorystore + bcrypt
- **Database**: Drizzle ORM (PostgreSQL via Neon) — in-memory storage used by default

## Project Structure
```
client/
  src/
    pages/
      Home.tsx              — Main landing page with navigation
      Login.tsx             — Sign in page (email/password + social auth buttons)
      Register.tsx          — Sign up page (Figma-matched, multi-field form)
      Dashboard.tsx         — Mission Control dashboard with sidebar, charts, events
      not-found.tsx         — 404 page
      sections/             — Landing page sections
    hooks/
      use-auth.ts           — Authentication hook (login, register, logout, session)
      use-toast.ts          — Toast notifications hook
    components/ui/          — shadcn/ui components
    lib/                    — Utilities and query client
server/
  index.ts                 — Express server entry point
  routes.ts                — API route registration
  auth.ts                  — Authentication middleware (session, login, register, logout)
  storage.ts               — In-memory storage with user CRUD
shared/
  schema.ts                — Drizzle schema + Zod validation types (users, login, register)
client/public/figmaAssets/ — All static SVG/PNG assets from Figma
```

## API Routes
- `POST /api/auth/register` — Create account (firstName, lastName, email, password, company, role, eventSize, agreedToTerms, marketingOptIn)
- `POST /api/auth/login` — Sign in (email, password)
- `POST /api/auth/logout` — Sign out (destroys session)
- `GET /api/auth/me` — Get current authenticated user

## Pages
- `/` — Landing page (public)
- `/login` — Sign in page
- `/register` — Create account page (multi-field, Figma design matched)
- `/dashboard` — Mission Control dashboard (sidebar nav, event cards, KPI metrics, charts, activity feed)

## User Schema Fields
id, username, email, name, firstName, lastName, company, role, eventSize, agreedToTerms, marketingOptIn, password

## Dashboard Features
- Sidebar navigation (Dashboard, Events, Attendees, Analytics, Check-in, Integrations, Manage section, Settings, Help)
- Risk alert banner (dismissible)
- 3 event cards (Live/Tomorrow/Scheduled) with interactive actions
- 4 KPI metric cards (Total Registered, Checked In, Venue Capacity, Avg Wait Time)
- Arrival Forecast area chart (recharts)
- Registration Trend bar chart
- Venue Capacity donut chart
- Recent Activity feed
- Mobile-responsive sidebar with hamburger menu

## Key Notes
- Section filenames don't always match content (legacy naming from migration)
- All Figma assets are in `client/public/figmaAssets/`
- The server runs on port 5000 (configured via `PORT` env variable)
- Password hashing uses bcrypt (10 salt rounds)
- Sessions stored in memorystore (dev-friendly, not for production)
- Deployment: autoscale, build=npm run build, run=NODE_ENV=production node dist/index.js
