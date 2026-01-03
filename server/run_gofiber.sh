#!/usr/bin/env bash
set -euo pipefail

# Ensure we run relative to this script's directory so it works from anywhere.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Allow opting out of hot reload:
#   HOT_RELOAD=0 ./run_gofiber.sh
HOT_RELOAD="${HOT_RELOAD:-1}"

die() {
  echo "Error: $*" >&2
  exit 1
}

usage() {
  cat <<'EOF'
Usage:
  ./run_gofiber.sh install [--air|--no-air]
  ./run_gofiber.sh run     [--hot-reload|--no-hot-reload]
  ./run_gofiber.sh help

Notes:
  - This script is intentionally split into two phases:
      * install: install prerequisites (Go, go modules, optional air)
      * run:     run the server (air or go run)
  - HOT_RELOAD=1 is the default. You can disable it via:
      HOT_RELOAD=0 ./run_gofiber.sh run
EOF
}

sudo_if_needed() {
  if command -v sudo >/dev/null 2>&1 && [ "$(id -u)" -ne 0 ]; then
    sudo "$@"
  else
    "$@"
  fi
}

ensure_go_installed() {
  if command -v go &> /dev/null; then
    return 0
  fi

  echo "Go not found. Installing Go..."
  if command -v apt-get &> /dev/null; then
    sudo_if_needed apt-get update
    sudo_if_needed apt-get install -y golang
  else
    die "Go not found and apt-get is unavailable. Please install Go manually: https://go.dev/dl/"
  fi
}

ensure_example_project_files() {
  # This repo already includes server/main.go + server/go.mod.
  # The following is retained as a safety net for running this script standalone.
  if [ ! -f "main.go" ]; then
    echo "Creating example GoFiber server (main.go)..."
    cat <<EOF > main.go
package main

import (
  "github.com/gofiber/fiber/v2"
)

func main() {
  app := fiber.New()
  app.Get("/", func(c *fiber.Ctx) error {
    return c.SendString("Hello, GoFiber!")
  })
  app.Listen(":3000")
}
EOF
  fi

  if [ ! -f "go.mod" ]; then
    echo "Initializing go module (go.mod)..."
    go mod init example.com/gofiber-example
  fi
}

go_bin_dir() {
  echo "$(go env GOPATH)/bin"
}

resolve_air() {
  local bin_dir
  bin_dir="$(go_bin_dir)"
  if [ -x "${bin_dir}/air" ]; then
    echo "${bin_dir}/air"
    return 0
  fi

  if command -v air &> /dev/null; then
    command -v air
    return 0
  fi

  return 1
}

ensure_air_config() {
  # Create a basic Air config if not present.
  # Note: this repo includes server/.air.toml, so this is mostly a fallback.
  if [ -f ".air.toml" ]; then
    return 0
  fi

  cat <<'EOF' > .air.toml
root = "."
tmp_dir = "tmp"

[build]
  # Disable VCS stamping because containers/devcontainers may not have a full
  # git repo available (or may have limited permissions), which causes:
  #   error obtaining VCS status: exit status 128
  cmd = "go build -buildvcs=false -o ./tmp/server ."
  entrypoint = "tmp/server"
  include_ext = ["go"]
  exclude_dir = ["tmp", "vendor"]
  delay = 200
  stop_on_error = true

[log]
  time = true

[misc]
  clean_on_exit = true
EOF
}

cmd_install() {
  local install_air="${HOT_RELOAD}"
  while [ $# -gt 0 ]; do
    case "$1" in
      --air)
        install_air=1
        shift
        ;;
      --no-air)
        install_air=0
        shift
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        die "Unknown install option: $1"
        ;;
    esac
  done

  ensure_go_installed
  ensure_example_project_files

  echo "Downloading Go module dependencies..."
  go mod download

  if [ "$install_air" = "1" ]; then
    if ! resolve_air >/dev/null 2>&1; then
      echo "Installing hot-reload tool (air)..."
      go install github.com/air-verse/air@latest
    fi
    ensure_air_config
  fi

  echo "Install complete."
}

cmd_run() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --hot-reload)
        HOT_RELOAD=1
        shift
        ;;
      --no-hot-reload)
        HOT_RELOAD=0
        shift
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        die "Unknown run option: $1"
        ;;
    esac
  done

  if ! command -v go &> /dev/null; then
    die "Go is not installed. Run: ./run_gofiber.sh install"
  fi

  if [ ! -f "go.mod" ]; then
    die "go.mod not found. Run: ./run_gofiber.sh install (or create a go.mod)"
  fi

  if [ "$HOT_RELOAD" = "1" ]; then
    local air
    air="$(resolve_air || true)"
    if [ -z "${air}" ]; then
      die "air (hot reload) not found. Run: ./run_gofiber.sh install --air"
    fi
    if [ ! -f ".air.toml" ]; then
      die ".air.toml not found. Run: ./run_gofiber.sh install --air"
    fi

    echo "Starting GoFiber server with hot reload (air) on :3000"
    exec "$air" -c .air.toml
  fi

  echo "Starting GoFiber server on :3000 (no hot reload)"
  exec go run .
}

cmd="${1:-run}"
shift || true

case "$cmd" in
  install)
    cmd_install "$@"
    ;;
  run)
    cmd_run "$@"
    ;;
  help|-h|--help)
    usage
    ;;
  *)
    usage
    die "Unknown command: $cmd"
    ;;
esac

