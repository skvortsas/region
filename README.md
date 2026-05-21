# Region RP

Marketing landing page for **Region RP** — a Russian-language GTA 5 RP server running on RAGE Multiplayer, with detailed maps of Saint Petersburg and Tolyatti.

Live site: [region.game](https://region.game)

## Stack

- **Next.js 16.2.6** (App Router, Cache Components / `'use cache'`)
- **React 19** · **TypeScript** · **Tailwind CSS v4**
- **Montserrat** (Cyrillic subset) via `next/font/google`
- Deployed on **Vercel**
- Design source of truth: Figma (integrated via MCP during development)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |

## Environment variables

See [`.env.example`](./.env.example). All are optional at build time; the app falls back to safe defaults.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used by `metadataBase`, sitemap, robots, JSON-LD |
| `NEXT_PUBLIC_LAUNCH_DATE` | ISO 8601 timestamp for the hero countdown |
| `NEXT_PUBLIC_SERVER_IP` | RAGE:MP server `IP:port` shown in the header |
| `NEXT_PUBLIC_RAGEMP_URL` | Base URL for the live player-count fetch |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_YM_ID` | Yandex.Metrica counter ID |

## Project layout

```
app/          App Router pages, sitemap, robots, OG image, legal pages
components/
  sections/   One file per landing-page section (Hero, Map, Cars, …)
  ui/         Reusable primitives (Button, PromoCode, OnlineCounter, …)
hooks/        Client hooks (useScrollSpy)
lib/api/      Server-side data fetching (server-status)
public/       Static assets (images, videos, legal PDFs)
docs/         DESIGN.md · SEO.md · DEPLOYMENT.md · QA-REPORT.md
```

## Conventions

- Mobile-first, pixel-accurate to Figma; one `<h1>` per page; semantic headings.
- Images via `next/image` with explicit `width`/`height`; `priority` on hero, `loading="lazy"` below the fold.
- No inline styles — Tailwind utilities only.
- SEO: Metadata API per page, dynamic `sitemap.ts` / `robots.ts`, JSON-LD on the home page, OG image at `/app/opengraph-image.tsx`.
- Caching uses Next.js 16 Cache Components (`'use cache'`); do **not** use `export const revalidate` or legacy fetch-cache patterns.

## Documentation

- [`docs/DESIGN.md`](./docs/DESIGN.md) — design tokens, typography, spacing, per-section Figma references
- [`docs/SEO.md`](./docs/SEO.md) — metadata, structured data, analytics integration
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Vercel setup, env vars, branch/domain config
- [`docs/QA-REPORT.md`](./docs/QA-REPORT.md) — pre-launch QA checklist
- [`AGENTS.md`](./AGENTS.md) — guidance for AI coding agents working in this repo

## Legal

Static legal pages live under `/app/{terms,privacy,disclaimer,cookies,personal-data}`. Region RP is operated by ООО «1 Геймс» and is unaffiliated with Rockstar Games or Take-Two Interactive. Region RP runs on RAGE Multiplayer, a third-party modification.
