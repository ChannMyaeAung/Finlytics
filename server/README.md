# Finlytics Server

Express + TypeScript API for Finlytics.

## Setup

1. Install deps: `pnpm install`
2. Create `.env.local` (dev) or `.env` (prod) with:
   - `MONGODB_URI=...`
   - `PORT=5000`
   - `EXCHANGE_RATE_API_KEY=...` (optional)
3. Run: `pnpm dev`

## Scripts

- `pnpm dev` — start API with nodemon + ts-node
