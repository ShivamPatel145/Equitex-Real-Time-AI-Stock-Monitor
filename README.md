# Equitex - Real-Time AI Stock Monitor

Equitex is a modern stock market dashboard built with Next.js 16 and React 19.
It focuses on Indian market symbols and provides an interactive UI for:

- Live-style market widgets powered by TradingView
- Stock discovery with filters and sorting
- A browser-persistent watchlist experience
- Auth-style onboarding forms (UI flow currently)

## Highlights

- Dashboard with ticker tape, heatmap, movers, market overview, and screener widgets
- Search page with symbol/company lookup, sector filters, and sort modes
- Watchlist page with add/remove/clear actions and local persistence via `localStorage`
- Curated Indian stock dataset with sectors, market cap, and valuation fields
- Responsive UI using Tailwind CSS v4 + shadcn-inspired component patterns

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI: React 19, Tailwind CSS v4, Radix UI primitives
- Forms: react-hook-form
- Icons: lucide-react
- Language: TypeScript

## Routes

- `/` - Main market dashboard
- `/search` - Search and filter stocks, add to watchlist
- `/watchlist` - Personalized watchlist view
- `/sign-in` - Sign-in form UI
- `/sign-up` - Sign-up and preference form UI

## Getting Started

### 1. Prerequisites

- Node.js 20+
- npm (comes with Node.js)

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Create production build with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
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
	constants.ts
```

## Data and Widget Notes

- Stock and sector data is currently static and defined in `lib/constants.ts`.
- Trading charts and market widgets are embedded via TradingView scripts.
- Watchlist state is stored in the browser under the key:
	`equitex.watchlist.symbols`.

## Current Scope

- Auth pages are currently form/UI implementations without backend auth wiring.
- No external market API is required for local setup.

## Disclaimer

This project is for educational and product prototyping purposes and does not
constitute financial advice.