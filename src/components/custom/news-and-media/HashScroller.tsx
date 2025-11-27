// 'use client'

// import { useEffect } from 'react'

// type Props = {
//   blogSectionId?: string
//   newsSectionId?: string
//   vlogSectionId?: string
// }

// export default function HashScroller({ blogSectionId, newsSectionId, vlogSectionId }: Props) {
//   useEffect(() => {
//     let lastHash = ''

//     const scrollToHash = () => {
//       const hash = window.location.hash.slice(1)
//       if (!hash || hash === lastHash) return
//       lastHash = hash

//       const map: Record<string, string> = {
//         blog: blogSectionId ?? '',
//         news: newsSectionId ?? '',
//         vlog: vlogSectionId ?? '',
//       }

//       const targetId = map[hash]
//       if (!targetId) return

//       const timer = window.setTimeout(() => {
//         const el = document.getElementById(targetId)
//         el?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
//       }, 150)

//       // cleanup for this call
//       return () => window.clearTimeout(timer)
//     }

//     // initial + on change
//     const onHashChange = () => {
//       scrollToHash()
//     }
//     scrollToHash()
//     window.addEventListener('hashchange', onHashChange)
//     return () => window.removeEventListener('hashchange', onHashChange)
//   }, [])

//   return null
// }

// ======================================================================
// ======================================================================
// ======================================================================

'use client'

import { useEffect } from 'react'

type Props = {
  // You don't actually need these anymore unless you want them for something else
  blogSectionId?: string
  newsSectionId?: string
  vlogSectionId?: string
}

export default function HashScroller(_props: Props) {
  useEffect(() => {
    let lastHash = ''
    let timer: number | undefined

    const scrollToHash = () => {
      // clear any previous pending scroll
      if (timer) {
        window.clearTimeout(timer)
        timer = undefined
      }

      const rawHash = window.location.hash
      if (!rawHash) return

      const hash = rawHash.slice(1) // remove '#'
      if (!hash || hash === lastHash) return
      lastHash = hash

      // small delay to ensure layout is painted
      timer = window.setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })
        }
      }, 150)
    }

    const onHashChange = () => {
      scrollToHash()
    }

    // run on initial mount (for direct links like /page#blog-section)
    scrollToHash()

    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      if (timer) {
        window.clearTimeout(timer)
      }
    }
  }, [])

  return null
}
