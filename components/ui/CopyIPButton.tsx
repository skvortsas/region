'use client'

import { useState } from 'react'

const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP ?? '0.0.0.0:22005'

function CopyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="copyGrad" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2830" />
          <stop offset="1" stopColor="#FF686E" />
        </linearGradient>
      </defs>
      {/* Top-right rectangle */}
      <path
        fill="url(#copyGrad)"
        d="M21 3.158C21 1.414 19.586 0 17.842 0H9.758C8.014 0 6.6 1.414 6.6 3.158V16.042C6.6 17.786 8.014 19.2 9.758 19.2H17.842C19.586 19.2 21 17.786 21 16.042V3.158Z"
      />
      {/* Bottom-left rectangle */}
      <path
        fill="url(#copyGrad)"
        d="M4.158 4.8C2.414 4.8 1 6.214 1 7.957V20.842C1 22.586 2.414 24 4.158 24H12.242C13.986 24 15.4 22.586 15.4 20.842V20.8H8.158C6.414 20.8 5 19.386 5 17.643V4.8H4.158Z"
      />
    </svg>
  )
}

export function CopyIPButton() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API support
      try {
        const textarea = document.createElement('textarea')
        textarea.value = SERVER_IP
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      } catch {
        // Silent fail — clipboard unavailable
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="mt-auto w-full rounded-[20px] p-px lg:w-[466px]"
      style={{
        background:
          'linear-gradient(to right, rgba(255,40,48,0.2), rgba(255,40,48,1) 50%, rgba(255,40,48,0.2))',
      }}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="flex w-full items-center justify-center gap-4 rounded-[19px] py-[22px] text-[18px] font-bold uppercase leading-none text-white/80 lg:py-[30px] lg:text-[28px]"
        style={{
          background:
            'radial-gradient(ellipse at bottom, rgba(255,40,48,0.6) 0%, transparent 68%), #111117',
        }}
      >
        <CopyIcon />
        {copied ? 'СКОПИРОВАНО ✓' : 'СКОПИРОВАТЬ'}
      </button>
    </div>
  )
}
