import type { ReactNode } from "react";
import { useId } from "react";
import { PromoCode } from "@/components/ui/PromoCode";

const INFO_BLOCK_1 =
  "Region RP — это GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти, где ты строишь свою историю с нуля";
const INFO_BLOCK_2 =
  "Выбирай роль и займи место в мире, где всё зависит от твоих решений и скорости развития";

type LayoutVariant = "mobile" | "tablet" | "desktop";

function InfoIconShield() {
  const gradientId = `${useId()}-shield-gradient`;

  return (
    <span className="inline-flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[20px] bg-[radial-gradient(85.47%_115.52%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.55)] backdrop-blur-[25px]">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.9521 24.1562C21.3121 23.7963 21.8695 23.7963 22.2295 24.1562L31.4463 33.3545C31.8418 33.7505 31.7876 34.3981 31.3018 34.668C29.7178 35.5499 27.7919 36 25.542 36H10.458C9.93601 36 9.72009 35.3883 10.0801 35.0283L20.9521 24.1562ZM25.542 0C30.1859 0 33.5163 1.96178 35.0283 5.47168C35.1903 5.79565 35.1 6.19192 34.8301 6.46191L6.46191 34.8301C6.20991 35.082 5.81364 35.1723 5.47168 35.0283C1.96178 33.5163 0 30.1859 0 25.542V10.458C0 4.68001 4.68001 0 10.458 0H25.542ZM35.0098 10.0801C35.3878 9.72008 36 9.93603 36 10.458V25.542C36 27.7919 35.5499 29.7358 34.668 31.3018C34.3981 31.7876 33.7505 31.8239 33.3545 31.4463L24.1377 22.2305C23.7778 21.8705 23.7779 21.3122 24.1377 20.9521L35.0098 10.0801ZM12.8164 6.37207C10.5125 6.37207 7.88427 7.70397 7.2002 10.6738C6.4262 13.9498 8.44232 16.7036 10.2783 18.4316C10.9803 19.0976 11.8984 19.4404 12.8164 19.4404C13.7342 19.4403 14.6516 19.1155 15.3535 18.4316C17.1715 16.7037 19.1875 13.9503 18.4316 10.6924C17.7477 7.70456 15.1203 6.37223 12.8164 6.37207ZM12.8701 9.88184C13.8599 9.882 14.6697 10.6919 14.6699 11.6816C14.6699 12.6715 13.86 13.4823 12.8701 13.4824C11.8801 13.4824 11.0703 12.6716 11.0703 11.6816C11.0705 10.6918 11.8622 9.88184 12.8701 9.88184Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="18"
            y1="0"
            x2="18"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF2830" />
            <stop offset="1" stopColor="#FF686E" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

function InfoIconUsers() {
  const gradientId = `${useId()}-users-gradient`;

  return (
    <span className="inline-flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[20px] bg-[radial-gradient(85.47%_115.52%_at_50%_100%,rgba(255,40,48,0.6)_0%,rgba(255,40,48,0)_100%)] [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.55)] backdrop-blur-[25px]">
      <svg
        width="35"
        height="34"
        viewBox="0 0 35 34"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.34961 20.6553C8.12662 17.4934 15.8615 17.4933 20.6045 20.6553C22.7463 22.0833 23.9195 24.0214 23.9365 26.1123C23.9364 28.2201 22.7461 30.1576 20.6045 31.6025C18.2245 33.2005 15.0958 34 11.9678 34C8.83993 33.9999 5.71191 33.2005 3.33203 31.6025C1.19042 30.1747 0.000181025 28.2372 0 26.1465C0 24.0555 1.19061 22.1003 3.34961 20.6553ZM20.4512 18.3428C24.208 17.2548 28.9338 17.9862 31.8408 20.332C33.4047 21.5899 34.2046 23.1709 34.0518 24.8027C33.9158 26.4516 32.8614 27.8796 31.0938 28.8486C29.3937 29.7836 27.251 30.2258 25.126 30.1748C26.3499 29.0699 27.0641 27.6933 27.2002 26.2314C27.3702 24.1235 26.3672 22.1003 24.3613 20.4854C23.2223 19.5844 21.8962 18.8698 20.4512 18.3428ZM11.9688 0C16.4225 0.000239001 20.043 3.62134 20.043 8.0752C20.0259 12.4441 16.6088 15.9798 12.2568 16.1328H12.1387C12.0368 16.1158 11.9005 16.1159 11.7646 16.1328C7.31072 15.9798 3.89366 12.4441 3.89355 8.0752C3.89355 3.6212 7.51475 0 11.9688 0ZM24.0557 3.51855C27.3875 3.22979 30.3624 5.71226 30.6514 9.07812C30.9233 12.3761 28.577 15.2662 25.3301 15.6572H25.2451C25.1432 15.6572 25.041 15.6574 24.9561 15.6914C23.3072 15.7763 21.7942 15.2491 20.6553 14.2803C22.4062 12.7163 23.409 10.3702 23.2051 7.82031C23.0861 6.44344 22.6104 5.18519 21.8965 4.11426C22.5425 3.79127 23.2907 3.58655 24.0557 3.51855Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="17.0351"
            y1="0"
            x2="17.0351"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF2830" />
            <stop offset="1" stopColor="#FF686E" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

interface InfoBlockProps {
  children: ReactNode;
  compact?: boolean;
  text: string;
  variant?: LayoutVariant;
}

function InfoBlock({
  children,
  compact = false,
  text,
  variant = "desktop",
}: InfoBlockProps) {
  const iconOffset =
    variant === "mobile" ? "left-[77px]" : "left-[clamp(68px,5vw,77px)]";

  return (
    <div
      className={[
        "relative w-full max-w-[427px] shrink-0",
        compact ? "min-h-[157px]" : "min-h-[186px]",
      ].join(" ")}
    >
      <div className="hero-info-card absolute inset-y-0 left-[30px] right-0 rounded-[20px]" />

      <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
        {children}
      </div>

      <p
        className={[
          "absolute top-[30px] z-10 max-w-[320px] font-medium text-white",
          iconOffset,
          variant === "mobile"
            ? "w-[calc(100%-107px)] text-[16px] leading-[22px]"
            : "w-[calc(100%-clamp(88px,8vw,107px))] text-[clamp(16px,1.25vw,20px)] leading-[1.4]",
        ].join(" ")}
      >
        {text}
      </p>
    </div>
  );
}

function HeroStarIcon() {
  const gradientId = `${useId()}-hero-star-gradient`;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="transition-[fill] duration-150 group-hover:fill-white group-focus-visible:fill-white"
        d="M13.9004 2.5886L15.8362 6.49216C16.1002 7.03556 16.8041 7.55677 17.398 7.65658L20.9066 8.24433C23.1504 8.62138 23.6783 10.2627 22.0615 11.8817L19.3338 14.632C18.8718 15.0978 18.6189 15.996 18.7619 16.6392L19.5428 20.0437C20.1587 22.7385 18.7399 23.781 16.3751 22.3726L13.0865 20.4097C12.4926 20.0548 11.5137 20.0548 10.9087 20.4097L7.62009 22.3726C5.26635 23.781 3.83651 22.7274 4.45244 20.0437L5.23336 16.6392C5.37634 15.996 5.12337 15.0978 4.66142 14.632L1.93372 11.8817C0.3279 10.2627 0.844843 8.62138 3.0886 8.24433L6.59721 7.65658C7.18014 7.55677 7.88406 7.03556 8.14804 6.49216L10.0838 2.5886C11.1397 0.470468 12.8555 0.470468 13.9004 2.5886Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="12"
          y1="1"
          x2="12"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroCtaButton({ variant = "desktop" }: { variant?: LayoutVariant }) {
  return (
    <a
      href="#howtoplay"
      className={[
        "hero-cta-button group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden rounded-[20px] border border-transparent font-bold leading-[102%] text-white/80 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none",
        variant === "mobile"
          ? "h-[72px] text-[20px]"
          : "h-[clamp(72px,5.5vw,88px)] text-[clamp(20px,1.75vw,28px)]",
      ].join(" ")}
    >
      <span className="relative z-10 shrink-0">
        <HeroStarIcon />
      </span>
      <span className="relative z-10">Начать играть</span>
    </a>
  );
}

function ScrollArrow({ className = "" }: { className?: string }) {
  const id = useId();
  const radial0 = `${id}-arrow-radial-0`;
  const stroke0 = `${id}-arrow-stroke-0`;
  const radial1 = `${id}-arrow-radial-1`;
  const stroke1 = `${id}-arrow-stroke-1`;
  const radial2 = `${id}-arrow-radial-2`;
  const stroke2 = `${id}-arrow-stroke-2`;

  return (
    <svg
      width="67"
      height="33"
      viewBox="0 0 67 33"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M28.1973 15.0762C28.6007 15.9823 28.6007 17.0177 28.1973 17.9238C27.9889 18.3916 27.5541 18.8513 26.7217 19.4395C25.8913 20.0262 24.7339 20.6951 23.1504 21.6094L17.5996 24.8135C16.016 25.7278 14.8579 26.3964 13.9346 26.8223C13.009 27.2491 12.393 27.3953 11.8838 27.3418C10.8975 27.238 10.0009 26.7213 9.41797 25.9189C9.117 25.5047 8.93689 24.8978 8.84375 23.8828C8.75085 22.8702 8.75 21.5328 8.75 19.7041L8.75 13.2959C8.75 11.4672 8.75085 10.1298 8.84375 9.11719C8.9369 8.1022 9.117 7.4953 9.41797 7.08105C10.0009 6.27872 10.8975 5.76198 11.8838 5.6582C12.393 5.60468 13.009 5.75091 13.9346 6.17773C14.8579 6.60357 16.016 7.2722 17.5996 8.18652L23.1504 11.3906C24.7339 12.3049 25.8913 12.9738 26.7217 13.5605C27.5541 14.1487 27.9889 14.6084 28.1973 15.0762Z"
        fill={`url(#${radial0})`}
        stroke={`url(#${stroke0})`}
        strokeLinejoin="round"
        className="mix-blend-plus-lighter"
      />
      <path
        d="M45.1973 15.0762C45.6007 15.9823 45.6007 17.0177 45.1973 17.9238C44.9889 18.3916 44.5541 18.8513 43.7217 19.4395C42.8913 20.0262 41.7339 20.6951 40.1504 21.6094L34.5996 24.8135C33.016 25.7278 31.8579 26.3964 30.9346 26.8223C30.009 27.2491 29.393 27.3953 28.8838 27.3418C27.8975 27.238 27.0009 26.7213 26.418 25.9189C26.117 25.5047 25.9369 24.8978 25.8437 23.8828C25.7509 22.8702 25.75 21.5328 25.75 19.7041L25.75 13.2959C25.75 11.4672 25.7509 10.1298 25.8437 9.11719C25.9369 8.1022 26.117 7.4953 26.418 7.08105C27.0009 6.27872 27.8975 5.76198 28.8838 5.6582C29.393 5.60468 30.009 5.75091 30.9346 6.17773C31.8579 6.60357 33.016 7.2722 34.5996 8.18652L40.1504 11.3906C41.7339 12.3049 42.8913 12.9738 43.7217 13.5605C44.5541 14.1487 44.9889 14.6084 45.1973 15.0762Z"
        fill={`url(#${radial1})`}
        stroke={`url(#${stroke1})`}
        strokeLinejoin="round"
        className="mix-blend-plus-lighter"
      />
      <path
        d="M62.1973 15.0762C62.6007 15.9823 62.6007 17.0177 62.1973 17.9238C61.9889 18.3916 61.5541 18.8513 60.7217 19.4395C59.8913 20.0262 58.7339 20.6951 57.1504 21.6094L51.5996 24.8135C50.016 25.7278 48.8579 26.3964 47.9346 26.8223C47.009 27.2491 46.393 27.3953 45.8838 27.3418C44.8975 27.238 44.0009 26.7213 43.418 25.9189C43.117 25.5047 42.9369 24.8978 42.8437 23.8828C42.7509 22.8702 42.75 21.5328 42.75 19.7041L42.75 13.2959C42.75 11.4672 42.7509 10.1298 42.8437 9.11719C42.9369 8.1022 43.117 7.4953 43.418 7.08105C44.0009 6.27872 44.8975 5.76198 45.8838 5.6582C46.393 5.60468 47.009 5.75091 47.9346 6.17773C48.8579 6.60357 50.016 7.2722 51.5996 8.18652L57.1504 11.3906C58.7339 12.3049 59.8913 12.9738 60.7217 13.5605C61.5541 14.1487 61.9889 14.6084 62.1973 15.0762Z"
        fill={`url(#${radial2})`}
        stroke={`url(#${stroke2})`}
        strokeLinejoin="round"
        className="mix-blend-plus-lighter"
      />
      <defs>
        <radialGradient
          id={radial0}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-7.21238e-07 16.5) scale(52.5091 22.4644)"
        >
          <stop stopColor="#FF2830" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={stroke0}
          x1="2.08157e-05"
          y1="33"
          x2="2.22582e-05"
          y2="-1.44247e-06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" stopOpacity="0.2" />
          <stop offset="0.495192" stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient
          id={radial1}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(17 16.5) scale(52.5091 22.4644)"
        >
          <stop stopColor="#FF2830" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={stroke1}
          x1="17"
          y1="33"
          x2="17"
          y2="-1.44247e-06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" stopOpacity="0.2" />
          <stop offset="0.495192" stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient
          id={radial2}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(34 16.5) scale(52.5091 22.4644)"
        >
          <stop stopColor="#FF2830" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={stroke2}
          x1="34"
          y1="33"
          x2="34"
          y2="-1.44247e-06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" stopOpacity="0.2" />
          <stop offset="0.495192" stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroSubtitleBackdropMobile() {
  const id = useId();
  const fillId = `${id}-hero-subtitle-mobile-fill`;
  const strokeId = `${id}-hero-subtitle-mobile-stroke`;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      width="135"
      height="75"
      viewBox="0 0 135 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2.4848H62.6641C67.5426 2.48488 71.4979 6.43932 71.498 11.3178C71.498 16.5014 75.7002 20.7036 80.8838 20.7036H118.989C121.794 20.7036 123.881 20.7042 125.535 20.8393C127.186 20.9741 128.38 21.2423 129.404 21.7641C131.234 22.6963 132.721 24.1837 133.653 26.0131C134.175 27.0373 134.443 28.2319 134.578 29.8823C134.713 31.5359 134.714 33.6233 134.714 36.4282V58.5346C134.714 61.3391 134.713 63.426 134.578 65.0795C134.443 66.73 134.175 67.9245 133.653 68.9487C132.721 70.7783 131.234 72.2664 129.404 73.1987C128.38 73.7205 127.186 73.9877 125.535 74.1225C123.881 74.2576 121.794 74.2582 118.989 74.2582H16C13.1952 74.2582 11.1078 74.2576 9.4541 74.1225C7.80387 73.9876 6.60903 73.7205 5.58496 73.1987C3.75538 72.2664 2.26817 70.7783 1.33594 68.9487C0.814123 67.9245 0.545977 66.7299 0.411133 65.0795C0.276044 63.426 0.276367 61.3391 0.276367 58.5346V18.2084C0.276367 15.4036 0.276022 13.3162 0.411133 11.6625C0.54599 10.0123 0.814143 8.81748 1.33594 7.7934C2.26815 5.96402 3.75558 4.47659 5.58496 3.54437C6.60904 3.02258 7.80385 2.75442 9.4541 2.61957C11.1078 2.48446 13.1952 2.4848 16 2.4848Z"
        fill={`url(#${fillId})`}
      />
      <path
        d="M16 2.4848H62.6641C67.5426 2.48488 71.4979 6.43932 71.498 11.3178C71.498 16.5014 75.7002 20.7036 80.8838 20.7036H118.989C121.794 20.7036 123.881 20.7042 125.535 20.8393C127.186 20.9741 128.38 21.2423 129.404 21.7641C131.234 22.6963 132.721 24.1837 133.653 26.0131C134.175 27.0373 134.443 28.2319 134.578 29.8823C134.713 31.5359 134.714 33.6233 134.714 36.4282V58.5346C134.714 61.3391 134.713 63.426 134.578 65.0795C134.443 66.73 134.175 67.9245 133.653 68.9487C132.721 70.7783 131.234 72.2664 129.404 73.1987C128.38 73.7205 127.186 73.9877 125.535 74.1225C123.881 74.2576 121.794 74.2582 118.989 74.2582H16C13.1952 74.2582 11.1078 74.2576 9.4541 74.1225C7.80387 73.9876 6.60903 73.7205 5.58496 73.1987C3.75538 72.2664 2.26817 70.7783 1.33594 68.9487C0.814123 67.9245 0.545977 66.7299 0.411133 65.0795C0.276044 63.426 0.276367 61.3391 0.276367 58.5346V18.2084C0.276367 15.4036 0.276022 13.3162 0.411133 11.6625C0.54599 10.0123 0.814143 8.81748 1.33594 7.7934C2.26815 5.96402 3.75558 4.47659 5.58496 3.54437C6.60904 3.02258 7.80385 2.75442 9.4541 2.61957C11.1078 2.48446 13.1952 2.4848 16 2.4848Z"
        stroke={`url(#${strokeId})`}
        strokeWidth="0.552105"
        className="mix-blend-plus-lighter"
      />
      <defs>
        <radialGradient
          id={fillId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(67.4948 66.8047) rotate(-90) scale(102.784 91.8926)"
        >
          <stop stopColor="#FF2830" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={strokeId}
          x1="134.99"
          y1="66.8047"
          x2="0"
          y2="66.8047"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" stopOpacity="0.2" />
          <stop offset="0.495192" stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroSubtitleBackdropDesktop() {
  const id = useId();
  const fillId = `${id}-hero-subtitle-fill`;
  const strokeId = `${id}-hero-subtitle-stroke`;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 245 131"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M32 0.5H113.5C122.337 0.5 129.5 7.66344 129.5 16.5C129.5 25.8888 137.111 33.5 146.5 33.5H212.5C218.109 33.5 222.286 33.5001 225.596 33.7705C228.899 34.0405 231.296 34.5771 233.353 35.625C237.022 37.4945 240.005 40.4783 241.875 44.1475C242.923 46.2042 243.46 48.6006 243.729 51.9043C244 55.2143 244 59.3912 244 65V99C244 104.609 244 108.786 243.729 112.096C243.46 115.399 242.923 117.796 241.875 119.853C240.005 123.522 237.022 126.505 233.353 128.375C231.296 129.423 228.899 129.96 225.596 130.229C222.286 130.5 218.109 130.5 212.5 130.5H32C26.3912 130.5 22.2143 130.5 18.9043 130.229C15.6006 129.96 13.2042 129.423 11.1475 128.375C7.4783 126.505 4.49453 123.522 2.625 119.853C1.57714 117.796 1.04046 115.399 0.770508 112.096C0.500074 108.786 0.5 104.609 0.5 99V32C0.5 26.3912 0.500074 22.2143 0.770508 18.9043C1.04046 15.6006 1.57714 13.2042 2.625 11.1475C4.49453 7.4783 7.4783 4.49453 11.1475 2.625C13.2042 1.57713 15.6006 1.04046 18.9043 0.770508C22.2143 0.500074 26.3912 0.5 32 0.5Z"
        fill={`url(#${fillId})`}
      />
      <path
        d="M32 0.5H113.5C122.337 0.5 129.5 7.66344 129.5 16.5C129.5 25.8888 137.111 33.5 146.5 33.5H212.5C218.109 33.5 222.286 33.5001 225.596 33.7705C228.899 34.0405 231.296 34.5771 233.353 35.625C237.022 37.4945 240.005 40.4783 241.875 44.1475C242.923 46.2042 243.46 48.6006 243.729 51.9043C244 55.2143 244 59.3912 244 65V99C244 104.609 244 108.786 243.729 112.096C243.46 115.399 242.923 117.796 241.875 119.853C240.005 123.522 237.022 126.505 233.353 128.375C231.296 129.423 228.899 129.96 225.596 130.229C222.286 130.5 218.109 130.5 212.5 130.5H32C26.3912 130.5 22.2143 130.5 18.9043 130.229C15.6006 129.96 13.2042 129.423 11.1475 128.375C7.4783 126.505 4.49453 123.522 2.625 119.853C1.57714 117.796 1.04046 115.399 0.770508 112.096C0.500074 108.786 0.5 104.609 0.5 99V32C0.5 26.3912 0.500074 22.2143 0.770508 18.9043C1.04046 15.6006 1.57714 13.2042 2.625 11.1475C4.49453 7.4783 7.4783 4.49453 11.1475 2.625C13.2042 1.57713 15.6006 1.04046 18.9043 0.770508C22.2143 0.500074 26.3912 0.5 32 0.5Z"
        stroke={`url(#${strokeId})`}
        className="mix-blend-plus-lighter"
      />
      <defs>
        <radialGradient
          id={fillId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(122.25 117) rotate(-90) scale(186.168 166.44)"
        >
          <stop stopColor="#FF2830" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={strokeId}
          x1="244.5"
          y1="117"
          x2="0"
          y2="117"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2830" stopOpacity="0.2" />
          <stop offset="0.495192" stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF2830" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroHeadlineMobile() {
  return (
    <div className="absolute left-5 top-[10px] h-[176px] w-[400px] max-w-[calc(100%-2.5rem)]">
      <div
        aria-hidden="true"
        className="hero-headline-backdrop-mobile pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="hero-subtitle-backdrop-mobile pointer-events-none absolute left-[247.9px] top-[22.64px] h-[74.54px] w-[134.99px]"
      >
        <HeroSubtitleBackdropMobile />
      </div>

      <h1 className="absolute left-[16.56px] top-[16.56px] h-[139.6px] w-[328.5px] text-left font-extrabold tracking-normal">
        <span className="absolute left-0 top-0 block w-[328.5px] text-[54px] leading-[43.2px] text-white">
          Новый сервер
        </span>
        <span className="absolute left-0 top-[101.59px] block w-[328.5px] bg-gradient-brand bg-clip-text text-[54px] leading-[55.08px] text-transparent">
          GTA 5 RP
        </span>
      </h1>

      <p className="absolute left-[262px] top-[39px] w-[105px] text-left text-[14px] font-bold leading-[16.8px] text-white">
        успей раскрутиться раньше всех
      </p>

      <div
        className="absolute left-[324.64px] top-[22.64px] h-[18.22px] w-[36.99px] [&>svg]:h-full [&>svg]:w-full"
        aria-hidden="true"
      >
        <ScrollArrow />
      </div>
    </div>
  );
}

function HeroHeadlineTablet() {
  return (
    <div className="relative w-full max-w-[720px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px] bg-[linear-gradient(180deg,rgba(14,14,15,0.5)_0%,rgba(17,17,23,0.5)_100%)] backdrop-blur-[25px]"
      />

      <div className="relative z-10 px-6 py-6 min-[1100px]:px-8 min-[1100px]:py-8">
        <h1 className="text-left font-extrabold tracking-normal">
          <span className="block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.8] text-white">
            Новый сервер
          </span>
          <span className="mt-2 block bg-gradient-brand bg-clip-text text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] text-transparent">
            GTA 5 RP
          </span>
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="max-w-[280px] text-left text-[clamp(14px,1.6vw,22px)] font-bold leading-[1.2] text-white">
            успей раскрутиться раньше всех
          </p>
          <ScrollArrow className="h-[18px] w-auto min-[1100px]:h-[24px]" />
        </div>
      </div>
    </div>
  );
}

function HeroHeadlineDesktop() {
  return (
    <div className="relative w-full max-w-[724px] aspect-724/319">
      <div
        aria-hidden="true"
        className="hero-headline-backdrop pointer-events-none absolute top-[-9.4%] left-0 h-full w-full"
      />

      <div
        aria-hidden="true"
        className="hero-subtitle-backdrop pointer-events-none absolute left-[62%] top-[3.4%] h-[41%] w-[33.8%]"
      >
        <HeroSubtitleBackdropDesktop />
      </div>

      <h1 className="absolute inset-0 text-left font-extrabold tracking-normal">
        <span className="absolute left-[4.1%] top-0 block w-[82%] text-[clamp(3rem,6.2vw,6.25rem)] leading-[0.8] text-white">
          Новый сервер
        </span>
        <span className="absolute left-[4.1%] top-[57.7%] block w-[82%] bg-gradient-brand bg-clip-text text-[clamp(3rem,6.2vw,6.25rem)] leading-[1.02] text-transparent">
          GTA 5 RP
        </span>
      </h1>

      <p className="absolute left-[64.8%] top-[10.5%] w-[29%] text-left text-[clamp(16px,1.75vw,28px)] font-bold leading-[1.2] text-white">
        успей раскрутиться раньше всех
      </p>

      <div
        className="absolute left-[81.2%] top-[3.4%] w-[9.2%] [&>svg]:h-auto [&>svg]:w-full"
        aria-hidden="true"
      >
        <ScrollArrow />
      </div>
    </div>
  );
}

function HeroActions({
  launchDate,
  variant = "desktop",
}: {
  launchDate: string;
  variant?: LayoutVariant;
}) {
  return (
    <>
      <div className="w-full max-w-[583px]">
        <PromoCode code="YAPROMO" targetDate={launchDate} />
      </div>
      <div className="w-full max-w-[583px]">
        <HeroCtaButton variant={variant} />
      </div>
    </>
  );
}

function HeroInfoBlocks({ variant }: { variant: LayoutVariant }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <InfoBlock text={INFO_BLOCK_1} variant={variant}>
        <InfoIconShield />
      </InfoBlock>
      <InfoBlock compact text={INFO_BLOCK_2} variant={variant}>
        <InfoIconUsers />
      </InfoBlock>
    </div>
  );
}

export function Hero() {
  const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE ?? "";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg pt-20 min-[1340px]:min-h-[1080px] min-[1340px]:pt-0">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 hidden h-[146px] bg-linear-to-t from-bg to-transparent min-[1340px]:block"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1620px] flex-col justify-center px-4 py-20 md:px-12 min-[1340px]:min-h-[1080px] min-[1340px]:py-0">
        {/* Mobile (<900px) */}
        <div className="relative w-full min-[900px]:hidden">
          <HeroHeadlineMobile />
          <div aria-hidden="true" className="h-[216px] shrink-0" />

          <div className="mt-12 flex w-full flex-col gap-6">
            <HeroInfoBlocks variant="mobile" />
            <HeroActions launchDate={launchDate} variant="mobile" />
          </div>
        </div>

        {/* Tablet (900–1339px) */}
        <div className="hidden w-full flex-col gap-8 min-[900px]:flex min-[1340px]:hidden">
          <HeroHeadlineTablet />
          <HeroInfoBlocks variant="tablet" />
          <HeroActions launchDate={launchDate} variant="tablet" />
        </div>

        {/* Desktop (≥1340px) */}
        <div className="hidden w-full min-[1340px]:grid min-[1340px]:grid-cols-[1fr_min(427px,26.4%)] min-[1340px]:items-start min-[1340px]:gap-x-[clamp(24px,3vw,50px)] min-[1340px]:pt-[132px]">
          <div className="flex min-w-0 flex-col gap-10">
            <HeroHeadlineDesktop />
            <HeroActions launchDate={launchDate} variant="desktop" />
          </div>

          <div className="flex flex-col gap-6 pt-[30px]">
            <HeroInfoBlocks variant="desktop" />
          </div>
        </div>
      </div>
    </div>
  );
}
