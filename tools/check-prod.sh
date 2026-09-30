#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# tools/check-prod.sh — read-only production health check, aluguenahora.com.br
#
#   bash tools/check-prod.sh
#
# Every probe is a HEAD/GET or a TCP connect: it changes nothing on the server and
# needs no password, so it is safe to run before AND after every deploy.
# Exit code 0 = no hard failure (⚠ warnings never fail the run).
#
# Verified against production on 2026-09-29. See DEVELOPMENT.md for the
# "what can be tested where" model, and SPEC.md §7 for the deploy recipe.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

SITE="${SITE:-https://aluguenahora.com.br}"
API="${API:-https://api.aluguenahora.com.br}"
API_HOST="${API#https://}"
# Hostname, not the raw IP, so this file stays publishable (override: VPS_IP=1.2.3.4 bash tools/check-prod.sh)
VPS_IP="${VPS_IP:-aluguenahora.com.br}"
RAW_API_PORT="${RAW_API_PORT:-1337}"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

PASS=0; FAIL=0; WARN=0
ok()    { PASS=$((PASS + 1)); printf '  ✓ PASS  %s\n' "$1"; }
bad()   { FAIL=$((FAIL + 1)); printf '  ✗ FAIL  %s\n' "$1"; }
warn()  { WARN=$((WARN + 1)); printf '  ⚠ WARN  %s\n' "$1"; }
info()  { printf '           └─ %s\n' "$1"; }
title() { printf '\n\033[1m%s\033[0m\n' "$1"; }

# The body is streamed through `tail -1`, so only curl's -w line survives and
# nothing is ever written to disk.
stat_of() { # $1=url -> "CODE|seconds|bytes|content-type"
  local out
  out="$(curl -sS -m 25 -w '\n%{http_code}|%{time_total}|%{size_download}|%{content_type}' "$1" 2>"$TMP/err" | tail -1)"
  case "$out" in
    [0-9][0-9][0-9]\|*) printf '%s' "$out" ;;
    *)                  printf '000|0|0|- (curl: %s)' "$(tr -d '\n' < "$TMP/err" | tail -c 80)" ;;
  esac
}
code_of() { stat_of "$1" | cut -d'|' -f1; }
hdr_of()  { curl -sSI -m 25 "$1" 2>/dev/null | tr -d '\r' | grep -i "^$2:" | head -1 | cut -d' ' -f2-; }
body_of() { curl -sS -m 25 "$1" 2>/dev/null > "$TMP/body"; cat "$TMP/body"; }

printf '\033[1mAlugue na Hora — production health check\033[0m  (%s)\n' "$(date '+%Y-%m-%d %H:%M')"

# ── 1. Frontend (Next.js :3000 behind nginx) ────────────────────────────────
title "1. Frontend — $SITE"
S="$(stat_of "$SITE/")"
if printf '%s' "$S" | grep -q '^200|'; then
  ok "homepage answers 200 ($(printf '%s' "$S" | cut -d'|' -f2)s, $(printf '%s' "$S" | cut -d'|' -f3) bytes)"
  curl -sS -m 25 "$SITE/" > "$TMP/home.html" 2>/dev/null
  if grep -qi 'Alugue na Hora' "$TMP/home.html"; then
    ok "homepage body contains the brand (real SSR content, not an error page)"
  else
    warn "homepage body does not look like the site"
  fi
else
  bad "homepage did not answer 200 → $S"
fi

# NEXT_PUBLIC_API_URL is inlined into the bundles at build time. A build made without
# it ships a site that calls localhost:1337 — a failure that looks like "no data"
# rather than like an error, so it is worth a dedicated check.
CHUNKS="$(grep -o '/_next/static/chunks/[a-zA-Z0-9._-]*\.js' "$TMP/home.html" 2>/dev/null | sort -u | head -12)"
PROD_HIT=0; LOCAL_HIT=0
for c in $CHUNKS; do
  t="$(curl -sS -m 20 "$SITE$c" 2>/dev/null)"
  printf '%s' "$t" | grep -q 'localhost:1337' && LOCAL_HIT=1
  printf '%s' "$t" | grep -q "$API_HOST" && PROD_HIT=1
  { [ "$PROD_HIT" -eq 1 ] && [ "$LOCAL_HIT" -eq 1 ]; } && break
done
if [ "$LOCAL_HIT" -eq 1 ]; then
  bad "a deployed JS bundle calls localhost:1337 → it was built without NEXT_PUBLIC_API_URL"
  info "the site will render, but every visitor sees an empty catalogue; rebuild on the VPS with the env var set"
elif [ "$PROD_HIT" -eq 1 ]; then
  ok "deployed bundles carry $API_HOST (NEXT_PUBLIC_API_URL was set at build time)"
elif [ -n "$CHUNKS" ]; then
  warn "could not confirm the API host in the sampled JS chunks"
fi

if [ "$(code_of "$SITE/imoveis")" = "200" ]; then ok "/imoveis answers 200"; else warn "/imoveis answered $(code_of "$SITE/imoveis")"; fi
if [ "$(code_of "$SITE/logo.svg")" = "200" ]; then ok "static asset /logo.svg serves"; else bad "/logo.svg did not serve"; fi
if [ "$(code_of "$SITE/favicon.ico")" = "200" ]; then
  ok "/favicon.ico serves"
else
  warn "/favicon.ico missing (Next serves the icon through metadata instead — cosmetic)"
fi

# ── 2. Redirects, TLS and headers ───────────────────────────────────────────
title "2. Redirects, TLS and headers"
APEX="${SITE#https://}"
case "$(code_of "http://$APEX/")" in
  301|302|307|308) ok "plain HTTP redirects to HTTPS" ;;
  200)             bad "plain HTTP serves 200 — no redirect to HTTPS on the apex vhost" ;;
  *)               warn "plain HTTP answered $(code_of "http://$APEX/")" ;;
esac
case "$(code_of "https://www.$APEX/")" in
  301|302|307|308) ok "www redirects to the apex domain" ;;
  200)             warn "www serves 200 too → duplicate content, no canonical redirect" ;;
  *)               warn "www answered $(code_of "https://www.$APEX/")" ;;
esac
if [ -n "$(hdr_of "$SITE/" strict-transport-security)" ]; then
  ok "HSTS present on the apex"
else
  warn "HSTS missing on the apex (the api. vhost does send it)"
fi
if [ -n "$(hdr_of "$SITE/" x-frame-options)" ] && [ -n "$(hdr_of "$SITE/" x-content-type-options)" ]; then
  ok "baseline security headers present (X-Frame-Options, X-Content-Type-Options)"
else
  bad "baseline security headers missing on the frontend"
fi

PEM="$(echo | openssl s_client -connect "$APEX:443" -servername "$APEX" 2>/dev/null)"
if printf '%s' "$PEM" | openssl x509 -noout -checkend 1209600 >/dev/null 2>&1; then
  ok "TLS valid for 14+ days (expires $(printf '%s' "$PEM" | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2))"
else
  warn "TLS expires within 14 days or could not be read — check the certbot timer on the VPS"
fi

# ── 3. Auth routing ─────────────────────────────────────────────────────────
title "3. Auth routing"
D_CODE="$(code_of "$SITE/dashboard")"
D_LOC="$(hdr_of "$SITE/dashboard" location)"
case "$D_CODE" in
  302|307|308) if printf '%s' "$D_LOC" | grep -q '/login'; then
                 ok "/dashboard redirects anonymous users to $D_LOC"
               else
                 bad "/dashboard redirects to an unexpected location: $D_LOC"
               fi ;;
  200)         bad "/dashboard answered 200 with no token — the proxy is not protecting it" ;;
  *)           warn "/dashboard answered $D_CODE" ;;
esac
if [ "$(code_of "$SITE/admin")" = "404" ]; then
  ok "apex /admin is not a Strapi route (Strapi lives on the api. subdomain)"
else
  warn "apex /admin answered $(code_of "$SITE/admin") — topology changed? re-read SPEC §3"
fi

# ── 4. Strapi API ───────────────────────────────────────────────────────────
title "4. Strapi API — $API"
if [ "$(code_of "$API/_health")" = "204" ]; then
  ok "/_health answers 204 (Strapi alive)"
else
  bad "/_health answered $(code_of "$API/_health") — Strapi may be down (check pm2 on the VPS)"
fi
if [ "$(code_of "$API/admin")" = "200" ]; then ok "/admin serves the admin panel"; else bad "/admin answered $(code_of "$API/admin")"; fi

INIT="$(body_of "$API/admin/init")"
if printf '%s' "$INIT" | grep -q '"hasAdmin":true'; then
  ok "/admin/init reports hasAdmin:true"
else
  warn "/admin/init did not report an admin user: $INIT"
fi

IM="$(body_of "$API/api/imoveis?pagination%5BpageSize%5D=1")"
TOTAL="$(printf '%s' "$IM" | grep -o '"total":[0-9]*' | head -1 | cut -d: -f2)"
if [ -n "$TOTAL" ]; then
  if [ "$TOTAL" -gt 0 ] 2>/dev/null; then
    ok "public API returns properties (pagination.total = $TOTAL)"
  else
    warn "public API works but the database has 0 properties"
  fi
else
  bad "public API did not return a pagination block → $(printf '%s' "$IM" | head -c 120)"
fi

# Public news is NOT a cosmetic warning. The homepage hides a 403 by falling back to the
# hard-coded `initialNews` list, so the site shows stale news and no error appears anywhere.
# Until 2026-09-30 the grant failed on every boot (`Update requires data`, swallowed by a
# catch) and this probe was the only thing that could have shown it — as an ignorable warning.
NEWS_CODE="$(code_of "$API/api/noticias?pagination%5BpageSize%5D=1")"
NEWS_BODY="$(body_of "$API/api/noticias?pagination%5BpageSize%5D=1")"
case "$NEWS_CODE" in
  200) N_TOTAL="$(printf '%s' "$NEWS_BODY" | grep -o '"total":[0-9]*' | head -1 | cut -d: -f2)"
       if [ -n "$N_TOTAL" ] && [ "$N_TOTAL" -gt 0 ] 2>/dev/null; then
         ok "/api/noticias is publicly readable (pagination.total = $N_TOTAL)"
       elif [ -n "$N_TOTAL" ]; then
         warn "/api/noticias is readable but the news collection is empty (total = 0)"
       else
         warn "/api/noticias answered 200 without a pagination block → $(printf '%s' "$NEWS_BODY" | head -c 120)"
       fi ;;
  403) bad "/api/noticias is 403 → the Public role has no noticia.find grant, so the homepage silently serves the static initialNews list"
       info "cause: the public-permission grant in backend/src/index.ts — in Strapi 5 the permission ROW is the grant" ;;
  *)   warn "/api/noticias answered $NEWS_CODE" ;;
esac

CORS="$(curl -sS -m 20 -i -X OPTIONS "$API/api/imoveis" -H "Origin: $SITE" -H 'Access-Control-Request-Method: GET' 2>/dev/null | tr -d '\r')"
if printf '%s' "$CORS" | head -1 | grep -qE '20[04]'; then
  ok "CORS preflight from the site origin is allowed"
else
  bad "CORS preflight from $SITE was refused"
fi

# ── 5. Port exposure (the 2026-09-29 finding) ───────────────────────────────
title "5. Port exposure on $VPS_IP"
if nc -z -G 4 "$VPS_IP" "$RAW_API_PORT" 2>/dev/null; then
  bad "Strapi answers on the raw port $RAW_API_PORT — bypasses nginx/TLS and serves /admin over plain HTTP"
  info "fix: read the nginx proxy_pass target first, then ufw deny $RAW_API_PORT (or HOST=127.0.0.1 + pm2 restart)"
  info "re-check from your Mac: nc -z $VPS_IP $RAW_API_PORT  → must fail while the site stays up"
else
  ok "raw Strapi port $RAW_API_PORT is closed to the internet"
fi
for p in 5432 3306 6379; do
  if nc -z -G 4 "$VPS_IP" "$p" 2>/dev/null; then bad "port $p is exposed to the internet"; else ok "port $p is closed"; fi
done
if nc -z -G 4 "$VPS_IP" 443 2>/dev/null; then ok "443 is open"; else bad "443 is closed — the site is unreachable"; fi
info "server header: $(hdr_of "$SITE/" server)"

# ── summary ─────────────────────────────────────────────────────────────────
printf '\n\033[1m%s\033[0m — %d passed, %d failed, %d warnings\n' \
  "$([ "$FAIL" -eq 0 ] && printf 'RESULT: healthy' || printf 'RESULT: failures present')" "$PASS" "$FAIL" "$WARN"
[ "$FAIL" -eq 0 ] || printf 'Fix the ✗ lines above; SPEC.md §5 tracks them as engineering to-dos.\n'
[ "$FAIL" -eq 0 ]


