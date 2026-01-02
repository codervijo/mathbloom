# mathbloom

Mathbloom is a small monorepo:

- `server/` — GoFiber API (listens on `:3000`)
- `webapp/` — Vite + React frontend (dev server configured for `:8080`)

## Dev container (recommended)

This repo uses a shared dev container script from the central `builder/` repo.

**Important:** Mathbloom’s API is expected to be reachable from the host at
`http://localhost:3000`. To make that work smoothly, the dev container is run
with **host networking** by default.

### Start / enter the container

```bash
make buildsh
```

If you already have a container running from before this change, you’ll need to
recreate it for networking changes to take effect:

```bash
./dev_container.sh delete
make buildsh
```

## Run the API (inside the container)

```bash
cd server
make run
```

From the host, verify:

```bash
curl http://localhost:3000/
```

## Smoke-test the API (from the host)

```bash
bash ./scripts/check_mathbloom_api.sh
```

Override base URL if needed:

```bash
BASE_URL=http://localhost:3000 bash ./scripts/check_mathbloom_api.sh
```

## Run the webapp (inside the container)

```bash
cd webapp
pnpm install
pnpm dev
```
