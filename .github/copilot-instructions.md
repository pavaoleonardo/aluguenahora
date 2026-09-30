# Copilot instructions — Alugue na Hora

This file is a **pointer only**. The rules are maintained in one place; do not copy them here.

→ **Read `AGENTS.md` in the repository root.** It contains the shared agent rules (§0–§10, mirrored
from `~/Desktop/projects/_standards/AGENTS-common.md`) plus this project's deltas: exact commands,
deploy recipe, database rules and language exceptions.

→ **Read `SPEC.md` in the repository root** (kept local, gitignored) for product and architecture
truth, the route/component inventory, and the "Known drift" list.

Precedence when documents disagree: `AGENTS.md` → `SPEC.md` → `constitution.md` → other docs.
Code beats all documents.

Non-negotiables, repeated here because they are security-critical (`AGENTS.md` §8):
**never commit, upload or echo any password, key, token or `.env` value — no exceptions, ever**;
reply in English while the app's UI copy stays Portuguese (PT-BR); never propose Vercel/Render for
this stack, and never run `git commit`/`git push`/deploy scripts yourself — print the paste-ready
commands from `SPEC.md` §7 for the user to run.
