# Agents Guide

## Command Execution

**All commands must run inside the `.devcontainer` container. Never run locally.**

Use `docker compose` with the `app` service:

```bash
docker compose -f .devcontainer/docker-compose.yml exec app <command>
```

The workspace is mounted at `/workspace` inside the container.

## Common Commands

### Start app

```bash
docker compose -f .devcontainer/docker-compose.yml exec app pnpm start
```

### Run tests (unit)

```bash
docker compose -f .devcontainer/docker-compose.yml exec app pnpm test
```

### Run tests (CI mode, non-interactive)

```bash
docker compose -f .devcontainer/docker-compose.yml exec app pnpm test:ci
```

### Lint check

```bash
docker compose -f .devcontainer/docker-compose.yml exec app pnpm lint:check
```

### Cypress e2e tests

```bash
docker compose -f .devcontainer/docker-compose.yml exec app pnpm --filter @gochamps/cms test:e2e:headless
```

Cypress requires Xvfb running. The `postStartCommand` in `devcontainer.json` starts it automatically. If tests fail with display errors, start it manually:

```bash
docker compose -f .devcontainer/docker-compose.yml exec app /workspace/.devcontainer/setup-cypress.sh
```

## Container Setup

If the container is not running:

```bash
docker compose -f .devcontainer/docker-compose.yml up -d
docker compose -f .devcontainer/docker-compose.yml exec app pnpm install
```
