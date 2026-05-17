import Image from "next/image";

const COPY =
  "Это мир, где ты не просто играешь, а выстраиваешь свою стратегию и зарабатываешь";

interface Prop {
  src: string;
  /** 1× logical dimensions — desktop (1920px layout) */
  desktopW: number;
  desktopH: number;
  /** Tailwind classes for the wrapper — shown only at min-[1920px] */
  desktopWrapper: string;
  /** 1× logical dimensions — mobile/tablet (<1920px) */
  mobileW: number;
  mobileH: number;
  /** Tailwind classes for the wrapper — shown below 1920px */
  mobileWrapper: string;
}

const PROPS: Prop[] = [
  {
    src: "/images/props/prop-star.png",
    desktopW: 240,
    desktopH: 240,
    desktopWrapper: "max-[1919px]:hidden absolute left-[91px] top-0",
    mobileW: 94,
    mobileH: 94,
    mobileWrapper: "min-[1920px]:hidden absolute left-[6px] top-0",
  },
  {
    src: "/images/props/prop-money.png",
    desktopW: 577,
    desktopH: 577,
    desktopWrapper: "max-[1919px]:hidden absolute left-[11px] top-[116px]",
    mobileW: 179,
    mobileH: 179,
    mobileWrapper: "min-[1920px]:hidden absolute left-[-14px] top-[146px]",
  },
  {
    src: "/images/props/prop-grenade.png",
    desktopW: 270,
    desktopH: 245,
    desktopWrapper: "max-[1919px]:hidden absolute left-[1585px] top-[48px]",
    mobileW: 75,
    mobileH: 68,
    mobileWrapper: "min-[1920px]:hidden absolute left-[345px] top-[14px]",
  },
  {
    src: "/images/props/prop-balaclava.png",
    desktopW: 553,
    desktopH: 553,
    desktopWrapper: "max-[1919px]:hidden absolute left-[1268px] top-[170px]",
    mobileW: 159,
    mobileH: 159,
    mobileWrapper: "min-[1920px]:hidden absolute left-[302px] top-[157px]",
  },
];

export function Tagline() {
  return (
    // Figma 170:552
    <section
      aria-label="Девиз Region RP"
      className="relative w-full overflow-visible bg-bg"
    >
      {/* 1920-wide inner container keeps absolute props anchored to Figma coords */}
      <div className="relative mx-auto w-full max-w-[1920px] min-h-[360px] overflow-visible lg:min-h-[570px]">
        {PROPS.map(
          ({
            src,
            desktopW,
            desktopH,
            desktopWrapper,
            mobileW,
            mobileH,
            mobileWrapper,
          }) => (
            <div className="relative z-1" key={src}>
              <div className={desktopWrapper}>
                <Image
                  src={src}
                  alt=""
                  width={desktopW}
                  height={desktopH}
                  loading="lazy"
                  aria-hidden="true"
                  className="pointer-events-none select-none"
                />
              </div>
              <div className={mobileWrapper}>
                <Image
                  src={src}
                  alt=""
                  width={mobileW}
                  height={mobileH}
                  loading="lazy"
                  aria-hidden="true"
                  className="pointer-events-none select-none"
                />
              </div>
            </div>
          ),
        )}

        {/* Centred tagline text */}
        <div className="relative flex min-h-[360px] items-start justify-center px-5 pt-[60px] lg:min-h-[570px] lg:px-[150px] lg:pt-[100px]">
          <p className="max-w-[400px] text-center text-h2 font-extrabold leading-none text-white lg:max-w-[1620px] lg:text-display">
            {COPY}
          </p>
        </div>
      </div>
    </section>
  );
}
