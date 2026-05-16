import Image from 'next/image'

interface CarStat {
  kind: 'name' | 'stat'
  label: string
  value: string
}

interface Car {
  name: string
  image: {
    src: string
    width: number
    height: number
    alt: string
  }
  stats: CarStat[]
}

const CARS: Car[] = [
  {
    name: 'Ferrari 488 GTB',
    image: {
      src: '/images/cars/ferrari-488-gtb.png',
      width: 1600,
      height: 896,
      alt: 'Ferrari 488 GTB',
    },
    stats: [
      { kind: 'name', value: 'Ferrari 488 GTB', label: 'Суперкар · Класс S' },
      { kind: 'stat', value: '330км/ч', label: 'Макс. скорость' },
      { kind: 'stat', value: '3.0с', label: 'Разгон 0-100' },
      { kind: 'stat', value: '100%', label: 'Кастомизация' },
    ],
  },
  {
    name: 'Audi RS7',
    image: {
      src: '/images/cars/audi-rs7.png',
      width: 1600,
      height: 896,
      alt: 'Audi RS7',
    },
    stats: [
      { kind: 'name', value: 'Audi RS7', label: 'Спорт · Класс A' },
      { kind: 'stat', value: '300км/ч', label: 'Макс. скорость' },
      { kind: 'stat', value: '3.4с', label: 'Разгон 0-100' },
      { kind: 'stat', value: '100%', label: 'Кастомизация' },
    ],
  },
]

function StatBadge({ label, value }: CarStat) {
  return (
    <div className="rounded-card px-4 py-3 md:px-5 md:py-4 lg:flex lg:h-[105px] lg:flex-col lg:justify-center">
      <span className="block text-[18px] font-bold leading-[1.2] text-white md:text-[24px]">
        {value}
      </span>
      <span className="mt-1 block text-[13px] font-medium leading-[1.2] text-white md:text-[16px]">
        {label}
      </span>
    </div>
  )
}

function CarCard({ car }: { car: Car }) {
  return (
    <article
      aria-label={car.name}
      className="relative flex w-full max-w-[800px] flex-col overflow-hidden rounded-card bg-gradient-surface shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:h-[552px]"
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

      <div className="relative z-10 grid grid-cols-2 gap-2 p-4 md:gap-3 md:p-6 lg:grid-cols-[268px_177px_178px_177px] lg:gap-0 lg:p-0">
        {car.stats.map((stat) => (
          <div
            key={`${car.name}-${stat.label}`}
            className={
              stat.kind === 'name'
                ? 'rounded-card bg-[radial-gradient(circle_at_50%_100%,rgba(255,40,48,0.6),transparent_70%),linear-gradient(to_bottom,#0e0e0f,#111117)] lg:rounded-t-none lg:rounded-bl-card lg:rounded-br-none'
                : 'rounded-card bg-[radial-gradient(circle_at_50%_100%,rgba(80,76,108,0.6),transparent_70%),linear-gradient(to_bottom,#0e0e0f,#111117)] lg:rounded-none last:lg:rounded-br-card'
            }
          >
            <StatBadge kind={stat.kind} label={stat.label} value={stat.value} />
          </div>
        ))}
      </div>
    </article>
  )
}

export function Cars() {
  return (
    <section
      aria-labelledby="cars-heading"
      className="relative w-full bg-bg px-4 py-16 md:px-12 md:py-24 lg:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col lg:h-[822px]">
        <header className="grid gap-6 lg:h-[170px] lg:grid-cols-[1fr_679px] lg:items-start">
          <h2
            id="cars-heading"
            className="max-w-[907px] text-[3.375rem] font-extrabold leading-none text-white lg:text-display"
          >
            Собери свой автопарк мечты
          </h2>
          <div className="rounded-card bg-[radial-gradient(circle_at_0%_100%,rgba(255,40,48,0.42),transparent_62%),linear-gradient(to_bottom,#0e0e0f,#111117)] p-6 md:p-8 lg:min-h-[166px] lg:max-w-[679px] lg:p-[34px]">
            <p className="max-w-[451px] text-body font-medium leading-[1.4] text-white">
              Больше 200 реальных авто – собери автопарк, который отражает тебя и твой стиль
              игры. Широкий выбор деталей для кастомизации и тюнинга машины
            </p>
          </div>
        </header>

        <div className="mt-10 grid w-full grid-cols-1 justify-items-center gap-5 md:mt-14 lg:mt-[100px] lg:grid-cols-[800px_800px] lg:gap-5">
          {CARS.map((car) => (
            <CarCard key={car.name} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
