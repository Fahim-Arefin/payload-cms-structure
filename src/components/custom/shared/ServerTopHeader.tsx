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

// Add this just above `export default async function ServerTopHeader...`

function toPathFromSlug(raw: string): string {
  // normalize: trim leading/trailing slashes
  const s = (raw || '').replace(/^\/+|\/+$/g, '')
  // treat "", "index", or "home" as site root
  if (s === '' || s === 'index' || s === 'home') return '/'
  return `/${s}`
}

// resolve Payload relationship (pages) → usable href string
function resolveHref(rel: any): string {
  // Accepts: populated doc (object with slug), string id, array, or empty
  if (!rel) return '#'

  // array relationships (guard)
  if (Array.isArray(rel)) {
    const first = rel[0]
    if (!first) return '#'
    return resolveHref(first)
  }

  // populated doc
  if (typeof rel === 'object') {
    const slug: string | undefined =
      rel?.slug ??
      // if for some reason it's nested
      rel?.value?.slug

    if (typeof slug === 'string') {
      return toPathFromSlug(slug)
    }
    return '#'
  }

  // id string only – no doc loaded, can’t build a stable path
  if (typeof rel === 'string') {
    // if you ever stored a slug string directly:
    if (rel === 'index' || rel === '/index') return '/'
    if (rel.startsWith('/')) return rel
    return '#'
  }

  return '#'
}

export default async function ServerTopHeader({ className }: { className?: string }) {
  // depth=0 since we don't have relations in Header; keep it lean
  const raw = await getGlobalCached<GlobalHeader>(GLOBAL_HEADER_SLUG_AND_TAG, 1)

  // const safe: HeaderData = {
  //   showLocalizationToggle: Boolean(raw?.showLocalizationToggle ?? true),
  //   links: Array.isArray(raw?.links)
  //     ? raw.links.map((l: any) => ({
  //         label: String(l?.label ?? ''),
  //         labelBN: String(l?.labelBN ?? ''),
  //         href: String(l?.href ?? '#'),
  //       }))
  //     : [],
  // }

  const safe: HeaderData = {
    showLocalizationToggle: Boolean(raw?.showLocalizationToggle ?? true),
    links: Array.isArray(raw?.links)
      ? raw.links.map((l: any) => {
          const baseHref = resolveHref(l?.href) // "/support"
          const rawSection = (l?.sectionId ?? '') as string
          const sectionId = typeof rawSection === 'string' ? rawSection.trim() : ''
          const href = sectionId ? `${baseHref}#${sectionId}` : baseHref // "/support#form"

          return {
            label: String(l?.label ?? ''),
            labelBN: String(l?.labelBN ?? ''),
            href,
          }
        })
      : [],
  }

  return <TopHeader className={className} data={safe} />
}
