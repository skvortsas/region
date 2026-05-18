import Image from "next/image";

interface CarStat {
  kind: "name" | "stat";
  label: string;
  value: string;
}

interface Car {
  name: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  stats: CarStat[];
}

const CARS: Car[] = [
  {
    name: "Ferrari 488 GTB",
    image: {
      src: "/images/cars/ferrari-488-gtb.png",
      width: 1600,
      height: 896,
      alt: "Ferrari 488 GTB",
    },
    stats: [
      { kind: "name", value: "Ferrari 488 GTB", label: "Суперкар · Класс S" },
      { kind: "stat", value: "330км/ч", label: "Макс. скорость" },
      { kind: "stat", value: "3.0с", label: "Разгон 0-100" },
      { kind: "stat", value: "100%", label: "Кастомизация" },
    ],
  },
  {
    name: "Audi RS7",
    image: {
      src: "/images/cars/audi-rs7.png",
      width: 1600,
      height: 896,
      alt: "Audi RS7",
    },
    stats: [
      { kind: "name", value: "Audi RS7", label: "Спорт · Класс A" },
      { kind: "stat", value: "300км/ч", label: "Макс. скорость" },
      { kind: "stat", value: "3.4с", label: "Разгон 0-100" },
      { kind: "stat", value: "100%", label: "Кастомизация" },
    ],
  },
];

function StatBadge({ label, value }: CarStat) {
  return (
    <div className="rounded-card px-3 py-4 md:px-5 lg:flex lg:flex-col lg:justify-center">
      <span className="block text-[12px] font-bold leading-[1.2] text-white md:text-[24px]">
        {value}
      </span>
      <span className="mt-1 block text-[8px] font-medium leading-[1.2] text-white md:text-[16px]">
        {label}
      </span>
    </div>
  );
}

function CarCard({ car }: { car: Car }) {
  return (
    <article
      aria-label={car.name}
      className="relative flex w-full max-w-[800px] flex-col overflow-hidden rounded-card bg-gradient-surface shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
    >
      <div className="relative h-auto aspect-[800/448] w-full lg:h-[448px] lg:aspect-auto">
        <Image
          src={car.image.src}
          alt={car.image.alt}
          width={car.image.width}
          height={car.image.height}
          sizes="(max-width: 900px) 100vw, 800px"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 grid grid-cols-[1.5fr_1fr_1fr_1fr] lg:grid-cols-[268px_177px_178px_177px]">
        {car.stats.map((stat) => (
          <div
            key={`${car.name}-${stat.label}`}
            className={
              stat.kind === "name"
                ? "relative overflow-hidden rounded-t-none rounded-bl-card rounded-br-none border border-[rgba(255,40,48,0.3)] bg-[radial-gradient(ellipse_110%_147%_at_50%_100%,rgba(255,40,48,0.6),rgba(255,40,48,0)_100%),linear-gradient(to_bottom,#0e0e0f,#111117)] before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/images/diamond-pattern.svg')] before:bg-[length:16px_16px] before:bg-repeat before:opacity-60 before:mix-blend-overlay"
                : "rounded-none border border-[rgba(80,76,108,0.3)] bg-[radial-gradient(ellipse_109%_147%_at_50%_100%,rgba(80,76,108,0.6),rgba(80,76,108,0)_100%),linear-gradient(to_bottom,#0e0e0f,#111117)] last:rounded-br-card"
            }
          >
            <StatBadge kind={stat.kind} label={stat.label} value={stat.value} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function Cars() {
  return (
    <section
      aria-labelledby="cars-heading"
      className="relative w-full bg-bg px-4 py-16 md:px-12 md:py-24 lg:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col">
        <header className="flex flex-col gap-6 justify-between lg:flex-row lg:items-start">
          <h2
            id="cars-heading"
            className="mx-auto max-w-[907px] text-center text-[3.375rem] font-extrabold leading-none text-white lg:mx-0 lg:text-left lg:text-display"
          >
            Собери свой <span className="text-[#FF5157]">автопарк</span> мечты
          </h2>
          <div className="relative overflow-hidden rounded-card border border-[rgba(255,40,48,0.3)] bg-[radial-gradient(ellipse_68%_137%_at_50%_100%,rgba(255,40,48,0.6),rgba(255,40,48,0)_100%),linear-gradient(to_bottom,#0e0e0f,#111117)] p-6 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/images/diamond-pattern.svg')] before:bg-[length:16px_16px] before:bg-repeat before:opacity-60 before:mix-blend-overlay md:p-8 lg:min-h-[166px] lg:max-w-[679px] lg:p-[34px]">
            <p className="mx-auto max-w-[451px] text-center text-body font-medium leading-[1.4] text-white lg:mx-0 lg:text-left">
              Больше 200 реальных авто – собери автопарк, который отражает тебя
              и твой стиль игры. Широкий выбор деталей для кастомизации и
              тюнинга машины
            </p>
          </div>
        </header>

        <div className="mt-10 flex flex-wrap w-full justify-center gap-5 md:mt-14 xl:mt-[100px]">
          {CARS.map((car) => (
            <CarCard key={car.name} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
