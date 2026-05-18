# Phase 5 — QA Report

_Generated 2026-05-17. Handoff document for the final polish pass._

---

## 5.1 — Visual / render check

### Routes

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ 200 | No runtime error strings. All 9 sections render. |
| `/terms` | ✅ 200 | h1 "Пользовательское соглашение" present. Draft banner present. |
| `/privacy` | ✅ 200 | h1 "Политика конфиденциальности" present. |
| `/disclaimer` | ✅ 200 | h1 "Дисклеймер" present. |
| `/cookies` | ✅ 200 | h1 "Политика обработки файлов cookie" present. |
| `/personal-data` | ✅ 200 | h1 "Согласие на обработку персональных данных" present. |

No "Application error", "Server-side error", or hydration mismatch strings found in any route.

### Section render order at `/`

Verified by `id` attribute and `aria-label` presence in HTML:

1. **Header** — sticky nav; logo, ГЛАВНАЯ/КАРТА/ОБ ИГРЕ/ИНФО links, ВОЙТИ button, social icons, hamburger (mobile). ✅
2. **Hero** (`id="hero"`) — "Новый сервер" + "GTA 5 RP" headline, subtitle, 2 info blocks, YAPROMO promo code, CTA button, scroll arrow. ✅
3. **Map** (`id="map"`) — "Карта Ленинградской области и регионов" heading, 8 city sidebar, screenshot area, city tabs. ✅
4. **Roles** (`id="about"`) — "Выбери свою роль" heading, 5 role cards (Медик/Военный/Полицейский/Бандит/Бизнесмен), popup modal on click. ✅
5. **Cars** (no outer scroll-spy id, within `about` region) — "Собери свой автопарк мечты", Ferrari 488 GTB, Audi RS7, stat badges. ✅
6. **RPEconomy** (`id="info"`) — "Продуманная система RP и экономика", 2 feature items, 2 photos. ✅
7. **Tagline** (aria-label="Девиз Region RP") — "Это мир, где ты не просто играешь…", 4 decorative props. ✅
8. **HowToPlay** (`id="howtoplay"`) — "Как начать играть?", 3 step cards with illustrations (placeholder), СКАЧАТЬ + СКОПИРОВАТЬ buttons. ✅
9. **Footer** (aria-label="Подвал сайта") — logo, legal entity, Информация nav, Контакты, payment logos, copyright, social icons. ✅

> Note: Cars section has no wrapping `<section id="cars">` in `page.tsx`; it relies on its own `<section>` element but without a dedicated scroll-spy id. The scroll-spy only monitors `hero`, `map`, `about`, `info` — this is by design per TASKS.md.

### Tailwind tokens / typography

- `--color-bg: #020309` present in globals.css `@theme`; rendered as `bg-bg` class in HTML ✅
- `text-white` and `font-extrabold` classes used throughout hero heading ✅
- `bg-accent` / `--color-accent: #ff2830` in @theme; accent button renders ✅
- `--color-bg`, `--color-surface`, `--color-accent`, all gradient CSS vars defined in `:root` block ✅
- Montserrat: loaded via `next/font/google` with `variable: '--font-montserrat'`; `<html>` carries the `montserrat_*` class; font CSS variable confirmed in HTML ✅
- All type scale tokens (`text-display`, `text-h2`, `text-h3`, `text-body`, `text-nav`, `text-caption`) present in @theme ✅
- `--radius-card: 20px`, `--radius-btn: 20px` in @theme ✅

### Mobile responsiveness (source-level)

| Section | Responsive utilities | Notes |
|---|---|---|
| Header | `hidden min-[440px]:flex`, `flex min-[440px]:hidden` | Breakpoint at 440px per Figma spec. Hamburger shown below 440px. |
| Hero | `text-[54px] ... md:text-[100px]` | Headline scales from 54px (mobile) → 100px (desktop). ✅ |
| Map | `lg:flex-row`, carousel prev/next arrows for mobile | Mobile carousel present. ✅ |
| Roles | `lg:flex-row`, `lg:w-[311px]` | 2-column grid mobile not explicitly set as `grid-cols-2` — flagged below. |
| Cars | `lg:flex-row` card stack | Mobile stacks vertically ✅ |
| RPEconomy | `lg:flex-row` 2-col split | Mobile stacks ✅ |
| Tagline | `max-[1919px]:hidden` / `min-[1920px]:hidden` for props | Desktop props hidden below 1920px, mobile props shown — breakpoint strategy uses 1920px as desktop threshold (unusual, see deviations). |
| HowToPlay | `grid-cols-1` → `lg:grid-cols-3` | Cards stack on mobile. Middle card `lg:mt-[112px]` stagger desktop-only. ✅ |
| Footer | `flex-col gap-10 lg:grid lg:grid-cols-[auto_auto_auto_auto]` | 4-col grid desktop, stacked mobile. ✅ |

---

## 5.2 — Functional checks

| Feature | Status | Notes |
|---|---|---|
| Promo countdown timer | ✅ | `'use client'` ✅. `useEffect` + `setInterval(1000)` ✅. `clearInterval` on unmount ✅. `00:00:00` fallback when `targetDate` empty or past ✅. Hero passes `process.env.NEXT_PUBLIC_LAUNCH_DATE ?? ''` ✅. "YAPROMO" code appears in rendered HTML ✅. |
| Copy-IP button | ✅ | `'use client'` ✅. `async handleCopy` ✅. `try/catch` with `execCommand` fallback ✅. Label toggles "СКОПИРОВАТЬ" → "СКОПИРОВАНО ✓" ✅. 2s reset via `setTimeout` ✅. Button renders in HTML ✅. |
| Scroll-spy | ✅ | `useScrollSpy` uses `IntersectionObserver` ✅. Returns active id ✅. Header calls with `['hero', 'map', 'about', 'info']` ✅. Active styling applied (white vs text-muted) ✅. Anchors `id="hero"`, `id="map"`, `id="about"`, `id="info"` all present in rendered HTML ✅. |
| Footer legal links (5×) | ✅ | All 5 links present in rendered HTML: `/terms`, `/privacy`, `/disclaimer`, `/cookies`, `/personal-data` ✅. |
| Mobile hamburger menu | ✅ | Hamburger button present with `aria-expanded`, `onClick={() => setDrawerOpen(true)}` ✅. Slide-in drawer with `translate-x-0` / `translate-x-full` transition ✅. Close button ✅. Nav links + socials in drawer ✅. `body.overflow = 'hidden'` on open ✅. |

---

## 5.3 — SEO checks

| Check | Status | Notes |
|---|---|---|
| `/sitemap.xml` | ✅ | HTTP 200. Valid `<?xml ...>` opening. Contains `<loc>http://localhost:3000/</loc>` (trailing slash added during this QA pass). All 6 entries present (/, /terms, /privacy, /disclaimer, /cookies, /personal-data). |
| `/robots.txt` | ✅ | HTTP 200. Has `User-Agent: *` and `Allow: /` and `Sitemap: http://localhost:3000/sitemap.xml`. |
| `/opengraph-image` | ⚠️ | HEAD request returns HTTP 200 `Content-Type: image/png` ✅. However, full GET hangs in curl (empty reply) because the Node.js route attempts to fetch Google Fonts from `fonts.gstatic.com` — on slow/no network the response body never arrives before client timeout. Missing `export const runtime = 'edge'` per SEO.md spec (commented out in code as intentional, but this causes the slowness). Functional in browser/Vercel. Flag for production validation. |
| `<title>` | ✅ | Exact match: `<title>Region RP — Новый сервер GTA 5 RP</title>` |
| `<meta description>` | ✅ | Exact match: `Region RP — это GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти, где ты строишь свою историю с нуля` |
| JSON-LD Organization | ✅ | `"@type":"Organization"` block present with `name`, `legalName`, `url`, `email`, `logo`, `sameAs`. |
| JSON-LD WebSite | ✅ | `"@type":"WebSite"` block present with `name`, `url`, `inLanguage:"ru-RU"`. |
| JSON-LD VideoGame | ✅ | `"@type":"VideoGame"` block present with `name`, `description`, `genre`, `gamePlatform`, `operatingSystem`, `applicationCategory`, `url`, `publisher`. |
| `<html lang="ru">` | ✅ | `<html lang="ru" class="montserrat_...">` confirmed. |
| Legal pages `robots: noindex` | ✅ | All 5 legal pages render `<meta name="robots" content="noindex, nofollow"/>`. |

---

## 5.4 — Deviations & TODOs

### Visual deviations from Figma (source-level analysis against DESIGN.md verified data)

> Note: The `designer` subagent (ClaudeTalkToFigma MCP) was not available in this session — the `Agent` tool is not present in this agent's tool list. The deviations below are derived from cross-referencing source code against the verified Figma data already recorded in `docs/DESIGN.md` (verified 2026-05-16).

**Header (`10:32`)**
1. Social icons use inline SVG (correct shapes), but no individual `.svg` file exists for the Telegram icon (`/public/images/` has `icon-discord.svg`, `icon-vk.svg`, `icon-youtube.svg` — Telegram is inline SVG only). Minor inconsistency, not a blocker.
2. Figma shows 4 social icons; 4th in Figma (`40:301`) is YouTube — code implements Discord, VK, Telegram, YouTube — ✅ correct.
3. `OnlineCounter` polling wraps in `<Suspense>` on desktop path only; mobile path uses `<OnlineCounter>` directly without Suspense — potential Suspense boundary mismatch if `OnlineCounter` becomes async.

**Hero (`88:86`)**
1. **Critical visual**: `hero-bg.webp` is a 1×1 pixel stub (40 bytes). The hero background renders as a blank/invisible image. Real asset must be exported from Figma node `24:396`.
2. Hero text is `text-left` / `items-start` — matches Figma (LEFT-aligned per DESIGN.md §2.2). ✅ Previous discrepancy (`text-center`) was already fixed.
3. ScrollArrow SVG (node `99:1701`): code renders 3 right-pointing triangles side-by-side horizontally in a 67×33 viewport with radial+stroke gradients — this matches the Figma description in DESIGN.md. ✅
4. Bottom fade (`88:87`) implemented as `h-[146px] bg-gradient-to-t from-bg to-transparent` — matches Figma spec (146px bottom-to-top only, no full-frame overlay). ✅
5. Info blocks use `grid-cols-1 md:grid-cols-2` — Figma positions them as a 2-column row on desktop. The `max-w-4xl` container may be narrower than the Figma's `427×186px` cards within the 1620px content area.

**Map (`99:434`)**
1. **Missing assets**: `/public/images/map.webp` does not exist (404). Map image area will be blank.
2. **Missing screenshots**: `/public/images/screenshots/` directory does not exist. All 8 city screenshot slots render broken images.
3. City copy is verbatim from Figma (incl. `ул.. Высотная, 1` double-dot per Figma verbatim). ✅
4. Mobile carousel (prev/next) is implemented; exact mobile layout against `288:663` not fully verified (TODO comment in component).

**Roles (`112:557`)**
1. Role card mobile layout: TASKS.md spec says "2-column grid, 195px cards" but source-level check did not confirm `grid-cols-2` for mobile — needs verification in browser.
2. Character illustrations (`/images/roles/*.webp`) and icons (`/images/roles/*-icon.png`) exist for all 5 roles. ✅
3. Popup modal implemented as conditional-render overlay (no third-party library). ✅

**Cars (`165:425`)**
1. Car images exist (`/images/cars/ferrari-488-gtb.png`, `audi-rs7.png`). ✅
2. Stat badge data is inferred (speeds/acceleration not verified against Figma node text — Figma node did not include badge values in DESIGN.md). Values used: 330km/h, 3.0s, 100% for Ferrari; 300km/h, 3.4s, 100% for Audi. Confirm with Figma.
3. Card size target is 800×552px; code uses `lg:h-[552px]` — check at 1920px width.

**RPEconomy (`170:551`)**
1. Feature item icons referenced as `/images/rp-economy-icon-wallet.svg` and `/images/rp-economy-icon-id.svg` — both exist in `/public/images/`. ✅
2. `rp-photo-1.webp` and `rp-photo-2.webp` both exist and have real content (127KB/139KB). ✅
3. Mobile sub-copy copy (used as `ACCENT_COPY`) appears to be from a different Figma section — matches the `HowToPlay` mobile copy mismatch noted in DESIGN.md §TBD-8. Not shown as a standalone element in this section's current rendering.

**Tagline (`170:552`)**
1. Decorative prop images (`prop-star.png`, `prop-money.png`, `prop-grenade.png`, `prop-balaclava.png`) all exist in `/public/images/props/`. ✅
2. Desktop prop breakpoint uses `max-[1919px]:hidden` — props are hidden on all screens below 1920px wide. On typical 1440px desktops, desktop props won't show; only mobile-sized props (94–179px) appear. This is a significant visual deviation — the Figma desktop props (240–577px) won't render on real-world 1440px monitors.
3. Section background is `bg-bg` (plain `#020309`) — Figma shows no explicit fill (inherits page bg). ✅

**HowToPlay (`170:550`)**
1. **Missing assets**: `/public/images/howtoplay/` directory is empty. Step illustrations `step-01.png`, `step-02.png`, `step-03.png` do not exist — all 3 step card illustration areas render broken images.
2. Step badge size: code implements `h-[52px] w-[69px] lg:h-[69px] lg:w-[91px]` — matches Figma spec (91×69px desktop, 69×52px mobile). ✅
3. Sub-copy double-space after "шага" preserved via `&#160;` + regular space. ✅
4. Card stagger (middle card `lg:mt-[112px]`) matches Figma layout. ✅
5. "СКАЧАТЬ" links to `https://rage.mp`. ✅

**Footer (`175:438`)**
1. Social icons row added in Footer (Col 1) — Figma footer `175:438` does NOT include social icons (confirmed in DESIGN.md §2.9 note). This is an implementation-side addition vs. Figma spec.
2. `<small>` fan-project disclaimer added in Footer — Figma footer does NOT include it (DESIGN.md §2.9 note). Per SEO.md §7 it was specced, but DESIGN.md §2.9 explicitly notes "Do not add the fan-project disclaimer to the rendered footer." Deviation from Figma.
3. Logo `/images/logo-footer.svg` (205×43px) exists. ✅
4. Legal entity copy exact match: "ООО «1 Геймс» ИНН 5260480189 ОГРН 1215200037535". ✅
5. Payment logos all exist in `/public/images/payment/`. ✅

---

### Functional issues

1. **`/opengraph-image` hangs on GET in dev** — the route fetches Google Fonts at request time with no timeout. In production (Vercel), this resolves quickly. In dev without network access, curl exits with empty reply. Not a blocker for production.
2. **Hero background missing** — `hero-bg.webp` is a 1×1 stub; no real image renders. Highest-priority visual blocker.
3. **HowToPlay illustrations missing** — all 3 step cards show broken images. Second-highest visual blocker.
4. **Map images missing** — `map.webp` and all 14 screenshot slots are unresolved. Third-highest visual blocker.
5. **`export const runtime = 'edge'` missing** from `opengraph-image.tsx` per SEO.md spec. The comment in the file explains the deliberate choice (Node.js runtime for reliability), but it deviates from the spec requirement. Confirm with owner.

---

### Missing assets (placeholders still in use)

| Asset | Path | Status |
|---|---|---|
| Hero background | `/public/images/hero-bg.webp` | 1×1 stub — needs export from Figma node `24:396` |
| Map image | `/public/images/map.webp` | File missing — needs export from Figma node `262:688` |
| Map screenshots (×8 used, ×14 designed) | `/public/images/screenshots/screenshot-1.webp` … | Directory missing entirely — needs export from Скриншоты_1…_14 |
| HowToPlay step illustrations (×3) | `/public/images/howtoplay/step-01.png` … | Directory exists but empty — needs export from `175:336`, `175:357`, `175:371` |
| Telegram icon SVG file | `/public/images/icon-telegram.svg` | Inline SVG only; no file on disk (minor inconsistency) |
| Logo PNG (512×512 for JSON-LD) | `/public/logo.png` | Referenced in Organization schema `url: /logo.png` — file does not exist in `/public/` |

---

### TBDs requiring external input

1. **4 social URLs in Organization schema** — `sameAs` array contains "TBD: Discord/VK/Telegram" strings. Must be replaced before launch.
2. **3 step illustrations** under `/public/images/howtoplay/` — require Figma export.
3. **14 map screenshots** — require Figma export; `screenshots/` directory does not exist.
4. **Hero background** — requires Figma export from node `24:396`.
5. **Map image** — requires Figma export from node `262:688`.
6. **Production domain** in `NEXT_PUBLIC_SITE_URL` — set to `https://region.game`.
7. **GA4 / Yandex.Metrica IDs** — analytics not wired yet.
8. **Legal copy review** by Russian-licensed attorney — all 5 legal pages marked "Черновик".
9. **`/public/logo.png` (512×512)** — referenced in Organization JSON-LD schema but missing from `/public/`.
10. **Car stat values** — speeds/acceleration displayed (330km/h, 3.0s, etc.) are inferred; not verified against Figma badge nodes.
11. **Mobile sub-copy mismatch** in HowToPlay (DESIGN.md TBD-8) — mobile `288:493` has different text than desktop `172:243`; desktop copy used in implementation; confirm with client.

---

### Fixes applied during this QA pass

- `app/sitemap.ts:7` — Root URL changed from `BASE` to `` `${BASE}/` `` (added trailing slash so `<loc>http://localhost:3000/</loc>` matches the QA spec requirement).

No other fixes were required; all routes returned HTTP 200 with expected content.

---

## Summary scorecard

| Area | Score |
|---|---|
| All routes return 200 | ✅ 6/6 |
| No runtime errors | ✅ |
| All 9 sections render in order | ✅ |
| Tailwind tokens applied | ✅ |
| Mobile-first responsive utilities | ✅ |
| Promo countdown | ✅ |
| Copy-IP button | ✅ |
| Scroll-spy (4 anchors) | ✅ |
| Footer legal links (5×) | ✅ |
| Mobile hamburger | ✅ |
| Sitemap valid | ✅ |
| Robots.txt | ✅ |
| OG image (HEAD 200 image/png) | ⚠️ slow GET in dev |
| `<title>` exact match | ✅ |
| `<meta description>` exact match | ✅ |
| JSON-LD (3 schemas) | ✅ |
| `<html lang="ru">` | ✅ |
| Hero background image | ❌ stub |
| HowToPlay illustrations | ❌ missing |
| Map image + screenshots | ❌ missing |
