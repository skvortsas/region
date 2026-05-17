"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
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

function PersonIcon() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="4.5" r="3.5" fill="currentColor" />
      <path d="M0 15c0-3.866 3.134-7 7-7s7 3.134 7 7" fill="currentColor" />
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
      <header className="sticky top-0 z-50 bg-surface-elevated backdrop-blur-sm">
        <div className="flex items-center h-[60px] px-4 md:px-12 gap-3 md:gap-8 max-w-[1920px] mx-auto">
          {/* Logo */}
          <a
            href="#hero"
            aria-label="Region RP — на главную"
            className="shrink-0"
          >
            <Image
              src="/images/logo.svg"
              alt="Region RP"
              width={109}
              height={22}
              priority
            />
          </a>

          {/* Nav links — desktop only */}
          <nav
            className="hidden min-[440px]:flex items-center gap-6 ml-6"
            aria-label="Основная навигация"
          >
            {NAV_ITEMS.map(({ label, href, id }) => (
              <a
                key={id}
                href={href}
                className={`text-nav font-semibold transition-colors duration-150 ${
                  activeId === id
                    ? "text-white"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop right cluster: counter → button → socials */}
          <div className="hidden min-[440px]:flex items-center gap-5 ml-auto">
            <Suspense
              fallback={
                <span className="w-32 h-4 rounded bg-white/10 animate-pulse" />
              }
            >
              <OnlineCounter count={onlineCount} />
            </Suspense>

            <Button variant="primary" size="sm" href="#" icon={<PersonIcon />}>
              ВОЙТИ
            </Button>

            <div className="flex items-center gap-2">
              {SOCIALS.map((p) => (
                <SocialIcon key={p} platform={p} />
              ))}
            </div>
          </div>

          {/* Mobile right cluster: counter → hamburger → button */}
          <div className="flex min-[440px]:hidden items-center gap-3 ml-auto">
            <OnlineCounter count={onlineCount} />

            <button
              className="p-2 text-white"
              aria-label="Открыть меню"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <svg
                width="22"
                height="14"
                viewBox="0 0 22 14"
                fill="none"
                aria-hidden="true"
              >
                <rect y="0" width="22" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="22" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="22" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>

            <Button variant="primary" size="sm" href="#" icon={<PersonIcon />}>
              ВОЙТИ
            </Button>
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
