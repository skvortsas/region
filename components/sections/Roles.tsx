"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type RoleId = "businessman" | "police" | "military" | "bandit" | "medic";

interface Role {
  id: RoleId;
  name: string;
  description: string;
  popupBody: string;
  illustration: string;
  /** Hover-state artwork (desktop only) — description text is baked in */
  hoverImage: string;
  icon: string;
  /** Figma node id — for reference only, see docs/DESIGN.md §2.4 */
  figmaNodeId: string;
}

/* ------------------------------------------------------------------ */
/*  Role data — order matches Figma 112:557 (left → right on desktop)  */
/* ------------------------------------------------------------------ */

const ROLES: Role[] = [
  {
    id: "businessman",
    figmaNodeId: "112:546",
    name: "Бизнесмен",
    description:
      "Открывай бизнес и управляй своей командой профессионалов, создавая свою империю",
    popupBody:
      "Открывай бизнес и управляй своей командой профессионалов, создавая свою империю",
    illustration: "/images/roles/businessman.webp",
    hoverImage: "/images/roles/businessman-hover.png",
    icon: "/images/roles/businessman-icon.png",
  },
  {
    id: "police",
    figmaNodeId: "112:462",
    name: "Полицейский",
    description:
      "Патрулируй районы, раскрывай преступления и поддерживай порядок на дорогах и улицах",
    popupBody:
      "Патрулируй районы, раскрывай преступления и поддерживай порядок на дорогах и улицах",
    illustration: "/images/roles/police.webp",
    hoverImage: "/images/roles/police-hover.png",
    icon: "/images/roles/police-icon.png",
  },
  {
    id: "military",
    figmaNodeId: "112:411",
    name: "Военный",
    description:
      "Участвуй в боевых учениях, охраняй стратегические объекты и продвигайся по званиям",
    popupBody:
      "Участвуй в боевых учениях, охраняй стратегические объекты и продвигайся по званиям",
    illustration: "/images/roles/military.webp",
    hoverImage: "/images/roles/military-hover.png",
    icon: "/images/roles/military-icon.png",
  },
  {
    id: "bandit",
    figmaNodeId: "112:499",
    name: "Бандит",
    description:
      "Собери команду, веди тёмные сделки и уходи от полиции — стань легендой своего района",
    popupBody:
      "Собери команду, веди тёмные сделки и уходи от полиции — стань легендой своего района",
    illustration: "/images/roles/bandit.webp",
    hoverImage: "/images/roles/bandit-hover.png",
    icon: "/images/roles/bandit-icon.png",
  },
  {
    id: "medic",
    figmaNodeId: "112:292",
    name: "Медик",
    description:
      "Спасай жизни граждан: выезжай на вызовы и работай в связке с полицией и пожарными",
    popupBody:
      "Спасай жизни граждан: выезжай на вызовы и работай в связке  с полицией и пожарными",
    illustration: "/images/roles/medic.webp",
    hoverImage: "/images/roles/medic-hover.png",
    icon: "/images/roles/medic-icon.png",
  },
];

/* ------------------------------------------------------------------ */
/*  RolePopup — modal detail per role (used on tap, mobile + desktop)  */
/* ------------------------------------------------------------------ */

interface RolePopupProps {
  role: Role;
  onClose: () => void;
}

function RolePopup({ role, onClose }: RolePopupProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`role-popup-title-${role.id}`}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-surface-elevated border border-white/5 p-6 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors"
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

        <div className="flex items-center gap-4 mb-6">
          <Image
            src={role.icon}
            alt=""
            width={64}
            height={64}
            className="rounded-[14px] shrink-0"
            loading="lazy"
            aria-hidden="true"
          />
          <h3
            id={`role-popup-title-${role.id}`}
            className="text-[28px] md:text-[32px] font-bold leading-none text-white"
          >
            {role.name}
          </h3>
        </div>

        <div className="relative aspect-16/10 w-full mb-6 rounded-[16px] overflow-hidden bg-surface">
          <Image
            src={role.illustration}
            alt={`Иллюстрация роли — ${role.name}`}
            fill
            sizes="(max-width: 720px) 100vw, 720px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <p className="text-text-secondary text-[16px] md:text-[20px] font-medium leading-[1.4]">
          {role.popupBody}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RoleCard                                                           */
/*  Desktop (lg+): description hidden, revealed on hover with red      */
/*  overlay + diamond pattern (Figma hover state node 112:284).        */
/*  Mobile / tablet: description shown beneath title, tap opens popup. */
/* ------------------------------------------------------------------ */

interface RoleCardProps {
  role: Role;
  onOpen: (id: RoleId) => void;
}

function RoleCard({ role, onOpen }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(role.id)}
      aria-label={`Подробнее о роли — ${role.name}`}
      className="group relative flex flex-col rounded-[20px] bg-gradient-surface text-left transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                 w-[clamp(150px,44vw,195px)] aspect-195/498
                 lg:w-[311px] lg:h-[798px] lg:aspect-auto"
    >
      {/* Illustration area */}
      <div className="relative flex-1">
        <Image
          src={role.illustration}
          alt={`Иллюстрация роли — ${role.name}`}
          fill
          sizes="(max-width: 1024px) 195px, 311px"
          className="object-cover object-top transition-transform duration-300"
          loading="lazy"
        />

        {/* Bottom dark fade — mobile/tablet only (keeps text readable) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none bg-linear-to-t from-[rgba(14,14,15,0.95)] from-10% to-transparent lg:hidden"
        />

        {/* Role icon overlay — top left, Figma: 98×98, cornerRadius 20 */}
        <div className="group-hover:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Image
            src={role.icon}
            alt=""
            width={64}
            height={64}
            className="rounded-[14px] lg:w-[98px] lg:h-[98px] lg:rounded-[20px]"
            loading="lazy"
            aria-hidden="true"
          />
        </div>

        {/* Desktop hover artwork — fills illustration area. Image has the   */}
        {/* description text baked in; red gradient + diamond pattern show   */}
        {/* through any transparent regions of the PNG.                      */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 bg-[#131628] bg-[radial-gradient(ellipse_at_bottom,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/images/diamond-pattern.svg')] bg-repeat opacity-40 mix-blend-overlay pointer-events-none"
          />
          <Image
            src={role.hoverImage}
            alt=""
            fill
            sizes="311px"
            className="relative z-10 object-cover object-top"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        {/* Screen-reader description (visual text is baked into hoverImage) */}
        <span className="sr-only">{role.description}</span>
      </div>

      {/* Title block — turns red on desktop hover */}
      <div className="relative z-10 flex flex-col gap-2 p-4 lg:p-0 lg:h-[88px] lg:items-center lg:justify-center lg:gap-0 lg:transition-colors lg:duration-300 lg:group-hover:bg-[linear-gradient(180deg,#ff7c81_0%,#ff2830_100%)] rounded-b-[20px]">
        <span className="text-[18px] lg:text-[32px] font-bold leading-none text-white">
          {role.name}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function Roles() {
  const [openId, setOpenId] = useState<RoleId | null>(null);
  const openRole = openId ? ROLES.find((r) => r.id === openId) : null;

  return (
    <section
      id="about"
      aria-labelledby="roles-heading"
      className="relative w-full bg-bg py-16 md:py-24 lg:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1620px] px-4 md:px-12">
        <header className="mb-10 md:mb-14 lg:mb-[60px] flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <h2
            id="roles-heading"
            className="text-[32px] lg:text-[72px] xl:text-[100px] font-extrabold leading-[1.05] lg:leading-none text-white lg:max-w-[1237px]"
          >
            Выбери <span className="text-accent">свою роль</span>
            {"  "}и погрузись в мир RP
          </h2>

          {/* Mobile / tablet subtitle */}
          <p className="text-[16px] font-medium leading-[1.4] text-text-muted lg:hidden">
            Будь тем, кем ты хочешь быть
          </p>

          {/* Desktop "Инфо" box — red gradient + diamond pattern */}
          <div className="relative hidden lg:flex shrink-0 w-[383px] h-[166px] items-center px-8 overflow-hidden rounded-[20px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[url('/images/diamond-pattern.svg')] bg-repeat opacity-60 mix-blend-overlay pointer-events-none"
            />
            <p className="relative z-10 text-[20px] font-medium leading-[1.4] text-white">
              Будь тем, кем ты хочешь быть
            </p>
          </div>
        </header>

        {/* Card row — 5 across desktop, 2-col grid mobile (195px cards)    */}
        {/* Desktop: even cards (Полицейский, Бандит) sit 49px higher per   */}
        {/* Figma 112:557 — staggered Y rhythm.                              */}
        <ul
          role="list"
          className="grid grid-cols-2 gap-3
                     min-[440px]:gap-4
                     lg:grid-cols-5 lg:gap-8 lg:justify-items-center lg:items-start lg:pt-[49px]"
        >
          {ROLES.map((role) => (
            <li
              key={role.id}
              className="flex justify-center lg:[&:nth-child(even)]:-translate-y-[49px]"
            >
              <RoleCard role={role} onOpen={setOpenId} />
            </li>
          ))}
        </ul>
      </div>

      {openRole && (
        <RolePopup role={openRole} onClose={() => setOpenId(null)} />
      )}
    </section>
  );
}
