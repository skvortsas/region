# SEO Spec — Region RP

> **Implementation target:** Next.js 15 App Router · Metadata API · TypeScript · Vercel  
> **Audience:** Russian-speaking GTA 5 roleplay players  
> **Platform:** RAGE:MP (confirmed from "Загрузить и установить клиент RAGE MP" in Figma)  
> **Legal entity:** ООО «1 Геймс» ИНН 5260480189 ОГРН 1215200037535  
> **Last updated:** 2026-05-15

---

## 1. Meta

### Brand

| Field | Value |
|---|---|
| Brand name | **Region RP** |
| Hero headline | "Новый сервер / GTA 5 RP" |
| Hero subheadline | "успей раскрутиться раньше всех" |
| Platform | RAGE:MP |
| Custom maps | Санкт-Петербург + Тольятти |

### Title

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Region RP',
    default: 'Region RP — Новый сервер GTA 5 RP',  // 37 chars ✓
  },
}
```

Sub-page examples: `"Карта | Region RP"`, `"Об игре | Region RP"`.

### Description

Taken verbatim from Figma body copy (Mobile / Инфо section):

```ts
description: 'Region RP — это GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти, где ты строишь свою историю с нуля',
// 112 chars ✓ (limit: 150)
```

### Canonical & locale

```ts
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
// NEXT_PUBLIC_SITE_URL = TBD: production domain (e.g. https://regionrp.ru)

alternates: {
  canonical: '/',
},
openGraph: {
  locale: 'ru_RU',
  // No alternate locales — Russian-only project
},
```

### Keywords / category

`<meta name="keywords">` is not used (ignored by Google). Target these terms in copy and headings:

- `gta 5 rp сервер`, `rage mp сервер`, `region rp`, `gta roleplay санкт-петербург`, `gta rp тольятти`, `рп сервер гта 5`

---

## 2. Structured Data (JSON-LD)

Place all schemas as `<script type="application/ld+json">` in `/app/page.tsx`.

### Organization schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Region RP",
  "legalName": "ООО «1 Геймс»",
  "url": "TBD: production domain",
  "email": "hello@1games.ru",
  "logo": {
    "@type": "ImageObject",
    "url": "TBD: https://<domain>/logo.png — export from Figma 'Лого' frame, min 512×512",
    "width": 512,
    "height": 512
  },
  "sameAs": [
    "TBD: Discord invite URL — icon in header Frame 6, URL not in design",
    "TBD: VK community URL — icon in header Frame 6, URL not in design",
    "TBD: Telegram channel URL (first) — icon in header Frame 6, URL not in design",
    "TBD: Telegram channel URL (second) — second tg icon in header Frame 6; may be a second channel (e.g. news vs community); confirm with project owner"
  ]
}
```

### WebSite schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Region RP",
  "url": "TBD: production domain",
  "inLanguage": "ru-RU"
}
```

**SearchAction:** Omit — landing page has no on-site search.

### VideoGame schema (recommended)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Region RP",
  "description": "GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти. Выбирай роль и строй свою историю с нуля.",
  "genre": "Role-playing",
  "gamePlatform": "RAGE:MP",
  "operatingSystem": "Windows",
  "applicationCategory": "Game",
  "url": "TBD: production domain",
  "publisher": {
    "@type": "Organization",
    "name": "ООО «1 Геймс»"
  }
}
```

---

## 3. OG / Twitter Cards

### OG image — `/app/opengraph-image.tsx`

- **Size:** 1200 × 630 px
- **Runtime:** `'edge'` (Vercel Edge via `ImageResponse`)
- **Content:**
  1. Dark background matching the Figma hero gradient/color palette
  2. Region RP logo (export 'Лого' frame from Figma, centered or top-left)
  3. Headline: "Новый сервер GTA 5 RP" in Montserrat Bold
  4. Subheadline: "успей раскрутиться раньше всех" in Montserrat Regular
  5. A hero render/screenshot of the St. Petersburg map (export from Figma 'Фоновое видео (пока статика)' frame)
  6. Domain in small type at bottom-right

```ts
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (/* JSX matching Figma hero palette: dark bg, logo, headline, hero render */),
    {
      ...size,
      fonts: [{
        name: 'Montserrat',
        data: await fetch('https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459Wlhzg.woff2').then(r => r.arrayBuffer()),
        style: 'normal',
        weight: 700,
      }],
    }
  )
}
```

### Twitter/X card — `/app/twitter-image.tsx`

- **Size:** 1200 × 600 px
- **Card type:** `summary_large_image`
- **Same visual content as OG image** (crop/recompose to 1200×600)

```ts
// app/layout.tsx
twitter: {
  card: 'summary_large_image',
  site: 'TBD: @handle — no Twitter/X presence visible in design; confirm with project owner',
  creator: 'TBD: same as site',
},
```

---

## 4. Performance

### Fonts

**Font confirmed from Figma:** Montserrat (used at 12–100px across all text nodes, all weights).

```ts
// app/layout.tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],  // cyrillic required — all copy is Russian
  display: 'swap',
  preload: true,
  variable: '--font-montserrat',
  // Load all weights used in design: 400 (body), 700 (headings/buttons)
  // Inspect at runtime if 600/800 are also needed
})
```

- `cyrillic` subset is mandatory — all UI copy is Russian.
- Preload on root layout (used above the fold in hero).
- No secondary or local font detected in Figma.

### Third-party scripts

| Script | Strategy | Notes |
|---|---|---|
| Google Analytics 4 | `strategy="lazyOnload"` | Via `next/script` in root layout |
| Yandex.Metrica | `strategy="lazyOnload"` | Mandatory for RU audience; add noscript pixel too |
| Discord widget | `strategy="lazyOnload"` | Only if embedded widget is added later |

No script should use `strategy="beforeInteractive"` or block the main thread.

### Image policy

| Image | `next/image` props |
|---|---|
| Hero video placeholder ('Фоновое видео') | `priority={true}`, explicit `width={1920}` `height={1080}` |
| Role character images (Врач, Военный, etc.) | `loading="lazy"`, explicit dimensions |
| Car images (Audi RS7, Ferrari 488 GTB, etc.) | `loading="lazy"`, explicit dimensions |
| Map screenshots (Скриншоты_1–14) | `loading="lazy"`, explicit dimensions |
| Logo | `priority={true}` (above fold in header), explicit dimensions |
| Payment logos (Visa/MC/SBP/Mir) in footer | `loading="lazy"`, explicit dimensions |

Export all raster assets from Figma as `.webp` at 2×.

---

## 5. Sitemap

File: `/app/sitemap.ts` — `export default function sitemap(): MetadataRoute.Sitemap`.

**Routes confirmed from Figma nav** (header menu: ГЛАВНАЯ, КАРТА, ОБ ИГРЕ, ИНФО):

| Route | Priority | changefreq | Source |
|---|---|---|---|
| `/` | 1.0 | `weekly` | Main landing (confirmed) |
| `/map` | 0.7 | `monthly` | "КАРТА" nav item (confirm slug with dev) |
| `/about` | 0.6 | `monthly` | "ОБ ИГРЕ" nav item (confirm slug with dev) |
| `/info` | 0.6 | `monthly` | "ИНФО" nav item (confirm slug with dev) |
| `/terms` | 0.3 | `yearly` | "Пользовательское соглашение" footer link |
| `/privacy` | 0.3 | `yearly` | "Политика конфиденциальности" footer link |
| `/disclaimer` | 0.3 | `yearly` | "Дисклеймер" footer link |
| `/cookies` | 0.2 | `yearly` | "Политика обработки файлов cookie" footer link |
| `/personal-data` | 0.2 | `yearly` | "Согласие на обработку персональных данных" footer link |

> The landing page may render all sections on `/` as a single scrollable page rather than separate routes. Confirm with the project owner whether КАРТА / ОБ ИГРЕ / ИНФО are anchor scrolls (`/#map`) or real sub-routes.

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL!

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                   lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/map`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/info`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/terms`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/disclaimer`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cookies`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/personal-data`,lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
```

### robots.ts

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

---

## 6. Analytics & Verification

### Required env vars

```env
# .env.local — never commit; mirror all in Vercel dashboard → Settings → Environment Variables
NEXT_PUBLIC_SITE_URL=TBD: https://regionrp.ru
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX       # TBD: GA4 Measurement ID
NEXT_PUBLIC_YM_ID=XXXXXXXX            # TBD: Yandex.Metrica counter ID
```

### Google Analytics 4

```tsx
// components/Analytics.tsx — imported in app/layout.tsx
import Script from 'next/script'

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
      `}</Script>
    </>
  )
}
```

### Yandex.Metrica

Mandatory for Russian traffic. Wrap counter in `NEXT_PUBLIC_YM_ID` guard.

```tsx
<Script id="ym-init" strategy="lazyOnload">{`
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,
  k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script",
  "https://mc.yandex.ru/metrika/tag.js","ym");
  ym(${process.env.NEXT_PUBLIC_YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
`}</Script>
<noscript>
  <div><img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YM_ID}`} style={{position:'absolute',left:'-9999px'}} alt="" /></div>
</noscript>
```

### Search console verification

```ts
// app/layout.tsx → generateMetadata()
verification: {
  google: 'TBD: token from Google Search Console → Settings → Ownership → HTML tag method',
  yandex: 'TBD: token from Yandex.Webmaster → Settings → Site verification → Meta tag',
},
```

---

## 7. Legal / SEO Crossover

### Non-affiliation disclaimer

The Figma design already includes a dedicated **"Дисклеймер"** footer link (route `/disclaimer`) and the footer text confirms the company as ООО «1 Геймс». The disclaimer page should contain:

> **Recommended Russian copy for `/disclaimer` page and footer note:**
>
> Region RP является независимым некоммерческим fan-проектом и не связан, не одобрен и не аффилирован с Rockstar Games, Take-Two Interactive Software, Inc. и их партнёрами. Grand Theft Auto V и все связанные торговые марки, логотипы и активы являются собственностью Take-Two Interactive Software, Inc. Использование названий и материалов осуществляется в информационных целях без намерения нарушить права правообладателей.
>
> Сервер работает на платформе RAGE Multiplayer (RAGE:MP) — стороннем многопользовательском клиенте, не связанном с Rockstar Games.

A condensed one-line version for the footer `<small>`:

> Region RP — независимый fan-проект. Не аффилирован с Rockstar Games и Take-Two Interactive.

### Russian legal pages (confirmed from Figma footer)

The footer lists five legal documents that **must** be implemented as real pages (Russian law — Роскомнадзор / 152-ФЗ require these for any site collecting personal data):

| Page | Route | Required by |
|---|---|---|
| Пользовательское соглашение | `/terms` | Site policy |
| Политика конфиденциальности | `/privacy` | 152-ФЗ (Personal Data Law) |
| Дисклеймер | `/disclaimer` | GTA/Rockstar IP |
| Политика обработки файлов cookie | `/cookies` | EU/RU cookie law |
| Согласие на обработку персональных данных | `/personal-data` | 152-ФЗ |

> These pages should have `generateMetadata()` with `robots: { index: false }` — they must not rank in search but must be accessible.

---

## TBD Summary

| # | What's needed | Who provides it | Was TBD before? |
|---|---|---|---|
| 1 | **Production domain** | Project owner | ✓ was TBD |
| 2 | **Discord invite URL** | Project owner | ✓ was TBD |
| 3 | **VK community URL** | Project owner | ✓ was TBD |
| 4 | **First Telegram channel URL** | Project owner | ✓ was TBD |
| 5 | **Second Telegram channel URL** (2 tg icons in header) | Project owner — confirm if it's a news vs. community channel | new |
| 6 | **Twitter/X handle** | Project owner — no X presence visible in design | ✓ was TBD |
| 7 | **Nav slugs** — are КАРТА/ОБ ИГРЕ/ИНФО anchor scrolls or real routes? | Dev decision | new |
| 8 | **Google Search Console** verification token | Developer (after domain is live) | ✓ was TBD |
| 9 | **Yandex.Webmaster** verification token | Developer (after domain is live) | ✓ was TBD |
| 10 | **GA4 Measurement ID** + **Yandex.Metrica counter ID** | Project owner | ✓ was TBD |

**Resolved from Figma** (were TBD, now confirmed): font (Montserrat + cyrillic), platform (RAGE:MP), tagline, meta description copy, nav items × 4, footer legal pages × 5, contact email (hello@1games.ru), legal entity (ООО «1 Геймс»), social platform types (Discord, VK, 2×Telegram), hero content for OG image.
