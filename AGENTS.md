<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project: Region

## Stack

- Next.js **16.2.6**, App Router, TypeScript, Tailwind CSS
- Font: **Montserrat** (cyrillic subset, via `next/font/google`)
- Deployed on Vercel
- Source of truth for design: Figma (MCP connected)
- Caching model: Cache Components (`'use cache'` directive). Do not use `export const revalidate` or old fetch cache patterns.

## Goals

- Mobile-first, pixel-accurate implementation of Figma designs
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Full SEO optimization: metadata API, structured data, OG images, sitemap

## Code conventions

- Use Next.js Metadata API (not react-helmet)
- All images via next/image with explicit width/height and priority on hero
- Use `loading="lazy"` on below-fold images
- Semantic HTML: one <h1> per page, proper heading hierarchy
- No inline styles; use Tailwind utility classes only
- All components in /components, all pages in /app

## SEO requirements

- generateMetadata() on every page
- /app/sitemap.ts (dynamic)
- /app/robots.ts
- JSON-LD structured data on home page (Organization + WebSite schema)
- OG image via /app/opengraph-image.tsx

## File structure

```
/app
  layout.tsx
  page.tsx
  globals.css
  favicon.ico
  opengraph-image.tsx
  sitemap.ts
  robots.ts
  /terms/page.tsx
  /privacy/page.tsx
  /disclaimer/page.tsx
  /cookies/page.tsx
  /personal-data/page.tsx
/components
  /ui
    Button.tsx
    SocialIcon.tsx
    OnlineCounter.tsx
    PromoCode.tsx
  /sections
    Header.tsx
    Hero.tsx
    Map.tsx
    Roles.tsx
    Cars.tsx
    RPEconomy.tsx
    Tagline.tsx
    HowToPlay.tsx
    Footer.tsx
/hooks
  useScrollSpy.ts
/lib
  /api
    server-status.ts
/public
  /images   ← all exported Figma assets land here
```
