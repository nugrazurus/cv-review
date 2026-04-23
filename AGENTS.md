# CV Review App (Cloudflare Workers)

Neo-Brutalist AI resume reviewer. Worker + static assets.

## Commands

| Command | Purpose |
|---------|---------|
| `bun dev` or `npm run dev` | Local dev server (port 8787) |
| `bun test` or `npm run test` | Run vitest suite |
| `bun deploy` or `npm run deploy` | Deploy to Cloudflare |
| `npm run cf-typegen` | Regenerate TypeScript types after binding changes |

## Architecture

- **Entry**: `src/index.ts` — Worker fetch handler (routes: `/message`, `/random`)
- **Static**: `public/index.html` — served at `/` via Workers Assets
- **Config**: `wrangler.jsonc` — bindings, compatibility flags
- **Design**: `ui-template/` — Neo-Brutalist CV design specs (colors, typography, components)
- **Tests**: `test/index.spec.ts` — vitest with `@cloudflare/vitest-pool-workers`

## Cloudflare Workers

STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

## Docs

- https://developers.cloudflare.com/workers/
- MCP: `https://docs.mcp.cloudflare.com/mcp`

For all limits and quotas, retrieve from the product's `/platform/limits/` page. eg. `/workers/platform/limits`

## Node.js Compatibility

https://developers.cloudflare.com/workers/runtime-apis/nodejs/

## Errors

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: https://developers.cloudflare.com/workers/observability/errors/

## Product Docs

Retrieve API references and limits from:
`/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

## Best Practices (conditional)

If the application uses Durable Objects or Workflows, refer to the relevant best practices:

- Durable Objects: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- Workflows: https://developers.cloudflare.com/workflows/build/rules-of-workflows/
