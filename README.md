# Finlytics

Full-stack personal finance app with a React (Vite) client, Node/Express API, and Sanity Studio for content.
I tried to make a renamed clone of "toshl.com" site (finlytics) but integrated a finance management with tan-stack table for "budgeting" ./budgeting endpoint which makes use of MongoDB which can only be accessed only after logging in.
Authentication is all handled by Clerk.
The remaining page contents are the same as "toshl.com"

Check out toshl here: https://toshl.com/

## Tech Stack

- Client: React + Vite + TypeScript + Tailwind
- Server: Express + TypeScript + MongoDB (Mongoose)
- CMS: Sanity Studio

## Project Structure

- client/ — React frontend
- server/ — Express API
- sanity/ — Sanity Studio

## Local Development

Start each app in its own terminal.

### Client

1. Install deps: `pnpm install`
2. Run: `pnpm dev`

### Server

1. Install deps: `pnpm install`
2. Run: `pnpm dev`

### Sanity Studio

1. Install deps: `pnpm install`
2. Run: `pnpm dev`

## Environment Variables

Set these in the respective `.env` files.

### client/.env

- VITE_API_BASE_URL=http://localhost:5000

### server/.env or server/.env.local

- MONGODB_URI
- PORT=5000
- EXCHANGE_RATE_API_KEY

### Sanity CORS

Allow the frontend origin:
`npx sanity cors add http://localhost:5173 --credentials`

## Deployment Notes

- Client needs `VITE_API_BASE_URL` set to the deployed API URL.
- Server must allow CORS from the deployed client origin.
- Sanity CORS must include the deployed client URL.
