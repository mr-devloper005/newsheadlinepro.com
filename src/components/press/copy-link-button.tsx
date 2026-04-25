'use client'

import { useState } from 'react'
import { Link2 } from 'lucide-react'

export function CopyLinkButton({ url }: { url: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-md border border-stone-200/80 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-800"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url)
          setDone(true)
          window.setTimeout(() => setDone(false), 2000)
        } catch {
          setDone(false)
        }
      }}
    >
      <Link2 className="h-3.5 w-3.5" />
      {done ? 'Copied' : 'Copy link'}
    </button>
  )
}
