# Credit Portfolio (Next.js)

Primary app for the **Credit Portfolio Snapshot** UI: App Router, TypeScript, Tailwind CSS, and shared styling in `app/credit-portfolio.css`.

## Prerequisites

- **Node.js** 20+ (matches Next 16 expectations)
- **npm** (lockfile: `package-lock.json`)

## Setup

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` if you need overrides:

```bash
cp .env.example .env.local
```

Server-side parsing lives in `lib/env.ts` (`NODE_ENV` is optional and usually set automatically by Next.js). Add any new `process.env` reads to `.env.example` with comments.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server at [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Production build (`.next/`) |
| `npm run start` | Serve production build (run `build` first) |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke tests (needs build + browsers; see below) |

## E2E tests (Playwright)

1. Install browsers once: `npx playwright install chromium`
2. Build the app: `npm run build`
3. Run tests: `npm run test:e2e`

In CI, Chromium is installed automatically before `playwright test`. Locally you can also run `npm run dev` on port 3000 and use `npx playwright test` with reuse of the existing server (see `playwright.config.ts`).

## Deploy (e.g. Vercel)

- **Root directory:** set to `web/` if the host asks for a subdirectory.
- **Build command:** `npm run build`
- **Output:** Next.js default (no static export unless you change config).
- **Install:** `npm install` or `npm ci` in `web/`.

## Legacy static site

The repository root may still contain `index.html`, `app.js`, and `styles.css` — an older one-page version. The **product surface in active development is this `web/` app**. Do not delete legacy files unless that is an explicit product decision.

## Docs

- Workspace overview: [`../README.md`](../README.md)
- Checklists: [`../CHECKLIST.md`](../CHECKLIST.md)
- Agent notes: [`../AGENTS.md`](../AGENTS.md), [`AGENTS.md`](./AGENTS.md)

## UI stack note

This project uses **shadcn v4** with the **Base UI** preset (see `components.json`). To align with Radix-only components, re-run the shadcn initializer with the desired registry/options — see root `AGENTS.md`.
