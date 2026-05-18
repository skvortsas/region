import Image from "next/image";

const COPY =
  "Это мир, где ты не просто играешь, а выстраиваешь свою стратегию и зарабатываешь";

interface Prop {
  src: string;
  /** 1× export dimensions (aspect ratio + next/image intrinsic size) */
  w: number;
  h: number;
  /** Absolute wrapper: % of section box so props scale with container */
  wrapper: string;
  sizes: string;
}

const PROPS: Prop[] = [
  {
    src: "/images/props/prop-star.png",
    w: 240,
    h: 240,
    wrapper: "absolute left-[90px] top-0 w-[12.5%]",
    sizes: "(max-width: 1920px) 12.5vw, 240px",
  },
  {
    src: "/images/props/prop-money.png",
    w: 577,
    h: 577,
    wrapper: "absolute left-0 top-40 w-[30.0521%]",
    sizes: "(max-width: 1920px) 30.05vw, 577px",
  },
  {
    src: "/images/props/prop-grenade.png",
    w: 270,
    h: 245,
    wrapper: "absolute left-[82.5521%] top-[8.4211%] w-[14.0625%]",
    sizes: "(max-width: 1920px) 14.06vw, 270px",
  },
  {
    src: "/images/props/prop-balaclava.png",
    w: 553,
    h: 553,
    wrapper: "absolute left-[66.0417%] top-40 w-[28.8021%]",
    sizes: "(max-width: 1920px) 28.8vw, 553px",
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
        {PROPS.map(({ src, w, h, wrapper, sizes }) => (
          <div className="relative z-1" key={src}>
            <div className={wrapper}>
              <Image
                src={src}
                alt=""
                width={w}
                height={h}
                loading="lazy"
                aria-hidden="true"
                sizes={sizes}
                className="pointer-events-none h-auto w-full select-none"
              />
            </div>
          </div>
        ))}

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
