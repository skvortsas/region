# Design Reference — Region RP

## Figma file

URL: https://www.figma.com/design/hu5WIju3XfamLoJCMByrpJ/Region-RP  
Extracted: 2026-05-15

---

## 1. Design tokens

### 1.1 Color palette

| Token name | Hex | Usage |
|---|---|---|
| `--color-bg` | `#020309` | Page background |
| `--color-surface` | `#0e0e0f` | Card / panel surface |
| `--color-surface-elevated` | `#111117` | Header bg, promo card |
| `--color-purple` | `#504c6c` | Step card glow, footer radial bg |
| `--color-accent` | `#ff2830` | Brand red (buttons, glow, active) |
| `--color-accent-light` | `#ff686e` | Gradient end of brand red |
| `--color-accent-promo` | `#ff7c81` | Promo code display gradient start |
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-secondary` | `rgba(255,255,255,0.80)` | Button labels, secondary text |
| `--color-text-muted` | `rgba(255,255,255,0.60)` | Nav inactive, "ИГРОКОВ ОНЛАЙН" |

**Gradients (define as CSS custom props or Tailwind utilities):**

| Token | Definition |
|---|---|
| `gradient-brand` | `linear-gradient(to bottom, #ff2830, #ff686e)` |
| `gradient-surface` | `linear-gradient(to bottom, #0e0e0f, #111117)` |
| `gradient-footer` | `radial-gradient(ellipse, #504c6c, #020309)` |
| `gradient-promo` | `radial-gradient(ellipse, #ff7c81, #ff2830)` |
| `gradient-card-glow` | two-layer: `radial(#504c6c 60% → 0%) + radial(#ff2830 40% → 0%)` |
| `gradient-button-glow` | `radial-gradient(#ff2830 at 60% opacity → transparent)` |

### 1.2 Typography

Single font family: **Montserrat** (Google Fonts / self-host via `next/font`).

| Token | Desktop px | Desktop rem | Mobile px | Weight | Line-height | Text-case |
|---|---|---|---|---|---|---|
| `text-display` | 100px | 6.25rem | 54px / 3.375rem | 800 | 100% | normal |
| `text-step-num` | 47px | 2.9375rem | TBD: not in mobile | 700 | 100% | normal |
| `text-h2` | 32px | 2rem | 32px | 700 | 102% | normal |
| `text-h3` | 28px | 1.75rem | TBD: not observed | 700 | 120% | normal |
| `text-body` | 20px | 1.25rem | 20px | 500 | 140% | normal |
| `text-nav` | 18px | 1.125rem | 18px | 600 | 122% | normal |
| `text-caption` | 14px | 0.875rem | 14px | 600 | 122% | normal |
| Button label | 28px | 1.75rem | ~18px | 700 | 100% | `uppercase` |

**`@theme` block for Tailwind v4 `globals.css`:**

```css
@theme {
  /* Colors */
  --color-bg: #020309;
  --color-surface: #0e0e0f;
  --color-surface-elevated: #111117;
  --color-purple: #504c6c;
  --color-accent: #ff2830;
  --color-accent-light: #ff686e;
  --color-accent-promo: #ff7c81;
  --color-text: #ffffff;
  --color-text-secondary: rgba(255,255,255,0.80);
  --color-text-muted: rgba(255,255,255,0.60);

  /* Font */
  --font-sans: 'Montserrat', sans-serif;

  /* Type scale */
  --text-display: 6.25rem;       /* 100px */
  --text-display--line-height: 1;
  --text-display-mobile: 3.375rem; /* 54px */
  --text-step-num: 2.9375rem;    /* 47px */
  --text-h2: 2rem;               /* 32px */
  --text-h2--line-height: 1.02;
  --text-h3: 1.75rem;            /* 28px */
  --text-h3--line-height: 1.2;
  --text-body: 1.25rem;          /* 20px */
  --text-body--line-height: 1.4;
  --text-nav: 1.125rem;          /* 18px */
  --text-nav--line-height: 1.22;
  --text-caption: 0.875rem;      /* 14px */
  --text-caption--line-height: 1.22;

  /* Border radius */
  --radius-card: 20px;
  --radius-btn: 20px;

  /* Spacing (used in button/promo padding) */
  --spacing-btn: 36px;
  --spacing-btn-gap: 8px;
  --spacing-promo-gap: 16px;
}
```

### 1.3 Spacing & border radii

| Token | Value | Where |
|---|---|---|
| `--radius-card` | `20px` | Role cards, step cards, promo box, buttons |
| Button padding | `36px` all sides | `Кнопка_2`, `Кнопка_3`, step badge |
| Button gap | `8px` | Icon ↔ label |
| Promo gap | `16px` | Icon ↔ code text |

### 1.4 Breakpoints (confirmed from Figma frames)

| Name | Width | Frame |
|---|---|---|
| `mobile` | **440px** | `Mobile id=236:307` |
| `desktop` | **1920px** | `Desctop id=2:385` |
| `tablet` | TBD: no tablet frame in Figma | — |

> **Note:** Mobile frame is 440px, not 375px. Adjust default mobile breakpoint accordingly.  
> Tablet (768px) is not designed — treat as fluid stretch between 440→1280 or TBD with client.

---

## 2. Sections (render order, Desktop)

| # | Section name (RU) | Figma node-id | Width × Height | Intent |
|---|---|---|---|---|
| 1 | **Хедер** (Header/Nav) | `10:32` | 1920 × 60 | Sticky nav: logo, 4 nav links, online counter, login button, social links |
| 2 | **Герой** (Hero) | `88:86` (bg) | 1920 × 1080 | Full-viewport hero: video/static background, main headline, CTA, promo code block |
| 3 | **Карта** (Map) | `99:434` | 1620 × 784 | Map of Leningrad Oblast; sidebar city list (8 locations); screenshot carousel |
| 4 | **Роли** (Roles) | `112:557` | 1619 × 1071 | 5 role cards (Медик, Военный, Полицейский, Бандит, Бизнесмен) with popup on click |
| 5 | **Авто** (Cars) | `165:425` | 1620 × 822 | Car showcase: 2 hero cars (Ferrari 488 GTB, Audi RS7) with stat badges |
| 6 | **RP и экономика** (RP & Economy) | `170:551` | 1620 × 895 | 2 feature items + 2 in-game photos; details game mechanics |
| 7 | **Доп. блок** (Extra / Tagline) | `170:552` | 1920 × 570 | Large centred quote + 4 decorative floating game-prop images |
| 8 | **Как играть** (How to Play) | `170:550` | 1920 × 1141 | 3-step guide: buy GTA V → install RAGE:MP → connect |
| 9 | **Подвал** (Footer) | `175:438` | 1920 × 532 | Logo, legal info (LLC "1 Геймс"), nav links, email, payment icons |

**Mobile frame `236:307` (440 × 8774) — same sections, same order.**  
Key layout differences on mobile:
- Header: logo only + hamburger (`Меню id=249:444`)
- Map: horizontal carousel with prev/next arrows instead of sidebar list
- Roles: 2-column grid (195px cards)
- Car cards: stacked vertically

### Section detail

#### 2.1 Header (`10:32`)
- Logo (SVG): `id=10:8` — 109 × 22
- Nav menu (`id=99:1653`): **ГЛАВНАЯ** (active), **КАРТА**, **ОБ ИГРЕ**, **ИНФО** — 4 links
- Online counter (`id=27:102`): green dot + number + "ИГРОКОВ ОНЛАЙН"
- Login button (`id=27:38`): "ВОЙТИ" — `cornerRadius=20` + red radial glow
- Social row (`id=40:306`): Discord, VK, Telegram, + 1 more — 42 × 42 each

#### 2.2 Hero (`88:86` + overlaid groups)
- Headline 1: `id=27:109` — "Новый сервер" — white, 100px/800
- Headline 2: `id=27:110` — "GTA 5 RP" — `gradient-brand`, 100px/800
- Subtitle vector bg: `id=27:157` — decorative rounded rectangle behind subtitle
- Subtitle: `id=27:111` — "успей раскрутиться раньше всех" — 28px/700
- Arrow indicator: `id=99:1701` — 3 stacked triangles
- Info block 1 (`id=38:240`): icon + "Region RP — это GTA 5 RP проект..." — 20px/500
- Info block 2 (`id=38:239`): icon + "Выбирай роль и займи место..." — 20px/500
- Promo code area (`id=34:183`): "YAPROMO" code + countdown timer + label text
- CTA button (`id=38:207`): "Начать играть" — 583 × 88

#### 2.3 Map
- Heading: "Карта Ленинградской области и регионов" — `id=91:89`
- Sub-copy: "Десятки самых знаковых мест..." — `id=91:92`
- Component: `id=99:434` — 1620 × 784
  - Screenshot carousel (14 sets): `Скриншоты_1…_14`
  - City location info pane: address + embedded map image
  - City tabs row: 3 tabs
  - Sidebar city list: 8 items (Лахта центр, Спальный район В.О., Стрелка В.О., Мраморный дворец МВД, Дворцовая площадь, Исаакиевская площадь, Медный всадник, Новая Голландия)

#### 2.4 Roles (`112:557`)
- Heading: "Выбери свою роль и погрузись в мир RP" — `id=106:159`
- Sub-copy: "Будь тем, кем ты хочешь быть" — `id=154:320`
- 5 role card instances (311 × 798 each): Медик (`112:292`), Военный (`112:411`), Полицейский (`112:462`), Бандит (`112:499`), Бизнесмен (`112:546`)
- Each card: illustration (511 × 658 bg + overlay) + role icon + name + description
- Popup frames exist: `Попап с ролью_*` and `Попап_*` — modal detail per role

#### 2.5 Cars (`165:425`)
- Heading: "Собери свой автопарк мечты" — `id=157:322`
- Sub-copy: "Больше 200 реальных авто…" — `id=157:324`
- Car card 1: Ferrari 488 GTB (`id=157:349`) — 800 × 552; stats: Скорость, Разгон, Кастомизация, Название
- Car card 2: Audi RS7 (`id=158:353`) — 800 × 552; same stat layout

#### 2.6 RP & Economy (`170:551`)
- Heading: "Продуманная система RP и экономика" — `id=165:426`
- 2 feature items with icon + body text
- 2 photos: in-game screenshots (`id=166:448`, `id=166:449`)

#### 2.7 Extra / Tagline block (`170:552`)
- Large body text: "Это мир, где ты не просто играешь…"
- 4 floating decorative asset instances: Звезда (`170:530`), Деньги (`170:526`), Граната (`170:522`), Балаклава (`170:546`)

#### 2.8 How to Play (`170:550`)
- Heading: "Как начать играть?" — 100px/800
- Sub-copy frame `id=172:242`
- 3 step cards (526 × 643 each): `175:248` / `175:344` / `175:358`
  - Step 01: "Купить и установить игру GTA V"
  - Step 02: "Загрузить и установить клиент RAGE MP" — button "СКАЧАТЬ"
  - Step 03: "Подключиться к серверу Region" — button "СКОПИРОВАТЬ" (copy IP)
- Step badge: circle `cornerRadius=20` with `gradient-button-glow`, number 47px/700

#### 2.9 Footer (`175:438`)
- Logo: `id=175:448` — 205 × 43
- Legal: "ООО «1 Геймс» ИНН 5260480189 ОГРН 1215200037535"
- Nav links (`id=175:511`): Пользовательское соглашение, Политика конфиденциальности, Дисклеймер, Политика обработки файлов cookie, Согласие на обработку персональных данных
- Contact (`id=179:515`): `hello@1games.ru`
- Payment logos (`id=179:524`): Visa, Mastercard, SBP, Mir
- Copyright: "Все права защищены © 2026 Копирование дизайна запрещено"
- BG: `gradient-footer` (radial `#504c6c` → `#020309`)

---

## 3. Assets inventory

| Asset | Count | Export format | Approx. size | Source node |
|---|---|---|---|---|
| Logo (wordmark) | 1 | SVG | 109 × 22 | `10:8` |
| Logo (footer) | 1 | SVG | 205 × 43 | `175:448` |
| Hero background image/video | 1 | WebP (static) / MP4 (video) | 1920 × 1080 | `24:396` |
| Character illustrations | 5 | PNG/WebP | ~511 × 658 | `Врач/Военный/Полицейский/Бандит/Бизнесмен` component sets |
| Role icons (stickers) | 5 | PNG/WebP | 91–149px | nested rectangles in role components |
| Car images | 2 | PNG/WebP | ~842 × 678 | `Машина_1`, `Машина_2` component sets |
| Screenshots (carousel) | 14 | WebP | TBD: depends on scene | `Скриншоты_1` … `Скриншоты_14` |
| Map image | 1 | PNG/WebP | 413 × 224+ | `Карта id=262:688` component set |
| In-game photo 1 | 1 | WebP | ~1138 × 636 | `169:469` |
| In-game photo 2 | 1 | WebP | ~898 × 505 | `202:226` |
| Decorative props (Звезда, Деньги, Граната, Балаклава) | 4 | PNG (transparent) | 94–577px | `170:530`, `170:526`, `170:522`, `170:546` |
| Social icons (Discord, VK, Telegram, +1) | 4 | SVG | 42 × 42 | `40:288…40:301` |
| Payment icons (Visa, Mastercard, SBP, Mir) | 4 | SVG | 40–81px wide | `179:524` group children |

---

## 4. Component candidates

| Component | Variants / states | Key props | Repeat sections |
|---|---|---|---|
| `Button` | primary (red glow + icon), secondary (dark + glow) | size: 60–88h; `cornerRadius=20`; icon slot | Header, Hero, How-to-Play |
| `NavItem` | active (white 100%), inactive (white 60%) | 170 × 60; font 18px/600 | Header |
| `OnlineCounter` | — | dot + number (`gradient-brand`) + label (`text-muted`) | Header |
| `SocialIcon` | discord / vk / telegram / youtube | 42 × 42; `bg=white` fill | Header |
| `PromoCode` | code display, timer | code: `gradient-promo`; timer separate; `cornerRadius=20` | Hero |
| `RoleCard` | 5 roles (Медик/Военный/Полицейский/Бандит/Бизнесмен) | 311 × 798; illustration + icon + name + description | Roles |
| `RolePopup` | per-role modal | `Попап_*` frames | Roles (on click) |
| `CarCard` | 2 cars | 800 × 552; screenshot + 4 stat badges | Cars |
| `StatBadge` | — | label + value; `cornerRadius=20` | Cars |
| `FeatureItem` | — | 58 × 58 icon + body text | RP & Economy |
| `StepCard` | 3 steps | 526 × 643; number badge + illustration + heading + body + CTA | How to Play |
| `Screenshot` | Скриншоты_1…_14 | carousel item | Map |
| `MapCityItem` | — | icon + city name; 8 in sidebar | Map |
| `PaymentLogo` | visa / mastercard / sbp / mir | SVG icon frames | Footer |

---

## 5. Locale

**Primary:** `ru-RU`  
All copy, legal text, and labels are in Russian. No English fallback exists in the design.  
RTL: not applicable.

Company: ООО «1 Геймс», INN 5260480189, OGRN 1215200037535  
Contact: hello@1games.ru  
Copyright line: "Все права защищены © 2026 Копирование дизайна запрещено"

---

## TBDs blocking downstream work

| # | What's missing | Why it blocks |
|---|---|---|
| TBD-1 | Tablet breakpoint (768px) — no Figma frame | Can't write responsive CSS between 440–1920 without it |
| TBD-2 | Mobile button font size (CTA at 440px) | Button text observed at 28px desktop; mobile node not fetched |
| TBD-3 | Step number `text-step-num` on mobile | No mobile equivalent frame for the How-to-Play section step badge |
| TBD-4 | Actual exported asset files | All images are embedded in Figma; need export pass before `<Image>` components can be wired up |
| TBD-5 | Screenshot carousel content (Скриншоты_1…_14) | 14 component sets exist; actual images/dimensions need export |
| TBD-6 | 4th social icon identity | `40:301` renders as a vector "YouTube"-shape icon — confirm it's YouTube |
| TBD-7 | Nav active state on scroll (scroll-spy) | Design shows "ГЛАВНАЯ" active; behaviour on scroll not specified |
