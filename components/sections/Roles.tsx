"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type RoleId = "medic" | "military" | "police" | "bandit" | "businessman";

interface Role {
  id: RoleId;
  name: string;
  description: string;
  popupBody: string;
  illustration: string;
  icon: string;
  /** Figma node id — for reference only, see docs/DESIGN.md §2.4 */
  figmaNodeId: string;
}

/* ------------------------------------------------------------------ */
/*  Role data — copy verbatim from Figma                               */
/*  Popup body text: nodes 154:243, 154:271, 154:288, 154:307, 153:665 */
/*  Icons: raster images exported from Figma icon SLOT nodes           */
/*  Illustrations: exported from Figma Иллюстрация SLOT nodes          */
/* ------------------------------------------------------------------ */

const ROLES: Role[] = [
  {
    id: "medic",
    figmaNodeId: "112:292",
    name: "Медик",
    description:
      "Спасай жизни граждан: выезжай на вызовы и работай в связке с полицией и пожарными",
    popupBody:
      "Спасай жизни граждан: выезжай на вызовы и работай в связке  с полицией и пожарными",
    illustration: "/images/roles/medic.webp",
    icon: "/images/roles/medic-icon.png",
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
    icon: "/images/roles/military-icon.png",
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
    icon: "/images/roles/police-icon.png",
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
    icon: "/images/roles/bandit-icon.png",
  },
  {
    id: "businessman",
    figmaNodeId: "112:546",
    name: "Бизнесмен",
    description:
      "Открывай бизнес и управляй своей командой профессионалов, создавая свою империю",
    popupBody:
      "Открывай бизнес и управляй своей командой профессионалов, создавая свою империю",
    illustration: "/images/roles/businessman.webp",
    icon: "/images/roles/businessman-icon.png",
  },
];

/* ------------------------------------------------------------------ */
/*  RolePopup — modal detail per role                                  */
/*  Figma frames: `Попап с ролью_*` / `Попап_*` (DESIGN.md §2.4)       */
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
      className="group relative flex flex-col overflow-hidden rounded-[20px] bg-gradient-surface text-left transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                 w-[clamp(150px,44vw,195px)] aspect-195/498
                 lg:w-[311px] lg:h-[798px] lg:aspect-auto"
    >
      {/* Illustration area — 511 × 658 source per DESIGN.md §2.4 */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={role.illustration}
          alt={`Иллюстрация роли — ${role.name}`}
          fill
          sizes="(max-width: 1024px) 195px, 311px"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Bottom fade so text remains readable */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none bg-linear-to-t from-[rgba(14,14,15,0.95)] from-10% to-transparent"
        />

        {/* Role icon overlay — top left, Figma: 98×98, cornerRadius 20 */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
          <Image
            src={role.icon}
            alt=""
            width={64}
            height={64}
            className="rounded-[14px] lg:w-[78px] lg:h-[78px]"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Text block */}
      <div className="relative z-10 flex flex-col gap-2 p-4 lg:p-6">
        <span className="text-[18px] lg:text-[28px] font-bold leading-none text-white">
          {role.name}
        </span>
        <span className="text-[13px] lg:text-[16px] font-medium leading-[1.4] text-text-muted line-clamp-3 lg:line-clamp-4">
          {role.description}
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
        <header className="mb-10 md:mb-14 lg:mb-[60px] flex flex-col gap-3 md:gap-4">
          <h2
            id="roles-heading"
            className="text-[32px] lg:text-[54px] font-extrabold leading-[1.05] text-white max-w-[920px]"
          >
            Выбери свою роль и погрузись в мир RP
          </h2>
          <p className="text-[16px] lg:text-[20px] font-medium leading-[1.4] text-text-muted">
            Будь тем, кем ты хочешь быть
          </p>
        </header>

        {/* Card row — 5 across desktop, 2-col grid mobile (195px cards) */}
        <ul
          role="list"
          className="grid grid-cols-2 gap-3
                     min-[440px]:gap-4
                     lg:grid-cols-5 lg:gap-6 lg:justify-items-center"
        >
          {ROLES.map((role) => (
            <li key={role.id} className="flex justify-center">
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
