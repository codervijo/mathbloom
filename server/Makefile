###############################################################################
# mathbloom - project Makefile (delegates to central builder)
###############################################################################

# Path to your central builder repo.
# Prefer the in-container builder mount if present, otherwise fall back to a
# host-relative path.
ifneq ($(wildcard /usr/src/builder/Makefile),)
  BUILDER_PATH := /usr/src/builder
else
  BUILDER_PATH ?= ../../../builder
endif

# This repo is a monorepo (webapp + server). Default root targets to the Go
# server stack.
STACK ?= go

# Builder React stack variables
WEBAPP_DIR ?= webapp
NODE_PKG_MANAGER ?= pnpm

# Pull in the central builder and stack-specific targets.
include $(BUILDER_PATH)/Makefile
