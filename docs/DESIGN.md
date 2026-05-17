# Design Reference — Region RP

## Figma file

URL: https://www.figma.com/design/peYLscuQXKKOJ5pu5zwZn4/Region-RP--Copy
Extracted: 2026-05-15

---

## 1. Design tokens

### 1.1 Color palette

| Token name                 | Hex                      | Usage                             |
| -------------------------- | ------------------------ | --------------------------------- |
| `--color-bg`               | `#020309`                | Page background                   |
| `--color-surface`          | `#0e0e0f`                | Card / panel surface              |
| `--color-surface-elevated` | `#111117`                | Header bg, promo card             |
| `--color-purple`           | `#504c6c`                | Step card glow, footer radial bg  |
| `--color-accent`           | `#ff2830`                | Brand red (buttons, glow, active) |
| `--color-accent-light`     | `#ff686e`                | Gradient end of brand red         |
| `--color-accent-promo`     | `#ff7c81`                | Promo code display gradient start |
| `--color-text`             | `#ffffff`                | Primary text                      |
| `--color-text-secondary`   | `rgba(255,255,255,0.80)` | Button labels, secondary text     |
| `--color-text-muted`       | `rgba(255,255,255,0.60)` | Nav inactive, "ИГРОКОВ ОНЛАЙН"    |

**Gradients (define as CSS custom props or Tailwind utilities):**

| Token                  | Definition                                                       |
| ---------------------- | ---------------------------------------------------------------- |
| `gradient-brand`       | `linear-gradient(to bottom, #ff2830, #ff686e)`                   |
| `gradient-surface`     | `linear-gradient(to bottom, #0e0e0f, #111117)`                   |
| `gradient-footer`      | `radial-gradient(ellipse, #504c6c, #020309)`                     |
| `gradient-promo`       | `radial-gradient(ellipse, #ff7c81, #ff2830)`                     |
| `gradient-card-glow`   | two-layer: `radial(#504c6c 60% → 0%) + radial(#ff2830 40% → 0%)` |
| `gradient-button-glow` | `radial-gradient(#ff2830 at 60% opacity → transparent)`          |

### 1.2 Typography

Single font family: **Montserrat** (Google Fonts / self-host via `next/font`).

| Token           | Desktop px | Desktop rem | Mobile px          | Weight | Line-height | Text-case   |
| --------------- | ---------- | ----------- | ------------------ | ------ | ----------- | ----------- |
| `text-display`  | 100px      | 6.25rem     | 54px / 3.375rem    | 800    | 100%        | normal      |
| `text-step-num` | 47px       | 2.9375rem   | ~32px (inferred, badge scales 69→52px) | 700 | 100% | normal |
| `text-h2`       | 32px       | 2rem        | 32px               | 700    | 102%        | normal      |
| `text-h3`       | 28px       | 1.75rem     | TBD: not observed  | 700    | 120%        | normal      |
| `text-body`     | 20px       | 1.25rem     | 20px               | 500    | 140%        | normal      |
| `text-nav`      | 18px       | 1.125rem    | 18px               | 600    | 122%        | normal      |
| `text-caption`  | 14px       | 0.875rem    | 14px               | 600    | 122%        | normal      |
| Button label    | 28px       | 1.75rem     | ~18px              | 700    | 100%        | `uppercase` |

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
  --color-text-secondary: rgba(255, 255, 255, 0.8);
  --color-text-muted: rgba(255, 255, 255, 0.6);

  /* Font */
  --font-sans: "Montserrat", sans-serif;

  /* Type scale */
  --text-display: 6.25rem; /* 100px */
  --text-display--line-height: 1;
  --text-display-mobile: 3.375rem; /* 54px */
  --text-step-num: 2.9375rem; /* 47px */
  --text-h2: 2rem; /* 32px */
  --text-h2--line-height: 1.02;
  --text-h3: 1.75rem; /* 28px */
  --text-h3--line-height: 1.2;
  --text-body: 1.25rem; /* 20px */
  --text-body--line-height: 1.4;
  --text-nav: 1.125rem; /* 18px */
  --text-nav--line-height: 1.22;
  --text-caption: 0.875rem; /* 14px */
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

| Token           | Value            | Where                                      |
| --------------- | ---------------- | ------------------------------------------ |
| `--radius-card` | `20px`           | Role cards, step cards, promo box, buttons |
| Button padding  | `36px` all sides | `Кнопка_2`, `Кнопка_3`, step badge         |
| Button gap      | `8px`            | Icon ↔ label                               |
| Promo gap       | `16px`           | Icon ↔ code text                           |

### 1.4 Breakpoints (confirmed from Figma frames)

| Name      | Width                         | Frame               |
| --------- | ----------------------------- | ------------------- |
| `mobile`  | **440px**                     | `Mobile id=236:307` |
| `desktop` | **1920px**                    | `Desctop id=2:385`  |
| `tablet`  | TBD: no tablet frame in Figma | —                   |

> **Note:** Mobile frame is 440px, not 375px. Adjust default mobile breakpoint accordingly.
> Tablet (768px) is not designed — treat as fluid stretch between 440→1280 or TBD with client.

---

## 2. Sections (render order, Desktop)

| #   | Section name (RU)                 | Figma node-id | Width × Height | Intent                                                                            |
| --- | --------------------------------- | ------------- | -------------- | --------------------------------------------------------------------------------- |
| 1   | **Хедер** (Header/Nav)            | `10:32`       | 1920 × 60      | Sticky nav: logo, 4 nav links, online counter, login button, social links         |
| 2   | **Герой** (Hero)                  | `88:86` (bg)  | 1920 × 1080    | Full-viewport hero: video/static background, main headline, CTA, promo code block |
| 3   | **Карта** (Map)                   | `99:434`      | 1620 × 784     | Map of Leningrad Oblast; sidebar city list (8 locations); screenshot carousel     |
| 4   | **Роли** (Roles)                  | `112:557`     | 1619 × 1071    | 5 role cards (Медик, Военный, Полицейский, Бандит, Бизнесмен) with popup on click |
| 5   | **Авто** (Cars)                   | `165:425`     | 1620 × 822     | Car showcase: 2 hero cars (Ferrari 488 GTB, Audi RS7) with stat badges            |
| 6   | **RP и экономика** (RP & Economy) | `170:551`     | 1620 × 895     | 2 feature items + 2 in-game photos; details game mechanics                        |
| 7   | **Доп. блок** (Extra / Tagline)   | `170:552`     | 1920 × 570     | Large centred quote + 4 decorative floating game-prop images                      |
| 8   | **Как играть** (How to Play)      | `170:550`     | 1920 × 1141    | 3-step guide: buy GTA V → install RAGE:MP → connect                               |
| 9   | **Подвал** (Footer)               | `175:438`     | 1920 × 532     | Logo, legal info (LLC "1 Геймс"), nav links, email, payment icons                 |

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

Architecture note: `88:86` contains only the background rectangle (`24:396`, IMAGE fill with FILL scale + contrast/saturation filters) and a bottom gradient fade (`88:87`, `linear-gradient(to top, #020309 → transparent)` covering 146px at the bottom). All foreground elements are siblings in the desktop frame (`2:385`), positioned over the hero by absolute canvas coordinates.

**Verified from Figma 2026-05-16:**

- Background node `24:396`: RECTANGLE, `1920×1080`, IMAGE fill (FILL scaleMode), image filters: `contrast +0.06`, `saturation +0.13`. Second fill layer also IMAGE/FILL (duplicate pass). `/public/images/hero-bg.webp` does **not** exist yet — must be exported.
- Bottom fade `88:87`: RECTANGLE, `1920×146`, `LINEAR_GRADIENT` from `#020309` (pos 0) → `#02030900` (pos 1), direction bottom-to-top. No full-frame dark overlay exists in Figma — the code's `style={{ background: 'linear-gradient(…)' }}` full-frame overlay is an invention and deviates from design.

- Headline 1: `id=27:109` — **"Новый сервер"** — white `#ffffff`, 100px/800 (ExtraBold), `textAlignHorizontal: LEFT`, `lineHeightPx: 80` (0.8× — tight). Bbox: 595×150px.
- Headline 2: `id=27:110` — **"GTA 5 RP"** — `gradient-brand` fill (#ff2830→#ff686e, top-to-bottom), 100px/800 (ExtraBold), `textAlignHorizontal: LEFT`, `lineHeightPx: 102` (1.02×). Bbox: 595×70px.
- Headline backdrop: `id=27:157` — clipped rounded background behind the title/subtitle, bbox **724.5×319px** at desktop `x=150`, `y=162`. Shape has 32px outer corner geometry plus a stepped bottom-right cutout. Fill: `linear-gradient(180deg, #0e0e0f → #111117)` at 50% opacity with `backdrop-filter: blur(25px)`.
- Subtitle: `id=27:111` — **"успей раскрутиться раньше всех"** — white `#ffffff`, 28px/700 (Bold), `textAlignHorizontal: LEFT`, `lineHeightPx: 33.6` (1.2×). Bbox: 212×88px.

  > All three text nodes are **left-aligned in Figma**, not centered. The current Hero.tsx uses `text-center` — this is a discrepancy.

- Arrow indicator `id=99:1701`: INSTANCE, bbox **67×33px**. Contains 3 `REGULAR_POLYGON` children (`cornerRadius=4`), each **33×33px**, laid out **side-by-side horizontally** (not vertically stacked). Each polygon is a rounded equilateral triangle pointing **right** (flat left edge, point right — rotated 90° clockwise). Fill: `radial-gradient(#ff283099 → #ff283000)`. Stroke: `LINEAR_DODGE gradient` (#ff2830 at 20% / 100% / 20%). Additionally each has a 50px backdrop blur. The current Hero.tsx `ScrollArrow` draws 3 downward-pointing chevrons stacked vertically — wrong shape, wrong orientation, wrong layout direction.

- Info block 1 (`id=38:240`): GROUP, bbox **427×186px**. Contains:
  - Card frame (`38:213`): `cornerRadius=20`, `397×186px`. Bg: `gradient-surface` (#0e0e0f→#111117, opacity 0.5) + red radial glow (opacity 0.6). Padding: inferred ~30px all sides (text bbox starts 47px from card left edge).
  - Text (`38:214`) — **exact copy:** `"Region RP — это GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти, где ты строишь свою историю с нуля"` — 20px/500/white, `lineHeightPx: 28`. Bbox: 320×126px.
  - Icon frame (`38:218`): **58×58px**, `cornerRadius=20`, red radial glow bg + LINEAR_DODGE gradient stroke.
  - Icon SVG (`38:232`, `Union`): BOOLEAN_OPERATION, **36×36px**, filled `gradient-brand` (#ff2830→#ff686e, top-to-bottom). Shape: custom map/location-pin with cutout. Verified SVG path:
    ```svg
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.9521 24.1562C21.3121 23.7963 21.8695 23.7963 22.2295 24.1562L31.4463 33.3545C31.8418 33.7505 31.7876 34.3981 31.3018 34.668C29.7178 35.5499 27.7919 36 25.542 36H10.458C9.93601 36 9.72009 35.3883 10.0801 35.0283L20.9521 24.1562ZM25.542 0C30.1859 0 33.5163 1.96178 35.0283 5.47168C35.1903 5.79565 35.1 6.19192 34.8301 6.46191L6.46191 34.8301C6.20991 35.082 5.81364 35.1723 5.47168 35.0283C1.96178 33.5163 0 30.1859 0 25.542V10.458C0 4.68001 4.68001 0 10.458 0H25.542ZM35.0098 10.0801C35.3878 9.72008 36 9.93603 36 10.458V25.542C36 27.7919 35.5499 29.7358 34.668 31.3018C34.3981 31.7876 33.7505 31.8239 33.3545 31.4463L24.1377 22.2305C23.7778 21.8705 23.7779 21.3122 24.1377 20.9521L35.0098 10.0801ZM12.8164 6.37207C10.5125 6.37207 7.88427 7.70397 7.2002 10.6738C6.4262 13.9498 8.44232 16.7036 10.2783 18.4316C10.9803 19.0976 11.8984 19.4404 12.8164 19.4404C13.7342 19.4403 14.6516 19.1155 15.3535 18.4316C17.1715 16.7037 19.1875 13.9503 18.4316 10.6924C17.7477 7.70456 15.1203 6.37223 12.8164 6.37207ZM12.8701 9.88184C13.8599 9.882 14.6697 10.6919 14.6699 11.6816C14.6699 12.6715 13.86 13.4823 12.8701 13.4824C11.8801 13.4824 11.0703 12.6716 11.0703 11.6816C11.0705 10.6918 11.8622 9.88184 12.8701 9.88184Z" fill="url(#paint0_linear_38_232)"/>
    <defs><linearGradient id="paint0_linear_38_232" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#FF2830"/><stop offset="1" stop-color="#FF686E"/></linearGradient></defs>
    </svg>
    ```

- Info block 2 (`id=38:239`): GROUP, bbox **427×157px**. Contains:
  - Card frame (`38:219`): `cornerRadius=20`, `397×157px`. Same style as `38:213`.
  - Text (`38:220`) — **exact copy:** `"Выбирай роль и займи место в мире, где всё зависит от твоих решений и скорости развития"` — 20px/500/white, `lineHeightPx: 28`. Bbox: 320×97px.
  - Icon frame (`38:221`): **58×58px**, same style as `38:218`.
  - Icon SVG (`38:238`, `Union`): BOOLEAN_OPERATION, **35×34px**, filled `gradient-brand`. Shape: multi-person/group silhouette (3 overlapping people). Verified SVG path:
    ```svg
    <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34961 20.6553C8.12662 17.4934 15.8615 17.4933 20.6045 20.6553C22.7463 22.0833 23.9195 24.0214 23.9365 26.1123C23.9364 28.2201 22.7461 30.1576 20.6045 31.6025C18.2245 33.2005 15.0958 34 11.9678 34C8.83993 33.9999 5.71191 33.2005 3.33203 31.6025C1.19042 30.1747 0.000181025 28.2372 0 26.1465C0 24.0555 1.19061 22.1003 3.34961 20.6553ZM20.4512 18.3428C24.208 17.2548 28.9338 17.9862 31.8408 20.332C33.4047 21.5899 34.2046 23.1709 34.0518 24.8027C33.9158 26.4516 32.8614 27.8796 31.0938 28.8486C29.3937 29.7836 27.251 30.2258 25.126 30.1748C26.3499 29.0699 27.0641 27.6933 27.2002 26.2314C27.3702 24.1235 26.3672 22.1003 24.3613 20.4854C23.2223 19.5844 21.8962 18.8698 20.4512 18.3428ZM11.9688 0C16.4225 0.000239001 20.043 3.62134 20.043 8.0752C20.0259 12.4441 16.6088 15.9798 12.2568 16.1328H12.1387C12.0368 16.1158 11.9005 16.1159 11.7646 16.1328C7.31072 15.9798 3.89366 12.4441 3.89355 8.0752C3.89355 3.6212 7.51475 0 11.9688 0ZM24.0557 3.51855C27.3875 3.22979 30.3624 5.71226 30.6514 9.07812C30.9233 12.3761 28.577 15.2662 25.3301 15.6572H25.2451C25.1432 15.6572 25.041 15.6574 24.9561 15.6914C23.3072 15.7763 21.7942 15.2491 20.6553 14.2803C22.4062 12.7163 23.409 10.3702 23.2051 7.82031C23.0861 6.44344 22.6104 5.18519 21.8965 4.11426C22.5425 3.79127 23.2907 3.58655 24.0557 3.51855Z" fill="url(#paint0_linear_38_238)"/>
    <defs><linearGradient id="paint0_linear_38_238" x1="17.0351" y1="0" x2="17.0351" y2="34" gradientUnits="userSpaceOnUse"><stop stop-color="#FF2830"/><stop offset="1" stop-color="#FF686E"/></linearGradient></defs>
    </svg>
    ```

- Promo code area (`id=34:183`): `cornerRadius=20`, 583×267px, bg `gradient-surface` (0.5 opacity). Contains code display, timer, label texts.
- CTA button (`id=38:207`): "Начать играть" — 583×88px, `cornerRadius=20`.
- Dark overlay: Figma has `88:87` — `linear-gradient(to top, #020309 at pos=0 → transparent at pos=1)` only at the very bottom 146px of the 1080px frame. There is **no full-frame overlay** in Figma — the background image itself has contrast (+0.06) and saturation (+0.13) filters applied.

#### 2.3 Map

- Heading: "Карта Ленинградской области и регионов" — `id=91:89`
- Sub-copy: "Десятки самых знаковых мест..." — `id=91:92`
- Component: `id=99:434` — 1620 × 784
  - Screenshot carousel (14 sets): `Скриншоты_1…_14`
  - City location info pane: address + embedded map image
  - City tabs row: 3 tabs (Санкт-Петербург active, Тольятти, Скоро)
  - Sidebar city list: 8 items (Лахта центр, Спальный район В.О., Стрелка В.О., Мраморный дворец МВД, Дворцовая площадь, Исаакиевская площадь, Медный всадник, Новая Голландия)

**Component set structure (Figma node `93:259`):**
The "Карта" COMPONENT_SET has 8 city variants (`Property 1=Default` through `Property 1=Variant8`). Each variant has its own `Информация` frame containing a unique address + description text node. The desktop instance `99:434` corresponds to `Property 1=Default` (city 1, Лахта центр).

**Info pane copy per city** — typography shared across all cities: Montserrat Medium 16px, color `#6e6b78`, line-height 22.4px

| #   | City name (sidebar)           | Address line                                          | Description                                                                                                                                                                                                                        | Source text node                                        |
| --- | ----------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | Лахта центр                   | `ул.. Высотная, 1`                                    | `Многофункциональный комплекс, расположенный на берегу Финского залива в Приморском районе Санкт-Петербурга. Является центральным офисом компании Газпром`                                                                         | `93:168` (variant `93:210` / instance `I99:434;93:168`) |
| 2   | Спальный район В.О.           | `жилые кварталы Василеостровского района`             | `Наша задача сделать город — разносторонним, именно поэтому мы добавляем сюда различные по наполнению и атмосфере локации, при этом что не противоречит главному городу прототипу`                                                 | `93:265` (variant `93:260`)                             |
| 3   | Стрелка Васильевского острова | `район Биржевой площади (восточная оконечность В.О.)` | `Мыс на восточной оконечности Васильевского острова в Санкт-Петербурге, омываемый Большой Невой и Малой Невой; один из самых известных архитектурных ансамблей города; пример гармонии архитектуры города с пейзажем берегов Невы` | `93:367` (variant `93:362`)                             |
| 4   | Мраморный дворец МВД          | `ул.. Миллионная, 5/1`                                | `Мы не просто перенесли дворец, а ещё и напитали место мистикой, пасхалки и интереснейшим фкнционалом, с отсылкой на реальную экранизацию, что позволит с интересом открывать нашу карту с новых ракурсов`                         | `93:416` (variant `93:411`)                             |
| 5   | Дворцовая площадь             | `Дворцовая пл.`                                       | `Главная площадь Санкт-Петербурга, архитектурный ансамбль, возникший во второй половине XVIII — первой половине XIX века`                                                                                                          | `93:465` (variant `93:460`)                             |
| 6   | Исаакиевская площадь          | `Исаакиевская пл.`                                    | `Площадь в Адмиралтейском муниципальном округе Адмиралтейского района Санкт-Петербурга. С севера ограничена Адмиралтейским проспектом, с юга — Мариинским дворцом`                                                                 | `93:514` (variant `93:509`)                             |
| 7   | Медный всадник                | `Сенатская площадь`                                   | `Монументальный конный памятник первому российскому императору Петру Великому, созданный в 1768–1778 годах под руководством французского скульптора Этьена Мориса Фальконе`                                                        | `93:599` (variant `93:594`)                             |
| 8   | Новая Голландия               | `наб. Адмиралтейского канала, 2`                      | `Остров в Адмиралтейском районе Санкт-Петербурга, ограниченный рекой Мойкой, Крюковым и Адмиралтейским каналами. Кроме того, Новая Голландия — один из старейших утилитарных ансамблей города`                                     | `93:648` (variant `93:643`)                             |

> Note: Cities 2 and 3 use a descriptive area phrase as the address line (no "ул." / "наб." prefix). Cities 5 and 6 use abbreviated "пл." forms with no street number. City 7 uses the square name as the address line rather than the monument name. Reproduce all of these verbatim.

**Mobile Map section (`288:663`, 400 × 702):**
No sidebar. A single full-width `Карта` instance (`265:1347`, 400 × 493) sits inside a 420 × 510 wrapper frame, with the city list rendered inside the instance below the screenshot rather than in a side column. Prev/next arrow buttons (`Стрелка Л` `315:404` and `Стрелка П` `315:407`, both 36 × 36 circle frames with red gradient fill) are positioned at the left and right edges of the screenshot area. Section heading and sub-copy frame sit above the carousel wrapper and are not part of the instance.

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

**Verified from Figma 2026-05-16.**

##### Section container

| Property       | Value                                                                      |
| -------------- | -------------------------------------------------------------------------- |
| Figma node     | `170:552`                                                                  |
| Desktop size   | 1920 × 570px                                                               |
| Background     | **No explicit fill** — inherits page bg `#020309` (`--color-bg`)          |
| Overflow       | `visible` (props intentionally overflow section bounds)                   |
| Mobile height  | ~360px (no dedicated frame; elements float in `236:307`)                  |

##### Body text (`167:450`)

| Property          | Desktop                                                              | Mobile (`288:472`)              |
| ----------------- | -------------------------------------------------------------------- | ------------------------------- |
| Verbatim copy     | `Это мир, где ты не просто играешь, а выстраиваешь свою стратегию и зарабатываешь` | same string |
| Font              | Montserrat ExtraBold 800                                             | Montserrat ExtraBold 800        |
| Font size         | 100px (`text-display`)                                               | 32px (`text-h2`)                |
| Line-height       | 100px (1.0 — tight, 100%)                                            | 32px (1.0 — tight, 100%)        |
| Letter-spacing    | 0                                                                    | 0                               |
| Color             | `#ffffff`                                                            | `#ffffff`                       |
| Alignment         | `CENTER`                                                             | `CENTER`                        |
| Text bbox         | 1620 × 370px                                                         | 400 × 150px                     |
| Position in section (x, y from TL) | x=150, y=100                                      | x=20, y=60 (rel to mobile section TL) |
| Max-width         | 1620px (84.375% of 1920) — use `max-w-[1620px] mx-auto`             | 400px (full mobile width)       |

> **Note:** The text wraps across multiple lines at 100px. The 1620px bbox is 150px from each edge of the 1920px section. On desktop the section heading (`text-display` 100px/800) doubles as body text here — no h2 heading, just a large paragraph.

##### Decorative props — desktop positions (relative to section TL)

Section TL canvas coords: x=−887, y=6014

| Prop name   | Figma node | Asset file                           | Size (px)   | x (from section TL) | y (from section TL) | Notes                        |
| ----------- | ---------- | ------------------------------------ | ----------- | ------------------- | ------------------- | ---------------------------- |
| Звезда      | `170:530`  | `/public/images/props/prop-star.png` | 240 × 240   | 91                  | 0                   | Top-left corner, flush top   |
| Деньги      | `170:526`  | `/public/images/props/prop-money.png`| 577 × 577   | 11                  | 116                 | Overflows left edge; large   |
| Граната     | `170:522`  | `/public/images/props/prop-grenade.png` | 270 × 245| 1585                | 48                  | Right side, near top         |
| Балаклава   | `170:546`  | `/public/images/props/prop-balaclava.png` | 553 × 553| 1268              | 170                 | Right side, centre-bottom    |

All props are `INSTANCE` nodes wrapping a single `RECTANGLE` child with an `IMAGE/FILL` paint — export as PNG with transparency. No rotation is applied to any prop (rotation = 0°).

**Recommended CSS approach:** `position: absolute` with percentage-based offsets from the section container (`overflow: visible` or `overflow: hidden` if bleed is unwanted). Props are purely decorative — `aria-hidden="true"`.

##### Decorative props — mobile positions (relative to mobile section TL ≈ y=6685 canvas)

Mobile frame `236:307` canvas TL: x=1333, y=672. Mobile tagline elements float directly in the mobile frame with no wrapping section frame.

| Prop name   | Figma node | Size (px)   | x rel. to mobile frame | y rel. to mobile frame |
| ----------- | ---------- | ----------- | ---------------------- | ---------------------- |
| Звезда      | `288:473`  | 94 × 94     | 6                      | 6013                   |
| Деньги      | `288:483`  | 179 × 179   | −14 (bleed left)       | 6159                   |
| Граната     | `288:479`  | 75 × 68     | 345                    | 6027                   |
| Балаклава   | `288:487`  | 159 × 159   | 302                    | 6170                   |

Mobile props are ~39% the size of their desktop equivalents (e.g. Звезда 94/240 = 39%). Use CSS `scale` or explicit size classes.

##### Asset export instructions

The MCP returns these as raster IMAGE fills inside instances. Export each node at 2× from Figma:

| File                                    | Source node | Export dims (1×) |
| --------------------------------------- | ----------- | ---------------- |
| `/public/images/props/prop-star.png`    | `170:530`   | 240 × 240        |
| `/public/images/props/prop-money.png`   | `170:526`   | 577 × 577        |
| `/public/images/props/prop-grenade.png` | `170:522`   | 270 × 245        |
| `/public/images/props/prop-balaclava.png` | `170:546` | 553 × 553        |

Export via Figma → right-click node → Export → PNG 2× (or use REST API with `?format=png&scale=2`). The `/public/images/props/` directory has been created.

#### 2.8 How to Play (`170:550`)

**Verified from Figma 2026-05-16.**

##### Section container

| Property             | Value                                                                              |
| -------------------- | ---------------------------------------------------------------------------------- |
| Figma node           | `170:550`                                                                          |
| Desktop size         | 1920 × 1141px                                                                      |
| Background           | `SOLID #020309` (`--color-bg`)                                                     |
| Canvas position      | x=−887, y=6714                                                                     |
| Decorative ellipses  | Two `ELLIPSE` nodes (`175:435`, `175:437`) with `GRADIENT_RADIAL` fill #ff686e → #ff2830, positioned far outside the visible section bounds (x≈−2051 and x≈801) — these are ambient glow blobs, render with `overflow: visible` or clip at section edge |

##### Heading (`172:218`)

| Property          | Value                                      |
| ----------------- | ------------------------------------------ |
| Figma node        | `172:218`                                  |
| Verbatim text     | `Как начать играть?`                       |
| Font              | Montserrat ExtraBold 800                   |
| Font size         | 100px (`text-display`)                     |
| Line-height       | 100px (1.0)                                |
| Color             | `#ffffff`                                  |
| Alignment         | `LEFT`                                     |
| Bbox              | 1062 × 70px                                |
| Position in section (abs canvas) | x=−737, y=6814 → local x=150, y=100 from section TL |

##### Sub-copy frame (`172:242`)

| Property          | Value                                                                      |
| ----------------- | -------------------------------------------------------------------------- |
| Figma node        | `172:242`                                                                  |
| Frame size        | 538 × 142px                                                                |
| Corner radius     | 20px                                                                       |
| Background fill   | `GRADIENT_RADIAL` #ff283099 → #ff283000 (red glow, bottom-up) + PATTERN overlay (hexagonal, 60% opacity, OVERLAY blend — decorative texture) |
| Stroke            | `LINEAR_DODGE` gradient #ff2830 (20%/100%/20%) — stroke is `visible: false` |
| Position (canvas) | x=345, y=6778 → local x=1232, y=64 from section TL                        |
| Text node         | `172:243`                                                                  |
| Verbatim text     | `Выполните три простых шага  и наслаждайтесь игрой на сервере Region в мире GTA 5 RP` (note: double space after "шага") |
| Text font         | Montserrat Medium 500, 20px                                                |
| Text line-height  | 28px (1.4×)                                                                |
| Text color        | `#ffffff`                                                                  |
| Text alignment    | `LEFT`                                                                     |
| Text bbox         | 377 × 70px (30px padding from frame edges on all sides implied)            |

##### Step cards — shared styles

All three cards share identical styling:

| Property           | Value                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------- |
| Size               | 526 × 643px                                                                             |
| Corner radius      | 20px                                                                                    |
| Background fill 1  | `GRADIENT_RADIAL` #504c6c99 → #504c6c00 (purple glow, bottom-to-top sweep)             |
| Background fill 2  | `GRADIENT_RADIAL` #ff283066 → #ff283000 (red glow, top-right corner emphasis)          |
| Stroke             | `LINEAR_DODGE` gradient: #504c6c33 at 0% / #504c6cff at 49.5% / #504c6c33 at 100%     |
| Illustration       | Full-width `FRAME` (Иллюстрация), 526 × 261px, `IMAGE/FILL` fill — sits at top of card |
| Internal layout    | No auto-layout; children are absolutely positioned within the card frame               |
| Step badge         | 91 × 69px frame, `cornerRadius=20`, `GRADIENT_RADIAL` fill #ff283099 → #ff283000; stroke `LINEAR_DODGE` same as card stroke; positioned at local x=30, y=301 |
| Badge text         | 47px / Bold 700 / `#ffffff` / Montserrat; local offset x≈15–20, y=18 within badge      |
| Step title         | 28px / Bold 700 / `#ffffff` / Montserrat, line-height 33.6px (1.2×); bbox 363 × 54px  |
| Step body          | 20px / Medium 500 / `#ffffff` / Montserrat, line-height 28px (1.4×)                    |

Desktop card positions (absolute canvas → offset from section TL x=−887):

| Card     | Node    | Canvas x | Canvas y | Local x in section | Local y in section |
| -------- | ------- | -------- | -------- | ------------------ | ------------------ |
| Step 01  | 175:248 | −737     | 7000     | 150                | 286                |
| Step 02  | 175:344 | −190     | 7112     | 697                | 398                |
| Step 03  | 175:358 | 357      | 7000     | 1244               | 286                |

> Note: Cards 01 and 03 are at the same y (7000), Card 02 is 112px lower (7112) — staggered / offset layout, not a uniform row.

##### Step 01 — "Купить и установить игру GTA V" (`175:248`)

| Property       | Value                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Figma node     | `175:248`                                                                                      |
| Step title     | `Купить и установить игру GTA V`                                                               |
| Title node     | `175:373` — canvas x=−604, y=7309; local x=103 in card, y=309                                 |
| Body text      | `Чтобы начать игру, необходимо иметь лицензионную версию GTA V. Если она уже приобретена — переходите к следующему шагу` |
| Body node      | `175:257` — 460 × 98px; 20px/500/white                                                         |
| Badge node     | `175:374` — 91 × 69px; text "01" (`175:375`)                                                  |
| Illustration   | `175:336` — 526 × 261px, IMAGE/FILL (FILL scaleMode), source image 960 × 717px. **Visual: hands holding Russian ruble banknotes in a dark alley, GTA-art style.** Export → `/public/images/howtoplay/step-01.png` |
| Icon row       | 3 icon frames (`175:312`, `175:326`, `175:332`), each 72 × 72px, `cornerRadius=20`, `GRADIENT_RADIAL` #ff283099 fill + LINEAR_DODGE stroke. Frame `175:312` contains a `Union` BOOLEAN_OPERATION (`175:325`, 46 × 44px, `gradient-brand` fill). Frames `175:326` and `175:332` have no children (empty/decorative icon placeholders). Position: canvas y=7541, local y=541 in card |
| Button         | None for step 01                                                                               |

##### Step 02 — "Загрузить и установить клиент RAGE MP" (`175:344`)

| Property       | Value                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Figma node     | `175:344`                                                                                      |
| Step title     | `Загрузить и установить клиент RAGE MP`                                                        |
| Title node     | `175:353` — 363 × 54px; local x=30 in card, y=309                                             |
| Body text      | `Чтобы подключиться к нашему серверу, потребуется клиент RAGE:MP. Установите его на компьютер и затем запустите` |
| Body node      | `175:356` — 460 × 70px; 20px/500/white                                                         |
| Badge node     | `175:354` — 91 × 69px; text "02" (`175:355`)                                                  |
| Illustration   | `175:357` — 526 × 261px, two IMAGE/FILL layers (same source hash as step 01). **Visual: hands using a wrench on a car engine in dark alley, GTA-art style.** Export → `/public/images/howtoplay/step-02.png` |
| Button         | `175:396` — "Скачать" INSTANCE, 466 × 88px, `cornerRadius=20`. Fill: `SOLID #111117` + `GRADIENT_RADIAL` #ff283099 → #ff283000. Stroke: LINEAR_DODGE gradient. Label: `СКАЧАТЬ` (`I175:396;175:381`) — 28px/700/white 80% opacity. Icon frame (`I175:396;175:379`): 24 × 24px. Canvas position: x=−160, y=7637 |

##### Step 03 — "Подключиться к серверу Region" (`175:358`)

| Property       | Value                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------- |
| Figma node     | `175:358`                                                                                      |
| Step title     | `Подключиться к серверу Region`                                                                |
| Title node     | `175:405` — 363 × 54px; canvas x=490, y=7309; local x=133 in card, y=309                      |
| Body text      | `Финальный шаг: введите в поиске лаунчера REGION или скопируйте IP, дождитесь загрузки всех файлов. Готово — вы в игре!` |
| Body node      | `175:370` — 452 × 98px; 20px/500/white                                                         |
| Badge node     | `175:406` — 91 × 69px; text "03" (`175:407`)                                                  |
| Illustration   | `175:371` — 526 × 261px, IMAGE/STRETCH (STRETCH scaleMode, transform applied), source 1200 × 896px. **Visual: thumbs-up hand in GTA-art style against dark alley background with neon signs.** Export → `/public/images/howtoplay/step-03.png` |
| Button         | `175:425` — "Скопировать" INSTANCE, 466 × 88px, `cornerRadius=20`. Same fill/stroke as Step 02 button. Label: `СКОПИРОВАТЬ` (`I175:425;175:416`) — 28px/700/white 80% opacity. Icon frame (`I175:425;175:414`): 24 × 24px. Canvas position: x=387, y=7525 |

##### Step badge — detailed spec

| Property       | Value                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------- |
| Size           | 91 × 69px (not square — wider than tall)                                                  |
| Corner radius  | 20px                                                                                      |
| Fill           | `GRADIENT_RADIAL` #ff283099 (60% opacity) at center → #ff283000 transparent at edge      |
| Stroke         | `LINEAR_DODGE` blend — #ff2830 at 20%/100%/20% (same as `gradient-button-glow` token)    |
| Number text    | 47px / Bold 700 / `#ffffff` / Montserrat; content: `"01"` / `"02"` / `"03"`              |
| Text line-height | 56.4px (1.2× — matches `text-h3` line-height token)                                   |
| Text padding   | x≈15–20px, y=18px within badge frame                                                      |

> Discrepancy with existing DESIGN.md: badge is **91 × 69px** (not square, not 88 × 88). Corner radius is 20px (matches `--radius-card`). The number size is 47px/700, confirmed.

##### "СКАЧАТЬ" / "СКОПИРОВАТЬ" button — detailed spec

Both buttons are INSTANCE nodes (`Кнопка_3` component family), identical styling:

| Property       | Value                                                                    |
| -------------- | ------------------------------------------------------------------------ |
| Size           | 466 × 88px                                                               |
| Corner radius  | 20px                                                                     |
| Fill layer 1   | `SOLID #111117` (`--color-surface-elevated`)                             |
| Fill layer 2   | `GRADIENT_RADIAL` #ff283099 → #ff283000 (red glow, bottom-up)           |
| Stroke         | `LINEAR_DODGE` gradient same pattern as card stroke                      |
| Icon           | 24 × 24px frame (left of label)                                          |
| Label text     | `СКАЧАТЬ` / `СКОПИРОВАТЬ` — 28px/700/white at 80% opacity (`text-secondary`) |
| Label position | icon at local x=142/136, label at x=182/136 within button               |

##### Mobile equivalent (`288:667`, "Как начать играть?")

| Property           | Value                                                                          |
| ------------------ | ------------------------------------------------------------------------------ |
| Figma node         | `288:667`                                                                      |
| Mobile frame size  | 400 × 1681px (within mobile frame `236:307` at 440 × 8774)                    |
| Position in mobile | local x=20, y=6373 (canvas y=7045)                                             |
| Background         | Inherits mobile frame bg `#020309`                                             |

**Mobile heading (`288:491`):**
- Verbatim text: `Как начать играть?`
- Font: Montserrat ExtraBold 800 / **32px** (not 100px) / line-height 32px
- Color: `#ffffff`, alignment: `CENTER`
- Bbox: 400 × 22px

**Mobile sub-copy (`288:492`):**
- Frame: 400 × 95px, `cornerRadius=20`, same GRADIENT_RADIAL red glow + hexagonal PATTERN fill as desktop
- Text (`288:493`): `Модели зданий Банков, отелей, больниц и другой колоритной тематической недвижимости` — 16px/500/white, line-height 22.4px, alignment `CENTER`

> Note: Mobile sub-copy text is **different** from desktop. Desktop says "Выполните три простых шага…" but mobile says "Модели зданий Банков, отелей…". The mobile text appears to be a design error / leftover from another section. Use the desktop copy for implementation — confirm with client.

**Mobile step cards — all three are 400 × 488px:**

| Card     | Node    | Desktop size  | Mobile size  | Mobile cornerRadius |
| -------- | ------- | ------------- | ------------ | ------------------- |
| Step 01  | 288:494 | 526 × 643px   | 400 × 488px  | 20px                |
| Step 02  | 288:509 | 526 × 643px   | 400 × 488px  | 20px                |
| Step 03  | 288:521 | 526 × 643px   | 400 × 488px  | 20px                |

Mobile cards stacked vertically with no horizontal offset. Same gradient background as desktop.

**Mobile card typography:**
- Title: 20px / Bold 700 / `#ffffff` / line-height 24px (reduced from 28px desktop)
- Body: 16px / Medium 500 / `#ffffff` / line-height 22.4px (reduced from 20px/28px desktop)
- Step badge: 69 × 52px, `cornerRadius=15` (reduced from 91 × 69px / cornerRadius=20), number font still visible (size not confirmed — likely ~32px)

**Mobile buttons (Скачать `288:510`, Скопировать `288:527`):**
- Size: 354 × 66px (reduced from 466 × 88px)
- `cornerRadius=15` (reduced from 20px)
- Same fill / stroke / color style as desktop

**Mobile illustrations (Иллюстрация):** 400 × 198px (reduced from 526 × 261px).

**Mobile card copy — verbatim (same as desktop):**
- Step 01 title: `Купить и установить игру GTA V`
- Step 01 body: `Чтобы начать игру, необходимо иметь лицензионную версию GTA V. Если она уже приобретена — переходите к следующему шагу`
- Step 02 title: `Загрузить и установить клиент RAGE MP`
- Step 02 body: `Чтобы подключиться к нашему серверу, потребуется клиент RAGE:MP. Установите его на компьютер и затем запустите`
- Step 03 title: `Подключиться к серверу Region`
- Step 03 body: `Финальный шаг: введите в поиске лаунчера REGION или скопируйте IP, дождитесь загрузки всех файлов. Готово — вы в игре!`

##### Asset export instructions

| File                                          | Source node | Dimensions (1×) | Visual content                                                   |
| --------------------------------------------- | ----------- | ---------------- | ---------------------------------------------------------------- |
| `/public/images/howtoplay/step-01.png`        | `175:336`   | 526 × 261px      | Hands holding rubles in dark alley, GTA-art style                |
| `/public/images/howtoplay/step-02.png`        | `175:357`   | 526 × 261px      | Hands fixing car engine with wrench, dark alley, GTA-art style   |
| `/public/images/howtoplay/step-03.png`        | `175:371`   | 526 × 261px      | Thumbs-up hand, dark alley with neon signs, GTA-art style        |

Export from Figma at 2× PNG. All three illustrations are the same aspect ratio (526 × 261 → 2:1). The `/public/images/howtoplay/` directory has been created.

#### 2.9 Footer (`175:438`)

**Verified from Figma 2026-05-16.**

##### Section container

| Property         | Value                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Figma node       | `175:438`                                                                                                   |
| Desktop size     | 1920 × 532px                                                                                                |
| Canvas position  | x=−887, y=7855                                                                                              |
| Background       | `GRADIENT_RADIAL` — center: `#504c6c99` (60% opacity), edge: `#020309`; handle positions: ellipse centered horizontally, top of ellipse at y≈−0.28 of frame height, bottom at y≈0.98 → gradient radiates from near-bottom-center outward |
| Stroke           | `LINEAR_DODGE` gradient — left edge `#504c6c33` (20%), midpoint `#504c6cff` (100%), right edge `#504c6c33` (20%) — horizontal, creates a subtle glow border |
| Layout           | No auto-layout. Children are absolutely positioned within the frame.                                        |
| Auto-layout      | None — use absolute/flexbox positioning                                                                     |
| Child order (render) | logo → legal entity text → "Инфа" nav group → "Контакты" group → payment cards group → copyright text |

> Background maps to `gradient-footer` token: `radial-gradient(ellipse at 50% 98%, #504c6c99, #020309)`.

##### Layout — child positions (local coords relative to footer frame TL at x=−887, y=7855)

| Child node | Name | Local x | Local y | Size |
| ---------- | ---- | ------- | ------- | ---- |
| `175:448` | logo | 150 | 100 | 205 × 43 |
| `175:463` | Legal entity text | 150 | 362 | 211 × 70 |
| `175:512` | "Инфа" (nav links group) | 560 | 100 | 391 × 332 |
| `179:513` | "Контакты" (contact group) | 1050 | 100 | 174 × 88 |
| `179:524` | Payment cards group | 1405 | 93 | 365 × 30 |
| `179:553` | Copyright text | 1405 | 390 | 365 × 42 |

> Column layout (left to right): Logo/Legal at x=150, Nav links at x=560, Contacts at x=1050, Payment/Copyright at x=1405. All content columns top-aligned at y=100 (except payment at y=93, copyright at y=390). Footer has 100px top padding, implied side margins of 150px.

##### Logo (`175:448`)

| Property     | Value                                              |
| ------------ | -------------------------------------------------- |
| Figma node   | `175:448`                                          |
| Size         | 205 × 43px                                         |
| Asset file   | `/public/images/logo-footer.svg`                   |
| Fill         | Mostly `#ffffff`; "R" lettermark top-left has `linear-gradient(#E63F3F → #AB2929)` accent on one path |
| Notes        | Same wordmark as header logo (`logo.svg`) but larger. Use the footer-specific SVG as dimensions differ. |

##### Legal entity text (`175:463`)

| Property      | Value                                                     |
| ------------- | --------------------------------------------------------- |
| Figma node    | `175:463`                                                 |
| Verbatim copy | `ООО «1 Геймс» ИНН 5260480189 ОГРН 1215200037535`        |
| Font          | Montserrat Medium 500 / 20px / line-height 28px           |
| Color         | `#ffffff`                                                 |
| Alignment     | LEFT                                                      |
| Bbox          | 211 × 70px (wraps to 2–3 lines)                           |
| Position      | local x=150, y=362 (below logo, ~219px gap from logo top) |

##### "Информация" nav group (`175:512`)

Container frame: 391 × 332px at local x=560, y=100.

Section heading (`175:465`):
- Verbatim: `Информация`
- Font: Montserrat Bold 700 / 20px / line-height 28px / `#ffffff`
- Position: local y=0 within "Инфа" frame

Nav links list frame (`175:511`): 391 × 258px at local y=74 within "Инфа" frame (74px from heading top = 28px line-height + 46px gap).

Five links in order (all: Montserrat Medium 500 / 20px / line-height 28px / `#ffffff` / LEFT-aligned):

| # | Node | Verbatim text | Local y within links frame | Canvas y |
| - | ---- | ------------- | -------------------------- | -------- |
| 1 | `175:466` | `Пользовательское соглашение` | 0 | 8029 |
| 2 | `175:471` | `Политика конфиденциальности` | 54 | 8083 |
| 3 | `175:475` | `Дисклеймер` | 108 | 8137 |
| 4 | `175:498` | `Политика обработки файлов cookie` | 162 | 8191 |
| 5 | `175:505` | `Согласие на обработку персональных данных` | 216 | 8245 |

Gap between each link: **54px** (each text node is 14px tall, so the vertical gap/spacing between items = 54 − 14 = 40px). Link 5 wraps to 2 lines (42px bbox height).

Each link should route to the corresponding legal page (`/terms`, `/privacy`, `/disclaimer`, `/cookies`, `/personal-data`).

##### "Контакты" group (`179:513`)

Container frame: 174 × 88px at local x=1050, y=100.

Section heading (`179:514`):
- Verbatim: `Контакты`
- Font: Montserrat Bold 700 / 20px / line-height 28px / `#ffffff`
- Position: local y=0

Email link frame (`179:515`): 174 × 14px at local y=74 within "Контакты".

Email text (`179:516`):
- Verbatim: `hello@1games.ru`
- Font: Montserrat Medium 500 / 20px / line-height 28px / `#ffffff`
- Render as `<a href="mailto:hello@1games.ru">` element.

##### Payment icons group (`179:524`)

| Property | Value |
| -------- | ----- |
| Figma node | `179:524` |
| Container size | 365 × 30px |
| Position | local x=1405, y=93 in footer |
| Layout direction | Horizontal row, left-to-right |
| Alignment | Vertically centered within 30px container |

Individual icons (left → right):

| Icon | Node | Size (px) | Asset file | Gap to next |
| ---- | ---- | --------- | ---------- | ----------- |
| Visa | `179:525` | 68 × 22 | `/public/images/payment/visa.svg` | 33px |
| Mastercard | `179:529` | 40 × 24 | `/public/images/payment/mastercard.svg` | 33px |
| SBP | `179:534` | 57 × 28 | `/public/images/payment/sbp.svg` | 33px |
| Mir | `179:548` | 81 × 24 | `/public/images/payment/mir.svg` | — |

Gap calculation: Visa ends at x=518+68=586; Mastercard starts at x=619 → gap=33px. Mastercard ends at 659; SBP starts at 692 → gap=33px. SBP ends at 749; Mir starts at 782 → gap=33px. All icons rendered with `mix-blend-mode: luminosity` and reduced opacity (0.3–0.5) as exported — they appear desaturated/muted against the dark footer background.

##### Copyright / disclaimer text (`179:553`)

| Property      | Value                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| Figma node    | `179:553`                                                                      |
| Verbatim copy | `Все права защищены © 2026 Копирование дизайна запрещено`                      |
| Font          | Montserrat Medium 500 / 20px / line-height 28px                                |
| Color         | `#ffffff`                                                                      |
| Alignment     | LEFT                                                                           |
| Bbox          | 365 × 42px (wraps to 2 lines)                                                  |
| Position      | local x=1405, y=390 in footer                                                  |

> Note: The "Region RP fan-проект…" disclaimer mentioned in SEO docs is **not present** in the Figma footer. The Figma footer only contains the copyright string above. Do not add the fan-project disclaimer to the rendered footer.

##### Social icons

There is **no social icons row in the desktop footer** (`175:438`). The full depth=3 scan confirms only 6 direct children: logo, legal text, "Инфа" nav group, "Контакты" group, payment group, and copyright text. Social icons (Discord, VK, Telegram, YouTube) appear only in the **Header** (`40:306`). Do not include a social row in the Footer component.

##### Asset files (all exported)

| File | Source node | Dimensions |
| ---- | ----------- | ---------- |
| `/public/images/logo-footer.svg` | `175:448` | 205 × 43px |
| `/public/images/payment/visa.svg` | `179:525` | 68 × 22px |
| `/public/images/payment/mastercard.svg` | `179:529` | 40 × 24px |
| `/public/images/payment/sbp.svg` | `179:534` | 57 × 28px |
| `/public/images/payment/mir.svg` | `179:548` | 81 × 24px |

---

## 3. Assets inventory

| Asset                                                 | Count | Export format               | Approx. size          | Source node                                                |
| ----------------------------------------------------- | ----- | --------------------------- | --------------------- | ---------------------------------------------------------- |
| Logo (wordmark)                                       | 1     | SVG                         | 109 × 22              | `10:8`                                                     |
| Logo (footer)                                         | 1     | SVG                         | 205 × 43              | `175:448`                                                  |
| Hero background image/video                           | 1     | WebP (static) / MP4 (video) | 1920 × 1080           | `24:396`                                                   |
| Character illustrations                               | 5     | PNG/WebP                    | ~511 × 658            | `Врач/Военный/Полицейский/Бандит/Бизнесмен` component sets |
| Role icons (stickers)                                 | 5     | PNG/WebP                    | 91–149px              | nested rectangles in role components                       |
| Car images                                            | 2     | PNG/WebP                    | ~842 × 678            | `Машина_1`, `Машина_2` component sets                      |
| Screenshots (carousel)                                | 14    | WebP                        | TBD: depends on scene | `Скриншоты_1` … `Скриншоты_14`                             |
| Map image                                             | 1     | PNG/WebP                    | 413 × 224+            | `Карта id=262:688` component set                           |
| In-game photo 1                                       | 1     | WebP                        | ~1138 × 636           | `169:469`                                                  |
| In-game photo 2                                       | 1     | WebP                        | ~898 × 505            | `202:226`                                                  |
| Decorative props (Звезда, Деньги, Граната, Балаклава) | 4     | PNG (transparent)           | 94–577px              | `170:530`, `170:526`, `170:522`, `170:546`                 |
| How-to-Play illustrations (step-01, step-02, step-03) | 3     | PNG                         | 526 × 261px (1×)      | `175:336`, `175:357`, `175:371` — export to `/public/images/howtoplay/` |
| Social icons (Discord, VK, Telegram, +1)              | 4     | SVG                         | 42 × 42               | `40:288…40:301`                                            |
| Payment icons (Visa, Mastercard, SBP, Mir)            | 4     | SVG                         | 40–81px wide          | `179:524` group children                                   |

---

## 4. Component candidates

| Component       | Variants / states                                    | Key props                                                     | Repeat sections           |
| --------------- | ---------------------------------------------------- | ------------------------------------------------------------- | ------------------------- |
| `Button`        | primary (red glow + icon), secondary (dark + glow)   | size: 60–88h; `cornerRadius=20`; icon slot                    | Header, Hero, How-to-Play |
| `NavItem`       | active (white 100%), inactive (white 60%)            | 170 × 60; font 18px/600                                       | Header                    |
| `OnlineCounter` | —                                                    | dot + number (`gradient-brand`) + label (`text-muted`)        | Header                    |
| `SocialIcon`    | discord / vk / telegram / youtube                    | 42 × 42; `bg=white` fill                                      | Header                    |
| `PromoCode`     | code display, timer                                  | code: `gradient-promo`; timer separate; `cornerRadius=20`     | Hero                      |
| `RoleCard`      | 5 roles (Медик/Военный/Полицейский/Бандит/Бизнесмен) | 311 × 798; illustration + icon + name + description           | Roles                     |
| `RolePopup`     | per-role modal                                       | `Попап_*` frames                                              | Roles (on click)          |
| `CarCard`       | 2 cars                                               | 800 × 552; screenshot + 4 stat badges                         | Cars                      |
| `StatBadge`     | —                                                    | label + value; `cornerRadius=20`                              | Cars                      |
| `FeatureItem`   | —                                                    | 58 × 58 icon + body text                                      | RP & Economy              |
| `StepCard`      | 3 steps                                              | 526 × 643; number badge + illustration + heading + body + CTA | How to Play               |
| `Screenshot`    | Скриншоты_1…\_14                                     | carousel item                                                 | Map                       |
| `MapCityItem`   | —                                                    | icon + city name; 8 in sidebar                                | Map                       |
| `PaymentLogo`   | visa / mastercard / sbp / mir                        | SVG icon frames                                               | Footer                    |

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

| #     | What's missing                                 | Why it blocks                                                                                  |
| ----- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| TBD-1 | Tablet breakpoint (768px) — no Figma frame     | Can't write responsive CSS between 440–1920 without it                                         |
| TBD-2 | Mobile button font size (CTA at 440px)         | Button text observed at 28px desktop; mobile node not fetched                                  |
| TBD-3 | ~~Step number `text-step-num` on mobile~~      | **Resolved:** Mobile badge is 69 × 52px, `cornerRadius=15`. Badge number font size not exposed in tree — infer ~32px (proportionally scaled from 47px × 52/69 ratio). |
| TBD-4 | Actual exported asset files                    | All images are embedded in Figma; need export pass before `<Image>` components can be wired up |
| TBD-5 | Screenshot carousel content (Скриншоты_1…\_14) | 14 component sets exist; actual images/dimensions need export                                  |
| TBD-6 | 4th social icon identity                       | `40:301` renders as a vector "YouTube"-shape icon — confirm it's YouTube                       |
| TBD-7 | Nav active state on scroll (scroll-spy)        | Design shows "ГЛАВНАЯ" active; behaviour on scroll not specified                               |
| TBD-8 | Mobile How-to-Play sub-copy text mismatch      | Desktop `172:243` = "Выполните три простых шага…"; mobile `288:493` = "Модели зданий Банков…" — mobile text is clearly a copy-paste error from another section. Confirm with client which copy to use on mobile. |
| TBD-9 | Step 01 icon row — icon content of `175:326`, `175:332` | These two 72×72 icon frames in Step 01 are empty (no child elements). Only `175:312` has a Union icon. Unclear if these are meant to be platform logos (Epic/Steam/Rockstar) or are empty decorative frames. |
