// // cacehed working code
// import React from 'react'
// import Navbar from './Navbar' // client component
// import { GLOBAL_NAVBAR_SLUG_AND_TAG, GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'
// import { getGlobalCached } from '@/lib/cachedGlobals' // ⬅️ use tag-cached helper
// import { GlobalHeader, GlobalNavbar } from '@/payload-types'

// // ----- Plain, serializable types -----
// export type NavItem = {
//   label: string
//   labelBN: string
//   href: string
//   children?: NavItem[]
// }

// export type SafeMedia = {
//   id?: string
//   url?: string
//   alt?: string
//   width?: number
//   height?: number
// } | null

// export type SimpleLink = {
//   label: string
//   labelBN: string
//   href: string
// }

// export type HeaderData = {
//   showLocalizationToggle: boolean
//   links: SimpleLink[] // flat, no nesting
// }

// export type NavbarData = {
//   branding: {
//     logo: SafeMedia
//   }
//   desktop: { items: NavItem[] }
//   mobile: { items: NavItem[] }
//   portal?: {
//     label?: string
//     labelBN?: string
//     href?: string
//   }
// }

// // ----- helpers to build safe/serializable props -----
// function toSafeMedia(m: any): SafeMedia {
//   if (!m || typeof m !== 'object') return null
//   const url = m.url ?? m?.sizes?.card?.url ?? m?.sizes?.thumbnail?.url ?? undefined

//   return {
//     id: m.id,
//     url,
//     alt: m.alt ?? '',
//     width: typeof m.width === 'number' ? m.width : undefined,
//     height: typeof m.height === 'number' ? m.height : undefined,
//   }
// }

// function mapItems(items: any[] | undefined | null): NavItem[] {
//   if (!Array.isArray(items)) return []
//   return items.map((it) => ({
//     label: String(it?.label ?? ''),
//     labelBN: String(it?.labelBN ?? ''),
//     href: String(it?.href ?? '#'),
//     children: mapItems(it?.children),
//   }))
// }

// function mapSimpleLinks(items: any[] | undefined | null): SimpleLink[] {
//   if (!Array.isArray(items)) return []
//   return items.map((it) => ({
//     label: String(it?.label ?? ''),
//     labelBN: String(it?.labelBN ?? ''),
//     href: String(it?.href ?? '#'),
//   }))
// }

// export default async function ServerNavbar() {
//   // 🔒 Tag-cached global fetches
//   const navbarRes = await getGlobalCached<GlobalNavbar>(GLOBAL_NAVBAR_SLUG_AND_TAG, 2)
//   const headerRes = await getGlobalCached<GlobalHeader>(GLOBAL_HEADER_SLUG_AND_TAG, 0)

//   const navbarData: NavbarData = {
//     branding: {
//       logo: toSafeMedia(navbarRes?.branding?.logo),
//     },
//     desktop: {
//       items: mapItems(navbarRes?.desktop?.items),
//     },
//     mobile: {
//       items: mapItems(navbarRes?.mobile?.items),
//     },
//     portal: {
//       label: navbarRes?.portal?.label ?? '',
//       labelBN: navbarRes?.portal?.labelBN ?? '',
//       href: navbarRes?.portal?.href ?? '',
//     },
//   }

//   const headerData: HeaderData = {
//     showLocalizationToggle: Boolean(headerRes?.showLocalizationToggle ?? true),
//     links: mapSimpleLinks(headerRes?.links),
//   }

//   return <Navbar data={navbarData} header={headerData} />
// }

// =============================================================================
// =============================================================================
// =============================================================================

// src/components/navbar/ServerNavbar.tsx
import React from 'react'
import Navbar from './Navbar' // client component
import { GLOBAL_NAVBAR_SLUG_AND_TAG, GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals'
import type { GlobalHeader, GlobalNavbar } from '@/payload-types'

// ----- Plain, serializable types -----
export type NavItem = {
  label: string
  labelBN: string
  href: string
  children?: NavItem[]
}

export type SafeMedia = {
  id?: string
  url?: string
  alt?: string
  width?: number
  height?: number
} | null

export type SimpleLink = {
  label: string
  labelBN: string
  href: string
}

export type HeaderData = {
  showLocalizationToggle: boolean
  links: SimpleLink[]
}

export type NavbarData = {
  branding: {
    logo: SafeMedia
  }
  desktop: { items: NavItem[] }
  mobile: { items: NavItem[] }
  portal?: {
    label?: string
    labelBN?: string
    href?: string
  }
}

// ----- helpers to build safe/serializable props -----
function toSafeMedia(m: any): SafeMedia {
  if (!m || typeof m !== 'object') return null
  // prefer original url, then generated sizes
  const url = m.url ?? m?.sizes?.card?.url ?? m?.sizes?.thumbnail?.url ?? undefined
  return {
    id: m.id,
    url,
    alt: m.alt ?? '',
    width: typeof m.width === 'number' ? m.width : undefined,
    height: typeof m.height === 'number' ? m.height : undefined,
  }
}

// ✨ changed: resolve Payload relationship (pages) → usable href string
function resolveHref(rel: any): string {
  // Accepts: populated doc (object with slug), string id, array, or empty
  if (!rel) return '#'
  // array relationships (not expected here, but guard anyway)
  if (Array.isArray(rel)) {
    const first = rel[0]
    if (!first) return '#'
    return resolveHref(first)
  }
  // populated doc
  if (typeof rel === 'object') {
    const slug: string | undefined =
      rel?.slug ??
      // sometimes depth could nest it deeper if you customize — be defensive
      rel?.value?.slug
    if (slug && typeof slug === 'string') {
      // keep nested slugs like "plans/corporate" intact
      return slug.startsWith('/') ? slug : `/${slug}`
    }
    // fall back: some editors leave empty object {}
    return '#'
  }
  // id string only – no doc loaded, can’t build a stable path
  if (typeof rel === 'string') return '#'
  return '#'
}

// ✨ changed: map items using relationship-based href
function mapItems(items: any[] | undefined | null): NavItem[] {
  if (!Array.isArray(items)) return []
  return items.map((it) => ({
    label: String(it?.label ?? ''),
    labelBN: String(it?.labelBN ?? ''),
    href: resolveHref(it?.href), // ✨ relationship → url
    children: mapItems(it?.children),
  }))
}

function mapSimpleLinks(items: any[] | undefined | null): SimpleLink[] {
  if (!Array.isArray(items)) return []
  return items.map((it) => ({
    label: String(it?.label ?? ''),
    labelBN: String(it?.labelBN ?? ''),
    href: String(it?.href ?? '#'),
  }))
}

export default async function ServerNavbar() {
  // 🔒 Tag-cached global fetches (depth 2 to hydrate relationships)
  const navbarRes = await getGlobalCached<GlobalNavbar>(GLOBAL_NAVBAR_SLUG_AND_TAG, 1)
  const headerRes = await getGlobalCached<GlobalHeader>(GLOBAL_HEADER_SLUG_AND_TAG, 0)

  const navbarData: NavbarData = {
    branding: {
      logo: toSafeMedia(navbarRes?.branding?.logo),
    },
    desktop: {
      items: mapItems(navbarRes?.desktop?.items),
    },
    mobile: {
      items: mapItems(navbarRes?.mobile?.items),
    },
    portal: {
      label: navbarRes?.portal?.label ?? '',
      labelBN: navbarRes?.portal?.labelBN ?? '',
      href: navbarRes?.portal?.href ?? '',
    },
  }

  const headerData: HeaderData = {
    showLocalizationToggle: Boolean(headerRes?.showLocalizationToggle ?? true),
    links: mapSimpleLinks(headerRes?.links),
  }

  return (
    <Navbar
      data={navbarData}
      header={headerData}
      blur={navbarRes?.branding.logoBlurDataURL || ''}
    />
  )
}
