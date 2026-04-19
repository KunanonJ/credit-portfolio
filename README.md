# Credit card — Credit Portfolio workspace

This folder contains **two UI surfaces**:

| Surface | Path | Role |
|--------|------|------|
| **Next.js app (primary)** | [`web/`](./web/) | Credit Portfolio UI — App Router, TypeScript, Tailwind, production target. |
| **Legacy static snapshot** | [`index.html`](./index.html), [`app.js`](./app.js), [`styles.css`](./styles.css) | Earlier one-page demo; kept for reference (do not delete without an explicit decision). |

## Quick start (Next app)

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Full setup, deploy, QA, and optional E2E: see [`web/README.md`](./web/README.md).

## Checklists & agent context

- **Implementation / verification checklist:** [`CHECKLIST.md`](./CHECKLIST.md)
- **Repository & tooling notes:** [`AGENTS.md`](./AGENTS.md)

## Git

The repository is intended as a **single repo at this root** (`web/` is not a nested Git subproject). If you still see a stray `web/.git` from an old scaffold, remove it after backing up any commits you need.
