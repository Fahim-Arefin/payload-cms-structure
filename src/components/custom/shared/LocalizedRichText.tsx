// 'use client'

// import { RichText } from '@payloadcms/richtext-lexical/react'
// import useMounted from '@/hooks/useMounted'
// import { useLanguage } from '@/context/LanguageContext'
// import './richtext.css' // tiny list styles (below)

// type Props = {
//   en?: any | null
//   bn?: any | null
// }

// /** SSR renders EN; after mount swaps to selected language. */
// export default function LocalizedRichText({ en, bn }: Props) {
//   const mounted = useMounted()
//   const { language } = useLanguage()

//   const data = !mounted
//     ? (en ?? bn ?? null)
//     : language === 'en'
//       ? (en ?? bn ?? null)
//       : (bn ?? en ?? null)

//   if (!data) return null

//   // NOTE: wrapper has only the .rt class which adds bullets/spacing for lists.
//   // It does NOT set color/size, so parent classes like "text-white/90 global-p1" apply.
//   return (
//     <div className="rt ">
//       <RichText key={mounted ? language : 'ssr'} data={data as any} />
//     </div>
//   )
// }

// ==================================================================================
// ==================================================================================
// ==================================================================================

// // without SPA
// 'use client'

// import { RichText } from '@payloadcms/richtext-lexical/react'
// import useMounted from '@/hooks/useMounted'
// import { useLanguage } from '@/context/LanguageContext'
// import './richtext.css'

// type Props = {
//   en?: any | null
//   bn?: any | null
// }

// /* Resolve a Payload internal doc (e.g., a Page) to a public href */
// function resolveHrefFromDoc(doc: any): string {
//   const slug =
//     doc?.slug ??
//     doc?.value?.slug ?? // sometimes relationship is nested
//     undefined

//   if (!slug || typeof slug !== 'string') return '#'
//   if (slug === 'index') return '/' // 🔸 your requirement: hide "index" in URL
//   return slug.startsWith('/') ? slug : `/${slug}`
// }

// /* Walk Lexical JSON and turn internal links into normal links with url */
// function normalizeInternalLinks(node: any): any {
//   if (!node || typeof node !== 'object') return node

//   // If this is a link node with an internal doc, convert it to a "custom" url link
//   if (node.type === 'link' && node?.fields?.linkType === 'internal') {
//     const doc = node?.fields?.doc
//     const href = Array.isArray(doc)
//       ? resolveHrefFromDoc(doc[0]) // relationship array safety
//       : resolveHrefFromDoc(doc)

//     return {
//       ...node,
//       fields: {
//         ...(node.fields || {}),
//         linkType: 'custom', // make it behave like an external/custom URL
//         url: href,
//         // keep target/newTab if present
//       },
//     }
//   }

//   // Recurse into arrays / objects
//   if (Array.isArray(node)) return node.map(normalizeInternalLinks)
//   const out: any = {}
//   for (const k of Object.keys(node)) out[k] = normalizeInternalLinks(node[k])
//   return out
// }

// export default function LocalizedRichText({ en, bn }: Props) {
//   const mounted = useMounted()
//   const { language } = useLanguage()

//   const raw = !mounted
//     ? (en ?? bn ?? null)
//     : language === 'en'
//       ? (en ?? bn ?? null)
//       : (bn ?? en ?? null)

//   if (!raw) return null

//   const data = normalizeInternalLinks(raw)

//   return (
//     <div className="rt">
//       <RichText key={mounted ? language : 'ssr'} data={data as any} />
//     </div>
//   )
// }

// ===================================================================================
// ===================================================================================
// ===================================================================================

'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import useMounted from '@/hooks/useMounted'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import React from 'react'
// import './richtext.css'

type Props = {
  en?: any | null
  bn?: any | null
}

/* map Payload internal doc → href */
function resolveHrefFromDoc(doc: any): string {
  const slug = doc?.slug ?? doc?.value?.slug
  if (!slug || typeof slug !== 'string') return '#'
  if (slug === 'index') return '/' // hide "index"
  return slug.startsWith('/') ? slug : `/${slug}`
}

/* convert internal link nodes to custom url links so RichText emits <a href="..."> */
function normalizeInternalLinks(node: any): any {
  if (!node || typeof node !== 'object') return node
  if (node.type === 'link' && node?.fields?.linkType === 'internal') {
    const doc = node?.fields?.doc
    const href = Array.isArray(doc) ? resolveHrefFromDoc(doc[0]) : resolveHrefFromDoc(doc)
    return {
      ...node,
      fields: {
        ...(node.fields || {}),
        linkType: 'custom',
        url: href,
      },
    }
  }
  if (Array.isArray(node)) return node.map(normalizeInternalLinks)
  const out: any = {}
  for (const k of Object.keys(node)) out[k] = normalizeInternalLinks(node[k])
  return out
}

export default function LocalizedRichText({ en, bn }: Props) {
  const mounted = useMounted()
  const { language } = useLanguage()
  const router = useRouter()

  const raw = !mounted
    ? (en ?? bn ?? null)
    : language === 'en'
      ? (en ?? bn ?? null)
      : (bn ?? en ?? null)
  if (!raw) return null
  const data = normalizeInternalLinks(raw)

  // Intercept same-origin links to keep SPA navigation
  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // respect new-tab/middle/modified clicks
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return

    const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
    if (!anchor) return
    const hrefAttr = anchor.getAttribute('href') || ''
    const target = anchor.getAttribute('target')

    // allow explicit new tab
    if (target === '_blank') return
    // only handle app-local paths
    if (!hrefAttr.startsWith('/')) return
    // normalize "index" already done; but ensure empty path -> '/'
    const href = hrefAttr === '/index' ? '/' : hrefAttr

    e.preventDefault()
    router.push(href)
  }

  return (
    <div className="rt" onClick={onClick}>
      <RichText key={mounted ? language : 'ssr'} data={data as any} />
    </div>
  )
}
