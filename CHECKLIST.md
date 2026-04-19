# Credit Portfolio — plan checklist

Use this list to track the rollout of setup, UX verification, and optional hardening.

## Repository & workflow

- [x] **Single root Git repo** — `git init` at workspace root; nested `web/.git` removed (back up first if you had unique history there).
- [x] **Root `.gitignore`** — ignores `node_modules`, `.next`, env files, Playwright artifacts, `*.pdf` (keep statement PDFs local), etc.
- [ ] **Remote** — Add `origin` and push when you are ready (`git remote add origin …`).

## Environment

- [x] **`web/.env.example`** — Present; copy to `web/.env.local` for overrides.
- [ ] **Secrets** — Never commit `.env.local`; document any new `process.env` vars in `.env.example` when you add them.

## Product & docs

- [x] **`web/README.md`** — Credit Portfolio–specific setup, scripts, deploy, legacy note.
- [x] **Root `README.md`** — Points to `web/` vs legacy static files.
- [x] **`AGENTS.md`** — Git + verify commands + UI stack note.

## Automated checks (CI)

- [x] **GitHub Actions** — Lint + build on push/PR (`.github/workflows/ci.yml`).
- [ ] **Branch protection** — Optional: require CI green before merge.

## Local verification (run after UI changes)

- [ ] **`cd web && npm run lint`** — Passes.
- [ ] **`cd web && npm run build`** — Passes.
- [ ] **E2E smoke** — `cd web && npm run build && npm run test:e2e` (requires Playwright browsers; CI installs Chromium).

## Device / accessibility (manual)

- [ ] **Narrow viewport / real phone** — Sticky section nav does not cover anchored headings; in-page links land with comfortable offset (`--section-scroll-pad` / `--snap-nav-est` in `web/app/credit-portfolio.css`).
- [ ] **Charts** — On small screens, chart areas scroll horizontally where `.chart-shell` uses `min-width` inside `.chart-scroll`.
- [ ] **`prefers-reduced-motion`** — Smooth scrolling off where reduced; decorative animations off; hover motion minimized on cards.

## Optional hardening

- [ ] **Deploy** — Connect repo to Vercel (or other host); set root to `web/` if the platform asks for a subdirectory; set env vars in the dashboard.
- [ ] **More E2E** — Extend `web/e2e/` beyond the home smoke test (flows, a11y).
- [ ] **shadcn alignment** — If you need Radix-only instead of Base UI preset, re-init per `web/components.json` / `AGENTS.md` UI stack note.

---

**Last updated:** implementation pass (see git history). Tick boxes as you complete items in your environment.
