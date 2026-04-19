# Agent notes (Credit card workspace)

## Layout

- **Legacy snapshot (static):** `index.html`, `app.js`, `styles.css` — one-page credit portfolio UI; do not delete without explicit user request.
- **Next.js app (primary for new work):** `web/` — Next.js 16.2.1, App Router, TypeScript strict, Tailwind, shadcn planned.

## Where rules live

- Project conventions: `.cursor/rules/*.mdc` (always read relevant globs when editing matching paths).

## Environment

- Template for the app: `web/.env.example` — add new required variables there whenever code reads `process.env.*`.

## Verify

- From `web/`: `npm run lint`, `npm run build` after non-trivial changes.

## UI stack note

- `web/` uses **shadcn v4** (`components.json`, `components/ui`). The initializer may use the **Base UI** preset (`base-nova`) rather than legacy Radix-only shadcn; follow `components.json` when adding components. To align strictly with Radix, re-run `npm exec shadcn@latest -- init` with the desired component base or registry options.

## Git

- **Single repo at this workspace root** — track `web/`, legacy static files, and docs together. If you still have a nested `web/.git` from an old scaffold, back up any commits you need, then remove `web/.git` so only the root `.git` remains.
