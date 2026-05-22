"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 0);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Прокрутить наверх"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={[
        "scroll-to-top-button group sticky bottom-[calc(20px+env(safe-area-inset-bottom))] z-40 mx-auto mb-[38px] flex shrink-0 cursor-pointer items-center justify-center overflow-hidden border border-transparent text-white transition-[box-shadow,filter,opacity,transform] duration-150 hover:filter-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:bottom-[calc(32px+env(safe-area-inset-bottom))] min-[1340px]:ml-auto min-[1340px]:mr-[150px]",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <svg
        aria-hidden="true"
        className="scroll-to-top-button__arrow absolute fill-white transition-transform duration-150 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
        viewBox="0 0 44 39"
        fill="none"
      >
        <path d="M15.8806 6.1348C17.8888 2.6836 18.8929 0.958 20.2037 0.3788C21.3471 -0.1263 22.6529 -0.1263 23.7963 0.3788C25.1071 0.958 26.1112 2.6836 28.1194 6.1348L41.1231 28.4832C43.1313 31.9344 44.1353 33.66 43.9853 35.076C43.8545 36.3111 43.2016 37.4331 42.1891 38.1631C41.0282 39 39.02 39 35.0037 39H8.9963C4.98 39 2.9718 39 1.8109 38.1631C0.7984 37.4331 0.1455 36.3111 0.0147 35.076C-0.1353 33.66 0.8688 31.9344 2.8769 28.4831L15.8806 6.1348Z" />
      </svg>
      <span className="scroll-to-top-button__label relative z-10 font-semibold leading-[1.219] tracking-[0.05em]">
        наверх
      </span>
    </button>
  );
}
