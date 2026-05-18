# Deployment Runbook — Region RP

> Stack: Next.js **16.2.6** (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vercel
>
> **Version note**: `package.json` pins `next@16.2.6`, but `AGENTS.md` says "Next.js 15". The
> installed version is 16. APIs in this doc reflect the **Next.js 16** model (Cache Components,
> `'use cache'` directive). Do not follow Next.js 15 tutorials for caching/rendering — they describe
> a different model.

---

## 0. Branch alignment ⚠️

The repository's default branch is **`master`**. Vercel's default production branch and this doc
both use **`main`**. Resolve before first deploy:

```bash
# Rename locally and push
git branch -m master main
git push -u origin main
# GitHub: Settings → Branches → set default branch to `main`, then delete `master`
git push origin --delete master
```

All instructions below assume `main` is the production branch.

---

## 1. Vercel project setup

| Setting | Value |
|---|---|
| Framework preset | **Next.js** (auto-detected from `next.config.ts`) |
| Build command | `next build` |
| Output directory | `.next` |
| Install command | `npm install` |
| Node.js version | **20.x** — current LTS; matches `@types/node ^20` in `devDependencies` |
| Root directory | `.` (repo root) |
| Production branch | `main` (see §0) |
| Preview branches | All non-`main` branches auto-deploy as preview |

### Region

Set the Serverless Function region to **Frankfurt (`fra1`)**: Vercel Dashboard → Project →
Settings → Functions → Region → `fra1 (Frankfurt, Germany)`.

This is the lowest-latency Vercel region for RU/CIS visitors (~30–60 ms vs 100–150 ms from
`iad1`). Static assets are served from Vercel's global edge regardless of function region; `fra1`
only affects server-rendered routes and route handler latency.

---

## 2. Domains

### DNS records

Add these at your DNS registrar for `region.game`:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

> Verify current values at https://vercel.com/docs/projects/domains/add-a-domain before applying —
> Vercel updates their IP range occasionally.

**SSL**: Automatic via Let's Encrypt. Vercel provisions and auto-renews the certificate once DNS
propagates (~24–48 h). No action required.

### Canonical redirect (www → apex)

Pick one canonical form and redirect the other. Add to `next.config.ts`:

```ts
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.region.game' }],
      destination: 'https://region.game/:path*',
      permanent: true,
    },
  ]
},
```

### Production domain

`https://region.game`

---

## 3. Environment variables

Set all variables in **Vercel Dashboard → Project → Settings → Environment Variables**. Choose the
appropriate environment scope (Production / Preview / Development) per row below.

### Always required

| Variable | Scope | Example value | Secret? | Notes |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Prod | `https://region.game` | No | Used by `generateMetadata`, sitemap, canonical URLs, OG tags |
| `NEXT_PUBLIC_SITE_URL` | Preview | `https://region-preview.vercel.app` | No | Set per-branch or use Vercel's auto `VERCEL_URL` |
| `NEXT_PUBLIC_SITE_URL` | Dev | `https://region.game` | No | Set in `.env.local` for production-canonical SEO output during local QA |

### Analytics

| Variable | Scope | Example | Secret? | Notes |
|---|---|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Prod + Preview | `G-XXXXXXXXXX` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_YM_ID` | Prod + Preview | `12345678` | No | Yandex Metrica counter ID — primary analytics for RU/CIS |

Enable analytics in Preview too so QA reviews produce real event data.

### Game server / FiveM

| Variable | Scope | Example | Secret? | Notes |
|---|---|---|---|---|
| `FIVEM_SERVER_URL` | Prod + Preview | `TBD: <http://your.server.ip:30120>` | Yes | Base URL for live player-count route handler. Server-side only — never prefix with `NEXT_PUBLIC_`. |

`TBD: <confirm FiveM server IP/port and whether the status endpoint is /players.json (standard) or a custom CFX resource>`

### Discord

| Variable | Scope | Example | Secret? | Notes |
|---|---|---|---|---|
| `NEXT_PUBLIC_DISCORD_WIDGET_ID` | Prod + Preview | `TBD: <guild ID>` | No | Discord guild/server ID for the widget embed. Find in Server Settings → Widget. |
| `DISCORD_WEBHOOK_URL` | Prod | `TBD: <webhook URL>` | Yes | Only if contact or report forms post to Discord. Never expose client-side. |

`TBD: <confirm whether the Figma design includes a Discord widget — Figma MCP access was denied during runbook authoring; verify manually>`

### Donation processor

| Variable | Scope | Example | Secret? | Notes |
|---|---|---|---|---|
| `TBD: DONATION_PUBLIC_KEY` | Prod | `TBD` | No | Public/client key for donation provider |
| `TBD: DONATION_SECRET_KEY` | Prod | `TBD` | Yes | Webhook verification secret — server-side only |

`TBD: <confirm donation provider — DonationAlerts, Boosty, YooKassa, or custom — and add its specific variable names here>`

### Local development

Create `.env.local` in repo root (already gitignored by Next.js):

```env
NEXT_PUBLIC_SITE_URL=https://region.game
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_YM_ID=
FIVEM_SERVER_URL=TBD
NEXT_PUBLIC_DISCORD_WIDGET_ID=TBD
```

Leave analytics IDs blank in dev to suppress real hits.

---

## 4. Image & asset handling

### `next/image` remote patterns

When external image sources are confirmed, add them to `next.config.ts`. Current placeholders:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TBD: Discord CDN for user/guild avatars
      // { protocol: 'https', hostname: 'cdn.discordapp.com', pathname: '/avatars/**' },
      // { protocol: 'https', hostname: 'cdn.discordapp.com', pathname: '/icons/**' },
      // TBD: CFX/FiveM resource images if server-status icons are sourced externally
      // { protocol: 'https', hostname: '**.cfx.re' },
    ],
  },
}

export default nextConfig
```

Next.js will throw a runtime error for any external `<Image>` src not covered here — add entries as
integrations are confirmed.

### Asset storage

Use **`/public`** for all static assets (hero images, icons, fonts, social preview image). This is
the correct choice for a marketing landing page: zero extra configuration, zero extra cost, served
automatically via Vercel's global CDN.

**Do not introduce Vercel Blob** unless user-generated content is added (e.g. player-submitted
screenshots). It is unnecessary complexity for a static landing.

---

## 5. CI / quality gates

### Required checks — must pass on every PR before merge

```bash
npm run build   # next build: catches type errors, missing env vars, render failures
npm run lint    # eslint (v9 flat config via eslint-config-next 16.2.6)
```

Add a GitHub Actions workflow:

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://region.game
          NEXT_PUBLIC_GA_ID: ""
          NEXT_PUBLIC_YM_ID: ""
```

Vercel also runs `next build` on every PR automatically and blocks merge if it fails.

### Speed Insights + Web Analytics

Enable both in Vercel Dashboard → Project → Analytics tab and Speed Insights tab. Then:

```bash
npm install @vercel/analytics @vercel/speed-insights
```

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// inside <body>:
<Analytics />
<SpeedInsights />
```

This provides real-user Core Web Vitals data per route — essential for tracking LCP < 2.5 s,
CLS < 0.1, INP < 200 ms targets from AGENTS.md.

### Preview deployment URLs

Every PR gets a unique URL:
`https://region-<branch-slug>-<vercel-team>.vercel.app`

Vercel posts this as a PR comment automatically. Use it for visual QA and OG preview testing
before merge.

---

## 6. Caching & static rendering

> **Next.js 16 only**: This section uses the **Cache Components** model (`'use cache'` directive,
> `cacheLife`, `cacheTag`). The old patterns — `export const revalidate`, `export const dynamic =
> 'force-static'`, `fetch` cache options — are the "previous model" and behave differently when
> `cacheComponents: true` is set. Do not mix them.

### Enable Cache Components

```ts
// next.config.ts
const nextConfig: NextConfig = {
  cacheComponents: true,
}
```

### Landing page — fully static

The home page is marketing content that changes at most a few times per week. Cache it maximally:

```tsx
// app/page.tsx
import { cacheLife } from 'next/cache'

export default async function HomePage() {
  'use cache'
  cacheLife('max')   // stale: 5 min, revalidate: 30 days, expire: ~indefinite
  // ...
}
```

At build time Vercel prerenderes this to a static shell and serves it from the edge with zero
function invocations.

### Live player-count widget (if added)

Do not block the static shell on a live API. Use a route handler with a short cache lifetime, and
wrap the component in `<Suspense>` on the page:

```ts
// app/api/server-status/route.ts
import { cacheLife } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  'use cache'
  cacheLife({ stale: 30, revalidate: 60, expire: 300 })  // refresh every 60 s
  const res = await fetch(`${process.env.FIVEM_SERVER_URL}/players.json`)
  const players = await res.json()
  return NextResponse.json({ count: players.length })
}
```

```tsx
// in page.tsx
<Suspense fallback={<span aria-label="Loading player count">—</span>}>
  <PlayerCount />   {/* fetches /api/server-status client-side */}
</Suspense>
```

The static shell (hero, nav, CTAs) renders instantly from the edge; only the player-count slot
streams in. LCP is unaffected.

---

## 7. Rollback & monitoring

### Instant rollback

1. Vercel Dashboard → Project → Deployments.
2. Find the last known-good deployment (green checkmark).
3. Click **⋯ → Promote to Production**.

Traffic switches instantly — no redeploy, no downtime. Vercel retains all previous deployment
artifacts indefinitely.

### Monitoring

| Tool | Where | What to watch |
|---|---|---|
| Vercel Runtime Logs | Dashboard → Logs | 5xx errors, function timeouts, cold-start spikes |
| Vercel Speed Insights | Dashboard → Speed Insights | LCP, CLS, INP regressions per deploy |
| Vercel Web Analytics | Dashboard → Analytics | Traffic, bounce rate, top pages |
| Sentry | `TBD: <decide>` | Runtime exceptions in route handlers (FiveM API failures, donation webhook errors). Install via `@sentry/nextjs`; add `SENTRY_DSN` (secret) + `NEXT_PUBLIC_SENTRY_DSN`. |

---

## 8. Post-deployment checklist

Run after every production deploy before closing the deploy ticket:

- [ ] `https://region.game` loads over HTTPS; no mixed-content warnings in DevTools
- [ ] `https://www.region.game` redirects (301) to apex
- [ ] `https://region.game/sitemap.xml` returns valid XML with correct domain
- [ ] `https://region.game/robots.txt` is present and not blocking crawlers
- [ ] OG preview: paste URL into https://www.opengraph.xyz — verify image, title, description
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) on mobile: LCP < 2.5 s, CLS < 0.1, INP < 200 ms
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) on home page — Organization + WebSite schema passes
- [ ] Vercel Analytics shows first page-view events within 60 s of a visit
- [ ] Discord widget (if present) renders and shows online member count
- [ ] Donation button (if present) navigates to correct provider URL
- [ ] Live player-count (if present) updates without blocking page render
