"use client";

import { useEffect, useState } from "react";

interface PromoCodeProps {
  code: string;
  targetDate: string;
}

interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
}

const ZERO_COUNTDOWN: Countdown = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

function getCountdown(targetDate: string): Countdown {
  if (!targetDate) return ZERO_COUNTDOWN;

  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return ZERO_COUNTDOWN;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function PromoCode({ code, targetDate }: PromoCodeProps) {
  const [countdown, setCountdown] = useState<Countdown>(ZERO_COUNTDOWN);

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="promo-card relative h-[183px] w-full max-w-[400px] overflow-hidden rounded-[20px] lg:h-[267px] lg:max-w-[583px]">
      <p className="absolute left-[20.57px] top-[20.46px] w-[192.14px] text-[12px] font-medium leading-[14.4px] text-white lg:left-[30px] lg:top-[26px] lg:w-[280px] lg:text-[18px] lg:leading-[21.6px]">
        Лимитированный промокод для первых игроков
      </p>

      <p className="absolute left-[20.58px] top-[58.32px] w-[192.11px] text-[12px] font-medium leading-[14.4px] text-white lg:left-[30px] lg:top-[85px] lg:w-[280px] lg:text-[18px] lg:leading-[21.6px]">
        Активируй и получи преимущество на старте
      </p>

      <div className="promo-timer-panel absolute right-[15.17px] top-[13.72px] h-[74.76px] w-[160.48px] rounded-[20px] lg:right-[20px] lg:top-[20px] lg:h-[114px] lg:w-[236px]">
        <p className="absolute left-[13px] top-[13px] w-[134.48px] text-center text-[8px] font-medium leading-[11.2px] text-[#ff434a] lg:left-[20px] lg:top-[17px] lg:w-[196px] lg:text-[12px] lg:leading-[16.8px]">
          До конца действия промокода
        </p>

        <div className="absolute left-[11.28px] top-[27px] h-[21.96px] w-[137px] lg:left-[17.5px] lg:top-[42px] lg:h-[32px] lg:w-[201px]">
          <span className="absolute left-0 top-0 w-[39.11px] text-center text-[30px] font-medium leading-[22px] text-white lg:w-[57px] lg:text-[46px] lg:leading-[32px]">
            {countdown.hours}
          </span>
          <span className="absolute left-[44.6px] top-[6.52px] h-[8.92px] w-px bg-white lg:left-[65px] lg:top-[9.5px] lg:h-[13px]" />
          <span className="absolute left-[50.09px] top-0 w-[37.74px] text-center text-[30px] font-medium leading-[22px] text-white lg:left-[73px] lg:w-[55px] lg:text-[46px] lg:leading-[32px]">
            {countdown.minutes}
          </span>
          <span className="absolute left-[93.31px] top-[6.52px] h-[8.92px] w-px bg-white lg:left-[136px] lg:top-[9.5px] lg:h-[13px]" />
          <span className="absolute left-[98.8px] top-0 w-[39.11px] text-center text-[30px] font-medium leading-[22px] text-white lg:left-[144px] lg:w-[57px] lg:text-[46px] lg:leading-[32px]">
            {countdown.seconds}
          </span>
        </div>

        <div className="absolute left-[21.41px] top-[53.76px] h-[8px] w-[118px] lg:left-[31.5px] lg:top-[81px] lg:h-[13px] lg:w-[161px]">
          <span className="absolute left-0 top-0 w-[22px] text-center text-[12px] font-medium leading-[8px] text-white/60 lg:w-[32px] lg:text-[18px] lg:leading-[13px]">
            час
          </span>
          <span className="absolute left-[45.33px] top-0 w-[27px] text-center text-[12px] font-medium leading-[8px] text-white/60 lg:left-[66px] lg:w-[40px] lg:text-[18px] lg:leading-[13px]">
            мин
          </span>
          <span className="absolute left-[95.66px] top-0 w-[22px] text-center text-[12px] font-medium leading-[8px] text-white/60 lg:left-[140px] lg:w-[33px] lg:text-[18px] lg:leading-[13px]">
            сек
          </span>
        </div>
      </div>

      <div
        className="promo-code-panel absolute inset-x-0 bottom-0 h-[78.22px] rounded-[20px] lg:h-[114px]"
        aria-label={`Промокод ${code}`}
      >
        <svg
          className="absolute left-[68.73px] top-[23.33px] h-[31.56px] w-[31.56px] lg:left-[104px] lg:top-[34px] lg:h-[46px] lg:w-[46px]"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.5 7.39444C40.5 4.41517 38.0259 2 34.974 2H20.8261C17.7741 2 15.3 4.41517 15.3 7.39444V29.4054C15.3 32.3847 17.7741 34.7998 20.8261 34.7998H34.974C38.0259 34.7998 40.5 32.3847 40.5 29.4054V7.39444Z"
            fill="white"
          />
          <path
            d="M11.0259 10.1997C7.97405 10.1997 5.50014 12.6148 5.5 15.594V37.6057C5.5003 40.5847 7.97414 43 11.0259 43H25.1733C28.225 43 30.6988 40.5847 30.6991 37.6057V37.5335H18.0256C14.974 37.5334 12.5 35.1182 12.4998 32.1393V10.1997H11.0259Z"
            fill="white"
          />
        </svg>

        <p className="absolute left-[111.27px] top-[25.11px] text-[40px] font-bold leading-[28px] text-white lg:left-[166px] lg:top-[37px] lg:text-[57px] lg:leading-[40px]">
          {code}
        </p>
      </div>
    </div>
  );
}
