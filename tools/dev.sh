#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# tools/dev.sh — run the whole stack **locally** (Strapi on :1337 + Next.js on :3000)
#
#   bash tools/dev.sh              # both
#   bash tools/dev.sh frontend     # only Next.js (use this when you point the frontend
#                                  # at the production API for real content)
#   bash tools/dev.sh backend      # only Strapi
#
# Ctrl+C stops both. Logs: /tmp/aluguenahora-{backend,frontend}.log
# Read DEVELOPMENT.md first — it explains what can and cannot be tested locally.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-both}"
BACKLOG="${TMPDIR:-/tmp}/aluguenahora-backend.log"
FLOG="${TMPDIR:-/tmp}/aluguenahora-frontend.log"
PIDS=()

say() { printf '\033[1m%s\033[0m\n' "$1"; }

cleanup() {
  printf '\nstopping local dev servers...\n'
  for p in "${PIDS[@]:-}"; do [ -n "$p" ] && kill "$p" 2>/dev/null; done
  wait 2>/dev/null
  printf 'done. If a port is still busy: lsof -ti tcp:3000 | xargs kill\n'
}
trap cleanup EXIT INT TERM

wait_for() { # $1=url $2=label $3=seconds $4=logfile
  local i=0
  while ! curl -sf -m 3 "$1" >/dev/null 2>&1; do
    i=$((i + 1))
    if [ "$i" -ge "$3" ]; then
      printf '  ✗ %s did not answer within %ss — tail -40 %s\n' "$2" "$3" "$4"
      return 1
    fi
    sleep 1
  done
  printf '  ✓ %s ready: %s\n' "$2" "$1"
}

start_backend() {
  printf '  → Strapi   (npm run develop)  log: %s\n' "$BACKLOG"
  npm --prefix "$ROOT/backend" run develop > "$BACKLOG" 2>&1 &
  PIDS+=("$!")
}
start_frontend() {
  printf '  → Next.js  (npm run dev)      log: %s\n' "$FLOG"
  npm --prefix "$ROOT/frontend" run dev > "$FLOG" 2>&1 &
  PIDS+=("$!")
}

# ── preflight ───────────────────────────────────────────────────────────────
case "$MODE" in both|backend|frontend) ;; *) printf 'usage: bash tools/dev.sh [both|backend|frontend]\n'; exit 2 ;; esac
command -v node >/dev/null || { printf 'node is not installed\n'; exit 1; }
if [ "$MODE" != "frontend" ] && ! pg_isready -q 2>/dev/null; then
  printf '⚠ Postgres is not answering on localhost:5432.\n'
  printf '  backend/.env expects a LOCAL database, so Strapi will fail to boot on purpose.\n'
  printf '  start it with:  brew services start postgresql@14   (or pg_ctl -D /usr/local/var/postgres start)\n'
  printf '  local DB should be "aluguenahora". As of 2026-09-29 it holds 2 imóveis / 6 notícias.\n\n'
fi

API_URL="$(grep -h '^NEXT_PUBLIC_API_URL=' "$ROOT/frontend/.env.local" 2>/dev/null | tail -1 | cut -d= -f2-)"
say "starting local dev ($MODE)"

case "$MODE" in
  both)     start_backend; wait_for "http://localhost:1337/_health" "Strapi" 150 "$BACKLOG"
            start_frontend; wait_for "http://localhost:3000" "Next.js" 180 "$FLOG" ;;
  backend)  start_backend; wait_for "http://localhost:1337/_health" "Strapi" 150 "$BACKLOG" ;;
  frontend) start_frontend; wait_for "http://localhost:3000" "Next.js" 180 "$FLOG" ;;
esac

cat <<EOF

────────────────────────────────────────────────────────────────────────────
  Site:          http://localhost:3000
  Strapi admin:  http://localhost:1337/admin   (local admin users exist)
  API used by this frontend: ${API_URL:-<unset>}

  ⚠ You will land on "Site em Construção" — that is MaintenanceOverlay.tsx,
    which covers the site for anyone not logged in. Open /login, sign in with
    a local admin user and the overlay disappears. It is not a bug.

  $(printf '%s' "$API_URL" | grep -q 'api.aluguenahora.com.br' \
      && printf '⚠ Pointed at the PRODUCTION api: browsing only reads data, but Register /\n    Upload / Delete would write into the REAL database.' \
      || printf 'Using your local database (see backup_local.sql to refresh it from prod).')

  Ctrl+C stops both servers.
────────────────────────────────────────────────────────────────────────────
EOF

wait
