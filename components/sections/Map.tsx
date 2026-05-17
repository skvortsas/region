"use client";

import Image from "next/image";
import { useState } from "react";

type CityKey =
  | "lakhta"
  | "spalny"
  | "strelka"
  | "marble"
  | "palace"
  | "isaak"
  | "medny"
  | "gollandia"
  | "pyramid"
  | "frunze"
  | "ladya"
  | "saturn"
  | "underground"
  | "construction"
  | "shopping";

type RegionKey = "spb" | "tolyatti" | "soon";

interface City {
  id: CityKey;
  name: string;
  address: string;
  description: string;
  screenshot: string;
}

interface Region {
  id: RegionKey;
  name: string;
  locations: City[];
  miniMap: string;
}

const REGIONS: Region[] = [
  {
    id: "spb",
    name: "Санкт-Петербург",
    miniMap: "/images/map/saint-petersburg-region-map.webp",
    locations: [
      {
        id: "lakhta",
        name: "Лахта центр",
        address: "ул.. Высотная, 1",
        description:
          "Многофункциональный комплекс, расположенный на берегу Финского залива в Приморском районе Санкт-Петербурга. Является центральным офисом компании Газпром",
        screenshot: "/images/map/saint-petersburg-lakhta-center.webp",
      },
      {
        id: "spalny",
        name: "Спальный район В.О.",
        address: "жилые кварталы Василеостровского района",
        description:
          "Наша задача сделать город — разносторонним, именно поэтому мы добавляем сюда различные по наполнению и атмосфере локации, при этом что не противоречит главному городу прототипу",
        screenshot:
          "/images/map/saint-petersburg-vasileostrovsky-district.webp",
      },
      {
        id: "strelka",
        name: "Стрелка Васильевского острова",
        address: "район Биржевой площади (восточная оконечность В.О.)",
        description:
          "Мыс на восточной оконечности Васильевского острова в Санкт-Петербурге, омываемый Большой Невой и Малой Невой; один из самых известных архитектурных ансамблей города; пример гармонии архитектуры города с пейзажем берегов Невы",
        screenshot: "/images/map/saint-petersburg-strelka-vo.webp",
      },
      {
        id: "marble",
        name: "Мраморный дворец МВД",
        address: "ул.. Миллионная, 5/1",
        description:
          "Мы не просто перенесли дворец, а ещё и напитали место мистикой, пасхалки и интереснейшим фкнционалом, с отсылкой на реальную экранизацию, что позволит с интересом открывать нашу карту с новых ракурсов",
        screenshot: "/images/map/saint-petersburg-marble-palace-mvd.webp",
      },
      {
        id: "palace",
        name: "Дворцовая площадь",
        address: "Дворцовая пл.",
        description:
          "Главная площадь Санкт-Петербурга, архитектурный ансамбль, возникший во второй половине XVIII — первой половине XIX века",
        screenshot: "/images/map/saint-petersburg-palace-square.webp",
      },
      {
        id: "isaak",
        name: "Исаакиевская площадь",
        address: "Исаакиевская пл.",
        description:
          "Площадь в Адмиралтейском муниципальном округе Адмиралтейского района Санкт-Петербурга. С севера ограничена Адмиралтейским проспектом, с юга — Мариинским дворцом",
        screenshot: "/images/map/saint-petersburg-isaak-square.webp",
      },
      {
        id: "medny",
        name: "Медный всадник",
        address: "Сенатская площадь",
        description:
          "Монументальный конный памятник первому российскому императору Петру Великому, созданный в 1768–1778 годах под руководством французского скульптора Этьена Мориса Фальконе",
        screenshot: "/images/map/saint-petersburg-bronze-horseman.webp",
      },
      {
        id: "gollandia",
        name: "Новая Голландия",
        address: "наб. Адмиралтейского канала, 2",
        description:
          "Остров в Адмиралтейском районе Санкт-Петербурга, ограниченный рекой Мойкой, Крюковым и Адмиралтейским каналами. Кроме того, Новая Голландия — один из старейших утилитарных ансамблей города",
        screenshot: "/images/map/saint-petersburg-new-holland.webp",
      },
    ],
  },
  {
    id: "tolyatti",
    name: "Тольятти",
    miniMap: "/images/map/tolyatti-region-map.webp",
    locations: [
      {
        id: "pyramid",
        name: "Рынок Пирамида",
        address: "Автозаводский район",
        description:
          "Большой бу-рынок «Пирамида» в Автозаводском районе Тольятти известен хаотичной атмосферой торга, где можно найти подделки брендовой одежды и обуви по бросовым ценам, а также свежие продукты от местных фермеров",
        screenshot: "/images/map/tolyatti-pyramid-market.webp",
      },
      {
        id: "frunze",
        name: "ЖК Фрунзе",
        address: "ул. Фрунзе",
        description:
          "ЖК на улице Фрунзе выделяются близостью к деловому центру «Плаза» и университету с бассейном, что делает их удобными для семей с детьми и студентов; дома строятся современные, но район шумный из-за трассы и недалеко от Волги",
        screenshot: "/images/map/tolyatti-frunze-residential.webp",
      },
      {
        id: "ladya",
        name: "Автозавод Ладья",
        address: "Южное шоссе, 36",
        description:
          "Автозавод «Ладья» в Тольятти — это крупнейший российский производитель легковых автомобилей. Основан в 1966 году по постановлению правительства СССР, с первой «копейкой» (ВАЗ-2101) в 1970-м; за историю выпущено свыше 30 млн машин",
        screenshot: "/images/map/tolyatti-ladya-autoplant.webp",
      },
      {
        id: "saturn",
        name: "Кинотеатр Сатурн",
        address: "ул. Революционная",
        description:
          "«Сатурн» на Революционной был одним из старейших в городе с уютными залами и дешевыми билетами в 90-е–2000-е; сейчас заброшен, привлекает урбанистов и вандалов для фото, а внутри сохранились советские плакаты и обшарпанные кресла",
        screenshot: "/images/map/tolyatti-saturn-cinema.webp",
      },
      {
        id: "underground",
        name: "Подземный город",
        address: "Автозаводский район",
        description:
          "Заброшенные подземные переходы Тольятти (особенно у «Пирамиды») — лабиринт из 1980-х с граффити, лужами и эхом шагов; они соединяли районы, но теперь опасны из-за крыс, обвалов, став местом для экстремальных прогулок",
        screenshot: "/images/map/tolyatti-underground-city.webp",
      },
      {
        id: "construction",
        name: "Стройка",
        address: "г. Тольятти",
        description:
          "Стройплощадки Тольятти фокусируются на многоэтажках и дорогах (развязки до 2033 г.); особенности — сезонные простои зимой, пыль от газобетона и пробки вокруг, но новые ЖК обещают смарт-дом системы и зеленые зоны",
        screenshot: "/images/map/tolyatti-construction-site.webp",
      },
      {
        id: "shopping",
        name: "Торговые центры",
        address: "г. Тольятти",
        description:
          "Торговые центры Тольятти варьируются от крупных торгово-развлекательных комплексов площадью до 80 тыс. кв. м с гипермаркетами и кинотеатрами до компактных районных объектов с бутиками и фудкортами",
        screenshot: "/images/map/tolyatti-shopping-centers.webp",
      },
    ],
  },
  {
    id: "soon",
    name: "Скоро",
    miniMap: "/images/map/coming-soon-region-map.webp",
    locations: [],
  },
];
const ACTIVE_REGION_STYLE =
  "bg-[radial-gradient(ellipse_85%_148%_at_50%_100%,#ff7c81_0%,#ff2830_100%)] [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.9),0_0_36px_rgba(255,40,48,0.28)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[20px] before:bg-[linear-gradient(118deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_42%,rgba(255,255,255,0)_58%)]";
const INACTIVE_REGION_STYLE =
  "bg-[radial-gradient(ellipse_86%_148%_at_50%_100%,rgba(80,76,108,0.6)_0%,rgba(80,76,108,0)_100%)] [box-shadow:inset_0_0_0_1px_rgba(80,76,108,0.65)]";
const ACTIVE_CITY_STYLE =
  "bg-[radial-gradient(ellipse_76.5%_197.65%_at_0%_50%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)]";

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M11 2C7.14 2 4 5.14 4 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 11 6.5a2.5 2.5 0 0 1 0 5Z"
        fill="#ff2830"
      />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path
        d="m6 3 5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RegionTabs({
  activeRegionId,
  onSelect,
}: {
  activeRegionId: RegionKey;
  onSelect: (regionId: RegionKey) => void;
}) {
  return (
    <div
      className="grid h-[34px] grid-cols-[154px_154px_92px] overflow-visible min-[900px]:h-[92px] min-[900px]:grid-cols-3"
      role="tablist"
      aria-label="Регионы карты"
    >
      {REGIONS.map((region) => {
        const isActive = region.id === activeRegionId;
        const isDisabled = region.locations.length === 0;

        return (
          <button
            key={region.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={isDisabled}
            onClick={() => onSelect(region.id)}
            className={[
              "relative flex min-w-0 items-center justify-center overflow-hidden rounded-t-[20px] border border-transparent px-3 text-[10px] font-bold leading-[1.2] text-white transition-opacity min-[900px]:px-5 min-[900px]:text-[28px]",
              isActive ? ACTIVE_REGION_STYLE : INACTIVE_REGION_STYLE,
              isDisabled ? "cursor-not-allowed opacity-85" : "hover:opacity-90",
            ].join(" ")}
          >
            <span className="relative z-10 truncate">{region.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function CityButton({
  city,
  isActive,
  onClick,
  mobile = false,
}: {
  city: City;
  isActive: boolean;
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        "group relative flex shrink-0 items-center overflow-hidden rounded-[20px] text-left text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        mobile
          ? "h-[66px] gap-2 px-[22px] text-[18px] font-medium leading-[1.2]"
          : "min-h-[94px] w-full gap-2 px-9 py-5 text-[28px] font-medium leading-[1.2]",
        isActive ? ACTIVE_CITY_STYLE : "hover:bg-white/3",
      ].join(" ")}
    >
      {isActive ? (
        <PinIcon className="relative z-10 shrink-0 text-white" />
      ) : (
        <span
          className="relative z-10 h-[22px] w-[22px] shrink-0"
          aria-hidden="true"
        />
      )}
      <span
        className={
          mobile ? "relative z-10 whitespace-nowrap" : "relative z-10 min-w-0"
        }
      >
        {city.name}
      </span>
    </button>
  );
}

function Screenshot({
  city,
  mobile = false,
}: {
  city: City;
  mobile?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden bg-surface [box-shadow:inset_0_0_0_1px_rgba(80,76,108,0.65)]",
        mobile ? "h-[224px] w-full" : "h-[469px] w-full",
      ].join(" ")}
    >
      <Image
        src={city.screenshot}
        alt={`Скриншот локации: ${city.name}`}
        fill
        sizes={
          mobile ? "400px" : "(min-width: 1620px) 1082px, calc(100vw - 586px)"
        }
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
}

function InfoPanel({
  city,
  miniMap,
  regionName,
  mobile = false,
}: {
  city: City;
  miniMap: string;
  regionName: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={[
        "grid overflow-hidden bg-bg [box-shadow:inset_0_0_0_1px_rgba(80,76,108,0.65)]",
        mobile
          ? "h-[161px] grid-cols-[1fr_115px]"
          : "h-[224px] grid-cols-[1fr_413px]",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-col justify-center text-[#6e6b78]",
          mobile
            ? "px-5 text-[6px] font-medium leading-[1.4]"
            : "px-[50px] text-[16px] font-medium leading-[1.4]",
        ].join(" ")}
      >
        <p>{city.address}</p>
        <p>{city.description}</p>
      </div>

      <div className="relative overflow-hidden [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.8)]">
        <Image
          src={miniMap}
          alt={`Карта региона ${regionName} с отмеченными локациями Region RP`}
          fill
          sizes={mobile ? "115px" : "413px"}
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function Map() {
  const [activeRegionId, setActiveRegionId] = useState<RegionKey>("spb");
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const activeRegion =
    REGIONS.find((region) => region.id === activeRegionId) ?? REGIONS[0];
  const activeCity =
    activeRegion.locations[activeCityIndex] ?? activeRegion.locations[0];

  if (!activeCity) {
    return null;
  }

  const handleRegionSelect = (regionId: RegionKey) => {
    const nextRegion = REGIONS.find((region) => region.id === regionId);

    if (!nextRegion || nextRegion.locations.length === 0) {
      return;
    }

    setActiveRegionId(regionId);
    setActiveCityIndex(0);
  };

  const showPrevCity = () => {
    setActiveCityIndex((index) =>
      index === 0 ? activeRegion.locations.length - 1 : index - 1,
    );
  };

  const showNextCity = () => {
    setActiveCityIndex((index) =>
      index === activeRegion.locations.length - 1 ? 0 : index + 1,
    );
  };

  return (
    <section
      id="map"
      aria-labelledby="map-heading"
      className="relative w-full bg-bg px-5 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 min-[900px]:gap-14">
        <header className="flex flex-col items-center gap-5 text-center min-[900px]:items-start min-[900px]:gap-6 min-[900px]:text-left">
          <h2
            id="map-heading"
            className="max-w-[920px] text-[32px] font-extrabold leading-none text-white min-[900px]:text-display"
          >
            Карта Ленинградской области и регионов
          </h2>
          <div className="rounded-[20px] bg-[radial-gradient(ellipse_85%_136%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] px-5 py-5 min-[900px]:rounded-none min-[900px]:bg-none min-[900px]:p-0">
            <p className="max-w-[360px] text-center text-[16px] font-medium leading-[1.4] text-white min-[900px]:max-w-3xl min-[900px]:text-left min-[900px]:text-body min-[900px]:text-text-secondary">
              Десятки самых знаковых мест и сотни архитектурных объектов Питера
              и области
            </p>
          </div>
        </header>

        <div className="hidden grid-cols-[488px_1fr] gap-[50px] min-[900px]:grid">
          <nav aria-label={`Локации региона ${activeRegion.name}`}>
            <ul className="flex flex-col">
              {activeRegion.locations.map((city, index) => (
                <li key={city.id}>
                  <CityButton
                    city={city}
                    isActive={index === activeCityIndex}
                    onClick={() => setActiveCityIndex(index)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex w-full flex-col">
            <RegionTabs
              activeRegionId={activeRegion.id}
              onSelect={handleRegionSelect}
            />
            <Screenshot city={activeCity} />
            <InfoPanel
              city={activeCity}
              miniMap={activeRegion.miniMap}
              regionName={activeRegion.name}
            />
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[420px] flex-col min-[900px]:hidden">
          <div className="mx-auto flex w-full max-w-[400px] flex-col">
            <RegionTabs
              activeRegionId={activeRegion.id}
              onSelect={handleRegionSelect}
            />
            <Screenshot city={activeCity} mobile />
            <InfoPanel
              city={activeCity}
              miniMap={activeRegion.miniMap}
              regionName={activeRegion.name}
              mobile
            />
          </div>

          <div
            className="mt-2 w-full max-w-full overflow-x-auto overscroll-x-contain"
            aria-label={`Локации региона ${activeRegion.name}`}
          >
            <div className="flex w-max min-w-full">
              {activeRegion.locations.map((city, index) => (
                <CityButton
                  key={city.id}
                  city={city}
                  isActive={index === activeCityIndex}
                  onClick={() => setActiveCityIndex(index)}
                  mobile
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={showPrevCity}
            aria-label="Предыдущая локация"
            className="absolute left-[-15px] bottom-[-68px] flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(ellipse_113%_115%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] text-accent-light [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowIcon direction="left" />
          </button>

          <button
            type="button"
            onClick={showNextCity}
            aria-label="Следующая локация"
            className="absolute right-[-10px] bottom-[15px] flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(ellipse_113%_115%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] text-accent-light [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
