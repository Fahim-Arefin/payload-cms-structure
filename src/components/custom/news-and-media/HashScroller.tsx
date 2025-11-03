'use client'

import { useEffect } from 'react'

type Props = {
  blogSectionId?: string
}

export default function HashScroller({ blogSectionId }: Props) {
  useEffect(() => {
    let lastHash = ''

    const scrollToHash = () => {
      const hash = window.location.hash.slice(1)
      if (!hash || hash === lastHash) return
      lastHash = hash

      const map: Record<string, string> = {
        blog: blogSectionId ?? '',
        news: 'news-section',
        vlog: 'vlog-section',
      }

      const targetId = map[hash]
      if (!targetId) return

      // ensure layout is painted
      const timer = window.setTimeout(() => {
        const el = document.getElementById(targetId)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }, 150)

      // cleanup for this call
      return () => window.clearTimeout(timer)
    }

    // initial + on change
    const onHashChange = () => {
      scrollToHash()
    }
    scrollToHash()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return null
}
