# Drop Merge — config vs session flow

## Modes

1. **Config mode** — No `sessionId` in the URL. Loads `src/config/game/{name}.js` from `?config=` or falls back to `DEFAULT_CONFIG` in [`src/config/game/game-config.js`](../../src/config/game/game-config.js) (`neon-number-merge`). Valid stems are listed in `CONFIG_REGISTRY`.

2. **Session mode** — `?sessionId=...` (optional `?mode=demo` or `?mode=real`). Boot calls `POST /provider/session` and merges `gameMetadata` into the runtime config (`theme`, ball params, `paytableId`, `creditValueMinor`, `match`, and other scratch-style fields when present). On failure, session is cleared and file config is loaded when possible.

## URL parameters

| Param | Purpose |
|--------|---------|
| `config` | Game config stem. Read from `window` / `parent` / `top` for iframe runners. |
| `sessionId` | Provider session id. Same resolution. |
| `mode` | `demo` (default) or `real`; affects operator balance vs demo balance in registry. |

## Bootstrap order

1. `main.js` `load` (async): `window.__selectedGameConfig` via `loadSelectedConfig()` + `mergeDropMergeRuntimeConfig`, or session placeholder.
2. Phaser starts; **Boot** `create()` (async): optional session fetch; sets `preloadGameConfig` and session registry keys.
3. **Preload** loads theme JSON from `preloadGameConfig.theme`.
4. **ServerManager** builds `gameConfig` (ball sizes / levels) from `preloadGameConfig`; balance from session or test defaults.

## API base URL

- Localhost / `127.0.0.1`: `GameConfig.api.BASE_URL_LOCAL` (CORS proxy port from `__CORS_PROXY_PORT__`, see [`scripts/local-testing/ports.config.js`](../../scripts/local-testing/ports.config.js)).
- Otherwise: `GameConfig.api.BASE_URL_LIVE` (staging, aligned with other LLG games for `/provider/session`).

## Registry keys

| Key | Description |
|-----|-------------|
| `preloadGameConfig` | Merged runtime object (theme, type, minBallSize, maxBallSize, maxBallLevel, …) |
| `preloadUseSessionConfig` | `true` when config came from session |
| `preloadSessionId` | Active session id |
| `preloadSessionMode` | `demo` or `real` |
| `preloadOperatorBalance` | Balance in **minor units** (pennies) |

## Default export `game-config.js`

`import gameConfig from './game-config.js'` is a **Proxy** to `window.__selectedGameConfig` after bootstrap.

## ServerManager balance

`ServerManager.balance` is stored in **dollars** for display/events: session uses `preloadOperatorBalance / 100`; config mode uses `TEST_BALANCE_MINOR / 100`. `getBalance()` returns `this.balance`.

## Buy / server round-trip

Authenticated buy endpoints and full wallet UX are optional follow-up when backend routes exist.
