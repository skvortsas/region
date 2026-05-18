import Image from "next/image";
import Link from "next/link";

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

type LayoutVariant = "mobile" | "tablet" | "desktop";

function FooterBrand({ variant }: { variant: LayoutVariant }) {
  return (
    <div className="flex flex-col">
      <Image
        src="/images/logo-footer.svg"
        alt="Region RP"
        width={205}
        height={43}
        priority={false}
        loading="lazy"
        className={
          variant === "mobile"
            ? "h-auto w-[180px]"
            : "h-auto w-[clamp(180px,14vw,205px)]"
        }
      />

      <p
        className={[
          "text-body font-medium leading-[1.4] text-white/80 max-w-[365px]",
          variant === "desktop" ? "mt-auto" : "mt-8 min-[900px]:mt-10",
        ].join(" ")}
      >
        ООО «1 Геймс» <br /> ИНН 5260480189 <br /> ОГРН 1215200037535
      </p>
    </div>
  );
}

function FooterNav({ variant }: { variant: LayoutVariant }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-body font-bold leading-[1.4] text-white">
        Информация
      </h2>
      <nav
        aria-label="Юридическая информация"
        className={[
          "mt-[clamp(24px,4vw,46px)] flex flex-col",
          variant === "tablet"
            ? "gap-[clamp(16px,2.5vw,22px)]"
            : "gap-[clamp(16px,2.5vw,26px)]",
        ].join(" ")}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={[
              "text-body font-medium leading-[1.4] text-white transition-colors hover:text-text-muted",
              variant === "desktop" ? "max-w-[391px]" : "max-w-[420px]",
            ].join(" ")}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterContacts() {
  return (
    <div className="flex flex-col">
      <h2 className="text-body font-bold leading-[1.4] text-white">Контакты</h2>
      <a
        href="mailto:hello@1games.ru"
        className="mt-[clamp(24px,4vw,46px)] text-body font-medium leading-[1.4] text-white transition-colors hover:text-text-muted"
      >
        hello@1games.ru
      </a>
    </div>
  );
}

function FooterPayments({ variant }: { variant: LayoutVariant }) {
  return (
    <div
      className={[
        "flex flex-wrap items-center",
        variant === "desktop"
          ? "gap-[33px]"
          : "gap-x-[clamp(20px,3vw,33px)] gap-y-4",
      ].join(" ")}
    >
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
  );
}

function FooterLegal({ variant }: { variant: LayoutVariant }) {
  return (
    <div className="flex flex-col">
      <FooterPayments variant={variant} />

      <p
        className={[
          "text-body font-medium leading-[1.4] text-white max-w-[365px]",
          variant === "desktop"
            ? "mt-[clamp(80px,18vw,297px)]"
            : "mt-8 min-[900px]:mt-10",
        ].join(" ")}
      >
        Все права защищены © 2026 Копирование дизайна запрещено
      </p>

      <small className="mt-6 text-caption text-text-muted max-w-[365px]">
        Region RP — независимый fan-проект. Не аффилирован с Rockstar Games и
        Take-Two Interactive.
      </small>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      aria-label="Подвал сайта"
      className="relative w-full bg-gradient-footer"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-footer-border"
      />

      <div className="mx-auto w-full max-w-[1920px] px-5 py-[60px] md:px-12 min-[1340px]:px-[clamp(48px,7.8vw,150px)] min-[1340px]:pt-[100px] min-[1340px]:pb-[72px]">
        {/* Mobile (<900px) — single column stack */}
        <div className="flex flex-col gap-10 min-[900px]:hidden">
          <FooterBrand variant="mobile" />
          <FooterNav variant="mobile" />
          <FooterContacts />
          <FooterLegal variant="mobile" />
        </div>

        {/* Tablet (900–1339px) — 2-column grid + full-width legal row */}
        <div className="hidden min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-x-10 min-[900px]:gap-y-10 min-[1340px]:hidden">
          <FooterBrand variant="tablet" />
          <div className="flex flex-col gap-10">
            <FooterNav variant="tablet" />
            <FooterContacts />
          </div>
          <div className="col-span-2 border-t border-white/10 pt-10">
            <FooterLegal variant="tablet" />
          </div>
        </div>

        {/* Desktop (≥1340px) — 4-column grid */}
        <div className="hidden min-[1340px]:grid min-[1340px]:grid-cols-[minmax(200px,1fr)_minmax(280px,391px)_auto_minmax(260px,365px)] min-[1340px]:items-start min-[1340px]:gap-[clamp(32px,3.1vw,60px)]">
          <FooterBrand variant="desktop" />
          <FooterNav variant="desktop" />
          <FooterContacts />
          <FooterLegal variant="desktop" />
        </div>
      </div>
    </footer>
  );
}
