// // src/components/header/ServerTopHeader.tsx
// import React from 'react'
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import TopHeader from './TopHeader'
// import { GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'

// export type HeaderLink = { label: string; labelBN: string; href: string }
// export type HeaderData = {
//   showLocalizationToggle: boolean
//   links: HeaderLink[]
// }

// export default async function ServerTopHeader({ className }: { className?: string }) {
//   const payload = await getPayload({ config: await config })
//   const data = await payload.findGlobal({
//     slug: GLOBAL_HEADER_SLUG_AND_TAG,
//     depth: 0,
//   })

//   const safe: HeaderData = {
//     showLocalizationToggle: Boolean(data?.showLocalizationToggle ?? true),
//     links: Array.isArray(data?.links)
//       ? data.links.map((l: any) => ({
//           label: String(l?.label ?? ''),
//           labelBN: String(l?.labelBN ?? ''),
//           href: String(l?.href ?? '#'),
//         }))
//       : [],
//   }

//   return <TopHeader className={className} data={safe} />
// }

// ==============================================================================================
// ==============================================================================================
// ==============================================================================================
// src/components/header/ServerTopHeader.tsx
import React from 'react'
import TopHeader from './TopHeader'
import { GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GlobalHeader } from '@/payload-types'

// Matches what TopHeader expects
export type HeaderLink = { label: string; labelBN: string; href: string }
export type HeaderData = {
  showLocalizationToggle: boolean
  links: HeaderLink[]
}

export default async function ServerTopHeader({ className }: { className?: string }) {
  // depth=0 since we don't have relations in Header; keep it lean
  const raw = await getGlobalCached<GlobalHeader>(GLOBAL_HEADER_SLUG_AND_TAG, 0)

  const safe: HeaderData = {
    showLocalizationToggle: Boolean(raw?.showLocalizationToggle ?? true),
    links: Array.isArray(raw?.links)
      ? raw.links.map((l: any) => ({
          label: String(l?.label ?? ''),
          labelBN: String(l?.labelBN ?? ''),
          href: String(l?.href ?? '#'),
        }))
      : [],
  }

  return <TopHeader className={className} data={safe} />
}
