// // working code
// 'use client'

// import { RichText } from '@payloadcms/richtext-lexical/react'
// import useMounted from '@/hooks/useMounted'
// import { useLanguage } from '@/context/LanguageContext'

// type Props = {
//   en?: any | null
//   bn?: any | null
//   className?: string
// }

// /** SSR renders EN; after mount swaps to selected language. */
// export default function LocalizedRichText({ en, bn, className }: Props) {
//   const mounted = useMounted()
//   const { language } = useLanguage()
//   const data = !mounted
//     ? (en ?? bn ?? null)
//     : language === 'en'
//       ? (en ?? bn ?? null)
//       : (bn ?? en ?? null)
//   if (!data) return null
//   return <RichText data={data as any} className={className} />
// }

// =======================================================================
// =======================================================================
// =======================================================================
// // v1 working but color and fontsize not applied
// 'use client'

// import { RichText } from '@payloadcms/richtext-lexical/react'
// import useMounted from '@/hooks/useMounted'
// import { useLanguage } from '@/context/LanguageContext'
// import clsx from 'clsx'

// type Props = {
//   en?: any | null
//   bn?: any | null
//   className?: string
//   /** set true when rendering on dark backgrounds */
//   invert?: boolean
// }

// /** SSR renders EN; after mount swaps to selected language. */
// export default function LocalizedRichText({ en, bn, className, invert }: Props) {
//   const mounted = useMounted()
//   const { language } = useLanguage()
//   const data = !mounted
//     ? (en ?? bn ?? null)
//     : language === 'en'
//       ? (en ?? bn ?? null)
//       : (bn ?? en ?? null)

//   if (!data) return null

//   // prose: enables list bullets/numbers, spacing, headings, etc.
//   // max-w-none: let content fill container
//   // list-outside: place markers outside
//   const prose = clsx('prose max-w-none list-outside', invert && 'prose-invert', className)

//   return (
//     <div className={prose}>
//       <RichText key={mounted ? language : 'ssr'} data={data as any} />
//     </div>
//   )
// }

// ===========================================================================
// ===========================================================================
// ===========================================================================
// // v2 working but fontsize not applied
// import clsx from 'clsx'
// import { RichText } from '@payloadcms/richtext-lexical/react'

// export default function LocalizedRichText({
//   en,
//   bn,
//   className,
// }: {
//   en?: any
//   bn?: any
//   className?: string
// }) {
//   // pick `data` like you already do
//   const data = en ?? bn ?? null
//   if (!data) return null

//   return (
//     <div
//       // prose-ul:pl-6 prose-ol:pl-6 prose-li:my-1
//       className={clsx(
//         // enable list bullets/numbers & spacing
//         'prose max-w-none',
//         // make typography inherit your colors/sizes
//         'prose-headings:text-inherit prose-p:text-inherit prose-li:text-inherit prose-strong:text-inherit prose-em:text-inherit',
//         // control list look
//         'prose-ul:list-disc prose-ol:list-decimal',
//         // now your own utilities apply “on top”
//         // 'text-white/90 global-p1',
//         className,
//       )}
//       // final nudge: make the plugin’s CSS vars inherit current color
//       style={{
//         // body text and headings take current color (so `text-white/90` works)
//         // @ts-expect-error: CSS vars
//         '--tw-prose-body': 'inherit',
//         '--tw-prose-headings': 'inherit',
//         '--tw-prose-links': 'inherit',
//         '--tw-prose-bullets': 'currentColor',
//         '--tw-prose-counters': 'currentColor',
//       }}
//     >
//       <RichText data={data} />
//     </div>
//   )
// }

// ====================================================================================
// ====================================================================================
// ====================================================================================
'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import useMounted from '@/hooks/useMounted'
import { useLanguage } from '@/context/LanguageContext'
import './richtext.css' // tiny list styles (below)

type Props = {
  en?: any | null
  bn?: any | null
}

/** SSR renders EN; after mount swaps to selected language. */
export default function LocalizedRichText({ en, bn }: Props) {
  const mounted = useMounted()
  const { language } = useLanguage()

  const data = !mounted
    ? (en ?? bn ?? null)
    : language === 'en'
      ? (en ?? bn ?? null)
      : (bn ?? en ?? null)

  if (!data) return null

  // NOTE: wrapper has only the .rt class which adds bullets/spacing for lists.
  // It does NOT set color/size, so parent classes like "text-white/90 global-p1" apply.
  return (
    <div className="rt ">
      <RichText key={mounted ? language : 'ssr'} data={data as any} />
    </div>
  )
}
