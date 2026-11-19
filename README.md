# SmartQueue

SmartQueue is a frontend-only virtual queue MVP. Customers can discover services, receive sequential digital tokens, and track their queue position. Businesses operate a live demo queue from a browser dashboard.

## Tech stack

- React and Vite
- React Router
- Lucide React icons
- Browser `localStorage` only — no backend or cloud database

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Demo credentials

- Email: `admin@careplus.com`
- Password: `admin123`

Authentication is simulated for the frontend demo and is not secure production authentication.

## Features

- Seeded Mumbai-area businesses, services, and active queues.
- Account-free customer queue joining.
- Sequential business token generation, for example `A-027`.
- Live position, people-ahead, and estimated wait calculations.
- Business dashboard with call next, complete, and cancel actions.
- Customer history in the current browser.
- Service and business profile management.
- Analytics calculated from stored queue entries.
- Cross-tab refresh using the browser storage event.
- Reset Demo Data in dashboard settings.

## Data architecture

`src/services/storage.js` centralizes all persistence under `smartqueue_*` localStorage keys and initializes realistic seed data on first launch. The data is browser-local and does not synchronize across devices.

## Netlify deployment

The project is configured for static Netlify deployment:

- Build command: `npm run build`
- Publish directory: `dist`

`netlify.toml` includes an SPA fallback so direct visits to React Router paths such as `/businesses`, `/dashboard`, and `/queue/:id` work after deployment.

## Production direction

A production SmartQueue would replace demo authentication and browser storage with secure server-side authentication, a shared database, authorization, notifications, and multi-device synchronization.
