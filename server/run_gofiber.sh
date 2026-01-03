#!/usr/bin/env bash
set -euo pipefail

# Ensure we run relative to this script's directory so it works from anywhere.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Allow opting out of hot reload:
#   HOT_RELOAD=0 ./run_gofiber.sh
HOT_RELOAD="${HOT_RELOAD:-1}"

sudo_if_needed() {
  if command -v sudo >/dev/null 2>&1 && [ "$(id -u)" -ne 0 ]; then
    sudo "$@"
  else
    "$@"
  fi
}

# Install Go if not present
if ! command -v go &> /dev/null; then
  echo "Go not found. Installing Go..."
  if command -v apt-get &> /dev/null; then
    sudo_if_needed apt-get update
    sudo_if_needed apt-get install -y golang
  else
    echo "Error: Go not found and apt-get is unavailable. Please install Go manually: https://go.dev/dl/"
    exit 1
  fi
else
  echo "Go is already installed."
fi

# Create example GoFiber server if not present
if [ ! -f "main.go" ]; then
  echo "Creating example GoFiber server..."
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

# Initialize go module if needed
if [ ! -f "go.mod" ]; then
  go mod init example.com/gofiber-example
fi

# Install GoFiber
go get github.com/gofiber/fiber/v2

# Install Air (hot reload) if desired
GO_BIN="$(go env GOPATH)/bin"
AIR_BIN="$GO_BIN/air"

if [ "$HOT_RELOAD" = "1" ]; then
  if [ ! -x "$AIR_BIN" ] && ! command -v air &> /dev/null; then
    echo "Installing hot-reload tool (air)..."
    go install github.com/air-verse/air@latest
  fi

  # Prefer the GOPATH-installed binary, fall back to PATH.
  if [ -x "$AIR_BIN" ]; then
    AIR="$AIR_BIN"
  else
    AIR="$(command -v air)"
  fi

  # Create a basic Air config if not present.
  # Note: this repo now includes server/.air.toml, so this is mostly a fallback.
  if [ ! -f ".air.toml" ]; then
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
  fi

  echo "Starting GoFiber server with hot reload (air) on :3000"
  exec "$AIR" -c .air.toml
else
  echo "Starting GoFiber server on :3000 (no hot reload)"
  exec go run main.go
fi
