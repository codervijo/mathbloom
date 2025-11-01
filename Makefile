
# Check if running inside Docker
IS_DOCKER := $(shell [ -f /.dockerenv ] && echo "yes" || echo "no")

# Ensure running inside Docker
ifeq ($(IS_DOCKER),no)
$(warning "Warning: Not running inside Docker. Make sure this is intentional.")
endif

WEBAPP=webapp

# Print help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  buildsh   - Go into bash inside docker container"
	@echo "  deps      - Install dependencies"
	@echo "  build     - Build the project"
	@echo "  run       - Run the executable"
	@echo "  test      - Run tests"
	@echo "  clean     - Clean the build artifacts"
	@echo "  reclaim   - Reclaim storage"
	@echo "  new       - Create new React project"
	@echo "  doc       - Generate and open documentation"
	@echo "  help      - Show this help message"

# Default target: Build the project
all: build

buildsh:
	(bash ./dev_container.sh)

.PHONY: deps new

# Install global dependencies
deps:
	@echo "Installing pnpm and Vite dependencies..."
	@SHELL=/bin/bash pnpm setup
	@export PNPM_HOME=$(pnpm env get home) && export PATH="$$PNPM_HOME:$$PATH"
	(cd ${WEBAPP} && pnpm install stable)
	@source /root/.bashrc && pnpm add -g vite create-vite
	(cd ${WEBAPP} && pnpm add @vitejs/plugin-react react react-dom)
	(cd ${WEBAPP} && pnpm add react-router-dom classnames zustand zod framer-motion)
	(cd ${WEBAPP} && pnpm add -D eslint prettier eslint-plugin-react eslint-config-prettier postcss autoprefixer)
	@echo "Dependencies installed."

# Create a new Vite React project
new: deps
	@if [ -z "$(name)" ]; then \
		echo "Error: Please provide a name, e.g., 'make new name=example'"; \
		exit 1; \
	fi
	@echo "Creating a new Vite React project named '$(name)'..."
	@pnpm create vite "$(name)" --template react
	@cd "$(name)" && pnpm install && echo "Project '$(name)' setup completed."

..PHONY: run check-vite

# Run the project in the given subdirectory
run: deps
	@if [ -z "$(proj)" ]; then \
		proj=$(WEBAPP); \
	else \
		proj=$(proj); \
	fi; \
	if [ ! -d "$$proj" ]; then \
		echo "Error: Project directory '$$proj' does not exist."; \
		exit 1; \
	fi; \
	$(MAKE) check-vite proj=$$proj

# Check if the project uses Vite
check-vite:
	echo "Installing project dependencies for '$(proj)'..."; \
	cd "$(proj)" && pnpm install; \
	echo "Running Vite dev server for '$(proj)'..."; \
	cd - && cd "$(proj)" && pnpm run dev --host

# Run tests
test: run

reclaim:
	@echo "Cleaning up unused Docker resources..."
	docker container prune -f
	docker image prune -af
	docker volume prune -f
	docker network prune -f
	docker system df
	@echo "Cleanup complete!"

# Clean the project
clean:
	rm -rf package.json package-lock.json node_modules/
	rm -rf ${WEBAPP}/node_modules ${WEBAPP}/dist
	rm -rf ${WEBAPP}/package.json ${WEBAPP}/package-lock.json
	rm -rf ${WEBAPP}/vite.config.js ${WEBAPP}/.eslintrc.json ${WEBAPP}/.prettierrc
	@echo "Cleaned up project files."


# Phony targets (not real files)
.PHONY: all build run test clean doc help
