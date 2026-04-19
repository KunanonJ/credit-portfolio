# Credit Portfolio workspace

**One-page credit portfolio snapshot** — balances, minimums, utilization, due dates, and an audit-oriented view. The main product UI is a **Next.js 16** app in [`web/`](./web/) (static export, TypeScript, Tailwind CSS).

| Surface | Path | Role |
|--------|------|------|
| **Next.js app (primary)** | [`web/`](./web/) | Credit Portfolio UI — App Router, static export, deploy target for GitHub Pages. |
| **Legacy static snapshot** | [`index.html`](./index.html), [`app.js`](./app.js), [`styles.css`](./styles.css) | Earlier one-page demo; kept for reference. |

## Live site (GitHub Pages)

After you connect the repo and enable **Pages → GitHub Actions**, the site is available at:

**`https://kunanonj.github.io/<repository-name>/`**

Replace `<repository-name>` with the exact GitHub repo name (it must match `NEXT_BASE_PATH` used in the [Pages workflow](.github/workflows/pages.yml)).

## GitHub repository metadata (copy-paste)

Use these when creating or editing the repo on GitHub ([github.com/KunanonJ](https://github.com/KunanonJ)).

| Field | Suggested value |
|--------|-----------------|
| **Description** | One-page Next.js credit portfolio snapshot — balances, utilization, due dates, issuers, and audit view. |
| **Website** | `https://kunanonj.github.io/<repository-name>/` (after first successful Pages deploy) |
| **Topics** | `nextjs`, `typescript`, `tailwindcss`, `personal-finance`, `credit-cards`, `portfolio`, `github-pages`, `static-site` |

**CLI (requires [GitHub CLI](https://cli.github.com/) `gh`):**

```bash
gh repo edit <owner>/<repo> \
  --description "One-page Next.js credit portfolio snapshot — balances, utilization, due dates, issuers, and audit view." \
  --homepage "https://kunanonj.github.io/<repository-name>/"
gh repo edit <owner>/<repo> \
  --add-topic nextjs --add-topic typescript --add-topic tailwindcss \
  --add-topic personal-finance --add-topic credit-cards --add-topic portfolio \
  --add-topic github-pages --add-topic static-site
```

## Quick start (Next app)

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

More detail: [`web/README.md`](./web/README.md).

## CI and deployment

- **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)): lint, build, Playwright against static `out/`.
- **GitHub Pages** ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)): build with `NEXT_BASE_PATH=/repo-name`, deploy `web/out` via GitHub Actions.

## Checklists & agent context

- **Implementation / verification checklist:** [`CHECKLIST.md`](./CHECKLIST.md)
- **Repository & tooling notes:** [`AGENTS.md`](./AGENTS.md)

## Git

Single repo at this root (`web/` is not a nested Git subproject). Remove any stray `web/.git` from old scaffolds if present.

## Create remote and push (example)

From this directory, with your chosen repo name (e.g. `credit-portfolio`):

```bash
git remote add origin https://github.com/KunanonJ/<repository-name>.git
git push -u origin main
```

Or create the repository and push in one step:

```bash
gh repo create KunanonJ/<repository-name> --public --source=. --remote=origin --push
```

Then enable **Settings → Pages → Source: GitHub Actions** and confirm the Pages workflow run on `main`.
