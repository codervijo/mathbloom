#!/usr/bin/env bash
set -euo pipefail

# Smoke-test script for the Mathbloom API (GoFiber server).
# Assumes the server is already running.
#
# Usage:
#   BASE_URL=http://localhost:3000 ./scripts/check_mathbloom_api.sh
#

BASE_URL="${BASE_URL:-http://localhost:3000}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "ERROR: required command not found: $1" >&2
    exit 127
  fi
}

require_cmd curl
require_cmd jq

pass() { printf "[PASS] %s\n" "$1"; }
fail() { printf "[FAIL] %s\n" "$1" >&2; exit 1; }

snippet() {
  # Print at most N characters of the provided string (default 300)
  local s="$1"
  local n="${2:-300}"
  if ((${#s} <= n)); then
    printf "%s" "$s"
  else
    printf "%s..." "${s:0:n}"
  fi
}

http_ok() {
  local path="$1"
  local url="${BASE_URL}${path}"
  local tmp code body
  tmp=$(mktemp)
  code=$(curl -sS -o "$tmp" -w "%{http_code}" "$url" || true)
  body=$(cat "$tmp" 2>/dev/null || true)
  rm -f "$tmp"
  if [[ "$code" != "200" ]]; then
    fail "$path expected 200, got $code. Body: $(snippet "$body")"
  fi
  pass "$path -> 200"
}

json_check() {
  local path="$1"
  local jq_expr="$2"
  local url="${BASE_URL}${path}"
  # -f: fail on non-2xx; -S: show error; -s: silent
  local tmp code body
  tmp=$(mktemp)
  code=$(curl -sS -o "$tmp" -w "%{http_code}" "$url" || true)
  body=$(cat "$tmp" 2>/dev/null || true)
  rm -f "$tmp"
  if [[ "$code" != "200" ]]; then
    fail "$path expected 200, got $code. Body: $(snippet "$body")"
  fi
  if ! printf "%s" "$body" | jq -e "$jq_expr" >/dev/null; then
    fail "$path JSON check failed: jq -e '$jq_expr'. Body: $(snippet "$body")"
  fi
  pass "$path JSON ok"
}

text_check() {
  local path="$1"
  local expected_substring="$2"
  local url="${BASE_URL}${path}"
  local tmp code body
  tmp=$(mktemp)
  code=$(curl -sS -o "$tmp" -w "%{http_code}" "$url" || true)
  body=$(cat "$tmp" 2>/dev/null || true)
  rm -f "$tmp"
  if [[ "$code" != "200" ]]; then
    fail "$path expected 200, got $code. Body: $(snippet "$body")"
  fi
  if [[ "$body" != *"$expected_substring"* ]]; then
    fail "$path expected body to contain: $expected_substring. Body: $(snippet "$body")"
  fi
  pass "$path body contains expected text"
}

post_ok() {
  local path="$1"
  local json_body="$2"
  local url="${BASE_URL}${path}"
  local tmp code body
  tmp=$(mktemp)
  code=$(curl -sS -o "$tmp" -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -d "$json_body" \
    "$url" || true)
  body=$(cat "$tmp" 2>/dev/null || true)
  rm -f "$tmp"
  if [[ "$code" != "200" ]]; then
    fail "POST $path expected 200, got $code. Body: $(snippet "$body")"
  fi
  pass "POST $path -> 200"
}

post_nonexistent() {
  local path="$1"
  local json_body="$2"
  local url="${BASE_URL}${path}"
  local tmp code body
  tmp=$(mktemp)
  code=$(curl -sS -o "$tmp" -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -d "$json_body" \
    "$url" || true)
  body=$(cat "$tmp" 2>/dev/null || true)
  rm -f "$tmp"
  if [[ "$code" != "404" ]]; then
    fail "POST $path expected 404, got $code. Body: $(snippet "$body")"
  fi
  pass "POST $path -> 404 as expected"
}

echo "Checking Mathbloom API at: ${BASE_URL}"

# 1) Health / root
http_ok "/"
text_check "/" "Hello, GoFiber!"

# 2) About
http_ok "/about"
text_check "/about" "About"

# 3) Demo data (used by the webapp)
http_ok "/api/demo-family"
json_check "/api/demo-family" '(.id == "demo") and (.parentPIN == "1234")'
json_check "/api/demo-family" '(.children | type == "array") and (.children | length) > 0'
json_check "/api/demo-family" '.children[0] | has("id") and has("name") and has("streak") and has("accuracy") and has("level") and has("sessions")'

# 4) Form endpoints (basic smoke)
post_ok "/submit" '{"hello":"world"}'
post_ok "/scamsense" '{"message":"test"}'

# 5) Non-existent path
post_nonexistent "/api/nonexistent" '{}'
post_nonexistent "/api/v1/nonexistent" '{}'

# 6) Mathbloom App specific API endpoints
http_ok "/api/v1/status"
json_check "/api/v1/status" '.status == "ok"'
json_check "/api/v1/status" '.version | type == "string"'
json_check "/api/v1/status" '.uptime | type == "number"'

http_ok "/api/v1/demo-questions"
json_check "/api/v1/demo-questions" '(type == "array") and (length > 0)'
json_check "/api/v1/demo-questions" '.[0] | has("id") and has("question") and (has("options") and (.options | type == "array")) and has("answer")'

echo "All checks passed."
