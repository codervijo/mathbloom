#!/bin/bash
set -euo pipefail

# Delegate to the central builder script so fixes in the builder repo apply here.
# Prefer the in-container builder mount if present, else fall back to host path.
if [ -z "${BUILDER_PATH:-}" ]; then
  if [ -f /usr/src/builder/dev_container.sh ]; then
    BUILDER_PATH=/usr/src/builder
  else
    BUILDER_PATH=../../builder
  fi
fi

# -----------------------------------------------------------------------------
# Mathbloom convention: default to host networking
# -----------------------------------------------------------------------------
# The central builder container script publishes a single port by default.
# Mathbloom runs multiple services (Vite, Go API on :3000), so it’s more
# convenient to expose *all* container ports to the host.
#
# The builder script uses `--network=host` when HOST_PORT/CONTAINER_PORT are
# empty. We set those defaults here unless the caller explicitly provided them.
if [ -z "${HOST_PORT+x}" ]; then
  export HOST_PORT=
fi
if [ -z "${CONTAINER_PORT+x}" ]; then
  export CONTAINER_PORT=
fi

exec bash "${BUILDER_PATH}/dev_container.sh" "$@"
