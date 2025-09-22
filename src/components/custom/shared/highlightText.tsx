// src/lib/ui/highlightText.tsx
import * as React from 'react'

type Options = {
  /** Tailwind (or any) classes applied to the highlighted part */
  highlightClassName?: string
  /** Highlight all occurrences (default: true). Set false to highlight first only. */
  all?: boolean
  /** Case-sensitive match (default: true) */
  caseSensitive?: boolean
}

export function highlightText(
  text: string,
  highlight: string | undefined | null,
  {
    highlightClassName = 'text-white lg:text-[#ED7125]', // your default highlight
    all = true,
    caseSensitive = true,
  }: Options = {},
): React.ReactNode {
  if (!text || !highlight) return text

  const haystack = caseSensitive ? text : text.toLowerCase()
  const needle = caseSensitive ? highlight : highlight.toLowerCase()
  if (!needle) return text

  const out: React.ReactNode[] = []
  let idx = 0
  let count = 0

  while (true) {
    const foundAt = haystack.indexOf(needle, idx)
    if (foundAt === -1) {
      // push the rest
      if (idx < text.length) out.push(text.slice(idx))
      break
    }

    // push text before match
    if (foundAt > idx) out.push(text.slice(idx, foundAt))

    // push the highlighted match
    const match = text.slice(foundAt, foundAt + needle.length)
    out.push(
      <span key={`hl-${foundAt}-${count}`} className={highlightClassName}>
        {match}
      </span>,
    )
    count++

    idx = foundAt + needle.length
    if (!all) {
      // push the rest and stop
      if (idx < text.length) out.push(text.slice(idx))
      break
    }
  }

  return out
}