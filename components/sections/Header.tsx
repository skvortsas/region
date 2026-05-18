"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { OnlineCounter } from "@/components/ui/OnlineCounter";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { getServerStatus } from "@/lib/api/server-status";

const NAV_ITEMS = [
  { label: "ГЛАВНАЯ", href: "#hero", id: "hero" },
  { label: "КАРТА", href: "#map", id: "map" },
  { label: "ОБ ИГРЕ", href: "#about", id: "about" },
  { label: "ИНФО", href: "#info", id: "info" },
] as const;

const SECTION_IDS = ["hero", "map", "about", "info"];
const SOCIALS = [
  { platform: "discord", href: "https://discord.gg/regiononline" },
  { platform: "vk", href: "https://vk.com/regiononline" },
  { platform: "telegram", href: "https://t.me/region" },
  { platform: "youtube", href: "https://youtube.com/@region_online" },
] as const;
type NavItemId = (typeof NAV_ITEMS)[number]["id"];

function HouseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="22 21 18 18"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="nav-house-grad"
          x1="32"
          y1="22.5"
          x2="32"
          y2="37.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        d="M38.6225 27.0075L33.71 23.0775C32.75 22.3125 31.25 22.305 30.2975 23.07L25.385 27.0075C24.68 27.57 24.2525 28.695 24.4025 29.58L25.3475 35.235C25.565 36.5025 26.7425 37.5 28.025 37.5H35.975C37.2425 37.5 38.4425 36.48 38.66 35.2275L39.605 29.5725C39.74 28.695 39.3125 27.57 38.6225 27.0075ZM32.5625 34.5C32.5625 34.8075 32.3075 35.0625 32 35.0625C31.6925 35.0625 31.4375 34.8075 31.4375 34.5V32.25C31.4375 31.9425 31.6925 31.6875 32 31.6875C32.3075 31.6875 32.5625 31.9425 32.5625 32.25V34.5Z"
        fill="url(#nav-house-grad)"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="38.5 21 18 18"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="nav-map-grad"
          x1="47.5"
          y1="22"
          x2="47.5"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        d="M53.8169 27.2293C53.0479 23.6234 50.0963 22 47.5037 22C47.5037 22 47.5037 22 47.4963 22C44.911 22 41.9521 23.6156 41.1831 27.2215C40.3262 31.2488 42.6406 34.6595 44.7352 36.8059C45.5115 37.6019 46.5076 38 47.5037 38C48.4997 38 49.4958 37.6019 50.2648 36.8059C52.3594 34.6595 54.6738 31.2566 53.8169 27.2293ZM47.5037 31.1395C46.2293 31.1395 45.1966 30.039 45.1966 28.681C45.1966 27.3229 46.2293 26.2224 47.5037 26.2224C48.778 26.2224 49.8107 27.3229 49.8107 28.681C49.8107 30.039 48.778 31.1395 47.5037 31.1395Z"
        fill="url(#nav-map-grad)"
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="27.5 21 18 18"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="nav-question-grad"
          x1="36.5"
          y1="23"
          x2="36.5"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        d="M40.25 23H32.75C30.5 23 29 24.568 29 26.9199V31.6238C29 33.9757 30.5 35.5437 32.75 35.5437V37.2135C32.75 37.8407 33.4175 38.217 33.9125 37.8642L37.25 35.5437H40.25C42.5 35.5437 44 33.9757 44 31.6238V26.9199C44 24.568 42.5 23 40.25 23ZM36.5 32.541C36.185 32.541 35.9375 32.2745 35.9375 31.953C35.9375 31.6316 36.185 31.3651 36.5 31.3651C36.815 31.3651 37.0625 31.6316 37.0625 31.953C37.0625 32.2745 36.815 32.541 36.5 32.541ZM37.445 29.2875C37.1525 29.4913 37.0625 29.6246 37.0625 29.8441V30.0088C37.0625 30.3302 36.8075 30.5968 36.5 30.5968C36.1925 30.5968 35.9375 30.3302 35.9375 30.0088V29.8441C35.9375 28.9347 36.575 28.4879 36.815 28.3154C37.0925 28.1194 37.1825 27.9861 37.1825 27.7823C37.1825 27.3903 36.875 27.0688 36.5 27.0688C36.125 27.0688 35.8175 27.3903 35.8175 27.7823C35.8175 28.1037 35.5625 28.3703 35.255 28.3703C34.9475 28.3703 34.6925 28.1037 34.6925 27.7823C34.6925 26.7396 35.5025 25.8929 36.5 25.8929C37.4975 25.8929 38.3075 26.7396 38.3075 27.7823C38.3075 28.676 37.6775 29.1229 37.445 29.2875Z"
        fill="url(#nav-question-grad)"
      />
    </svg>
  );
}

function InfoChatIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="39.5 21 18 18"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="nav-info-grad"
          x1="48.5"
          y1="23"
          x2="48.5"
          y2="37.9996"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        d="M50.2891 23.542C50.7516 23.542 51.0839 23.9611 50.9902 24.4092C50.9107 24.8139 50.9178 25.2408 51.0117 25.6816C51.2575 26.8166 52.1834 27.7425 53.3184 27.9883C53.7592 28.0822 54.1861 28.082 54.5908 28.0098C55.0389 27.9233 55.458 28.2557 55.458 28.7109V32.1875C55.458 34.1827 53.8458 35.7949 51.8506 35.7949H50.7588C50.5276 35.795 50.318 35.9034 50.1807 36.084L49.0967 37.5225C48.6196 38.1586 47.8384 38.1586 47.3613 37.5225L46.2773 36.084C46.1617 35.9251 45.9015 35.7951 45.6992 35.7949H44.6143C42.6192 35.7948 41 34.1758 41 32.1807V27.1562C41.0002 25.1613 42.6193 23.5421 44.6143 23.542H50.2891ZM45.3369 29.3252C44.9324 29.3254 44.6144 29.6506 44.6143 30.0479C44.6143 30.4453 44.9323 30.7713 45.3369 30.7715C45.7417 30.7715 46.0605 30.4454 46.0605 30.0479C46.0604 29.6504 45.7344 29.3252 45.3369 29.3252ZM48.2285 29.3252C47.824 29.3254 47.506 29.6505 47.5059 30.0479C47.5059 30.4453 47.8239 30.7713 48.2285 30.7715C48.6333 30.7715 48.9521 30.4454 48.9521 30.0479C48.952 29.6504 48.626 29.3252 48.2285 29.3252ZM51.1201 29.3252C50.7156 29.3254 50.3976 29.6505 50.3975 30.0479C50.3975 30.4453 50.7155 30.7713 51.1201 30.7715C51.5249 30.7715 51.8438 30.4454 51.8438 30.0479C51.8436 29.6504 51.5176 29.3252 51.1201 29.3252ZM54.0117 23C55.1096 23 56 23.8904 56 24.9883C55.9998 26.086 55.1095 26.9756 54.0117 26.9756C52.9141 26.9754 52.0246 26.0859 52.0244 24.9883C52.0244 23.8905 52.914 23.0002 54.0117 23Z"
        fill="url(#nav-info-grad)"
      />
    </svg>
  );
}

function ActiveNavIcon({ id }: { id: NavItemId }) {
  switch (id) {
    case "hero":
      return <HouseIcon />;
    case "map":
      return <MapPinIcon />;
    case "about":
      return <QuestionIcon />;
    case "info":
      return <InfoChatIcon />;
  }
}

function PersonIcon() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="login-person-grad"
            x1="5.63184"
            y1="0"
            x2="5.63184"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF2830" />
            <stop offset="1" stopColor="#FF686E" />
          </linearGradient>
        </defs>
        <path
          className="transition-[fill] duration-150 group-hover:fill-white group-focus-visible:fill-white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.57617 9.72754C3.8242 8.23975 7.4644 8.23961 9.69629 9.72754C10.7043 10.3915 11.2557 11.3121 11.2637 12.2881C11.2636 13.28 10.7042 14.1921 9.69629 14.8721C8.57629 15.6241 7.10384 16 5.63184 16C4.16002 16 2.68828 15.6239 1.56836 14.8721C0.560359 14.2001 0 13.2877 0 12.3037C0.000101686 11.3198 0.560264 10.3995 1.57617 9.72754ZM7.49609 10.9443C7.30409 10.7523 6.98399 10.7523 6.79199 10.9443L5.12793 12.6084L4.47168 11.9521C4.27967 11.7602 3.95955 11.7602 3.76758 11.9521C3.5759 12.1442 3.57575 12.4643 3.76758 12.6562L4.77637 13.6641C4.87232 13.7519 5.00006 13.8076 5.12793 13.8076C5.25593 13.8076 5.38447 13.7601 5.48047 13.6641L7.49609 11.6484C7.69602 11.4565 7.69587 11.1364 7.49609 10.9443ZM5.63184 0C7.72777 0 9.43153 1.70389 9.43164 3.7998C9.42364 5.8558 7.81558 7.5198 5.76758 7.5918H5.71191C5.66396 7.58383 5.60003 7.58382 5.53613 7.5918C3.44013 7.5198 1.83203 5.8558 1.83203 3.7998C1.83214 1.70396 3.53599 0.00010588 5.63184 0Z"
          fill="url(#login-person-grad)"
        />
      </svg>
    </span>
  );
}

function LoginButton({
  className = "",
  size = "lg",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const dims = size === "lg" ? "h-[60px] w-[180px]" : "h-[50px] w-[136px]";
  return (
    <a
      href="#howtoplay"
      className={`login-button group inline-flex ${dims} items-center justify-center gap-2 rounded-[20px] border border-transparent text-[18px] font-semibold uppercase leading-[21.942px] tracking-[0.9px] text-white/80 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none ${className}`}
    >
      <PersonIcon />
      ВОЙТИ
    </a>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="29"
      height="23"
      viewBox="0 0 29 23"
      fill="none"
      aria-hidden="true"
    >
      <rect width="29" height="5" rx="2.5" fill="currentColor" />
      <rect y="9" width="29" height="5" rx="2.5" fill="currentColor" />
      <rect y="18" width="29" height="5" rx="2.5" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [onlineCount, setOnlineCount] = useState(142);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      const { count } = await getServerStatus();
      if (!cancelled) setOnlineCount(count);
    }

    fetchStatus();
    const id = setInterval(fetchStatus, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,14,15,0.5), rgba(17,17,23,0.5))",
        }}
      >
        <div className="relative flex items-center h-[50px] pl-5 pr-0 min-[1560px]:h-[60px] min-[1560px]:px-4 md:px-12 max-w-[1920px] mx-auto">
          {/* Logo — small mark on mobile, full wordmark on desktop */}
          <a
            href="#hero"
            aria-label="Region RP — на главную"
            className="shrink-0"
          >
            <Image
              src="/images/logo-mark.svg"
              alt="Region RP"
              width={22}
              height={20}
              priority
              className="min-[1560px]:hidden"
            />
            <Image
              src="/images/logo.svg"
              alt="Region RP"
              width={109}
              height={22}
              priority
              className="hidden min-[1560px]:block"
            />
          </a>

          {/* Counter — desktop, next to logo */}
          <div className="hidden min-[1560px]:flex ml-5">
            <Suspense
              fallback={
                <span className="w-32 h-4 rounded bg-white/10 animate-pulse" />
              }
            >
              <OnlineCounter count={onlineCount} />
            </Suspense>
          </div>

          {/* Counter — mobile, compact variant next to logo */}
          <div className="flex min-[1560px]:hidden ml-5">
            <OnlineCounter count={onlineCount} compact />
          </div>

          {/* Nav — desktop, centered in header */}
          <nav
            className="hidden min-[1560px]:flex absolute left-1/2 -translate-x-1/2 items-center"
            aria-label="Основная навигация"
          >
            {NAV_ITEMS.map(({ label, href, id }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={href}
                  className={`flex h-[60px] w-[170px] items-center justify-center gap-2 rounded-[20px] text-nav font-semibold transition-colors duration-150 ${
                    isActive
                      ? "text-white border border-accent/40"
                      : "text-text-muted hover:text-white"
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            "radial-gradient(ellipse at 50% 100%, rgba(255,40,48,0.6) 0%, transparent 60%)",
                        }
                      : undefined
                  }
                >
                  {isActive && <ActiveNavIcon id={id} />}
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Desktop right cluster: socials → login */}
          <div className="hidden min-[1560px]:flex items-center gap-[46px] ml-auto">
            <div className="flex items-center gap-[10px]">
              {SOCIALS.map(({ platform, href }) => (
                <SocialIcon key={platform} platform={platform} href={href} />
              ))}
            </div>

            <LoginButton />
          </div>

          {/* Mobile right cluster: hamburger → login button (flush right) */}
          <div className="flex min-[1560px]:hidden items-center gap-5 ml-auto">
            <button
              className="flex h-[42px] w-[42px] items-center justify-center text-[#D9D9D9]"
              aria-label="Открыть меню"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <HamburgerIcon />
            </button>

            <LoginButton size="sm" />
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer */}
      <div
        className={`min-[1560px]:hidden fixed inset-0 z-50 flex flex-col transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 55% 15%, #6b3a4a 0%, #111117 65%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Навигационное меню"
        aria-hidden={!drawerOpen}
      >
        {/* Close button — top right */}
        <div className="flex justify-end p-4">
          <button
            aria-label="Закрыть меню"
            onClick={() => setDrawerOpen(false)}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav items — centered */}
        <nav
          className="flex flex-col items-center gap-10 mt-6"
          aria-label="Мобильная навигация"
        >
          {NAV_ITEMS.map(({ label, href, id }) => (
            <a
              key={id}
              href={href}
              className={`flex items-center gap-2 text-nav font-semibold transition-colors ${
                activeId === id
                  ? "text-white"
                  : "text-text-muted hover:text-white"
              }`}
              onClick={() => setDrawerOpen(false)}
            >
              {activeId === id && (
                <span
                  className="w-2 h-2 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
              )}
              {label}
            </a>
          ))}
        </nav>

        {/* Social icons — bottom */}
        <div className="flex items-center justify-center gap-4 mt-auto pb-14">
          {SOCIALS.map(({ platform, href }) => (
            <SocialIcon key={platform} platform={platform} href={href} />
          ))}
        </div>
      </div>
    </>
  );
}
