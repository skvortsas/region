interface OnlineCounterProps {
  count?: number
}

export function OnlineCounter({ count = 142 }: OnlineCounterProps) {
  return (
    <div
      className="inline-flex h-[34px] items-center gap-2 rounded-[20px] px-5"
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
        className="bg-clip-text text-transparent text-[14px] font-semibold leading-[17px] tracking-[0.05em]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #FF2830 0%, #FF686E 100%)",
        }}
      >
        {count}
      </span>
      <span className="text-[14px] font-semibold leading-[17px] tracking-[0.05em] uppercase text-white/60">
        ИГРОКОВ ОНЛАЙН
      </span>
    </div>
  )
}
