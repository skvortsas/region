import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PromoCode } from "@/components/ui/PromoCode";

const INFO_BLOCK_1 =
  "Region RP — это GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти, где ты строишь свою историю с нуля";
const INFO_BLOCK_2 =
  "Выбирай роль и займи место в мире, где всё зависит от твоих решений и скорости развития";

function InfoIconShield() {
  return (
    <span className="shrink-0 inline-flex items-center justify-center w-[58px] h-[58px] rounded-[20px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,40,48,0.35)_0%,transparent_70%)] [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.3)]">
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
          fill="url(#shield-gradient)"
        />
        <defs>
          <linearGradient
            id="shield-gradient"
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
  return (
    <span className="shrink-0 inline-flex items-center justify-center w-[58px] h-[58px] rounded-[20px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,40,48,0.35)_0%,transparent_70%)] [box-shadow:inset_0_0_0_1px_rgba(255,40,48,0.3)]">
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
          fill="url(#users-gradient)"
        />
        <defs>
          <linearGradient
            id="users-gradient"
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

// Figma node 99:1701 — 3 side-by-side right-pointing rounded equilateral triangles
// 67×33 viewport, each polygon 33×33, radial-gradient fill + LINEAR_DODGE stroke
function ScrollArrow() {
  return (
    <svg
      width="67"
      height="33"
      viewBox="0 0 67 33"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triangle 1 */}
      <path
        d="M28.1973 15.0762C28.6007 15.9823 28.6007 17.0177 28.1973 17.9238C27.9889 18.3916 27.5541 18.8513 26.7217 19.4395C25.8913 20.0262 24.7339 20.6951 23.1504 21.6094L17.5996 24.8135C16.016 25.7278 14.8579 26.3964 13.9346 26.8223C13.009 27.2491 12.393 27.3953 11.8838 27.3418C10.8975 27.238 10.0009 26.7213 9.41797 25.9189C9.117 25.5047 8.93689 24.8978 8.84375 23.8828C8.75085 22.8702 8.75 21.5328 8.75 19.7041L8.75 13.2959C8.75 11.4672 8.75085 10.1298 8.84375 9.11719C8.9369 8.1022 9.117 7.4953 9.41797 7.08105C10.0009 6.27872 10.8975 5.76198 11.8838 5.6582C12.393 5.60468 13.009 5.75091 13.9346 6.17773C14.8579 6.60357 16.016 7.2722 17.5996 8.18652L23.1504 11.3906C24.7339 12.3049 25.8913 12.9738 26.7217 13.5605C27.5541 14.1487 27.9889 14.6084 28.1973 15.0762Z"
        fill="url(#arrow-radial-0)"
        stroke="url(#arrow-stroke-0)"
        strokeLinejoin="round"
        className="mix-blend-plus-lighter"
      />
      {/* Triangle 2 */}
      <path
        d="M45.1973 15.0762C45.6007 15.9823 45.6007 17.0177 45.1973 17.9238C44.9889 18.3916 44.5541 18.8513 43.7217 19.4395C42.8913 20.0262 41.7339 20.6951 40.1504 21.6094L34.5996 24.8135C33.016 25.7278 31.8579 26.3964 30.9346 26.8223C30.009 27.2491 29.393 27.3953 28.8838 27.3418C27.8975 27.238 27.0009 26.7213 26.418 25.9189C26.117 25.5047 25.9369 24.8978 25.8437 23.8828C25.7509 22.8702 25.75 21.5328 25.75 19.7041L25.75 13.2959C25.75 11.4672 25.7509 10.1298 25.8437 9.11719C25.9369 8.1022 26.117 7.4953 26.418 7.08105C27.0009 6.27872 27.8975 5.76198 28.8838 5.6582C29.393 5.60468 30.009 5.75091 30.9346 6.17773C31.8579 6.60357 33.016 7.2722 34.5996 8.18652L40.1504 11.3906C41.7339 12.3049 42.8913 12.9738 43.7217 13.5605C44.5541 14.1487 44.9889 14.6084 45.1973 15.0762Z"
        fill="url(#arrow-radial-1)"
        stroke="url(#arrow-stroke-1)"
        strokeLinejoin="round"
        className="mix-blend-plus-lighter"
      />
      {/* Triangle 3 */}
      <path
        d="M62.1973 15.0762C62.6007 15.9823 62.6007 17.0177 62.1973 17.9238C61.9889 18.3916 61.5541 18.8513 60.7217 19.4395C59.8913 20.0262 58.7339 20.6951 57.1504 21.6094L51.5996 24.8135C50.016 25.7278 48.8579 26.3964 47.9346 26.8223C47.009 27.2491 46.393 27.3953 45.8838 27.3418C44.8975 27.238 44.0009 26.7213 43.418 25.9189C43.117 25.5047 42.9369 24.8978 42.8437 23.8828C42.7509 22.8702 42.75 21.5328 42.75 19.7041L42.75 13.2959C42.75 11.4672 42.7509 10.1298 42.8437 9.11719C42.9369 8.1022 43.117 7.4953 43.418 7.08105C44.0009 6.27872 44.8975 5.76198 45.8838 5.6582C46.393 5.60468 47.009 5.75091 47.9346 6.17773C48.8579 6.60357 50.016 7.2722 51.5996 8.18652L57.1504 11.3906C58.7339 12.3049 59.8913 12.9738 60.7217 13.5605C61.5541 14.1487 61.9889 14.6084 62.1973 15.0762Z"
        fill="url(#arrow-radial-2)"
        stroke="url(#arrow-stroke-2)"
        strokeLinejoin="round"
        className="mix-blend-plus-lighter"
      />
      <defs>
        <radialGradient
          id="arrow-radial-0"
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
          id="arrow-stroke-0"
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
          id="arrow-radial-1"
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
          id="arrow-stroke-1"
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
          id="arrow-radial-2"
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
          id="arrow-stroke-2"
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

export function Hero() {
  const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE ?? "";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg lg:min-h-[1080px]">
      <div aria-hidden="true" className="absolute inset-0 z-0 hidden lg:block">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Bottom shadow/fade — Figma node 88:87: 146px bottom-to-top gradient only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 hidden h-[146px] bg-linear-to-t from-bg to-transparent lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1620px] flex-col items-start justify-center px-4 py-20 md:px-12 lg:min-h-[1080px]">
        {/* Headline */}
        <h1 className="text-left font-extrabold tracking-tight">
          <span className="block text-[54px] leading-none md:text-[100px] text-white">
            Новый сервер
          </span>
          <span className="block text-[54px] leading-none md:text-[100px] bg-gradient-brand bg-clip-text text-transparent">
            GTA 5 RP
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-left text-[20px] md:text-[28px] font-bold text-white">
          успей раскрутиться раньше всех
        </p>

        {/* Two info blocks */}
        <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex items-start gap-4">
            <InfoIconShield />
            <p className="text-body font-medium text-text-secondary">
              {INFO_BLOCK_1}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <InfoIconUsers />
            <p className="text-body font-medium text-text-secondary">
              {INFO_BLOCK_2}
            </p>
          </div>
        </div>

        {/* Promo code + countdown */}
        <div className="mt-14">
          <PromoCode code="YAPROMO" targetDate={launchDate} />
        </div>

        {/* CTA */}
        <div className="mt-12 w-full max-w-[583px]">
          <Button variant="primary" href="#" className="w-full md:h-[88px]">
            Начать играть
          </Button>
        </div>

        {/* Decorative scroll arrow */}
        <div className="mt-16 text-white/60" aria-hidden="true">
          <ScrollArrow />
        </div>
      </div>
    </div>
  );
}
