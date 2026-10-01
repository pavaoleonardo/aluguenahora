# AGENTS.md — Alugue na Hora

Working rules for every AI agent on this repo (Cline, GitHub Copilot, Codex, Claude Code,
Gemini/Antigravity).

**Structure of this file**
- §0–§10 = the shared, stack-agnostic block, copied **verbatim** from
  `~/Desktop/projects/_standards/AGENTS-common.md` (mirrored at Obsidian
  `Mi mind/_Standards/AGENTS-common.md`). Do not edit those sections here: edit the master and
  re-copy it down. The master's §11 explains how to adopt the standard in another project.
- **`## Project deltas`** (at the end) = everything specific to Alugue na Hora: stack facts, exact
  commands, the deploy recipe, DB rules, language exceptions.
- Product and architecture truth lives in `SPEC.md`; precedence is `AGENTS.md` → `SPEC.md` →
  `constitution.md` → other docs (Obsidian Dossier, Antigravity artifacts). Code beats all documents.

<!-- BEGIN SHARED BLOCK — verbatim from AGENTS-common.md §0–§10 -->
## 0. Language

- Always **answer the user in English**, whatever language they write in.
- Code, comments, commit messages and docs you write: English.
- Exception: the app's user-facing UI copy stays in the product's language (Spanish for
  Renovation Estimates, Portuguese for Alugue na Hora). `SPEC.md` may be written in the
  product's language — that is about the product, not about how you reply.

## 1. Priority of these rules

These rules exist to cut token cost. They **never** outrank security or correctness. The
savings apply to exploration, verbosity and repetition — never to validation, authorization
checks, secret handling, or "the build must pass".

## 2. Never read, never search (or only names, not values)

- `node_modules/`, `.next/`, `venv/`, `out/`, `dist/`, `build/`, `.vercel/`, `.strapi/`
- `.git/` internals, lockfiles (`package-lock.json`), `*.tsbuildinfo`
- Binaries and documents: `*.pdf`, `*.xlsx`, images, `*.sqlite`. Parse them with a script and
  print counts/derived values, never the payload.
- `.env*`: key **names** only, never values. Never echo tokens, connection strings or
  credentials into the transcript.
- Prefer `grep -c` / `grep -l` / `grep -n` over reading a file; print counts instead of matches.
- Do not grep build output for strings that live in the source — search the source.

## 3. Bounded reads

- Read with a line range (`start_line`/`end_line`, or `sed -n 'X,Yp'`). Never pull a whole
  large file "to be safe". Cap a single read at ~400 lines.
- Never re-read a file already read in this session; use what you already have.
- Read `SPEC.md` section by section, not end to end.
- Never read your own build/test artifacts to "confirm" — read the source or query the system.

## 4. Bounded command output

- Pipe long output through `| tail -40`, `| head -40`, `grep -c` or `wc -l`.
- No dumps of SQL result sets, JSON payloads, build logs or diffs of generated files.
- Prefer one command that answers the question over three that explore.
- Never repeat a command whose result you already have, and never re-run it "just to confirm".

## 5. Database

- Read-only `SELECT` only, with `LIMIT` or `count(*)`; never `SELECT *` without a limit.
- Mutations (INSERT/UPDATE/DELETE) only when the user explicitly asks, always preceded by a
  backup (`\copy … to '/tmp/…'`) or wrapped in a transaction, with counts verified before and after.
- Always scope by the tenant/owner column (`company_id`, `user_id`…) and re-check affected rows.
- Never touch migrations, RLS policies or schema files unless that is exactly the task.
- **Agent memory stores are databases too**: never write to them with raw SQL. Use the
  product's own API/CLI (`engram save`, `mem_save`), so dedupe, FTS and sync bookkeeping hold.

## 6. Verification budget

- Run the project's type-check, lint and build **once per code change**.
- Do not re-run a regression suite to reconfirm something already confirmed, and do not loop on
  hypotheses: state what you will check, then check it once.
- Deploy/alias polling: at most 2–3 checks.
- Do not commit or push unless the user asks; **never push without an explicit instruction**.
  Before any commit: `git status --short` plus a scoped conventional message.

## 7. Sessions and reporting

- One session per task. When the topic closes, end the session instead of stacking a new topic
  onto a large context.
- If context grows without progress: stop, summarize state and open questions, and ask.
- Close every task with: **files changed** (and commit hash), **how it was verified**, and
  **what remains unverified**. Say plainly when something was not tested.

## 8. Secrets (NON-NEGOTIABLE)

- **NEVER upload any kind of password or secret to GitHub** — plaintext passwords, password
  hashes, database passwords, service keys, API keys, tokens, `.env` values. Not in code, not in
  commits, not in commit messages, not in issues, docs or comments, not even temporarily.
  **No exceptions, ever.** Assume every pushed commit is permanently world-readable.
- Secrets live only in the gitignored env file (`.env`, `.env.local`) and in the host's
  environment variables. Nowhere else.
- Never log credentials: no `console.log` of passwords, tokens or connection strings.
- Before every commit: `git diff --cached --name-only`, then grep the staged set for
  `password|secret|key|token`.
- If a credential is ever exposed: **rotate it immediately**, then rewrite history. Assume it is
  already compromised the moment it is pushed.
- Never echo a secret into the transcript, even to show that it is wrong.

## 9. Memory and documentation loop

- `SPEC.md` in the project root is the **single source of truth** for project context. Coding
  tasks prioritise it over every other document.
- New features and architecture decisions are written into `SPEC.md` **before** implementation.
- **Every session**: update `SPEC.md` → save the update to Engram → update the Obsidian mirror
  (SPEC note + Dossier).
- Every `SPEC.md` carries a reconciliation stamp in §4:
  `**Last reconciled: YYYY-MM-DD** — synced against main @ <hash>`. When the stamp and the code
  disagree, the code wins and the stamp is fixed.
- Project docs are usually gitignored on purpose (`*.md`) because the repo is public — so the
  durable homes are: the local `SPEC.md`, the Obsidian mirror, and Engram. Never treat "it is in
  git" as a backup for a gitignored doc.
- **One project = one Engram key**, and the key is the repo/folder name (`aluguenahora`,
  `renovation-estimates-saas`, `escala-constance`, `_standards`) — never a path-like or
  account-like key. Always pass `--project` on save: a memory with an empty project is invisible
  to `--project` searches, and a second key for the same project silently splits its history in
  two. `scope=personal` with **no** project is reserved for global preferences that belong to no
  repo. Audit with
  `select project, scope, count(*) from observations where deleted_at is null group by 1, 2;`
  (a blank project or a `/` in a key both mean work to do).
- Note the case-insensitivity trap on macOS: `rm SPEC.md` also deletes `spec.md`. Match the exact
  filename before deleting a spec or doc.

## 10. Git and deploy handoff

- **Never run `git commit`, `git push` or a deploy script in the background.** The user runs them
  in their own terminal (needed for SSH password prompts, and for control over what ships).
- Always end a task that changed files with a paste-ready code block: the exact `git add`,
  `git commit -m "…"` and `git push` commands.
- Run git commands from the **repository root**, never from a subdirectory of a monorepo.
- When the user says "commit" on a VPS-hosted project, they mean **deploy to production**:
  provide `git push` **and** the deploy command.
- Deploy commands are project-specific and belong in the project's own `AGENTS.md`
  (Project deltas) and in `SPEC.md` §7 — never in this shared file.

<!-- END SHARED BLOCK -->

## Project deltas — Alugue na Hora

### D1. Repo layout and stack (verified 2026-09-28 @ `3875178`)
- Monorepo with two npm apps: `frontend/` (Next.js 16.1.1 App Router, React 19.2.3, Tailwind 4,
  TypeScript 5, Headless UI, Leaflet) and `backend/` (Strapi 5.33.2, PostgreSQL, Cloudinary upload
  provider, Resend mail). Node 20.x. No ORM/DB client in the frontend — it consumes Strapi REST.
- Everything runs on **one Hostinger VPS** (`$VPS_IP`; the address lives in the local-only `SPEC.md`) behind
  Nginx, managed by PM2 through the
  root `ecosystem.config.js`. **Never propose Vercel, Render, Netlify or Supabase here**: this stack
  is Next-on-VPS + Strapi, and a "just deploy it to Vercel" suggestion is simply wrong.
- `SPEC.md` §2 lists pinned versions and §3 the routes/components/infrastructure. Read those before
  proposing changes; §3's "Known drift" is the list of places the docs currently lie.

### D2. Commands (run from the monorepo root)
```bash
npm --prefix frontend run dev        # Next dev (script disables Turbopack)
npm --prefix frontend run build      # next build
npm --prefix frontend run lint       # eslint (ESLint 9 flat config)
npm --prefix backend  run build      # strapi build
npm --prefix backend  run develop    # strapi develop
cd frontend && npx tsc --noEmit      # type-check (no npm script); ⚠ stale .next/types reddens it — SPEC drift #13
cd frontend && npx playwright test   # E2E — defaults to PRODUCTION, see D9
bash tools/dev.sh [both|backend|frontend]   # local stack: Strapi :1337 + Next :3000
bash tools/check-prod.sh             # read-only production health check (no password, ~35 s)
```
- Verification is **once per code change** (shared §6): type-check + lint + build. Do not re-run.
- Git commands only from the **monorepo root**. From inside `frontend/`,
  `git add frontend/tests/x` silently resolves to `frontend/frontend/tests/x` and fails.
- There is no test runner for `backend/`; Strapi changes are verified by `npm run build` plus a
  read-only API probe.

### D3. Language
- Answer the user in **English**. `SPEC.md`, `AGENTS.md` and commit messages: English.
- User-facing UI copy and email templates: **Portuguese (PT-BR)**. The Obsidian Dossier:
  Portuguese. Never localise the agent docs into PT, and never "translate" the app UI into English.

### D4. Database
- **Production = PostgreSQL 14**; a manual `pg_dump` on 2026-09-30 reported client **14.24**, and `SPEC.md`
  §3 drift #14 corrected the "15" this file used to claim — never pin 15. SQLite is only Strapi's development
  default. `pg` is a hard dependency, and the April 2026 outage was a Postgres permissions/junction-table problem.
  `constitution.md` §3 ("SQLite (Production)") is **wrong** — do not act on it.
- Read-only SQL with `LIMIT` or `count(*)`; always scope by `user`. No migration or schema edits
  unless that is exactly the task.
- **Never** insert into `engram.db` by hand (use the `engram save` CLI, which keeps `normalized_hash`
  dedupe + FTS triggers + sync bookkeeping intact), and never commit `*.sql` dumps.

### D5. Secrets (project specifics)
- Secret files: `frontend/.env.local`, `backend/.env`. **Names only** in the transcript, never values.
- Never echo, log or commit: the VPS root password, the PostgreSQL password, Strapi `APP_KEYS` /
  `JWT_SECRET` / `ADMIN_JWT_SECRET` / `API_TOKEN_SALT`, `CLOUDINARY_*`, the Resend API key.
- `git status` may show `backend-debug.log` and `backup_local.sql`; both are gitignored local
  artifacts — leave them alone and never stage them.
- `*.md` is gitignored on purpose: `SPEC.md` stays **local** because it names the VPS IP, the deploy
  paths and the mail host, and this repo may be public. `AGENTS.md` **is tracked** since `1ccf25a`
  (2026-09-30, together with `tools/`) — it must never contain a secret, a password or an IP-shaped
  credential.
- Repo visibility is unverified (no `gh` on this machine): assume public.

### D6. Deploy (Alugue na Hora specific)
- On this project **"commit" means ship to production**: always hand over the paste-ready block from
  `SPEC.md` §7, which is the canonical recipe:
```bash
git add <paths> && git commit -m "<type>: <scope>" && git push origin main
bash .agents/skills/deploy-to-hostinger/scripts/deploy.sh [frontend|backend|all]
```
- **The deploy runs from the Mac, not from the server.** `hostinger-deploy.sh` **never existed in this
  repo** — any recipe telling you to `bash hostinger-deploy.sh` on the VPS is wrong (it cost a failed
  deploy on 2026-09-30: the pull succeeds, the build never runs). The real script is gitignored and lives
  at `.agents/skills/deploy-to-hostinger/scripts/deploy.sh`; it streams over SSH `git reset --hard &&
  git pull origin main`, then `npm install && npm run build` in the target app, then
  `pm2 startOrRestart ecosystem.config.js --only aluguenahora-<target> --update-env`. If it is missing
  again, recover it with
  `git show f1edc6f:.agents/skills/deploy-to-hostinger/scripts/deploy.sh` — **`f1edc6f` is the last
  revision that carried it** (removed in `b6f4915`, which is why `deploy-to-hostinger/SKILL.md` still
  points at a script that is not on disk).
- The VPS uses **root + password SSH, no key auth** → the **user** runs these commands in their own
  terminal. Never run them in the background, never ask for the password, at most 2–3 verification
  checks afterwards.
- Always push **before** deploying (the script pulls `main`), and remember the **maintenance shield
  is currently ON** for anonymous visitors: "the site looks like a placeholder" is that overlay
  (`a67737d`), not a failed deploy.
- `tools/*.sh` (`check-prod.sh`, `dev.sh`, and the `~/ahn-prod-fix/` one-paste scripts) are
  **operational helpers, not deploy scripts** — they touch neither git nor PM2.
- After a deploy, verify from the outside with `bash tools/check-prod.sh` instead of asking for extra SSH
  round-trips (the 2–3 check budget in shared §6). PM2/nginx logs need a separate SSH session, which the
  user runs.
- A production build is mandatory after deploying CSS/image changes — static assets and `clip-path`
  work does not appear without the cache clear + `npm run build`.

### D7. Drift to keep in mind (summary)
`SPEC.md` §3 is the live list. The three that bite most often:
1. **Three competing deploy recipes** exist; `SPEC.md` §7 is canonical and the others are history.
2. **`constitution.md` §3 says SQLite** while production is PostgreSQL (see D4).
3. **Engram key** — there is exactly **one** key, `aluguenahora` (the old path-like
   `pavaoleonardo/aluguenahora` was merged into it on 2026-09-28 — §3 drift #5 is closed). Always save
   with `--project aluguenahora`, type `architecture` or `bugfix`, and a specific title; never save
   without a project (a blank project is invisible to `--project` searches).

### D8. Documentation loop (project paths)
- Canonical: `/Users/pavaoleonardo/Desktop/projects/aluguenahora/SPEC.md`
- Obsidian mirror: `Mi mind/Alugue na Hora/SPEC - Alugue na Hora.md` (spec) +
  `Mi mind/Alugue na Hora/Alugue na Hora.md` (Dossier, Portuguese, session log)
- Engram: `engram save "<title>" "<content>" --type architecture --project aluguenahora`
- Standards master: `~/Desktop/projects/_standards/` (`AGENTS-common.md`, `SPEC-STANDARD.md`)
  mirrored at `Mi mind/_Standards/`. This file's shared block must match §0–§10 of the master —
  after editing the master, re-copy it into every project that uses it.

### D9. Local dev loop and pre-push verification (added 2026-09-29)
- There are exactly **two environments: this Mac and the VPS**. There is no staging server, and inventing
  one is out of scope — read the local-only **`DEVELOPMENT.md`** before proposing any "how do we test
  this" plan; it documents what each level can and cannot catch.
- **`bash tools/dev.sh`** (`both|backend|frontend`) starts Strapi on `:1337` + Next on `:3000`, waits for
  `/_health` and `:3000`, and stops both on Ctrl+C. Anonymous visitors — you included — get the
  **maintenance overlay**; sign in at `/login` (the overlay deliberately lets `/login` through).
- **`bash tools/check-prod.sh`** is the read-only pre/post-deploy gate: frontend 200s + brand, the deployed
  bundles carry the production API host, redirects/HSTS/TLS, `/dashboard` protection, Strapi health/admin,
  the public API's `pagination.total`, CORS, and a port scan. It exits non-zero for the two known failures
  (SPEC drift #9 and #10) **by design** — report the printed lines, not just the exit code.
- `NEXT_PUBLIC_API_URL` is inlined **at build time**. A production build made without it ships a bundle that
  calls `localhost:1337`, which looks like "the catalogue is empty", not like an error. The checker greps the
  deployed chunks for that exact string; never debug this symptom without checking it first.
- Playwright defaults to **production** (`BASE_URL=http://localhost:3000` overrides it), and the registration
  spec **writes to whatever database the target API uses**. Run it locally unless the user explicitly asks for
  a production run.
- The maintenance shield is **client-side**, so `curl` always sees the real site (and so will Google). Never
  use "curl gets 200 with content" as evidence that a visitor sees the page.


