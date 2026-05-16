// Figma node: 170:550

// TODO: export step illustrations from Figma nodes 175:336, 175:357, 175:371
// → /public/images/howtoplay/step-01.png, step-02.png, step-03.png

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { CopyIPButton } from '@/components/ui/CopyIPButton'

// ---------------------------------------------------------------------------
// Inline icon — download arrow (step 02 CTA)
// ---------------------------------------------------------------------------

function DownloadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Downward arrow */}
      <path d="M12 3v13" />
      <path d="M7 13l5 5 5-5" />
      {/* Tray / base line */}
      <path d="M4 20h16" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Step card data
// ---------------------------------------------------------------------------

interface StepCard {
  number: string
  illustrationSrc: string
  illustrationAlt: string
  title: string
  body: string
  cta?: 'download' | 'copy'
}

const STEPS: StepCard[] = [
  {
    number: '01',
    illustrationSrc: '/images/howtoplay/step-01.png',
    illustrationAlt: 'Руки держат рублёвые купюры — купить игру GTA V',
    title: 'Купить и установить игру GTA V',
    body: 'Чтобы начать игру, необходимо иметь лицензионную версию GTA V. Если она уже приобретена — переходите к следующему шагу',
    cta: undefined,
  },
  {
    number: '02',
    illustrationSrc: '/images/howtoplay/step-02.png',
    illustrationAlt: 'Руки чинят двигатель автомобиля — установить RAGE MP',
    title: 'Загрузить и установить клиент RAGE MP',
    body: 'Чтобы подключиться к нашему серверу, потребуется клиент RAGE:MP. Установите его на компьютер и затем запустите',
    cta: 'download',
  },
  {
    number: '03',
    illustrationSrc: '/images/howtoplay/step-03.png',
    illustrationAlt: 'Большой палец вверх — подключиться к серверу Region',
    title: 'Подключиться к серверу Region',
    body: 'Финальный шаг: введите в поиске лаунчера REGION или скопируйте IP, дождитесь загрузки всех файлов. Готово — вы в игре!',
    cta: 'copy',
  },
]

// ---------------------------------------------------------------------------
// StepCard component
// ---------------------------------------------------------------------------

function StepCardItem({ step, offset }: { step: StepCard; offset?: boolean }) {
  return (
    <article
      aria-label={`Шаг ${step.number}: ${step.title}`}
      className={[
        // Base card — mobile: full-width / desktop: fixed 526px wide
        'relative flex w-full flex-col overflow-hidden rounded-card',
        'lg:w-[526px] lg:h-[643px]',
        // Card background: purple radial + red radial gradient layers + surface base
        'bg-[radial-gradient(circle_at_50%_100%,rgba(80,76,108,0.6)_0%,transparent_60%),radial-gradient(circle_at_80%_0%,rgba(255,40,48,0.4)_0%,transparent_50%),linear-gradient(to_bottom,#0e0e0f,#111117)]',
        // Stroke (ring approximation)
        'ring-1 ring-purple/40',
        // Stagger offset for middle card (desktop only)
        offset ? 'lg:mt-[112px]' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Illustration — 526×261px desktop / 400×198px mobile */}
      <div className="relative h-[198px] w-full shrink-0 overflow-hidden lg:h-[261px] lg:w-[526px]">
        <Image
          src={step.illustrationSrc}
          alt={step.illustrationAlt}
          width={526}
          height={261}
          sizes="(max-width: 1024px) 400px, 526px"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card body — padding matches Figma internal layout */}
      <div className="flex flex-1 flex-col gap-3 p-5 lg:gap-4 lg:px-[30px] lg:py-[30px]">
        {/* Step badge — 91×69px desktop / 69×52px mobile, cornerRadius 20px/15px */}
        <div
          aria-hidden="true"
          className={[
            'flex shrink-0 items-center justify-center',
            // Mobile badge: 69×52px / cornerRadius 15px
            'h-[52px] w-[69px] rounded-[15px]',
            // Desktop badge: 91×69px / cornerRadius 20px
            'lg:h-[69px] lg:w-[91px] lg:rounded-[20px]',
            // Background: gradient-button-glow token
            'bg-[radial-gradient(circle_at_60%_50%,rgba(255,40,48,0.6)_0%,transparent_60%)]',
            'ring-1 ring-accent/30',
          ].join(' ')}
        >
          <span className="text-[32px] font-bold leading-none text-white lg:text-step-num">
            {step.number}
          </span>
        </div>

        {/* Step title — 20px/700 mobile / 28px/700 desktop */}
        <h3 className="text-[20px] font-bold leading-[1.2] text-white lg:text-h3">
          {step.title}
        </h3>

        {/* Step body — 16px/500 mobile / 20px/500 desktop */}
        <p className="text-[16px] font-medium leading-[1.4] text-white lg:text-body">
          {step.body}
        </p>

        {/* CTA button */}
        {step.cta === 'download' && (
          <div className="mt-auto pt-2">
            <Button
              variant="secondary"
              href="https://rage.mp"
              icon={<DownloadIcon />}
              className="w-full lg:w-[466px] text-[18px] lg:text-[28px] py-[22px] lg:py-[36px] rounded-[15px] lg:rounded-[20px]"
            >
              СКАЧАТЬ
            </Button>
          </div>
        )}

        {step.cta === 'copy' && (
          <div className="mt-auto pt-2">
            <CopyIPButton />
          </div>
        )}
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// HowToPlay — section (Server Component)
// ---------------------------------------------------------------------------

export function HowToPlay() {
  return (
    // Figma 170:550 — 1920×1141px, bg #020309
    <section
      id="howtoplay"
      aria-labelledby="howtoplay-heading"
      className="relative w-full overflow-hidden bg-bg px-4 py-16 md:px-12 md:py-24 lg:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 md:gap-14 lg:h-[1141px] lg:gap-0 lg:pt-[100px]">

        {/* ----------------------------------------------------------------
            Heading row — heading LEFT + sub-copy card RIGHT (desktop)
        ---------------------------------------------------------------- */}
        <header className="grid gap-6 lg:grid-cols-[1fr_538px] lg:items-start">
          {/* H2 — "Как начать играть?" */}
          <h2
            id="howtoplay-heading"
            className="text-center text-h2 font-extrabold leading-none text-white lg:text-left lg:text-display"
          >
            Как начать играть?
          </h2>

          {/* Sub-copy card — 538×142px, red radial glow + hex pattern overlay */}
          <div
            className={[
              'rounded-card p-[30px]',
              // Red radial glow background (gradient-button-glow variant, bottom-centred)
              'bg-[radial-gradient(circle_at_50%_100%,rgba(255,40,48,0.6)_0%,transparent_70%),linear-gradient(to_bottom,#0e0e0f,#111117)]',
              'lg:min-h-[142px] lg:max-w-[538px]',
            ].join(' ')}
          >
            <p className="text-[16px] font-medium leading-[1.4] text-white lg:text-body">
              {/* U+00A0 (non-breaking space) + regular space preserves the Figma double-space after "шага" */}
              Выполните три простых шага&#160; и наслаждайтесь игрой на сервере Region в мире GTA 5 RP
            </p>
          </div>
        </header>

        {/* ----------------------------------------------------------------
            Step cards row
            Desktop: 3 cols, middle card offset down 112px (staggered layout)
            Mobile: stacked vertically
        ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 gap-6 lg:mt-[86px] lg:grid-cols-3 lg:items-start lg:gap-5">
          <StepCardItem step={STEPS[0]} />
          <StepCardItem step={STEPS[1]} offset />
          <StepCardItem step={STEPS[2]} />
        </div>

      </div>
    </section>
  )
}
