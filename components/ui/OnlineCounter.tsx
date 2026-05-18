interface OnlineCounterProps {
  count?: number;
  compact?: boolean;
}

export function OnlineCounter({
  count = 742,
  compact = false,
}: OnlineCounterProps) {
  const textSize = compact
    ? "text-[12px] leading-[14.6px] tracking-[0.05em]"
    : "text-[14px] leading-[17px] tracking-[0.05em]";
  const gap = compact ? "gap-1" : "gap-2";
  const px = compact ? "px-[13px]" : "px-5";
  const label = compact ? "ОНЛАЙН" : "ИГРОКОВ ОНЛАЙН";

  return (
    <div
      className={`inline-flex h-[34px] items-center rounded-[20px] ${gap} ${px}`}
      style={{
        background:
          "radial-gradient(217.77px 90.67px at 50% 100%, rgba(35,33,49,0.6) 0%, rgba(35,33,49,0) 100%)",
      }}
    >
      <span
        className="block h-[10px] w-[10px] shrink-0 rounded-full"
        style={{
          background: "linear-gradient(to bottom, #FF2830 0%, #FF686E 100%)",
        }}
        aria-hidden="true"
      />
      <span
        className={`bg-clip-text text-transparent font-semibold ${textSize}`}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #FF2830 0%, #FF686E 100%)",
        }}
      >
        {count}
      </span>
      <span className={`font-semibold uppercase text-white/60 ${textSize}`}>
        {label}
      </span>
    </div>
  );
}
