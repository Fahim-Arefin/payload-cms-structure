// // src/components/nav/ServerNavbar.tsx
// import React from 'react'
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
// import Navbar from './Navbar' // client component

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

// export default async function ServerNavbar() {
//   const payload = await getPayload({ config: await config })

//   // depth=2 so the logo relation is populated
//   const data = await payload.findGlobal({
//     slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
//     depth: 2,
//   })

//   const navbarData: NavbarData = {
//     branding: {
//       logo: toSafeMedia(data?.branding?.logo),
//     },
//     desktop: {
//       items: mapItems(data?.desktop?.items),
//     },
//     mobile: {
//       items: mapItems(data?.mobile?.items),
//     },
//     portal: {
//       label: data?.portal?.label ?? 'My Portal',
//       labelBN: data?.portal?.labelBN ?? 'মাই পোর্টাল',
//       href: data?.portal?.href ?? 'https://portal.shantalife.com/',
//     },
//   }

//   return <Navbar data={navbarData} />
// }

// ==============================================================================================
// ==============================================================================================
// ==============================================================================================
// // unchaced
// // src/components/nav/ServerNavbar.tsx
// import React from 'react'
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import {
//   GLOBAL_NAVBAR_SLUG_AND_TAG,
//   GLOBAL_HEADER_SLUG_AND_TAG, // <-- make sure this is exported from constants as 'global-header'
// } from '@/lib/constants'
// import Navbar from './Navbar' // client component

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
//   const payload = await getPayload({ config: await config })

//   // Navbar (depth=2 so the logo relation is populated)
//   const navbarRes = await payload.findGlobal({
//     slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
//     depth: 2,
//   })

//   const navbarData: NavbarData = {
//     branding: {
//       logo: toSafeMedia((navbarRes as any)?.branding?.logo),
//     },
//     desktop: {
//       items: mapItems((navbarRes as any)?.desktop?.items),
//     },
//     mobile: {
//       items: mapItems((navbarRes as any)?.mobile?.items),
//     },
//     portal: {
//       label: (navbarRes as any)?.portal?.label ?? 'My Portal',
//       labelBN: (navbarRes as any)?.portal?.labelBN ?? 'মাই পোর্টাল',
//       href: (navbarRes as any)?.portal?.href ?? 'https://portal.shantalife.com/',
//     },
//   }

//   // Header (flat links + toggle)
//   const headerRes = await payload.findGlobal({
//     slug: GLOBAL_HEADER_SLUG_AND_TAG,
//     depth: 0,
//   })

//   const headerData: HeaderData = {
//     showLocalizationToggle: Boolean((headerRes as any)?.showLocalizationToggle ?? true),
//     links: mapSimpleLinks((headerRes as any)?.links),
//   }

//   // ⬇️ pass BOTH navbar + header to the client component
//   return <Navbar data={navbarData} header={headerData} />
// }

// ==============================================================================================
// ==============================================================================================
// ==============================================================================================
// ==============================================================================================

// cacehed
import React from 'react'
import Navbar from './Navbar' // client component
import { GLOBAL_NAVBAR_SLUG_AND_TAG, GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals' // ⬅️ use tag-cached helper
import { GlobalHeader, GlobalNavbar } from '@/payload-types'

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
  links: SimpleLink[] // flat, no nesting
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
  const url = m.url ?? m?.sizes?.card?.url ?? m?.sizes?.thumbnail?.url ?? undefined

  return {
    id: m.id,
    url,
    alt: m.alt ?? '',
    width: typeof m.width === 'number' ? m.width : undefined,
    height: typeof m.height === 'number' ? m.height : undefined,
  }
}

function mapItems(items: any[] | undefined | null): NavItem[] {
  if (!Array.isArray(items)) return []
  return items.map((it) => ({
    label: String(it?.label ?? ''),
    labelBN: String(it?.labelBN ?? ''),
    href: String(it?.href ?? '#'),
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
  // 🔒 Tag-cached global fetches
  const navbarRes = await getGlobalCached<GlobalNavbar>(GLOBAL_NAVBAR_SLUG_AND_TAG, 2)
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

  return <Navbar data={navbarData} header={headerData} />
}
