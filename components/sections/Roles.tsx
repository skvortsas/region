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
  /** Character art shown inside the desktop modal background (stub TBD) */
  modalArt: string;
  /** Character art shown inside the mobile modal background (stub TBD)  */
  modalArtMobile: string;
  /** Video src shown in modals (desktop + mobile, stub: empty)          */
  modalVideo: string;
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
    modalArt: "/images/roles/businessman.webp",
    modalArtMobile: "/images/roles/businessman.webp",
    modalVideo: "/videos/businessman.mp4",
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
    modalArt: "/images/roles/police.webp",
    modalArtMobile: "/images/roles/police.webp",
    modalVideo: "/videos/police.mp4",
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
    modalArt: "/images/roles/military.webp",
    modalArtMobile: "/images/roles/military.webp",
    modalVideo: "/videos/military.mp4",
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
    modalArt: "/images/roles/bandit.webp",
    modalArtMobile: "/images/roles/bandit.webp",
    modalVideo: "/videos/bandit.mp4",
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
    modalArt: "/images/roles/medic.webp",
    modalArtMobile: "/images/roles/medic.webp",
    modalVideo: "/videos/medic.mp4",
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

  const CloseButton = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Закрыть"
      className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors bg-black/30 backdrop-blur-sm"
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
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`role-popup-title-${role.id}`}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 lg:px-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Mobile popup — 385×596 layout from Figma 274:2443 / 274:2477 /    */}
      {/* 274:2507 / 274:2523 / 274:2539. Header (icon + title), description,*/}
      {/* video stub, with character art faded into the bottom half.        */}
      <div
        ref={dialogRef}
        className="lg:hidden relative w-full max-w-[385px] max-h-[90vh] overflow-hidden rounded-[20px] bg-[#131628] bg-[radial-gradient(ellipse_at_top_left,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_60%)] pt-5 px-5 pb-[200px] border border-purple/40 shadow-[0_0_60px_rgba(255,40,48,0.35),0_0_120px_rgba(255,40,48,0.15)]"
      >
        {/* Background character art — bottom portion, behind content      */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none z-0"
        >
          <Image
            src={role.modalArtMobile}
            alt=""
            fill
            sizes="385px"
            className="object-cover object-top"
            loading="lazy"
          />
          {/* Top fade so the art blends into the gradient background */}
          <div className="absolute inset-0 bg-linear-to-b from-[#131628] from-0% via-transparent via-30% to-transparent" />
        </div>

        {CloseButton}

        {/* Content stack */}
        <div className="relative z-10 flex flex-col gap-[15px]">
          {/* Header — icon + title */}
          <div className="flex items-center gap-5">
            <div className="relative w-[48px] h-[48px] shrink-0 rounded-[10px] overflow-hidden">
              <Image
                src={role.icon}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            <h3
              id={`role-popup-title-${role.id}`}
              className="text-[24px] font-bold leading-none text-white"
            >
              {role.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[18px] font-medium leading-[1.4] text-white">
            {role.popupBody}
          </p>

          {/* Video stub — replace src on Role.modalVideo when available */}
          <div className="relative w-full aspect-345/190 rounded-[10px] bg-white overflow-hidden shrink-0">
            {role.modalVideo ? (
              <video
                src={role.modalVideo}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-black/40 text-[12px] font-medium tracking-wider uppercase">
                Видео • placeholder
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop popup — 1620×862 wide layout from Figma 153:644 / 154:232  */}
      {/* / 154:260 / 154:277 / 154:296. Character art on the right (stub:   */}
      {/* role.modalArt), 28px description top-right, 36px title + 98×98     */}
      {/* icon top-left, 976×537 white video stub bottom-left.               */}
      <div
        ref={dialogRef}
        className="hidden lg:flex relative w-full max-w-[1620px] aspect-1620/862 max-h-[90vh] flex-col rounded-[20px] overflow-hidden bg-[#131628] bg-[radial-gradient(circle_at_top_left,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_55%)]"
      >
        {/* Background character art — right half, behind content (stub) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-[55%] pointer-events-none z-0"
        >
          <Image
            src={role.modalArt}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 0px"
            className="object-cover object-center"
            loading="lazy"
          />
          {/* Soft fade on the left edge so the art blends into the bg */}
          <div className="absolute inset-0 bg-linear-to-r from-[#131628] from-0% via-transparent via-40% to-transparent" />
        </div>

        {CloseButton}

        {/* Content layer — single column constrained to video width so the */}
        {/* description never extends past the video's right edge.            */}
        <div className="relative z-10 flex flex-col h-full p-[3vw] xl:p-[50px]">
          <div className="flex flex-col w-[60%] gap-[1.5vw] xl:gap-[28px]">
            {/* Header row — icon + title on the left, description on right */}
            <div className="flex items-start gap-[2vw] xl:gap-[40px]">
              <div className="flex items-center gap-[35px] shrink-0">
                <div className="relative w-[7vw] xl:w-[98px] aspect-square shrink-0 rounded-[20px] overflow-hidden">
                  <Image
                    src={role.icon}
                    alt=""
                    fill
                    sizes="98px"
                    className="object-cover"
                    loading="lazy"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  id={`role-popup-title-${role.id}`}
                  className="text-[clamp(24px,2.4vw,36px)] font-bold leading-none text-white whitespace-nowrap"
                >
                  {role.name}
                </h3>
              </div>

              <p className="text-[clamp(16px,1.55vw,24px)] font-medium leading-[1.4] text-white flex-1">
                {role.popupBody}
              </p>
            </div>

            {/* Video stub — replace src on Role.modalVideo when available */}
            <div className="relative w-full aspect-976/537 rounded-[20px] bg-white overflow-hidden shrink-0">
              {role.modalVideo ? (
                <video
                  src={role.modalVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-black/40 text-[14px] font-medium tracking-wider uppercase">
                  Видео • placeholder
                </div>
              )}
            </div>
          </div>
        </div>
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
                 w-[clamp(150px,44vw,195px)] aspect-195/488
                 lg:w-[311px] lg:h-[798px] lg:aspect-auto"
    >
      {/* Illustration area */}
      <div className="relative flex-1 overflow-hidden rounded-t-[20px]">
        <Image
          src={role.illustration}
          alt={`Иллюстрация роли — ${role.name}`}
          fill
          sizes="(max-width: 1024px) 195px, 311px"
          className="object-cover object-top transition-transform duration-300 lg:group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Mobile description — always visible (no hover on mobile).       */}
        {/* Figma: "Описание" frame 271:2323, 195×97, red gradient +        */}
        {/* diamond pattern.                                                 */}
        <div className="lg:hidden absolute inset-x-0 bottom-0 h-[97px] flex items-center justify-center px-2 overflow-hidden z-10 bg-[#131628] bg-[radial-gradient(ellipse_at_bottom,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/images/diamond-pattern.svg')] bg-repeat opacity-40 mix-blend-overlay pointer-events-none"
          />
          <p className="relative z-10 text-[11px] font-medium leading-[1.4] text-white text-center">
            {role.description}
          </p>
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
      </div>

      {/* Role icon overlay — sibling of illustration so it can overhang    */}
      {/* the rounded top corner. Hover-hide is desktop-only.               */}
      {/* Figma mobile: 62×62; desktop: 98×98, cornerRadius 20.             */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 lg:group-hover:hidden">
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

      {/* Title block — mobile: 56px purple radial gradient (Figma 271:2327).*/}
      {/* Desktop: 88px, turns red on hover.                                 */}
      <div
        className="relative z-10 flex items-center justify-center h-[56px] rounded-b-[20px] overflow-hidden
                      bg-[radial-gradient(ellipse_at_bottom,rgba(80,76,108,0.6)_0%,rgba(80,76,108,0)_100%)]
                      lg:h-[88px] lg:bg-none lg:transition-colors lg:duration-300
                      lg:group-hover:bg-[linear-gradient(180deg,#ff7c81_0%,#ff2830_100%)]"
      >
        <span className="text-[20px] lg:text-[32px] font-bold leading-none text-white">
          {role.name}
        </span>
      </div>

      {/* Screen-reader description — visual text on desktop is baked into  */}
      {/* hoverImage; mobile shows it too but keep for parity.               */}
      <span className="sr-only">{role.description}</span>
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
              className="flex justify-center lg:even:translate-y-[-49px]"
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
