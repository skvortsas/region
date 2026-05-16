'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP ?? '0.0.0.0:22005'

function CopyIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Back rectangle */}
      <rect x="8" y="8" width="12" height="12" rx="2" ry="2" />
      {/* Front rectangle (clipped) */}
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
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
    <Button
      variant="secondary"
      onClick={handleCopy}
      icon={<CopyIcon />}
      className="w-full lg:w-[466px] text-[18px] lg:text-[28px] py-[22px] lg:py-[36px] rounded-[15px] lg:rounded-[20px]"
    >
      {copied ? 'СКОПИРОВАНО ✓' : 'СКОПИРОВАТЬ'}
    </Button>
  )
}
