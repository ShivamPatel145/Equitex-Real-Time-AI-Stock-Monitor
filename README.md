# Equitex - Real-Time AI Stock Monitor

Equitex is a modern stock market dashboard built with Next.js 16 and React 19.
It focuses on Indian market symbols and now includes full auth and backend
integration for:

- Live-style market widgets powered by TradingView
- Stock discovery with filters and sorting
- A browser-persistent watchlist experience
- Email/password authentication with Better Auth + MongoDB
- Inngest workflow for personalized welcome emails

## Highlights

- Dashboard with ticker tape, heatmap, movers, market overview, and screener widgets
- Search page with symbol/company lookup, sector filters, and sort modes
- Watchlist page with add/remove/clear actions and local persistence via `localStorage`
- Curated Indian stock dataset with sectors, market cap, and valuation fields
- Responsive UI using Tailwind CSS v4 + shadcn-inspired component patterns
- Server actions for sign-up, sign-in, and sign-out
- MongoDB connection helper with global cache for hot-reload safety
- Nodemailer templates for welcome/news/alert lifecycle emails

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI: React 19, Tailwind CSS v4, Radix UI primitives
- Forms: react-hook-form
- Auth: better-auth + MongoDB adapter
- Workflows: Inngest
- Email: Nodemailer
- Notifications: Sonner
- Icons: lucide-react
- Language: TypeScript

## Routes

- `/` - Main market dashboard
- `/search` - Search and filter stocks, add to watchlist
- `/watchlist` - Personalized watchlist view
- `/sign-in` - Sign-in form UI
- `/sign-up` - Sign-up and preference form UI
- `/api/auth/[...all]` - Better Auth API handler
- `/api/inngest` - Inngest route handler

## Getting Started

### 1. Prerequisites

- Node.js 20+
- npm (comes with Node.js)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.demo` to `.env` or `.env.local`, then fill in real credentials.

Required keys:

- `MONGODB_URI`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `GEMINI_API_KEY`
- `NODEMAILER_EMAIL`
- `NODEMAILER_PASSWORD`

### 4. Start Development Server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

## Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Create production build with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
npx tsx scripts/check-db-direct.ts   # Direct MongoDB connection test
npx tsx scripts/check-db-helper.ts   # Test DB via shared helper
```

## Project Structure

```text
app/
  (auth)/
    sign-in/page.tsx
    sign-up/page.tsx
  (root)/
    page.tsx
    search/page.tsx
    watchlist/page.tsx
components/
  forms/
  ui/
hooks/
  useTradingViewWidget.tsx
lib/
  actions/
  better-auth/
  constants.ts
  inngest/
  nodemailer/
database/
scripts/
```

## Data and Widget Notes

- Stock and sector data is currently static and defined in `lib/constants.ts`.
- Trading charts and market widgets are embedded via TradingView scripts.
- Watchlist state is stored in the browser under the key:
  `equitex.watchlist.symbols`.
- User auth/session data is stored in MongoDB through Better Auth.
- Welcome onboarding emails are generated/sent through Inngest + Nodemailer.

## Current Scope

- Auth pages are fully wired to server actions and session-aware route guards.
- Market data in the dashboard remains static for local setup.

## Disclaimer

This project is for educational and product prototyping purposes and does not
constitute financial advice.
