"use client";

import { useEffect, useState } from "react";

interface PromoCodeProps {
  code: string;
  targetDate: string;
}

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function getCountdown(targetDate: string): Countdown {
  const zero: Countdown = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (!targetDate) return zero;

  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return zero;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function PromoCode({ code, targetDate }: PromoCodeProps) {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(targetDate),
  );

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center gap-[16px]">
      <div
        className="rounded-[20px] px-8 py-4 text-center"
        style={{ background: "var(--gradient-promo)" }}
      >
        <p className="text-caption font-semibold text-white/80 uppercase tracking-widest mb-1">
          Промокод
        </p>
        <p className="text-h3 font-bold text-white tracking-widest">{code}</p>
      </div>

      <div className="flex items-center gap-3 text-white">
        {[
          { label: "ДН", value: countdown.days },
          { label: "ЧА", value: countdown.hours },
          { label: "МН", value: countdown.minutes },
          { label: "СЕК", value: countdown.seconds },
        ].map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-h2 font-bold leading-none">{value}</span>
              <span className="text-caption font-semibold text-text-muted mt-1">
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className="text-h2 font-bold text-text-muted mb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
