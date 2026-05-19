import Image from "next/image";

interface FeatureItemData {
  icon: string;
  text: string;
}

interface EconomyPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
}

const ACCENT_COPY =
  "Модели зданий Банков, отелей, больниц и другой колоритной тематической недвижимости";

const FEATURES: FeatureItemData[] = [
  {
    icon: "/images/rp-economy-icon-wallet.svg",
    text: "Детализированная система RP и живая экономика, где всё взаимосвязано — от работы \u2028и заработка до транспорта, недвижимости и фракций",
  },
  {
    icon: "/images/rp-economy-icon-id.svg",
    text: "Продуманные механики \u2028и баланс внутри каждой профессии создают честную конкуренцию и позволяют развиваться в удобном темпе",
  },
];

const PHOTOS: EconomyPhoto[] = [
  {
    src: "/images/rp-photo-1.webp",
    alt: "Игровой вид на здание в Region RP",
    width: 682,
    height: 625,
    sizes: "(max-width: 1024px) 100vw, 682px",
  },
  {
    src: "/images/rp-photo-2.webp",
    alt: "Игровой вид на городскую улицу в Region RP",
    width: 898,
    height: 395,
    sizes: "(max-width: 1024px) 100vw, 898px",
  },
];

function FeatureItem({
  icon,
  text,
  className,
}: FeatureItemData & { className?: string }) {
  return (
    <article
      className={`relative min-h-[186px] lg:h-[186px] lg:w-[439px] ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-full lg:-translate-y-1/2 z-10 h-[58px] w-[58px]"
      >
        <span className="absolute inset-0 -z-10 rounded-card bg-accent/60 blur-2xl" />
        <Image
          src={icon}
          alt=""
          width={58}
          height={58}
          className="h-[58px] w-[58px]"
        />
      </div>

      <div className="relative overflow-hidden rounded-card bg-[radial-gradient(ellipse_35%_75%_at_-3%_50%,rgba(255,40,48,0.36),rgba(255,40,48,0)_100%),linear-gradient(to_bottom,rgba(14,14,15,0.5),rgba(17,17,23,0.5))] p-[30px] ml-[30px] lg:w-[409px] px-[35px] py-[20px] pl-[35px]">
        <p className="text-body font-medium leading-[1.4] text-white">{text}</p>
      </div>
    </article>
  );
}

function EconomyPhoto({
  src,
  alt,
  width,
  height,
  sizes,
  className,
}: EconomyPhoto) {
  return (
    <div
      className={`rounded-card bg-surface ring-1 ring-purple/70 ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        className="h-full w-full object-cover rounded-card"
      />
    </div>
  );
}

export function RPEconomy() {
  return (
    <section
      id="info"
      aria-labelledby="rp-economy-heading"
      className="relative w-full bg-bg px-4 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 md:gap-14 lg:gap-[100px]">
        <header className="flex flex-col gap-6 items-center xl:justify-between xl:flex-row xl:items-start">
          <h2
            id="rp-economy-heading"
            className="order-1 max-w-[1252px] text-display-mobile font-extrabold leading-none text-white lg:order-0 lg:text-display"
          >
            Продуманная система RP и экономика
          </h2>

          <div className="xl:max-w-[348px] order-2 relative rounded-card bg-[radial-gradient(ellipse_68%_137%_at_50%_100%,rgba(255,40,48,0.6),rgba(255,40,48,0)_100%),linear-gradient(to_bottom,#0e0e0f,#111117)] p-[30px] before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/images/diamond-pattern.svg')] before:bg-size-[16px_16px] before:bg-repeat before:opacity-60 before:mix-blend-overlay lg:order-0 l§g:min-h-[166px]">
            <p className="relative text-body font-medium leading-[1.4] text-white">
              {ACCENT_COPY}
            </p>
          </div>
        </header>

        <div className="contents lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="contents lg:flex lg:flex-col lg:gap-10">
            <div className="contents lg:grid lg:grid-cols-[439px_439px] lg:gap-5">
              <FeatureItem {...FEATURES[0]} className="order-4 lg:order-0" />
              <FeatureItem {...FEATURES[1]} className="order-6 lg:order-0" />
            </div>

            <EconomyPhoto
              {...PHOTOS[1]}
              className="order-5 aspect-400/429 w-full lg:order-0 lg:aspect-auto lg:h-[395px]"
            />
          </div>

          <EconomyPhoto
            {...PHOTOS[0]}
            className="order-3 aspect-400/429 w-full lg:order-0 lg:aspect-auto lg:h-[625px]"
          />
        </div>
      </div>
    </section>
  );
}
