# Region RP — Implementation Tasks

> **How to use this file**
> - Each task has a `- [ ]` checkbox. Mark it `- [x]` when complete.
> - Phases are sequential — do not start a phase until all tasks in the previous phase are checked.
> - Tasks separated by `---` inside a phase can be delegated to different agents running in parallel.
> - Every agent must read `AGENTS.md`, `docs/DESIGN.md`, and the relevant section of `docs/SEO.md` before starting.
> - **Figma access** — the only Figma integration is the **ClaudeTalkToFigma MCP** (`mcp__ClaudeTalkToFigma__*` tools). There is no plugin Figma MCP, no REST API, no PAT. Do **not** invoke the `figma:figma-use` / `figma:figma-implement-design` / `figma:figma-generate-design` skills — they are unrelated and do not work for this project.
> - **Channel must be joined first.** Before any `mcp__ClaudeTalkToFigma__*` call, the parent session must have run `mcp__ClaudeTalkToFigma__join_channel` with the channel code the user provides. If a Figma call returns "not joined" / no-channel, stop and ask the user for the channel code (shown in their Figma plugin UI).
> - **Delegate Figma reads to the `designer` subagent** (`Agent` tool, `subagent_type: "designer"`). It is configured with the read-only ClaudeTalkToFigma tool list and knows the node-ID table for this file. Give it specific node IDs and ask for what you need (node dimensions, text content verbatim, exported SVG/PNG). The designer agent only edits `docs/DESIGN.md`; implementation agents own source code.
> - Preferred Figma tools (used by `designer` and, when needed, directly): `get_node_info` / `get_nodes_info` (start at `depth=0`, batch when possible), `scan_text_nodes` for copy extraction, `get_svg` for vector exports, `export_node_as_image` only when raster is required. See `.claude/agents/designer.md` for the full reference.
> - Figma URLs use `node-id=10-32`; the API uses `10:32` (dashes → colons). All node IDs in this file are already in the colon form.
> - Source of truth for all token values: `docs/DESIGN.md §1`.
> - Source of truth for all SEO/meta implementation: `docs/SEO.md`.
> - Source of truth for caching, CI, and deployment: `docs/DEPLOYMENT.md`.

---

## Phase 1 — Foundation

> **One agent, sequential order. Everything else is blocked until this phase is complete.**

- [x] **1.1 — Update `AGENTS.md`**
  - Change "Next.js 15" → "Next.js **16.2.6**" in the Stack section.
  - Change font from "Inter" → "**Montserrat**" (cyrillic subset, via `next/font/google`).
  - Add a note: "Caching model: Cache Components (`'use cache'` directive). Do not use `export const revalidate` or old fetch cache patterns."
  - Fill the empty "File structure" section with the tree below:
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

- [x] **1.2 — Rewrite `app/globals.css`**
  - Replace everything below `@import "tailwindcss"` with the `@theme` block from `docs/DESIGN.md §1.2`.
  - Add gradient utilities as CSS custom properties (from `docs/DESIGN.md §1.1`, Gradients table).
  - Remove all default Geist/Next boilerplate CSS.

- [x] **1.3 — Rewrite `app/layout.tsx`**
  - Load Montserrat via `next/font/google`: subsets `['latin', 'cyrillic']`, `display: 'swap'`, `variable: '--font-montserrat'`, weights 400/500/600/700/800.
  - Set `<html lang="ru">`.
  - Export `metadata` using the title template and description from `docs/SEO.md §1` (title template `'%s | Region RP'`, default `'Region RP — Новый сервер GTA 5 RP'`).
  - Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')`.
  - Set `openGraph: { locale: 'ru_RU' }`.
  - Remove Geist font imports.
  - Keep `<body>` minimal — sections will be composed in `page.tsx`.

- [x] **1.4 — Create `.env.example` and `.env.local`**
  - `.env.example` (commit this):
    ```env
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    NEXT_PUBLIC_LAUNCH_DATE=          # ISO 8601, e.g. 2026-06-01T18:00:00+03:00
    NEXT_PUBLIC_SERVER_IP=            # RAGE:MP server IP:port, e.g. 0.0.0.0:22005
    NEXT_PUBLIC_RAGEMP_URL=           # Base URL for server status API, e.g. http://0.0.0.0:22005
    NEXT_PUBLIC_GA_ID=                # GA4 measurement ID, e.g. G-XXXXXXXXXX
    NEXT_PUBLIC_YM_ID=                # Yandex.Metrica counter ID
    ```
  - `.env.local` (do not commit — already in `.gitignore`): same keys, fill `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, leave rest empty.

- [x] **1.5 — Update `next.config.ts`**
  - Enable `cacheComponents: true`.
  - Add placeholder `images.remotePatterns: []` with commented stubs for Discord CDN and CFX (see `docs/DEPLOYMENT.md §4`).
  - Add `www → apex` redirect (use `yourdomain.com` placeholder; swap when domain is decided).

- [x] **1.6 — Create `app/sitemap.ts`**
  - Use the ready-made code from `docs/SEO.md §5`.
  - Nav items КАРТА, ОБ ИГРЕ, ИНФО are **anchor scrolls** on `/`, not separate routes. Remove `/map`, `/about`, `/info` entries.
  - Keep only: `/` (1.0), `/terms` (0.3), `/privacy` (0.3), `/disclaimer` (0.3), `/cookies` (0.2), `/personal-data` (0.2).

- [x] **1.7 — Create `app/robots.ts`**
  - Use the ready-made code from `docs/SEO.md §5`.

- [x] **1.8 — Create `app/opengraph-image.tsx`**
  - Use the scaffold from `docs/SEO.md §3`.
  - Dark background `#020309`, Region RP logo text (Montserrat 800 white), headline "Новый сервер GTA 5 RP" (gradient `#ff2830` → `#ff686e`), subheadline "успей раскрутиться раньше всех".
  - Export `runtime = 'edge'`, `size = { width: 1200, height: 630 }`.

---

## Phase 2 — Shared UI Primitives

> **One agent, sequential. Depends on Phase 1. Sections (Phase 3) are blocked until this phase is complete.**

- [x] **2.1 — `components/ui/Button.tsx`**
  - Two variants: `primary` (red glow, `bg-accent`, `rounded-[20px]`, padding `36px`) and `secondary` (dark surface, same radius).
  - Accepts: `variant`, `size` (default / sm), `icon` slot (left), `href` (renders `<a>` if provided, `<button>` otherwise), `className`.
  - Glow effect: `box-shadow` using `--color-accent` at ~40% opacity, implemented as a Tailwind arbitrary value or CSS custom property — no inline styles.
  - Button label: Montserrat 700, `uppercase`, `text-[28px]` desktop / `text-[18px]` mobile.

- [x] **2.2 — `components/ui/SocialIcon.tsx`**
  - Accepts: `platform: 'discord' | 'vk' | 'telegram' | 'youtube'`, `href`, `className`.
  - 42 × 42 container with white fill icon SVGs (export from Figma nodes `40:288`–`40:301`). Use inline SVG or `next/image` for each.
  - `href="#"` for all platforms (URLs TBD).

- [x] **2.3 — `components/ui/OnlineCounter.tsx`**
  - Accepts: `count: number`.
  - Renders: green dot + `count` (Montserrat 700, `gradient-brand` text) + "ИГРОКОВ ОНЛАЙН" (14px/600, `text-muted`).
  - Default `count` prop: `142` (mock). Component is purely presentational — data fetching is done by the parent (`Header`).

- [x] **2.4 — `components/ui/PromoCode.tsx`**
  - Client component (`'use client'`).
  - Accepts: `code: string`, `targetDate: string` (ISO 8601 from `NEXT_PUBLIC_LAUNCH_DATE`).
  - Renders: promo code display (gradient `gradient-promo`, `cornerRadius=20`) + countdown timer (DD:HH:MM:SS).
  - If `targetDate` is empty or past, show `00:00:00:00`.
  - Uses `useEffect` + `setInterval(1000)` for the countdown. Clean up the interval on unmount.

- [x] **2.5 — `hooks/useScrollSpy.ts`**
  - Accepts: `sectionIds: string[]`, `rootMargin?: string`.
  - Uses `IntersectionObserver` to return the `id` of the section currently most visible in the viewport.
  - Default `rootMargin: '-40% 0px -55% 0px'` (triggers when section crosses 40% from top).

- [x] **2.6 — `lib/api/server-status.ts`**
  - Exports `async function getServerStatus(): Promise<{ count: number }>`.
  - Reads `NEXT_PUBLIC_RAGEMP_URL` from env. If empty, returns `{ count: 142 }` (mock).
  - If URL is set, fetches `${NEXT_PUBLIC_RAGEMP_URL}/players.json`, returns `{ count: data.length }`.
  - Wraps in try/catch — on error returns `{ count: 0 }`.

---

## Phase 3 — Sections + Legal Pages

> **All tasks below can run in parallel. Each section is a self-contained component. Depends on Phase 2.**
> **Legal pages (3.J) can also run in parallel — no dependency on sections.**

---

- [x] **3.A — `components/sections/Header.tsx`**
  - Figma node: `10:32` (1920 × 60). Mobile: hamburger menu `249:444`.
  - Sticky (`position: sticky; top: 0; z-index: 50`). Background `surface-elevated` with slight blur.
  - Logo SVG (`10:8`, 109 × 22): export from Figma, save to `/public/images/logo.svg`, render via `next/image`.
  - Nav: 4 `NavItem` links — ГЛАВНАЯ (`#hero`), КАРТА (`#map`), ОБ ИГРЕ (`#about`), ИНФО (`#info`). Use `useScrollSpy(['hero', 'map', 'about', 'info'])` to set the active item.
  - `OnlineCounter` component wired to `getServerStatus()` — call via `useEffect` on mount, re-poll every 60 s.
  - Button: `<Button variant="primary" size="sm">ВОЙТИ</Button>` — `href="#"` (auth TBD).
  - 4 `SocialIcon` components: discord, vk, telegram, youtube.
  - Mobile (< 440px): show logo + hamburger only; slide-in drawer reveals nav + socials.
  - `OnlineCounter` is a Client Component boundary — wrap in `<Suspense>`.

---

- [x] **3.B — `components/sections/Hero.tsx`**
  - Figma node: `88:86`. Full viewport height (`min-h-screen`).
  - Background: static image from Figma node `24:396`. Export as `/public/images/hero-bg.webp`. Use `next/image fill` with `priority` and `object-fit: cover`.
  - H1: "Новый сервер" (white) + "GTA 5 RP" (`gradient-brand` applied as `bg-clip-text`). Both 100px/800 desktop, 54px mobile.
  - Subtitle: "успей раскрутиться раньше всех" (28px/700).
  - Two info blocks (`38:240`, `38:239`): icon + body text at 20px/500. Extract copy from Figma.
  - `<PromoCode code="YAPROMO" targetDate={process.env.NEXT_PUBLIC_LAUNCH_DATE ?? ''} />`.
  - CTA: `<Button variant="primary" href="#">Начать играть</Button>` (583 × 88 desktop).
  - Arrow indicator (`99:1701`): 3 stacked triangles SVG, decorative, `aria-hidden`.

---

- [x] **3.C — `components/sections/Map.tsx`**
  - Figma node: `99:434`. Section id: `map`.
  - Heading: "Карта Ленинградской области и регионов". Sub-copy from node `91:92`.
  - Desktop: sidebar city list (8 cities) on left + screenshot panel on right. Clicking a city changes the displayed screenshot.
  - Mobile: horizontal carousel with prev/next arrows (as per DESIGN.md mobile notes).
  - 14 screenshot slots (`Скриншоты_1`–`Скриншоты_14`): export from Figma or use placeholder `next/image` with `alt` text and correct dimensions. Mark each placeholder with a `TODO: replace with real screenshot` comment.
  - Map image (`262:688`): export as `/public/images/map.webp`. Render via `next/image`.
  - City list items: icon + city name. 8 cities listed in `docs/DESIGN.md §2.3`.

---

- [x] **3.D — `components/sections/Roles.tsx`**
  - Figma node: `112:557`. Section id: `about`.
  - Heading: "Выбери свою роль и погрузись в мир RP". Sub-copy "Будь тем, кем ты хочешь быть".
  - 5 role cards (311 × 798 each, desktop): Медик, Военный, Полицейский, Бандит, Бизнесмен. Node ids in `docs/DESIGN.md §2.4`.
  - Each card: character illustration (`next/image`, lazy) + role icon + role name + description text. Export illustrations from Figma to `/public/images/roles/`.
  - On card click → open `RolePopup` modal. Modal frame node ids: `Попап с ролью_*`. Extract content per role. Use `<dialog>` or a simple conditional-render overlay — no third-party modal library.
  - Mobile: 2-column grid, 195px cards.

---

- [x] **3.E — `components/sections/Cars.tsx`**
  - Figma node: `165:425`.
  - Heading: "Собери свой автопарк мечты". Sub-copy "Больше 200 реальных авто…".
  - 2 car cards (800 × 552 each): Ferrari 488 GTB (`157:349`), Audi RS7 (`158:353`).
  - Each card: car image (`next/image`, lazy, export to `/public/images/cars/`) + 4 stat badges (Скорость, Разгон, Кастомизация, Название).
  - `StatBadge` component: label + value, `radius-card`, dark surface background.
  - Mobile: cards stack vertically, full width.

---

- [x] **3.F — `components/sections/RPEconomy.tsx`**
  - Figma node: `170:551`. Section id: `info`.
  - Heading: "Продуманная система RP и экономика". Extract copy from Figma.
  - 2 `FeatureItem` components: 58 × 58 icon (export from Figma) + body text. Extract copy from Figma nodes.
  - 2 in-game photos (`166:448`, `166:449`): export as `/public/images/rp-photo-1.webp`, `rp-photo-2.webp`. `next/image`, lazy.
  - Desktop: 2-column split (features left, photos right). Mobile: stacked.

---

- [x] **3.G — `components/sections/Tagline.tsx`**
  - Figma node: `170:552`.
  - Large centred body text: "Это мир, где ты не просто играешь…". Extract full copy from Figma.
  - 4 decorative floating prop images: Звезда (`170:530`), Деньги (`170:526`), Граната (`170:522`), Балаклава (`170:546`). Export as PNG with transparency to `/public/images/props/`. Use `next/image`, lazy, `aria-hidden`.
  - Props are absolutely positioned decorations — use `position: absolute` via Tailwind (`absolute top-X left-X`) matching Figma layout. This is the one legitimate use of positional classes.
  - Full-width section, dark background `gradient-footer`? Check Figma for bg.

---

- [x] **3.H — `components/sections/HowToPlay.tsx`**
  - Figma node: `170:550`.
  - H2: "Как начать играть?" — 100px/800 desktop.
  - 3 step cards (526 × 643 each, node ids in `docs/DESIGN.md §2.8`).
  - Step badge: circle with `gradient-button-glow`, step number 47px/700.
  - Step 01: "Купить и установить игру GTA V" — no CTA button.
  - Step 02: "Загрузить и установить клиент RAGE MP" — `<Button variant="secondary" href="https://rage.mp">СКАЧАТЬ</Button>`.
  - Step 03: "Подключиться к серверу Region" — copy-to-clipboard button.
    - Copy target: `process.env.NEXT_PUBLIC_SERVER_IP ?? '0.0.0.0:22005'`.
    - Button label toggles: "СКОПИРОВАТЬ" → "СКОПИРОВАНО ✓" for 2 s after click.
    - Client Component for clipboard logic.
  - Mobile: cards stack vertically.

---

- [x] **3.I — `components/sections/Footer.tsx`**
  - Figma node: `175:438`. Background `gradient-footer`.
  - Logo SVG (`175:448`, 205 × 43): `/public/images/logo-footer.svg`. `next/image`, `priority={false}`.
  - Legal entity line: "ООО «1 Геймс» ИНН 5260480189 ОГРН 1215200037535".
  - Nav links (`175:511`): 5 legal pages — links to `/terms`, `/privacy`, `/disclaimer`, `/cookies`, `/personal-data`.
  - Contact: `hello@1games.ru` as `<a href="mailto:hello@1games.ru">`.
  - 4 payment logo images (Visa, Mastercard, SBP, Mir): export SVGs from `179:524` to `/public/images/payment/`. Static `<img>` tags are fine here — no interactivity, decorative.
  - 4 `SocialIcon` components (same as Header).
  - Copyright: "Все права защищены © 2026 Копирование дизайна запрещено".
  - Disclaimer note (condensed, `<small>`): "Region RP — независимый fan-проект. Не аффилирован с Rockstar Games и Take-Two Interactive." from `docs/SEO.md §7`.

---

- [x] **3.J — Legal pages (one agent builds all five)**
  - Create the following 5 pages. Each must have `generateMetadata()` with `robots: { index: false }` and title matching the page name.
  - Generate realistic placeholder Russian legal copy for each (200–400 words). Mark each page with a top banner: `⚠️ Черновик — требует проверки юристом`.
  - Pages:
    - `app/terms/page.tsx` — Пользовательское соглашение
    - `app/privacy/page.tsx` — Политика конфиденциальности (mention 152-ФЗ, ООО «1 Геймс»)
    - `app/disclaimer/page.tsx` — Дисклеймер (use the full Rockstar non-affiliation copy from `docs/SEO.md §7`)
    - `app/cookies/page.tsx` — Политика обработки файлов cookie
    - `app/personal-data/page.tsx` — Согласие на обработку персональных данных
  - All pages: simple layout — white text on dark bg matching the site theme, `<main>` with `<h1>` + body copy, link back to `/`.

---

## Phase 4 — Assembly & Integration

> **One agent, sequential. Depends on Phase 3 (all sections and legal pages complete).**

- [ ] **4.1 — Rewrite `app/page.tsx`**
  - Import all 9 section components in render order.
  - Wrap each section in a `<section id="...">` with the correct anchor id (hero, map, about, info, etc.).
  - Apply `'use cache'` + `cacheLife('max')` at the top of the component (Next 16 Cache Components model — see `docs/DEPLOYMENT.md §6`).
  - Add JSON-LD: 3 schemas (Organization, WebSite, VideoGame) as `<script type="application/ld+json">`. Use the exact JSON from `docs/SEO.md §2`. Fill TBD fields with env vars where possible; leave domain as `process.env.NEXT_PUBLIC_SITE_URL`.

- [ ] **4.2 — GitHub Actions CI**
  - Create `.github/workflows/ci.yml` using the exact snippet from `docs/DEPLOYMENT.md §5`.
  - Confirm the workflow triggers on PRs to `main` and runs `npm run lint` + `npm run build`.

- [ ] **4.3 — Verify build passes**
  - Run `npm run build`. Fix any TypeScript errors, missing imports, or broken env var references.
  - Run `npm run lint`. Fix any ESLint errors (no warnings-as-errors — just fix actual errors).
  - Report: build output size per route, any warnings worth noting.

---

## Phase 5 — QA

> **One agent, sequential. Depends on Phase 4.**

- [ ] **5.1 — Dev server visual check**
  - Start `npm run dev`. Load `http://localhost:3000`.
  - Walk through each section top to bottom. For each section note: renders without errors, Tailwind tokens applied (dark bg, Montserrat font, red accent), no obvious layout breaks.
  - Check mobile viewport (440px width) in browser dev tools. Note any sections that need layout fixes.

- [ ] **5.2 — Functional checks**
  - Promo countdown timer counts down (or shows zeros if `NEXT_PUBLIC_LAUNCH_DATE` is unset).
  - Copy-IP button copies text and shows "СКОПИРОВАНО ✓" feedback.
  - Scroll-spy: nav active item changes as you scroll through sections.
  - All 5 footer legal links navigate to the correct pages.
  - Mobile hamburger menu opens/closes.

- [ ] **5.3 — SEO checks**
  - `http://localhost:3000/sitemap.xml` — valid XML, no 404.
  - `http://localhost:3000/robots.txt` — present.
  - `http://localhost:3000/opengraph-image` — renders the OG image correctly.
  - Page `<title>` and `<meta name="description">` match `docs/SEO.md §1` values.
  - JSON-LD present in page source (`<script type="application/ld+json">`).

- [ ] **5.4 — Report**
  - List any visual deviations from Figma by section name.
  - List any functional issues.
  - List any missing assets (placeholder images still in use).
  - This report is the handoff document for the final polish pass.
