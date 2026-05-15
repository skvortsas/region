interface OnlineCounterProps {
  count?: number
}

export function OnlineCounter({ count = 142 }: OnlineCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" aria-hidden="true" />
      <span className="bg-gradient-to-b from-[#ff2830] to-[#ff686e] bg-clip-text text-transparent font-bold text-nav">
        {count}
      </span>
      <span className="text-caption font-semibold text-text-muted uppercase tracking-wide">
        ИГРОКОВ ОНЛАЙН
      </span>
    </div>
  )
}
