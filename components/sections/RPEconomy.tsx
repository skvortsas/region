import Image from "next/image";

interface FeatureItem {
  icon: string;
  text: string;
}

interface EconomyPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}

const ACCENT_COPY =
  "Модели зданий Банков, отелей, больниц и другой колоритной тематической недвижимости";

const FEATURES: FeatureItem[] = [
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

function FeatureItem({ icon, text }: FeatureItem) {
  return (
    <article className="relative min-h-[186px] rounded-card bg-[radial-gradient(circle_at_0%_50%,color-mix(in_srgb,var(--color-accent)_34%,transparent),transparent_58%),var(--gradient-surface)] p-[30px] pl-[108px] lg:w-[439px] lg:bg-transparent lg:p-0 lg:pl-[30px]">
      <Image
        src={icon}
        alt=""
        width={58}
        height={58}
        aria-hidden="true"
        className="absolute left-[30px] top-[30px] h-[58px] w-[58px] lg:left-0 lg:top-16"
      />

      <div className="lg:h-[186px] lg:w-[409px] lg:rounded-card lg:bg-[radial-gradient(circle_at_0%_50%,color-mix(in_srgb,var(--color-accent)_60%,transparent),transparent_58%),var(--gradient-surface)] lg:px-[35px] lg:py-[34px]">
        <p className="text-body font-medium leading-[1.4] text-white">{text}</p>
      </div>
    </article>
  );
}

function EconomyPhoto({ src, alt, width, height, sizes }: EconomyPhoto) {
  return (
    <div className="overflow-hidden rounded-card bg-surface ring-1 ring-purple/70">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

export function RPEconomy() {
  return (
    <section
      id="info"
      aria-labelledby="rp-economy-heading"
      className="relative w-full bg-bg px-4 py-16 md:px-12 md:py-24 lg:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 md:gap-14 lg:h-[895px] lg:gap-[100px]">
        <header className="grid gap-6 lg:h-[170px] lg:grid-cols-[1fr_348px] lg:items-start">
          <h2
            id="rp-economy-heading"
            className="max-w-[1252px] text-display-mobile font-extrabold leading-none text-white lg:text-display"
          >
            Продуманная система RP и экономика
          </h2>

          <div className="rounded-card bg-[radial-gradient(circle_at_50%_100%,color-mix(in_srgb,var(--color-accent)_48%,transparent),transparent_70%)] p-[30px] lg:min-h-[166px]">
            <p className="text-body font-medium leading-[1.4] text-white">
              {ACCENT_COPY}
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[898px_682px] lg:gap-10">
          <div className="grid gap-6 lg:gap-10">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[439px_439px] lg:gap-5">
              {FEATURES.map((feature) => (
                <FeatureItem key={feature.text} {...feature} />
              ))}
            </div>

            <EconomyPhoto {...PHOTOS[1]} />
          </div>

          <div>
            <EconomyPhoto {...PHOTOS[0]} />
          </div>
        </div>
      </div>
    </section>
  );
}
