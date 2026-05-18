import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";

const SOCIALS = ["discord", "vk", "telegram", "youtube"] as const;

const NAV_LINKS = [
  { label: "Пользовательское соглашение", href: "/terms" },
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Дисклеймер", href: "/disclaimer" },
  { label: "Политика обработки файлов cookie", href: "/cookies" },
  {
    label: "Согласие на обработку персональных данных",
    href: "/personal-data",
  },
] as const;

const PAYMENT_LOGOS = [
  { src: "/images/payment/visa.svg", alt: "Visa", width: 68, height: 22 },
  {
    src: "/images/payment/mastercard.svg",
    alt: "Mastercard",
    width: 40,
    height: 24,
  },
  { src: "/images/payment/sbp.svg", alt: "СБП", width: 57, height: 28 },
  { src: "/images/payment/mir.svg", alt: "Мир", width: 81, height: 24 },
] as const;

export function Footer() {
  return (
    // Figma node 175:438
    <footer
      aria-label="Подвал сайта"
      className="relative w-full bg-gradient-footer"
    >
      {/* Subtle top border: horizontal gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-footer-border"
      />

      {/* Inner container */}
      <div className="mx-auto w-full max-w-[1920px] px-5 py-[60px] lg:px-[150px] lg:pt-[100px] lg:pb-[72px]">
        {/* 4-column grid on desktop, stacked on mobile */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[auto_auto_auto_auto] lg:items-start lg:gap-[60px]">
          {/* Col 1: Logo + Legal entity + Socials */}
          <div className="flex flex-col gap-0 h-full">
            {/* Logo: 175:448, 205×43 */}
            <Image
              src="/images/logo-footer.svg"
              alt="Region RP"
              width={205}
              height={43}
              priority={false}
              loading="lazy"
            />

            {/* Legal entity line — 46px below logo */}
            <p className="mt-auto text-body font-medium leading-[1.4] text-white/80 max-w-[365px]">
              ООО «1 Геймс» <br /> ИНН 5260480189 <br /> ОГРН 1215200037535
            </p>
          </div>

          {/* Col 2: Информация (175:511) — nav links */}
          <div className="flex flex-col">
            <h2 className="text-body font-bold leading-[1.4] text-white">
              Информация
            </h2>
            {/* 46px gap between heading and first link */}
            <nav
              aria-label="Юридическая информация"
              className="mt-[46px] flex flex-col gap-[26px]"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-body font-medium leading-[1.4] text-white hover:text-text-muted transition-colors lg:w-[391px]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Контакты */}
          <div className="flex flex-col">
            <h2 className="text-body font-bold leading-[1.4] text-white">
              Контакты
            </h2>
            {/* 46px gap between heading and email */}
            <a
              href="mailto:hello@1games.ru"
              className="mt-[46px] text-body font-medium leading-[1.4] text-white hover:text-text-muted transition-colors"
            >
              hello@1games.ru
            </a>
          </div>

          {/* Col 4: Payment logos + Copyright + Disclaimer */}
          <div className="flex flex-col">
            {/* Payment row — 179:524, y=93 from col top */}
            <div className="flex items-center gap-[33px]">
              {PAYMENT_LOGOS.map(({ src, alt, width, height }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  loading="lazy"
                  className="mix-blend-luminosity opacity-50"
                />
              ))}
            </div>

            {/* Copyright — 297px below payment row */}
            <p className="mt-10 lg:mt-[297px] text-body font-medium leading-[1.4] text-white max-w-[365px]">
              Все права защищены © 2026 Копирование дизайна запрещено
            </p>

            {/* Task 3.I spec — not in Figma 175:438 */}
            <small className="mt-6 text-caption text-text-muted max-w-[365px]">
              Region RP — независимый fan-проект. Не аффилирован с Rockstar
              Games и Take-Two Interactive.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
