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
| `npm run build` | Static export (`out/`) — `output: "export"` in `next.config.ts` |
| `npm run preview` | Serve `out/` on port 3000 (run `build` first; used by CI E2E) |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke tests (needs build + browsers; see below) |

## E2E tests (Playwright)

1. Install browsers once: `npx playwright install chromium`
2. **Local:** run `npm run dev`, then `npm run test:e2e` (Playwright reuses the dev server when not in CI).
3. **CI-style (static):** `npm run build && CI=true npm run test:e2e` — serves `out/` via `npm run preview`.

In CI, the workflow builds first, then runs Playwright against the static `out/` folder.

## Deploy

### GitHub Pages (primary for this repo)

Workflow: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml). On push to `main`, it builds with `NEXT_BASE_PATH=/<repository-name>` so assets resolve under `https://<user>.github.io/<repo>/`.

**One-time setup:** Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Other hosts (e.g. Vercel)

- **Root directory:** `web/`
- **Build command:** `npm run build`
- **Output / publish directory:** `out/` (static export)
- **Base path:** If the site is not at domain root, set `NEXT_BASE_PATH` the same way as Pages (leading slash, no trailing slash), e.g. `/my-repo`.

## Legacy static site

The repository root may still contain `index.html`, `app.js`, and `styles.css` — an older one-page version. The **product surface in active development is this `web/` app**. Do not delete legacy files unless that is an explicit product decision.

## Docs

- Workspace overview: [`../README.md`](../README.md)
- Checklists: [`../CHECKLIST.md`](../CHECKLIST.md)
- Agent notes: [`../AGENTS.md`](../AGENTS.md), [`AGENTS.md`](./AGENTS.md)

## UI stack note

This project uses **shadcn v4** with the **Base UI** preset (see `components.json`). To align with Radix-only components, re-run the shadcn initializer with the desired registry/options — see root `AGENTS.md`.
