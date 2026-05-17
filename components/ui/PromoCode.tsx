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
    <div className="promo-card relative h-[267px] w-full max-w-[583px] overflow-hidden rounded-[20px]">
      <p className="absolute left-[30px] top-[26px] w-[280px] text-[18px] font-medium leading-[21.6px] text-white">
        Лимитированный промокод для первых игроков
      </p>

      <p className="absolute left-[30px] top-[85px] w-[280px] text-[18px] font-medium leading-[21.6px] text-white">
        Активируй и получи преимущество на старте
      </p>

      <div className="promo-timer-panel absolute right-[20px] top-[20px] h-[114px] w-[236px] rounded-[20px]">
        <p className="absolute left-[20px] top-[17px] w-[196px] text-center text-[12px] font-medium leading-[16.8px] text-[#ff434a]">
          До конца действия промокода
        </p>

        <div className="absolute left-[17.5px] top-[42px] h-[32px] w-[201px]">
          <span className="absolute left-0 top-0 w-[57px] text-center text-[46px] font-medium leading-[32px] text-white">
            {countdown.hours}
          </span>
          <span className="absolute left-[65px] top-[9.5px] h-[13px] w-px bg-white" />
          <span className="absolute left-[73px] top-0 w-[55px] text-center text-[46px] font-medium leading-[32px] text-white">
            {countdown.minutes}
          </span>
          <span className="absolute left-[136px] top-[9.5px] h-[13px] w-px bg-white" />
          <span className="absolute left-[144px] top-0 w-[57px] text-center text-[46px] font-medium leading-[32px] text-white">
            {countdown.seconds}
          </span>
        </div>

        <div className="absolute left-[31.5px] top-[81px] h-[13px] w-[161px]">
          <span className="absolute left-0 top-0 w-[32px] text-center text-[18px] font-medium leading-[13px] text-white/60">
            час
          </span>
          <span className="absolute left-[66px] top-0 w-[40px] text-center text-[18px] font-medium leading-[13px] text-white/60">
            мин
          </span>
          <span className="absolute left-[140px] top-0 w-[33px] text-center text-[18px] font-medium leading-[13px] text-white/60">
            сек
          </span>
        </div>
      </div>

      <div
        className="promo-code-panel absolute inset-x-0 bottom-0 h-[114px] rounded-[20px]"
        aria-label={`Промокод ${code}`}
      >
        <svg
          className="absolute left-[104px] top-[34px] h-[46px] w-[46px]"
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

        <p className="absolute left-[166px] top-[37px] text-[57px] font-bold leading-[40px] text-white">
          {code}
        </p>
      </div>
    </div>
  );
}
