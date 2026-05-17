// Figma node: 170:550

import Image from "next/image";
import { CopyIPButton } from "@/components/ui/CopyIPButton";

// ---------------------------------------------------------------------------
// Download icon — folder with down-arrow cutout (Figma node I175:396;175:379)
// ---------------------------------------------------------------------------
function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="dlGrad" x1="12" y1="2" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#dlGrad)"
        d="M4.432 2.278C5.364 2.068 6.474 2 7.758 2H9.618C10.771 2 11.848 2.585 12.488 3.559L13.422 4.981C13.635 5.305 13.994 5.5 14.379 5.5H20.192C22.029 5.5 23.517 6.971 23.5 8.866C23.479 11.122 23.497 13.38 23.497 15.636C23.497 16.939 23.429 18.065 23.222 19.011C23.012 19.97 22.643 20.813 21.992 21.473C21.341 22.134 20.51 22.509 19.565 22.722C18.632 22.932 17.523 23 16.239 23H7.758C6.474 23 5.364 22.932 4.432 22.722C3.487 22.509 2.656 22.134 2.005 21.473C1.353 20.813 0.984 19.97 0.774 19.011C0.567 18.065 0.5 16.939 0.5 15.636V9.364C0.5 8.062 0.567 6.935 0.774 5.99C0.984 5.031 1.353 4.187 2.005 3.527C2.656 2.866 3.487 2.492 4.432 2.278ZM13.148 11.333C13.148 10.689 12.633 10.167 11.998 10.167C11.363 10.167 10.848 10.689 10.848 11.333V14.933L9.937 14.008C9.488 13.553 8.76 13.553 8.311 14.008C7.862 14.464 7.862 15.203 8.311 15.658L11.113 18.502C11.126 18.515 11.138 18.527 11.151 18.539C11.361 18.771 11.663 18.917 11.998 18.917C12.334 18.917 12.635 18.771 12.846 18.539C12.858 18.527 12.871 18.515 12.883 18.502L15.686 15.658C16.135 15.203 16.135 14.464 15.686 14.008C15.237 13.553 14.509 13.553 14.06 14.008L13.148 14.933V11.333Z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Platform icon button — 72×72 red-gradient bg + border (card 1 icons)
// ---------------------------------------------------------------------------
function PlatformIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[20px] p-px"
      style={{
        background:
          "linear-gradient(to right, rgba(255,40,48,0.2), rgba(255,40,48,1) 50%, rgba(255,40,48,0.2))",
      }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-[19px]"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(255,40,48,0.6) 0%, transparent 85%), transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Region logo — Figma node 175:325
function RegionLogo() {
  return (
    <svg width="46" height="44" viewBox="0 0 46 44" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="regionGrad" x1="23" y1="0" x2="23" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        fill="url(#regionGrad)"
        d="M13.3418 32C14.3287 32 15.2283 32.5434 15.6514 33.3965L20.9092 44H11.2891C10.27 44 9.34803 43.4211 8.94336 42.5264L5.72656 35.415C4.99663 33.8013 6.23385 32 8.07227 32H13.3418ZM25.6104 0C31.2304 0 35.7509 1.51371 39.1709 4.54102C42.6125 7.54789 44.3339 11.3833 44.334 16.0469C44.334 17.7652 44.0727 19.3819 43.5498 20.8955C43.0489 22.3889 42.4389 23.6058 41.7197 24.5469C41.0012 25.4876 40.2825 26.3056 39.5635 27.001C38.8665 27.6965 38.2668 28.1882 37.7656 28.4746L36.9814 28.9033L46 44H33.2832C32.0562 43.9999 30.9377 43.3274 30.4053 42.2705L25.2646 32.0645L18.4238 19.3838H30.9629C31.7688 19.3838 32.1338 19.2235 32.9316 18.5C33.5203 17.966 33.7158 16.1579 33.7158 15C33.7158 14.2145 33.2404 13.415 32.7461 12.8271C32.8592 13.3743 32.9346 13.7835 33 14C32.6508 13.2934 32.0308 12.5365 31.6455 12.2158C31.0483 11.7192 29.4846 11.4785 28.6895 11.4785H14.6533C14.6533 11.4785 13.9847 9.62495 12.6055 7.67578C11.2261 5.72659 8.05332 3.83192 7.09082 3.37695L0 0H25.6104Z"
      />
    </svg>
  );
}

// Steam logo — Figma node 175:326 (icon path only)
function SteamLogo() {
  return (
    <svg width="50" height="50" viewBox="11 11 50 50" fill="none" aria-label="Steam">
      <defs>
        <linearGradient id="steamGrad" x1="36" y1="11" x2="36" y2="61" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        fill="url(#steamGrad)"
        d="M39.5118 29.5485C39.5118 26.9408 41.6298 24.8267 44.2405 24.8267C46.8509 24.8267 48.9689 26.9408 48.9689 29.5468C48.9689 32.1544 46.8527 34.2668 44.2405 34.2668C41.6298 34.2668 39.5118 32.1544 39.5118 29.5485ZM50.5173 29.5585C50.5173 26.0889 47.6995 23.2762 44.2236 23.2762C40.7477 23.2762 37.93 26.0889 37.93 29.5585C37.93 33.0281 40.7477 35.8407 44.2236 35.8407C47.698 35.8357 50.5123 33.0248 50.5173 29.5585ZM26.6923 48.9407L23.6173 47.67C24.4926 49.4675 26.3082 50.6845 28.4077 50.6845C30.6075 50.6845 32.4966 49.3491 33.3017 47.445L33.315 47.41C33.5739 46.8064 33.7259 46.103 33.7259 45.3659C33.7259 42.4366 31.3474 40.0623 28.4127 40.0623C27.7363 40.0623 27.0899 40.1891 26.4953 40.4175L26.532 40.4057L29.7105 41.718C31.1336 42.3248 32.1141 43.712 32.1141 45.3259C32.1141 47.4868 30.3586 49.2391 28.1939 49.2391C27.6528 49.2391 27.1383 49.1291 26.669 48.9323L26.694 48.9423L26.6923 48.9407ZM35.9575 11C22.834 11.0017 12.0707 21.0804 11.0067 33.905L11 33.995L24.4257 39.5339C25.5415 38.7634 26.9228 38.305 28.4127 38.305C28.4144 38.305 28.4161 38.305 28.4161 38.305C28.548 38.305 28.6766 38.3134 28.8086 38.3184L34.7798 29.6885V29.5651C34.7848 24.3632 39.0107 20.1484 44.222 20.1484C49.4366 20.1484 53.6641 24.3682 53.6641 29.5735C53.6641 34.7786 49.4366 38.9986 44.222 38.9986H44.0032L35.4948 45.0641C35.4948 45.1725 35.5032 45.2825 35.5032 45.3959C35.5032 45.3975 35.5032 45.3993 35.5032 45.4009C35.5032 49.3057 32.3312 52.4718 28.4194 52.4718C25.0003 52.4718 22.1458 50.0527 21.4827 46.8364L21.4744 46.7914L11.8619 42.8184C14.9369 53.3973 24.5577 61 35.9557 61C49.7873 61 61 49.8075 61 36.0009C61 22.1941 49.7873 11.0017 35.9557 11.0017L35.9575 11Z"
      />
    </svg>
  );
}

// Epic Games logo — Figma node 175:332 (icon path only, simplified)
function EpicGamesLogo() {
  return (
    <svg width="50" height="52" viewBox="14 10 45 52" fill="none" aria-label="Epic Games">
      <defs>
        <linearGradient id="epicGrad" x1="36.5" y1="10" x2="36.5" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        fill="url(#epicGrad)"
        d="M18.0883 10C15.0967 10 14 11.1001 14 14.0705V49.9536C14 50.2932 14.018 50.6052 14.0441 50.8945C14.1208 51.5462 14.1208 52.1816 14.7312 52.8916C14.7899 52.976 15.4035 53.4246 15.4035 53.4246C15.7348 53.5853 15.9633 53.704 16.3371 53.8552L34.4771 61.4208C35.4123 61.8448 35.8137 62.0235 36.4927 61.9975H36.5008C37.1879 62.0235 37.5894 61.8465 38.5245 61.4208L56.6548 53.8552C57.0382 53.704 57.2571 53.5837 57.5965 53.4246C57.5965 53.4246 58.2101 52.9582 58.2689 52.8916C58.8809 52.1816 58.8809 51.5462 58.9559 50.8945C58.982 50.6069 59 50.2949 59 49.9635V14.0721C59 11.1017 57.8951 10.0016 54.9119 10.0016L18.0883 10ZM47.1515 16.7353H48.6284C51.0944 16.7353 52.3021 17.9296 52.3021 20.419V24.4895H49.3106V20.5783C49.3106 19.7837 48.9451 19.4197 48.1699 19.4197H47.6607C46.8626 19.4197 46.4971 19.7837 46.4971 20.5783V33.1698C46.4971 33.9645 46.8626 34.3285 47.6607 34.3285H48.2303C48.9941 34.3285 49.3596 33.9645 49.3596 33.1698V28.6671H52.3511V33.3144C52.3511 35.7925 51.1288 37.0129 48.6545 37.0129H47.1515C44.6692 37.0129 43.4516 35.7843 43.4516 33.3144V20.4402C43.4516 17.9621 44.6675 16.7353 47.1515 16.7353ZM20.6293 16.9076H27.4039V19.6748H23.6714V25.3101H27.2684V28.0708H23.6714V34.0782H27.4561V36.847H20.6293V16.9076ZM28.9331 16.9076H33.7117C36.1842 16.9076 37.4082 18.1344 37.4082 20.6124V25.9113C37.4082 28.3893 36.1826 29.6096 33.7117 29.6096H31.9866V36.8453H28.9331V16.9076ZM38.7858 16.9076H41.8278V36.847H38.7858V16.9076ZM31.9768 19.5887V26.9333H33.2351C34.0005 26.9333 34.3661 26.5629 34.3661 25.765V20.7554C34.3661 19.9608 34.0005 19.5871 33.2351 19.5871L31.9768 19.5887ZM27.8217 54.8723H45.2534L36.3556 57.7924L27.8217 54.8723Z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Card action button — Figma-accurate styling (dark + red glow + gradient border)
// ---------------------------------------------------------------------------
function CardButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const outerClass =
    "mt-auto block w-full rounded-[20px] p-px lg:w-[466px]";
  const outerStyle = {
    background:
      "linear-gradient(to right, rgba(255,40,48,0.2), rgba(255,40,48,1) 50%, rgba(255,40,48,0.2))",
  };
  const innerClass =
    "flex w-full items-center justify-center gap-4 rounded-[19px] py-[22px] text-[18px] font-bold uppercase leading-none text-white/80 lg:py-[30px] lg:text-[28px]";
  const innerStyle = {
    background:
      "radial-gradient(ellipse at bottom, rgba(255,40,48,0.6) 0%, transparent 68%), #111117",
  };

  if (href) {
    return (
      <div className={outerClass} style={outerStyle}>
        <a href={href} className={innerClass} style={innerStyle}>
          {children}
        </a>
      </div>
    );
  }
  return (
    <div className={outerClass} style={outerStyle}>
      <button type="button" onClick={onClick} className={innerClass} style={innerStyle}>
        {children}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step card data
// ---------------------------------------------------------------------------
interface StepCard {
  number: string;
  illustrationSrc: string;
  illustrationAlt: string;
  title: string;
  body: string;
  cta?: "download" | "copy";
}

const STEPS: StepCard[] = [
  {
    number: "01",
    illustrationSrc: "/images/howtoplay/step-01.webp",
    illustrationAlt: "Купить игру GTA V в Steam или Epic Games",
    title: "Купить и установить игру GTA V",
    body: "Чтобы начать игру, необходимо иметь лицензионную версию GTA V. Если она уже приобретена — переходите к следующему шагу",
    cta: undefined,
  },
  {
    number: "02",
    illustrationSrc: "/images/howtoplay/step-02.webp",
    illustrationAlt: "Загрузить и установить клиент RAGE MP",
    title: "Загрузить и установить клиент RAGE MP",
    body: "Чтобы подключиться к нашему серверу, потребуется клиент RAGE:MP. Установите его на компьютер и затем запустите",
    cta: "download",
  },
  {
    number: "03",
    illustrationSrc: "/images/howtoplay/step-03.webp",
    illustrationAlt: "Подключиться к серверу Region",
    title: "Подключиться к серверу Region",
    body: "Финальный шаг: введите в поиске лаунчера REGION или скопируйте IP, дождитесь загрузки всех файлов. Готово — вы в игре!",
    cta: "copy",
  },
];

// ---------------------------------------------------------------------------
// StepCard component
// ---------------------------------------------------------------------------
function StepCardItem({ step, offset }: { step: StepCard; offset?: boolean }) {
  return (
    <article
      aria-label={`Шаг ${step.number}: ${step.title}`}
      className={[
        "relative flex w-full flex-col overflow-hidden rounded-[20px]",
        "lg:w-[526px] lg:h-[643px]",
        "ring-1 ring-[#504c6c]/60",
        offset ? "lg:mt-[112px]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(80,76,108,0.6) 0%, transparent 70%), radial-gradient(ellipse at 100% 100%, rgba(255,40,48,0.4) 0%, transparent 70%)",
      }}
    >
      {/* Illustration */}
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

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5 lg:gap-4 lg:px-[30px] lg:py-[30px]">
        {/* Badge + title on same line */}
        <div className="flex items-start gap-3">
          {/* Step badge */}
          <div
            aria-hidden="true"
            className="flex shrink-0 items-center justify-center rounded-[15px] h-[52px] w-[69px] lg:rounded-[20px] lg:h-[69px] lg:w-[91px]"
            style={{
              background:
                "radial-gradient(ellipse at bottom, rgba(255,40,48,0.6) 0%, transparent 85%)",
              border: "1px solid transparent",
              boxShadow: "inset 0 0 0 1px rgba(255,40,48,0.4)",
            }}
          >
            <span className="text-[32px] font-bold leading-none text-white lg:text-[47px]">
              {step.number}
            </span>
          </div>

          {/* Step title */}
          <h3 className="pt-1 text-[20px] font-bold leading-[1.2] text-white lg:text-[28px]">
            {step.title}
          </h3>
        </div>

        {/* Step body */}
        <p className="text-[16px] font-medium leading-[1.4] text-white lg:text-[20px]">
          {step.body}
        </p>

        {/* Platform icons — card 1 only */}
        {step.number === "01" && (
          <div className="flex gap-[10px]">
            <PlatformIcon>
              <RegionLogo />
            </PlatformIcon>
            <PlatformIcon>
              <SteamLogo />
            </PlatformIcon>
            <PlatformIcon>
              <EpicGamesLogo />
            </PlatformIcon>
          </div>
        )}

        {/* CTA buttons */}
        {step.cta === "download" && (
          <CardButton href="https://rage.mp">
            <DownloadIcon />
            СКАЧАТЬ
          </CardButton>
        )}

        {step.cta === "copy" && <CopyIPButton />}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// HowToPlay — section (Server Component)
// ---------------------------------------------------------------------------
export function HowToPlay() {
  return (
    <section
      id="howtoplay"
      aria-labelledby="howtoplay-heading"
      className="relative w-full overflow-hidden bg-bg px-4 py-16 md:px-12 md:py-24 lg:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 md:gap-14 lg:h-[1141px] lg:gap-0 lg:pt-[100px]">
        {/* Heading row */}
        <header className="grid gap-6 lg:grid-cols-[1fr_538px] lg:items-start">
          {/* H2 with "играть" in red */}
          <h2
            id="howtoplay-heading"
            className="text-center text-[48px] font-extrabold leading-none text-white lg:text-left lg:text-[100px]"
          >
            Как начать{" "}
            <span className="text-accent">играть</span>?
          </h2>

          {/* Sub-copy card with diamond pattern overlay */}
          <div
            className="relative overflow-hidden rounded-[20px] p-[30px] lg:min-h-[142px] lg:max-w-[538px]"
            style={{
              background:
                "radial-gradient(ellipse at bottom, rgba(255,40,48,0.6) 0%, transparent 70%), #111117",
            }}
          >
            {/* Diamond pattern — OVERLAY blend mode at 60% opacity */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage: "url('/images/diamond-pattern.svg')",
                backgroundRepeat: "repeat",
                backgroundSize: "16px 16px",
                mixBlendMode: "overlay",
              }}
            />
            <p className="relative text-[16px] font-medium leading-[1.4] text-white lg:text-[20px]">
              Выполните три простых шага&#160; и наслаждайтесь игрой на сервере
              Region в мире GTA 5 RP
            </p>
          </div>
        </header>

        {/* Step cards */}
        <div className="grid grid-cols-1 gap-6 lg:mt-[86px] lg:grid-cols-3 lg:items-start lg:gap-5">
          <StepCardItem step={STEPS[0]} />
          <StepCardItem step={STEPS[1]} offset />
          <StepCardItem step={STEPS[2]} />
        </div>
      </div>
    </section>
  );
}
