"use client";

import Image from "next/image";
import type { UIEvent } from "react";
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
  miniMap: string;
}

interface Region {
  id: RegionKey;
  name: string;
  locations: City[];
}

const REGIONS: Region[] = [
  {
    id: "spb",
    name: "Санкт-Петербург",
    locations: [
      {
        id: "lakhta",
        name: "Лахта центр",
        address: "ул.. Высотная, 1",
        description:
          "Многофункциональный комплекс, расположенный на берегу Финского залива в Приморском районе Санкт-Петербурга. Является центральным офисом компании Газпром",
        screenshot: "/images/map/saint-petersburg-lakhta-center.webp",
        miniMap: "/images/map/saint-petersburg-lakhta-center-map.webp",
      },
      {
        id: "spalny",
        name: "Спальный район В.О.",
        address: "жилые кварталы Василеостровского района",
        description:
          "Наша задача сделать город — разносторонним, именно поэтому мы добавляем сюда различные по наполнению и атмосфере локации, при этом что не противоречит главному городу прототипу",
        screenshot:
          "/images/map/saint-petersburg-vasileostrovsky-district.webp",
        miniMap:
          "/images/map/saint-petersburg-vasileostrovsky-district-map.webp",
      },
      {
        id: "strelka",
        name: "Стрелка Васильевского острова",
        address: "район Биржевой площади (восточная оконечность В.О.)",
        description:
          "Мыс на восточной оконечности Васильевского острова в Санкт-Петербурге, омываемый Большой Невой и Малой Невой; один из самых известных архитектурных ансамблей города; пример гармонии архитектуры города с пейзажем берегов Невы",
        screenshot: "/images/map/saint-petersburg-strelka-vo.webp",
        miniMap: "/images/map/saint-petersburg-strelka-vo-map.webp",
      },
      {
        id: "marble",
        name: "Мраморный дворец МВД",
        address: "ул.. Миллионная, 5/1",
        description:
          "Мы не просто перенесли дворец, а ещё и напитали место мистикой, пасхалки и интереснейшим фкнционалом, с отсылкой на реальную экранизацию, что позволит с интересом открывать нашу карту с новых ракурсов",
        screenshot: "/images/map/saint-petersburg-marble-palace-mvd.webp",
        miniMap: "/images/map/saint-petersburg-marble-palace-mvd-map.webp",
      },
      {
        id: "palace",
        name: "Дворцовая площадь",
        address: "Дворцовая пл.",
        description:
          "Главная площадь Санкт-Петербурга, архитектурный ансамбль, возникший во второй половине XVIII — первой половине XIX века",
        screenshot: "/images/map/saint-petersburg-palace-square.webp",
        miniMap: "/images/map/saint-petersburg-palace-square-map.webp",
      },
      {
        id: "isaak",
        name: "Исаакиевская площадь",
        address: "Исаакиевская пл.",
        description:
          "Площадь в Адмиралтейском муниципальном округе Адмиралтейского района Санкт-Петербурга. С севера ограничена Адмиралтейским проспектом, с юга — Мариинским дворцом",
        screenshot: "/images/map/saint-petersburg-isaak-square.webp",
        miniMap: "/images/map/saint-petersburg-isaak-square-map.webp",
      },
      {
        id: "medny",
        name: "Медный всадник",
        address: "Сенатская площадь",
        description:
          "Монументальный конный памятник первому российскому императору Петру Великому, созданный в 1768–1778 годах под руководством французского скульптора Этьена Мориса Фальконе",
        screenshot: "/images/map/saint-petersburg-bronze-horseman.webp",
        miniMap: "/images/map/saint-petersburg-bronze-horseman-map.webp",
      },
      {
        id: "gollandia",
        name: "Новая Голландия",
        address: "наб. Адмиралтейского канала, 2",
        description:
          "Остров в Адмиралтейском районе Санкт-Петербурга, ограниченный рекой Мойкой, Крюковым и Адмиралтейским каналами. Кроме того, Новая Голландия — один из старейших утилитарных ансамблей города",
        screenshot: "/images/map/saint-petersburg-new-holland.webp",
        miniMap: "/images/map/saint-petersburg-new-holland-map.webp",
      },
    ],
  },
  {
    id: "tolyatti",
    name: "Тольятти",
    locations: [
      {
        id: "pyramid",
        name: "Рынок Пирамида",
        address: "Автозаводский район",
        description:
          "Большой бу-рынок «Пирамида» в Автозаводском районе Тольятти известен хаотичной атмосферой торга, где можно найти подделки брендовой одежды и обуви по бросовым ценам, а также свежие продукты от местных фермеров",
        screenshot: "/images/map/tolyatti-pyramid-market.webp",
        miniMap: "/images/map/tolyatti-pyramid-market-map.webp",
      },
      {
        id: "frunze",
        name: "ЖК Фрунзе",
        address: "ул. Фрунзе",
        description:
          "ЖК на улице Фрунзе выделяются близостью к деловому центру «Плаза» и университету с бассейном, что делает их удобными для семей с детьми и студентов; дома строятся современные, но район шумный из-за трассы и недалеко от Волги",
        screenshot: "/images/map/tolyatti-frunze-residential.webp",
        miniMap: "/images/map/tolyatti-frunze-residential-map.webp",
      },
      {
        id: "ladya",
        name: "Автозавод Ладья",
        address: "Южное шоссе, 36",
        description:
          "Автозавод «Ладья» в Тольятти — это крупнейший российский производитель легковых автомобилей. Основан в 1966 году по постановлению правительства СССР, с первой «копейкой» (ВАЗ-2101) в 1970-м; за историю выпущено свыше 30 млн машин",
        screenshot: "/images/map/tolyatti-ladya-autoplant.webp",
        miniMap: "/images/map/tolyatti-ladya-autoplant-map.webp",
      },
      {
        id: "saturn",
        name: "Кинотеатр Сатурн",
        address: "ул. Революционная",
        description:
          "«Сатурн» на Революционной был одним из старейших в городе с уютными залами и дешевыми билетами в 90-е–2000-е; сейчас заброшен, привлекает урбанистов и вандалов для фото, а внутри сохранились советские плакаты и обшарпанные кресла",
        screenshot: "/images/map/tolyatti-saturn-cinema.webp",
        miniMap: "/images/map/tolyatti-saturn-cinema-map.webp",
      },
      {
        id: "underground",
        name: "Подземный город",
        address: "Автозаводский район",
        description:
          "Заброшенные подземные переходы Тольятти (особенно у «Пирамиды») — лабиринт из 1980-х с граффити, лужами и эхом шагов; они соединяли районы, но теперь опасны из-за крыс, обвалов, став местом для экстремальных прогулок",
        screenshot: "/images/map/tolyatti-underground-city.webp",
        miniMap: "/images/map/tolyatti-underground-city-map.webp",
      },
      {
        id: "construction",
        name: "Стройка",
        address: "г. Тольятти",
        description:
          "Стройплощадки Тольятти фокусируются на многоэтажках и дорогах (развязки до 2033 г.); особенности — сезонные простои зимой, пыль от газобетона и пробки вокруг, но новые ЖК обещают смарт-дом системы и зеленые зоны",
        screenshot: "/images/map/tolyatti-construction-site.webp",
        miniMap: "/images/map/tolyatti-construction-site-map.webp",
      },
      {
        id: "shopping",
        name: "Торговые центры",
        address: "г. Тольятти",
        description:
          "Торговые центры Тольятти варьируются от крупных торгово-развлекательных комплексов площадью до 80 тыс. кв. м с гипермаркетами и кинотеатрами до компактных районных объектов с бутиками и фудкортами",
        screenshot: "/images/map/tolyatti-shopping-centers.webp",
        miniMap: "/images/map/tolyatti-shopping-centers-map.webp",
      },
    ],
  },
  {
    id: "soon",
    name: "Скоро",
    locations: [],
  },
];
const ACTIVE_REGION_STYLE =
  "bg-[radial-gradient(ellipse_85%_148%_at_50%_100%,#ff7c81_0%,#ff2830_100%)] [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.9),0_0_36px_rgba(255,40,48,0.28)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[20px] before:bg-[linear-gradient(118deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_42%,rgba(255,255,255,0)_58%)]";
const INACTIVE_REGION_STYLE =
  "bg-[radial-gradient(ellipse_86%_148%_at_50%_100%,rgba(80,76,108,0.6)_0%,rgba(80,76,108,0)_100%)] [box-shadow:inset_0_0_0_1px_rgba(80,76,108,0.65)]";
const ACTIVE_CITY_STYLE =
  "bg-[radial-gradient(ellipse_76.5%_197.65%_at_0%_50%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)]";
const MAP_INTRO_CARD_STYLE =
  "relative flex overflow-hidden rounded-[20px] bg-[radial-gradient(ellipse_68%_137%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/images/diamond-pattern.svg')] before:bg-[length:16px_16px] before:bg-repeat before:opacity-60 before:mix-blend-overlay";

type LayoutVariant = "mobile" | "tablet" | "desktop";

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

function MapIntroCard({ variant = "desktop" }: { variant?: LayoutVariant }) {
  return (
    <div
      className={[
        MAP_INTRO_CARD_STYLE,
        variant === "mobile"
          ? "h-[95px] w-full max-w-[400px] items-center justify-center px-5"
          : variant === "tablet"
            ? "h-[130px] w-full max-w-[340px] shrink-0 items-center justify-center px-6"
            : "h-[166px] w-full max-w-[361px] shrink-0 items-center justify-center px-[30px] justify-start",
      ].join(" ")}
    >
      <p
        className={[
          "relative z-10 font-medium leading-[1.4] text-white",
          variant === "mobile"
            ? "max-w-[360px] text-center text-[16px]"
            : variant === "tablet"
              ? "max-w-[290px] text-left text-[16px]"
              : "max-w-[301px] text-left text-body",
        ].join(" ")}
      >
        Десятки самых знаковых мест и сотни архитектурных объектов Питера и
        области
      </p>
    </div>
  );
}

function RegionTabs({
  activeRegionId,
  onSelect,
  variant = "desktop",
}: {
  activeRegionId: RegionKey;
  onSelect: (regionId: RegionKey) => void;
  variant?: LayoutVariant;
}) {
  const isMobile = variant === "mobile";
  const isTablet = variant === "tablet";

  return (
    <div
      className={[
        "grid overflow-visible",
        isMobile
          ? "h-[34px] grid-cols-3"
          : isTablet
            ? "h-[56px] grid-cols-3"
            : "h-[clamp(56px,5.7vw,92px)] grid-cols-3",
      ].join(" ")}
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
              "relative flex min-w-0 items-center justify-center overflow-hidden rounded-t-[20px] border border-transparent font-bold leading-[1.2] text-white transition-opacity",
              isMobile
                ? "px-3 text-[10px]"
                : isTablet
                  ? "px-4 text-[18px]"
                  : "px-[clamp(12px,1.2vw,20px)] text-[clamp(18px,1.75vw,28px)]",
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
  variant = "desktop",
}: {
  city: City;
  isActive: boolean;
  onClick: () => void;
  variant?: LayoutVariant;
}) {
  const isHorizontal = variant === "mobile" || variant === "tablet";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        "group relative flex shrink-0 items-center overflow-hidden rounded-[20px] text-left font-medium leading-[1.2] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        variant === "mobile"
          ? "h-[66px] gap-2 px-[22px] text-[18px]"
          : variant === "tablet"
            ? "h-[72px] gap-2 px-6 text-[20px]"
            : "min-h-[clamp(72px,5.8vw,94px)] w-full gap-2 px-[clamp(20px,2.2vw,36px)] py-5 text-[clamp(16px,1.75vw,28px)]",
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
          isHorizontal
            ? "relative z-10 whitespace-nowrap"
            : "relative z-10 min-w-0"
        }
      >
        {city.name}
      </span>
    </button>
  );
}

function Screenshot({
  city,
  variant = "desktop",
}: {
  city: City;
  variant?: LayoutVariant;
}) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden bg-surface [box-shadow:inset_0_0_0_1px_rgba(80,76,108,0.65)]",
        variant === "mobile"
          ? "h-[224px]"
          : variant === "tablet"
            ? "aspect-16/10 min-h-[280px] max-h-[420px]"
            : "aspect-1082/469 min-h-[320px] max-h-[469px]",
      ].join(" ")}
    >
      <Image
        src={city.screenshot}
        alt={`Скриншот локации: ${city.name}`}
        fill
        sizes={
          variant === "mobile"
            ? "400px"
            : variant === "tablet"
              ? "(max-width: 1340px) 90vw, 800px"
              : "(min-width: 1620px) 1082px, calc(100vw - 586px)"
        }
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
}

function InfoPanel({
  city,
  variant = "desktop",
}: {
  city: City;
  variant?: LayoutVariant;
}) {
  return (
    <div
      className={[
        "grid overflow-hidden bg-bg [box-shadow:inset_0_0_0_1px_rgba(80,76,108,0.65)]",
        variant === "mobile"
          ? "h-[161px] grid-cols-[1fr_115px]"
          : variant === "tablet"
            ? "min-h-[180px] grid-cols-[1fr_min(38%,200px)]"
            : "min-h-[180px] grid-cols-[1fr_min(38%,413px)] max-h-[224px]",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-col justify-center font-medium leading-[1.4] text-[#6e6b78]",
          variant === "mobile"
            ? "px-5 text-[6px]"
            : variant === "tablet"
              ? "px-6 py-4 text-[14px]"
              : "px-[clamp(24px,3.1vw,50px)] py-4 text-[clamp(14px,1vw,16px)]",
        ].join(" ")}
      >
        <p>{city.address}</p>
        <p>{city.description}</p>
      </div>

      <div className="relative min-h-[115px] overflow-hidden [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.8)]">
        <Image
          src={city.miniMap}
          alt={`Мини-карта локации: ${city.name}`}
          fill
          sizes={
            variant === "mobile"
              ? "115px"
              : variant === "tablet"
                ? "(max-width: 1340px) 38vw, 200px"
                : "(min-width: 1620px) 413px, 38vw"
          }
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
  const [showMobileScrollHint, setShowMobileScrollHint] = useState(true);
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

  const handleCitySelect = (index: number) => {
    setActiveCityIndex(index);
    setShowMobileScrollHint(false);
  };

  const handleMobileCityListScroll = (event: UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollLeft > 8) {
      setShowMobileScrollHint(false);
    }
  };

  return (
    <section
      id="map"
      aria-labelledby="map-heading"
      className="relative w-full bg-bg px-5 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-10 min-[900px]:gap-12 min-[1340px]:gap-14">
        <header className="flex flex-col items-center gap-5 text-center min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between min-[900px]:gap-6 min-[900px]:text-left min-[1340px]:gap-[22px]">
          <h2
            id="map-heading"
            className="max-w-[920px] text-[32px] font-extrabold leading-none text-white min-[900px]:max-w-none min-[900px]:flex-1 min-[900px]:text-[clamp(2rem,4.5vw,6.25rem)] min-[1340px]:max-w-[1237px] min-[1340px]:text-display"
          >
            Карта Ленинградской области и регионов
          </h2>
          <div className="min-[900px]:hidden">
            <MapIntroCard variant="mobile" />
          </div>
          <div className="hidden min-[900px]:block min-[1340px]:hidden">
            <MapIntroCard variant="tablet" />
          </div>
          <div className="hidden min-[1340px]:block">
            <MapIntroCard variant="desktop" />
          </div>
        </header>

        {/* Desktop: sidebar + content (≥1340px) */}
        <div className="hidden min-[1340px]:grid min-[1340px]:grid-cols-[minmax(320px,30.1%)_1fr] min-[1340px]:gap-[clamp(24px,3.1vw,50px)]">
          <nav aria-label={`Локации региона ${activeRegion.name}`}>
            <ul className="flex flex-col">
              {activeRegion.locations.map((city, index) => (
                <li key={city.id}>
                  <CityButton
                    city={city}
                    isActive={index === activeCityIndex}
                    onClick={() => handleCitySelect(index)}
                    variant="desktop"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex w-full min-w-0 flex-col">
            <RegionTabs
              activeRegionId={activeRegion.id}
              onSelect={handleRegionSelect}
              variant="desktop"
            />
            <Screenshot city={activeCity} variant="desktop" />
            <InfoPanel city={activeCity} variant="desktop" />
          </div>
        </div>

        {/* Tablet: stacked card + horizontal city list (900–1339px) */}
        <div className="relative hidden w-full flex-col min-[900px]:flex min-[1340px]:hidden">
          <RegionTabs
            activeRegionId={activeRegion.id}
            onSelect={handleRegionSelect}
            variant="tablet"
          />
          <Screenshot city={activeCity} variant="tablet" />
          <InfoPanel city={activeCity} variant="tablet" />

          <div
            className="mt-3 w-full touch-pan-x overflow-x-auto overscroll-x-contain scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label={`Локации региона ${activeRegion.name}`}
            onScroll={handleMobileCityListScroll}
          >
            <div className="flex w-max min-w-full gap-1">
              {activeRegion.locations.map((city, index) => (
                <CityButton
                  key={city.id}
                  city={city}
                  isActive={index === activeCityIndex}
                  onClick={() => handleCitySelect(index)}
                  variant="tablet"
                />
              ))}
            </div>
          </div>

          {showMobileScrollHint && activeRegion.locations.length > 1 ? (
            <div
              className="pointer-events-none absolute right-2 bottom-[15px] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(ellipse_113%_115%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] text-accent-light backdrop-blur-md [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.75)]"
              aria-hidden="true"
            >
              <ArrowIcon direction="right" />
            </div>
          ) : null}
        </div>

        {/* Mobile: narrow stacked layout (<900px) */}
        <div className="relative mx-auto flex w-full max-w-[420px] flex-col min-[900px]:hidden">
          <div className="mx-auto flex w-full max-w-[400px] flex-col">
            <RegionTabs
              activeRegionId={activeRegion.id}
              onSelect={handleRegionSelect}
              variant="mobile"
            />
            <Screenshot city={activeCity} variant="mobile" />
            <InfoPanel city={activeCity} variant="mobile" />
          </div>

          <div
            className="mt-2 w-full max-w-full touch-pan-x overflow-x-auto overscroll-x-contain scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label={`Локации региона ${activeRegion.name}`}
            onScroll={handleMobileCityListScroll}
          >
            <div className="flex w-max min-w-full">
              {activeRegion.locations.map((city, index) => (
                <CityButton
                  key={city.id}
                  city={city}
                  isActive={index === activeCityIndex}
                  onClick={() => handleCitySelect(index)}
                  variant="mobile"
                />
              ))}
            </div>
          </div>

          {showMobileScrollHint && activeRegion.locations.length > 1 ? (
            <div
              className="pointer-events-none absolute right-2 bottom-[15px] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(ellipse_113%_115%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] text-accent-light backdrop-blur-md [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.75)]"
              aria-hidden="true"
            >
              <ArrowIcon direction="right" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
