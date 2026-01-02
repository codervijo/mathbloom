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

exec bash "${BUILDER_PATH}/dev_container.sh" "$@"
