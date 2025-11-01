#!/bin/bash
set -e

# Install Go if not present
if ! command -v go &> /dev/null; then
  echo "Go not found. Installing Go..."
  apt-get update && apt-get install -y golang
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

# Run the server
echo "Starting GoFiber server on :3000"
go run main.go
