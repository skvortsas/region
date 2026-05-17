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
const SOCIALS = ["discord", "vk", "telegram", "youtube"] as const;

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

function PersonIcon() {
  return (
    <svg
      width="12"
      height="16"
      viewBox="44 22 12 16"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="login-person-grad"
          x1="49.6318"
          y1="22"
          x2="49.6318"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      <path
        d="M45.5762 31.7275C47.8242 30.2398 51.4644 30.2396 53.6963 31.7275C54.7043 32.3915 55.2557 33.3121 55.2637 34.2881C55.2636 35.28 54.7042 36.1921 53.6963 36.8721C52.5763 37.6241 51.1038 38 49.6318 38C48.16 38 46.6883 37.6239 45.5684 36.8721C44.5604 36.2001 44 35.2877 44 34.3037C44.0001 33.3198 44.5603 32.3995 45.5762 31.7275ZM51.4961 32.9443C51.3041 32.7523 50.984 32.7523 50.792 32.9443L49.1279 34.6084L48.4717 33.9521C48.2797 33.7602 47.9596 33.7602 47.7676 33.9521C47.5759 34.1442 47.5758 34.4643 47.7676 34.6562L48.7764 35.6641C48.8723 35.7519 49.0001 35.8076 49.1279 35.8076C49.2559 35.8076 49.3845 35.7601 49.4805 35.6641L51.4961 33.6484C51.696 33.4565 51.6959 33.1364 51.4961 32.9443ZM49.6318 22C51.7278 22 53.4315 23.7039 53.4316 25.7998C53.4236 27.8558 51.8156 29.5198 49.7676 29.5918H49.7119C49.664 29.5838 49.6 29.5838 49.5361 29.5918C47.4401 29.5198 45.832 27.8558 45.832 25.7998C45.8321 23.704 47.536 22.0001 49.6318 22Z"
        fill="url(#login-person-grad)"
      />
    </svg>
  );
}

function LoginButton({
  className = "",
  size = "lg",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const dims =
    size === "lg" ? "h-[60px] w-[180px]" : "h-[50px] w-[136px]";
  return (
    <a
      href="#"
      className={`inline-flex ${dims} items-center justify-center gap-2 rounded-[20px] text-[18px] font-semibold uppercase leading-[1.22] tracking-wider text-white/80 transition-colors hover:text-white ${className}`}
      style={{
        border: "1px solid rgba(255, 40, 48, 0.6)",
        background:
          "radial-gradient(68.07% 147.75% at 50% 100%, rgba(255, 40, 48, 0.6) 0%, rgba(255, 40, 48, 0) 100%)",
      }}
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
        className="sticky top-0 z-50 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,14,15,0.5), rgba(17,17,23,0.5))",
        }}
      >
        <div className="relative flex items-center h-[50px] pl-5 pr-0 min-[440px]:h-[60px] min-[440px]:px-4 md:px-12 max-w-[1920px] mx-auto">
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
              className="min-[440px]:hidden"
            />
            <Image
              src="/images/logo.svg"
              alt="Region RP"
              width={109}
              height={22}
              priority
              className="hidden min-[440px]:block"
            />
          </a>

          {/* Counter — desktop, next to logo */}
          <div className="hidden min-[440px]:flex ml-5">
            <Suspense
              fallback={
                <span className="w-32 h-4 rounded bg-white/10 animate-pulse" />
              }
            >
              <OnlineCounter count={onlineCount} />
            </Suspense>
          </div>

          {/* Counter — mobile, compact variant next to logo */}
          <div className="flex min-[440px]:hidden ml-5">
            <OnlineCounter count={onlineCount} compact />
          </div>

          {/* Nav — desktop, centered in header */}
          <nav
            className="hidden min-[440px]:flex absolute left-1/2 -translate-x-1/2 items-center"
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
                  {isActive && <HouseIcon />}
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Desktop right cluster: socials → login */}
          <div className="hidden min-[440px]:flex items-center gap-[46px] ml-auto">
            <div className="flex items-center gap-[10px]">
              {SOCIALS.map((p) => (
                <SocialIcon key={p} platform={p} />
              ))}
            </div>

            <LoginButton />
          </div>

          {/* Mobile right cluster: hamburger → login button (flush right) */}
          <div className="flex min-[440px]:hidden items-center gap-5 ml-auto">
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
        className={`min-[440px]:hidden fixed inset-0 z-50 flex flex-col transition-transform duration-300 ${
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
          {SOCIALS.map((p) => (
            <SocialIcon key={p} platform={p} />
          ))}
        </div>
      </div>
    </>
  );
}
