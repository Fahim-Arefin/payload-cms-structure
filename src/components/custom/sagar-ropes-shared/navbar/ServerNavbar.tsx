// import React from 'react'

// import { pagesListTag } from '@/lib/cacheTags'
// import { getGlobalCached } from '@/lib/cachedGlobals'
// import { GLOBAL_FOOTER_SLUG_AND_TAG, GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
// import type { Footer, Navbar } from '@/payload-types'
// import ClientNavbar from './ClientNavbar'

// export type NavItem = {
//   label: string
//   isTop: string
//   href: string
//   sectionId?: string
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

// export type SearchContentItem = {
//   title: string
//   description: string
// }

// export type NavbarData = {
//   branding: {
//     logo: SafeMedia
//   }
//   desktop: {
//     items: NavItem[]
//   }
//   searchContent: {
//     items: SearchContentItem[]
//   }
// }

// export type SearchSuggestion = {
//   label: string
//   url: string
// }

// const DEFAULT_SEARCH_CONTENT_ITEMS: SearchContentItem[] = [
//   {
//     title: '“Big growth steps often bring big challenges”',
//     description:
//       'but our team is here to make the transition seamless. Reach out today so we can kickstart your success together.',
//   },
// ]

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

// function toPathFromSlug(raw: string): string {
//   const s = (raw || '').replace(/^\/+|\/+$/g, '')

//   if (s === '' || s === 'index' || s === 'home') return '/'

//   return `/${s}`
// }

// function resolveHref(rel: any): string {
//   if (!rel) return '#'

//   if (Array.isArray(rel)) {
//     const first = rel[0]

//     if (!first) return '#'

//     return resolveHref(first)
//   }

//   if (typeof rel === 'object') {
//     const slug: string | undefined = rel?.slug ?? rel?.value?.slug

//     if (typeof slug === 'string') {
//       return toPathFromSlug(slug)
//     }

//     return '#'
//   }

//   if (typeof rel === 'string') {
//     if (rel === 'index' || rel === '/index') return '/'
//     if (rel.startsWith('/')) return rel

//     return '#'
//   }

//   return '#'
// }

// function mapItems(items: any[] | undefined | null): NavItem[] {
//   if (!Array.isArray(items)) return []

//   return items.map((it) => {
//     const baseHref = resolveHref(it?.href)
//     const rawSection = (it?.sectionId ?? '') as string
//     const sectionId = typeof rawSection === 'string' ? rawSection.trim() : ''
//     const href = sectionId ? `${baseHref}#${sectionId}` : baseHref

//     return {
//       label: String(it?.label ?? ''),
//       isTop: String(it?.isTop ?? 'no'),
//       href,
//       sectionId: sectionId || undefined,
//       children: mapItems(it?.children),
//     }
//   })
// }

// function mapSearchContentItems(items: any[] | undefined | null): SearchContentItem[] {
//   if (!Array.isArray(items)) return DEFAULT_SEARCH_CONTENT_ITEMS

//   const mapped = items
//     .map((item) => ({
//       title: String(item?.title ?? '').trim(),
//       description: String(item?.description ?? '').trim(),
//     }))
//     .filter((item) => item.title && item.description)

//   return mapped.length ? mapped : DEFAULT_SEARCH_CONTENT_ITEMS
// }

// const slugToUrl = (slug: string): string => {
//   if (!slug || slug === 'index') return '/'

//   return `/${slug.replace(/^\/+/, '')}`
// }

// async function fetchSearchSuggestions(): Promise<SearchSuggestion[]> {
//   const baseURL = process.env.API_URL ?? 'http://localhost:3000'
//   const url = new URL('/api/pages', baseURL)

//   url.searchParams.set('where[_status][equals]', 'published')
//   url.searchParams.set('depth', '0')
//   url.searchParams.set('limit', '200')
//   url.searchParams.set('select[name]', 'true')
//   url.searchParams.set('select[slug]', 'true')

//   const res = await fetch(url.toString(), {
//     next: { tags: [pagesListTag] },
//   })

//   if (!res.ok) {
//     console.error('Failed to fetch pages for search bar', res.status, await res.text())
//     return []
//   }

//   const json = (await res.json()) as { docs?: any[] }

//   const out: SearchSuggestion[] = []

//   for (const page of json.docs ?? []) {
//     const rawSlug = page?.slug
//     const rawName = page?.name

//     const slug = (rawSlug ?? '').toString().trim()
//     const name = (rawName ?? '').toString().trim()

//     if (!slug || !name) continue

//     out.push({
//       label: name,
//       url: slugToUrl(slug),
//     })
//   }

//   return out
// }

// export default async function ServerNavbar() {
//   const navbarRes = await getGlobalCached<Navbar>(GLOBAL_NAVBAR_SLUG_AND_TAG, 1)
//   const footer = await getGlobalCached<Footer>(GLOBAL_FOOTER_SLUG_AND_TAG, 1)
//   const suggestions = await fetchSearchSuggestions()

//   const navbarData: NavbarData = {
//     branding: {
//       logo: toSafeMedia(navbarRes?.logo),
//     },

//     desktop: {
//       items: mapItems(navbarRes?.desktop?.items),
//     },

//     searchContent: {
//       items: mapSearchContentItems((navbarRes as any)?.searchContent?.items),
//     },
//   }

//   return (
//     <ClientNavbar
//       data={navbarData}
//       blur={navbarRes?.logoBlurDataURL || ''}
//       footerData={footer}
//       suggestions={suggestions}
//     />
//   )
// }

import React from 'react'

import { pagesListTag } from '@/lib/cacheTags'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_FOOTER_SLUG_AND_TAG, GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
import type { Footer, Navbar } from '@/payload-types'
import ClientNavbar from './ClientNavbar'

export type NavItem = {
  label: string
  isTop: string
  href: string
  sectionId?: string
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

export type SearchContentItem = {
  title: string
  description: string
}

export type InternalCtaLink = {
  label: string
  href: string
  sectionId?: string
}

export type NavbarData = {
  branding: {
    logo: SafeMedia
  }
  desktop: {
    items: NavItem[]
  }
  mobileDrawer: {
    dropQueryCta: InternalCtaLink
  }
  searchContent: {
    items: SearchContentItem[]
  }
}

export type SearchSuggestion = {
  label: string
  url: string
}

const DEFAULT_SEARCH_CONTENT_ITEMS: SearchContentItem[] = [
  {
    title: '“Big growth steps often bring big challenges”',
    description:
      'but our team is here to make the transition seamless. Reach out today so we can kickstart your success together.',
  },
]

const DEFAULT_DROP_QUERY_CTA: InternalCtaLink = {
  label: 'Drop Your Query',
  href: '/contact',
}

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

function toPathFromSlug(raw: string): string {
  const s = (raw || '').replace(/^\/+|\/+$/g, '')

  if (s === '' || s === 'index' || s === 'home') return '/'

  return `/${s}`
}

function resolveHref(rel: any): string {
  if (!rel) return '#'

  if (Array.isArray(rel)) {
    const first = rel[0]

    if (!first) return '#'

    return resolveHref(first)
  }

  if (typeof rel === 'object') {
    const slug: string | undefined = rel?.slug ?? rel?.value?.slug

    if (typeof slug === 'string') {
      return toPathFromSlug(slug)
    }

    return '#'
  }

  if (typeof rel === 'string') {
    if (rel === 'index' || rel === '/index') return '/'
    if (rel.startsWith('/')) return rel

    return '#'
  }

  return '#'
}

function appendSectionId(baseHref: string, sectionId?: string | null): string {
  const cleanSectionId = typeof sectionId === 'string' ? sectionId.trim() : ''

  if (!cleanSectionId) return baseHref

  return `${baseHref}#${cleanSectionId}`
}

function mapItems(items: any[] | undefined | null): NavItem[] {
  if (!Array.isArray(items)) return []

  return items.map((it) => {
    const baseHref = resolveHref(it?.href)
    const rawSection = (it?.sectionId ?? '') as string
    const sectionId = typeof rawSection === 'string' ? rawSection.trim() : ''
    const href = appendSectionId(baseHref, sectionId)

    return {
      label: String(it?.label ?? ''),
      isTop: String(it?.isTop ?? 'no'),
      href,
      sectionId: sectionId || undefined,
      children: mapItems(it?.children),
    }
  })
}

function mapSearchContentItems(items: any[] | undefined | null): SearchContentItem[] {
  if (!Array.isArray(items)) return DEFAULT_SEARCH_CONTENT_ITEMS

  const mapped = items
    .map((item) => ({
      title: String(item?.title ?? '').trim(),
      description: String(item?.description ?? '').trim(),
    }))
    .filter((item) => item.title && item.description)

  return mapped.length ? mapped : DEFAULT_SEARCH_CONTENT_ITEMS
}

function mapDropQueryCta(cta: any): InternalCtaLink {
  const label = String(cta?.label ?? '').trim() || DEFAULT_DROP_QUERY_CTA.label
  const baseHref = resolveHref(cta?.href)
  const sectionId = typeof cta?.sectionId === 'string' ? cta.sectionId.trim() : ''
  const href =
    baseHref && baseHref !== '#'
      ? appendSectionId(baseHref, sectionId)
      : DEFAULT_DROP_QUERY_CTA.href

  return {
    label,
    href,
    sectionId: sectionId || undefined,
  }
}

const slugToUrl = (slug: string): string => {
  if (!slug || slug === 'index') return '/'

  return `/${slug.replace(/^\/+/, '')}`
}

async function fetchSearchSuggestions(): Promise<SearchSuggestion[]> {
  const baseURL = process.env.API_URL ?? 'http://localhost:3000'
  const url = new URL('/api/pages', baseURL)

  url.searchParams.set('where[_status][equals]', 'published')
  url.searchParams.set('depth', '0')
  url.searchParams.set('limit', '200')
  url.searchParams.set('select[name]', 'true')
  url.searchParams.set('select[slug]', 'true')

  const res = await fetch(url.toString(), {
    next: { tags: [pagesListTag] },
  })

  if (!res.ok) {
    console.error('Failed to fetch pages for search bar', res.status, await res.text())
    return []
  }

  const json = (await res.json()) as { docs?: any[] }

  const out: SearchSuggestion[] = []

  for (const page of json.docs ?? []) {
    const rawSlug = page?.slug
    const rawName = page?.name

    const slug = (rawSlug ?? '').toString().trim()
    const name = (rawName ?? '').toString().trim()

    if (!slug || !name) continue

    out.push({
      label: name,
      url: slugToUrl(slug),
    })
  }

  return out
}

export default async function ServerNavbar() {
  const navbarRes = await getGlobalCached<Navbar>(GLOBAL_NAVBAR_SLUG_AND_TAG, 1)
  const footer = await getGlobalCached<Footer>(GLOBAL_FOOTER_SLUG_AND_TAG, 1)
  const suggestions = await fetchSearchSuggestions()

  const navbarData: NavbarData = {
    branding: {
      logo: toSafeMedia(navbarRes?.logo),
    },

    desktop: {
      items: mapItems(navbarRes?.desktop?.items),
    },

    mobileDrawer: {
      dropQueryCta: mapDropQueryCta((navbarRes as any)?.mobileDrawer?.dropQueryCta),
    },

    searchContent: {
      items: mapSearchContentItems((navbarRes as any)?.searchContent?.items),
    },
  }

  return (
    <ClientNavbar
      data={navbarData}
      blur={navbarRes?.logoBlurDataURL || ''}
      footerData={footer}
      suggestions={suggestions}
    />
  )
}
