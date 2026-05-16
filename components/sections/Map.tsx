'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Карта — Map section.
 * Figma node: 99:434 (1620 × 784).
 *
 * Desktop two-column layout:
 *   Left  — Список городов sidebar (488 × 784): 8 city pills.
 *   Right — Скриншоты column (1082 × 783):
 *             1. Screenshot image  (1082 × 469)
 *             2. Информация pane   (1082 × 224): address+description on left,
 *                                  embedded Leningrad-Oblast map on right.
 *             3. Города tab row    (1082 × 92): 3 region tabs.
 *
 * Mobile: horizontal carousel (prev/next + dots) over 8 cities; Информация pane
 * stacked below screenshot; region tabs below.
 * TODO: verify mobile layout against Figma frame 236:307 and refine if needed.
 */

type CityKey =
  | 'lakhta'
  | 'spalny'
  | 'strelka'
  | 'marble'
  | 'palace'
  | 'isaak'
  | 'medny'
  | 'gollandia'

interface City {
  id: CityKey
  /** Russian label — verbatim from Figma. */
  name: string
  /** First line of Информация pane (address). */
  address: string
  /** Body text of Информация pane (description). */
  description: string
  /**
   * Path under /public for the large screenshot.
   * TODO: export from Figma node Скриншоты_N and place in /public/images/screenshots/.
   */
  screenshot: string
}

const CITIES: City[] = [
  {
    id: 'lakhta',
    name: 'Лахта центр',
    // Address verbatim from Figma node 99:434 Информация pane (note: two dots — Figma verbatim).
    address: 'ул.. Высотная, 1',
    description:
      'Многофункциональный комплекс, расположенный на берегу Финского залива в Приморском районе Санкт-Петербурга. Является центральным офисом компании Газпром',
    // TODO: export Скриншоты_1 from Figma → /public/images/screenshots/screenshot-1.webp
    screenshot: '/images/screenshots/screenshot-1.webp',
  },
  {
    id: 'spalny',
    name: 'Спальный район В.О.',
    address: 'жилые кварталы Василеостровского района',
    description:
      'Наша задача сделать город — разносторонним, именно поэтому мы добавляем сюда различные по наполнению и атмосфере локации, при этом что не противоречит главному городу прототипу',
    // TODO: export Скриншоты_2 from Figma → /public/images/screenshots/screenshot-2.webp
    screenshot: '/images/screenshots/screenshot-2.webp',
  },
  {
    id: 'strelka',
    // Full form — NOT abbreviated "В.О." (verbatim from Figma).
    name: 'Стрелка Васильевского острова',
    address: 'район Биржевой площади (восточная оконечность В.О.)',
    description:
      'Мыс на восточной оконечности Васильевского острова в Санкт-Петербурге, омываемый Большой Невой и Малой Невой; один из самых известных архитектурных ансамблей города; пример гармонии архитектуры города с пейзажем берегов Невы',
    // TODO: export Скриншоты_3 from Figma → /public/images/screenshots/screenshot-3.webp
    screenshot: '/images/screenshots/screenshot-3.webp',
  },
  {
    id: 'marble',
    name: 'Мраморный дворец МВД',
    address: 'ул.. Миллионная, 5/1',
    description:
      'Мы не просто перенесли дворец, а ещё и напитали место мистикой, пасхалки и интереснейшим фкнционалом, с отсылкой на реальную экранизацию, что позволит с интересом открывать нашу карту с новых ракурсов',
    // TODO: export Скриншоты_4 from Figma → /public/images/screenshots/screenshot-4.webp
    screenshot: '/images/screenshots/screenshot-4.webp',
  },
  {
    id: 'palace',
    name: 'Дворцовая площадь',
    address: 'Дворцовая пл.',
    description:
      'Главная площадь Санкт-Петербурга, архитектурный ансамбль, возникший во второй половине XVIII — первой половине XIX века',
    // TODO: export Скриншоты_5 from Figma → /public/images/screenshots/screenshot-5.webp
    screenshot: '/images/screenshots/screenshot-5.webp',
  },
  {
    id: 'isaak',
    name: 'Исаакиевская площадь',
    address: 'Исаакиевская пл.',
    description:
      'Площадь в Адмиралтейском муниципальном округе Адмиралтейского района Санкт-Петербурга. С севера ограничена Адмиралтейским проспектом, с юга — Мариинским дворцом',
    // TODO: export Скриншоты_6 from Figma → /public/images/screenshots/screenshot-6.webp
    screenshot: '/images/screenshots/screenshot-6.webp',
  },
  {
    id: 'medny',
    name: 'Медный всадник',
    address: 'Сенатская площадь',
    description:
      'Монументальный конный памятник первому российскому императору Петру Великому, созданный в 1768–1778 годах под руководством французского скульптора Этьена Мориса Фальконе',
    // TODO: export Скриншоты_7 from Figma → /public/images/screenshots/screenshot-7.webp
    screenshot: '/images/screenshots/screenshot-7.webp',
  },
  {
    id: 'gollandia',
    name: 'Новая Голландия',
    address: 'наб. Адмиралтейского канала, 2',
    description:
      'Остров в Адмиралтейском районе Санкт-Петербурга, ограниченный рекой Мойкой, Крюковым и Адмиралтейским каналами. Кроме того, Новая Голландия — один из старейших утилитарных ансамблей города',
    // TODO: export Скриншоты_8 from Figma → /public/images/screenshots/screenshot-8.webp
    screenshot: '/images/screenshots/screenshot-8.webp',
  },
]

/** Pin / location icon — 22 × 22 frame used in sidebar pills. */
function PinIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M11 1C6.582 1 3 4.582 3 9c0 6.5 8 13 8 13s8-6.5 8-13c0-4.418-3.582-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="22"
      viewBox="0 0 14 22"
      fill="none"
      aria-hidden="true"
      className={direction === 'left' ? 'rotate-180' : ''}
    >
      <path
        d="M2 2l10 9-10 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Map() {
  const [activeCityIndex, setActiveCityIndex] = useState<number>(0)

  const activeCity = CITIES[activeCityIndex]

  const handlePrev = () => {
    setActiveCityIndex((i) => (i <= 0 ? CITIES.length - 1 : i - 1))
  }

  const handleNext = () => {
    setActiveCityIndex((i) => (i >= CITIES.length - 1 ? 0 : i + 1))
  }

  return (
    <section
      id="map"
      aria-labelledby="map-heading"
      className="relative w-full bg-bg px-4 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 md:gap-14">

        {/* ── Heading + sub-copy ── */}
        <header className="flex flex-col gap-4 md:gap-6">
          {/*
            Figma node 91:89: Montserrat ExtraBold 800, 100px desktop / 54px mobile,
            line-height 100% (leading-none). Matches text-display token from globals.css.
          */}
          <h2
            id="map-heading"
            className="text-[3.375rem] font-extrabold leading-none text-white max-w-[920px] lg:text-display"
          >
            Карта Ленинградской области и регионов
          </h2>
          {/*
            Figma node 91:92: Montserrat Medium 500, 20px, line-height 28px (1.4).
            Verbatim copy — do not paraphrase.
          */}
          <p className="max-w-3xl text-body font-medium leading-[1.4] text-text-secondary">
            Десятки самых знаковых мест и сотни архитектурных объектов Питера и области
          </p>
        </header>

        {/* ══════════════════════════════════════════════════════════
            Desktop layout (≥900px): sidebar + right column
        ══════════════════════════════════════════════════════════ */}
        <div className="hidden gap-6 min-[900px]:grid min-[900px]:grid-cols-[488px_1fr]">

          {/* ── Left: Список городов sidebar ── */}
          <nav aria-label="Список городов">
            <ul className="flex flex-col gap-2">
              {CITIES.map((city, idx) => {
                const isActive = idx === activeCityIndex
                return (
                  <li key={city.id}>
                    <button
                      type="button"
                      onClick={() => setActiveCityIndex(idx)}
                      aria-pressed={isActive}
                      /*
                        Active pill: red radial-gradient fill (accent-promo → accent, from bottom)
                        + red linear-gradient border (accent 80%→100%→80%).
                        Implemented via background-image + border trick using a box-shadow ring
                        because Tailwind v4 arbitrary gradient syntax covers the fill; the
                        "gradient border" effect uses a pseudo-element approach via ring utilities
                        combined with a transparent background on inactive.

                        Active:   [background-image:radial-gradient(...)] + ring with gradient approximated
                        Inactive: bg-transparent, no ring.

                        Note: CSS gradient borders require border-image or a wrapper trick;
                        we approximate with a solid accent ring at reduced opacity for the active
                        state and rely on the fill gradient as the primary visual indicator.
                        TODO: verify active border gradient fidelity vs Figma — may need a
                        wrapper div with padding + gradient background for pixel-perfect border.
                      */
                      className={[
                        'flex w-full items-center gap-4 rounded-[20px] px-5 text-left transition-colors duration-150',
                        // Font: Montserrat Medium 28px (text-h3 token = 1.75rem / 28px).
                        'text-[1.75rem] font-medium leading-[1.2] text-white',
                        // Height: 94px for most items; "Стрелка Васильевского острова" wraps
                        // to ~126px — let min-h enforce base height, auto-grows with text.
                        'min-h-[94px] py-4',
                        isActive
                          ? // Active: red radial gradient fill from bottom + accent ring border
                            '[background-image:radial-gradient(ellipse_at_50%_100%,_#ff7c81fc_0%,_#ff2830_70%,_transparent_100%)] ring-1 ring-accent'
                          : // Inactive: fully transparent, no background, no border.
                            'bg-transparent hover:bg-white/5',
                      ].join(' ')}
                    >
                      <span className={isActive ? 'text-white' : 'text-text-muted'}>
                        <PinIcon />
                      </span>
                      {city.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ── Right: Скриншоты column ── */}
          <div className="flex flex-col gap-4">

            {/* 1. Screenshot image (1082 × 469, aspect ≈ 2.31:1) */}
            <div className="relative w-full overflow-hidden rounded-[20px] bg-surface" style={{ aspectRatio: '1082 / 469' }}>
              {/* TODO: replace placeholder — export Скриншоты_N from Figma → /public/images/screenshots/ */}
              <Image
                src={activeCity.screenshot}
                alt={`Скриншот: ${activeCity.name}`}
                fill
                sizes="(min-width: 1620px) 1082px, (min-width: 900px) calc(100vw - 488px - 96px), 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* 2. Информация pane (1082 × 224) */}
            {/*
              cornerRadius=20, faint purple linear-gradient stroke.
              Two columns inside: text (left) + embedded map (right, 413 × 224).
              Border approximated with ring-1 ring-purple/40 (faint purple stroke).
            */}
            <div className="flex min-h-[224px] w-full overflow-hidden rounded-[20px] ring-1 ring-purple/40 bg-surface">

              {/* Left: address + description */}
              <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5">
                {/*
                  Figma: Montserrat Medium 16px, color #6e6b78, line-height ~22.4px (1.4).
                  #6e6b78 is close to text-text-muted but slightly desaturated/purple —
                  using arbitrary color value to match Figma exactly.
                */}
                <p className="text-[16px] font-medium leading-[1.4] text-[#6e6b78]">
                  {activeCity.address}
                </p>
                <p className="text-[16px] font-medium leading-[1.4] text-[#6e6b78]">
                  {activeCity.description}
                </p>
              </div>

              {/* Right: Embedded Leningrad-Oblast map (413 × 224, cornerRadius=20 on inner) */}
              {/*
                Red linear-gradient stroke (#ff2830 20%→100%→20%) on the map image container.
                Approximated with ring-1 ring-accent (solid red, closest Tailwind equivalent).
                TODO: verify gradient stroke fidelity vs Figma — may need CSS border-image.
                Figma node: 262:688.
                TODO: export from Figma node 262:688 → /public/images/map.webp
              */}
              <div className="relative shrink-0 self-stretch overflow-hidden rounded-[20px] ring-1 ring-accent"
                style={{ width: '413px' }}>
                <Image
                  src="/images/map.webp"
                  alt="Карта Ленинградской области с отмеченными локациями Region RP"
                  fill
                  sizes="413px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 3. Города tab row (1082 × 92) — 3 region tabs */}
            {/*
              Each tab: ~360.67 × 92, cornerRadius=20.
              Tab 1 active: red radial-gradient fill + red linear stroke.
              Tab 2 & 3: transparent fill, faint purple linear stroke.
              TODO: wire tab switching to actual region data when Тольятти content arrives.
            */}
            <div className="flex w-full gap-3" role="tablist" aria-label="Регионы">

              {/* Tab 1: Санкт-Петербург (active) */}
              <button
                type="button"
                role="tab"
                aria-selected="true"
                className={[
                  'flex flex-1 items-center justify-center rounded-[20px] min-h-[92px]',
                  'text-[1.125rem] font-semibold leading-[1.22] text-white',
                  '[background-image:radial-gradient(ellipse_at_50%_100%,_#ff7c81fc_0%,_#ff2830_70%,_transparent_100%)] ring-1 ring-accent',
                ].join(' ')}
              >
                Санкт-Петербург
              </button>

              {/* Tab 2: Тольятти (inactive) */}
              <button
                type="button"
                role="tab"
                aria-selected="false"
                className={[
                  'flex flex-1 items-center justify-center rounded-[20px] min-h-[92px]',
                  'text-[1.125rem] font-semibold leading-[1.22] text-white/60',
                  'bg-transparent ring-1 ring-purple/40 hover:bg-white/5',
                ].join(' ')}
              >
                Тольятти
              </button>

              {/* Tab 3: Скоро (coming soon, inactive) */}
              <button
                type="button"
                role="tab"
                aria-selected="false"
                disabled
                aria-label="Скоро — скоро в игре"
                className={[
                  'flex flex-1 items-center justify-center rounded-[20px] min-h-[92px]',
                  'text-[1.125rem] font-semibold leading-[1.22] text-white/40',
                  'bg-transparent ring-1 ring-purple/40 cursor-not-allowed',
                ].join(' ')}
              >
                Скоро
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            Mobile layout (< 900px): carousel + info pane + tabs
            TODO: verify against Figma frame 236:307 and refine.
        ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-4 min-[900px]:hidden">

          {/* Screenshot carousel */}
          <div className="relative">
            <div
              className="relative w-full overflow-hidden rounded-[20px] bg-surface"
              style={{ aspectRatio: '1082 / 469' }}
            >
              {/* TODO: replace placeholder — export Скриншоты_N from Figma */}
              <Image
                src={activeCity.screenshot}
                alt={`Скриншот: ${activeCity.name}`}
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* Prev arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Предыдущая локация"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated/80 text-white backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronIcon direction="left" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Следующая локация"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated/80 text-white backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          {/* Pagination dots — one per city (8 total) */}
          <ol
            className="flex items-center justify-center gap-2"
            aria-label="Текущая локация"
          >
            {CITIES.map((city, i) => {
              const isActive = i === activeCityIndex
              return (
                <li key={city.id}>
                  <button
                    type="button"
                    onClick={() => setActiveCityIndex(i)}
                    aria-label={`Показать ${city.name}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`h-2 rounded-full transition-all ${
                      isActive ? 'w-6 bg-accent' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                </li>
              )
            })}
          </ol>

          {/* Информация pane — stacked on mobile: text above map */}
          <div className="flex flex-col overflow-hidden rounded-[20px] ring-1 ring-purple/40 bg-surface">
            {/* Address + description */}
            <div className="flex flex-col gap-2 px-5 py-4">
              <p className="text-[14px] font-medium leading-[1.4] text-[#6e6b78]">
                {activeCity.address}
              </p>
              <p className="text-[14px] font-medium leading-[1.4] text-[#6e6b78]">
                {activeCity.description}
              </p>
            </div>
            {/* Embedded map below text on mobile */}
            {/* TODO: export Figma node 262:688 → /public/images/map.webp */}
            <div className="relative aspect-[413/224] w-full overflow-hidden ring-1 ring-accent">
              <Image
                src="/images/map.webp"
                alt="Карта Ленинградской области с отмеченными локациями Region RP"
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Region tabs — stacked column on mobile */}
          <div className="flex flex-col gap-2" role="tablist" aria-label="Регионы">
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className={[
                'flex w-full items-center justify-center rounded-[20px] min-h-[64px]',
                'text-[1rem] font-semibold leading-[1.22] text-white',
                '[background-image:radial-gradient(ellipse_at_50%_100%,_#ff7c81fc_0%,_#ff2830_70%,_transparent_100%)] ring-1 ring-accent',
              ].join(' ')}
            >
              Санкт-Петербург
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              className={[
                'flex w-full items-center justify-center rounded-[20px] min-h-[64px]',
                'text-[1rem] font-semibold leading-[1.22] text-white/60',
                'bg-transparent ring-1 ring-purple/40 hover:bg-white/5',
              ].join(' ')}
            >
              Тольятти
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              disabled
              aria-label="Скоро — скоро в игре"
              className={[
                'flex w-full items-center justify-center rounded-[20px] min-h-[64px]',
                'text-[1rem] font-semibold leading-[1.22] text-white/40',
                'bg-transparent ring-1 ring-purple/40 cursor-not-allowed',
              ].join(' ')}
            >
              Скоро
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
