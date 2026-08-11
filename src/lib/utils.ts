// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export const delay = async (): Promise<void> => {
//   console.log('Adding 10-second delay before fetching data...')
//   await new Promise((resolve) => setTimeout(resolve, 10000))
//   console.log('Delay complete, proceeding with data fetch...')
// }

// export const bnNum = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

// // ========================================================================================
// // ========================================================================================
// type MaybePopulated = string | { slug?: string } | null | undefined

// export function stripButtonLinksToSlug<T = any>(page: T): T {
//   if (!page || typeof page !== 'object') return page

//   // clone so we don't mutate Payload's internal objects
//   const clone: any =
//     typeof structuredClone === 'function' ? structuredClone(page) : JSON.parse(JSON.stringify(page))

//   const looksLikePageDoc = (node: any) => {
//     if (!node || typeof node !== 'object') return false
//     const hasSlug = typeof node.slug === 'string'
//     const hasLayout = Array.isArray(node.layout)
//     const isPagesCollection = typeof node.collection === 'string' && node.collection === 'pages'
//     return hasSlug && (hasLayout || isPagesCollection)
//   }

//   const visit = (node: any, isRoot = false) => {
//     if (!node || typeof node !== 'object') return

//     // Walk children
//     for (const key in node) {
//       if (!Object.prototype.hasOwnProperty.call(node, key)) continue
//       const value = node[key]

//       if (Array.isArray(value)) {
//         for (let i = 0; i < value.length; i++) {
//           const item = value[i]
//           if (item && typeof item === 'object') {
//             if (!isRoot && looksLikePageDoc(item)) {
//               // shrink nested page doc in arrays → { slug }
//               const slug = (item as any).slug
//               value[i] = { slug }
//             } else {
//               visit(item, false)
//             }
//           }
//         }
//       } else if (value && typeof value === 'object') {
//         if (!isRoot && looksLikePageDoc(value)) {
//           // shrink nested page doc in objects → { slug }
//           const slug = (value as any).slug
//           node[key] = { slug }
//         } else {
//           visit(value, false)
//         }
//       }
//     }
//   }

//   // root should stay full; only strip nested page docs
//   visit(clone, true)

//   return clone as T
// }

// export function pageHref(target: MaybePopulated): string {
//   // console.log('target', target)
//   if (!target || typeof target === 'string') return '#' // not populated; resolve on server
//   const s = target.slug || ''
//   if (!s) return '#'
//   return s === 'index' ? '/' : `/${s.replace(/^\/+/, '')}`
// }
// /** New: returns a Link-friendly href (string or UrlObject) with an optional #hash */
// export function pageHrefWithAnchor(target: MaybePopulated, anchor?: string) {
//   const base = pageHref(target)
//   if (!base || base === '#') return '#'

//   const hash = (anchor ?? '').replace(/^#/, '')
//   // If no anchor, just return the base string
//   if (!hash) return base

//   // Prefer UrlObject so Next.js preserves pathname + hash cleanly
//   return { pathname: base, hash }
// }

// // lib/routing.ts
// export function buildDetailHref(pattern: string, id: string | number): string {
//   if (!pattern) return '#'
//   const clean = pattern.replace(/^\/+|\/+$/g, '')
//   const colonIdx = clean.indexOf(':')
//   const base = colonIdx >= 0 ? clean.slice(0, colonIdx) : clean + '/'
//   const withSlash = base.endsWith('/') ? base : base + '/'
//   return '/' + (withSlash + encodeURIComponent(String(id))).replace(/^\/+/, '')
// }

// // new helpers
// // ====================================================================================
// // ====================================================================================
// // ====================================================================================
// export const withSectionHash = (href: string, sectionId?: string | null) => {
//   const id = String(sectionId ?? '').trim()
//   if (!id) return href

//   const cleanHref = href.replace(/#.*$/, '')
//   return `${cleanHref}#${id}`
// }

// export const buildDetailHrefNew = (pattern: string, itemId: string) => {
//   const cleanPattern = String(pattern || '').replace(/^\/+|\/+$/g, '')
//   const cleanId = String(itemId || '').trim()

//   if (!cleanPattern) return '#'
//   if (!cleanId) return `/${cleanPattern}`

//   const replaced = cleanPattern
//     .replace(':slug', cleanId)
//     .replace('[slug]', cleanId)
//     .replace(':id', cleanId)
//     .replace('[id]', cleanId)

//   return `/${replaced}`
// }

// type BuildNewsHrefArgs = {
//   buttonLink: any
//   sectionId?: string | null
//   itemId?: string | null
//   detail?: boolean
// }

// export const buildNewsHref = ({
//   buttonLink,
//   sectionId,
//   itemId,
//   detail = false,
// }: BuildNewsHrefArgs) => {
//   if (!buttonLink) return '#'

//   const pattern = resolvePageSlug(buttonLink) ?? ''

//   const baseHref = detail ? buildDetailHrefNew(pattern, itemId || '') : pageHref(buttonLink)

//   return withSectionHash(baseHref, sectionId)
// }

// // ====================================================================================
// // ====================================================================================
// // ====================================================================================

// type MaybeRel<T> = string | T | null | undefined

// export function resolvePageSlug(target: MaybeRel<{ slug?: string }>): string | null {
//   return target && typeof target === 'object' && typeof target.slug === 'string'
//     ? target.slug || null
//     : null
// }

// // ========================================================================================
// // ========================================================================================

// // ========================================================================================
// // ========================================================================================
// // utils/date.ts
// // date
// type FormatOpts = { timeZone?: string }

// /** Formats a Date/ISO string as "Mon D, YYYY" (e.g., "Jul 17, 2025"). */
// export function formatMonDYYYY(input: string | Date, opts: FormatOpts = {}): string {
//   const date = typeof input === 'string' ? new Date(input) : input
//   if (Number.isNaN(date.getTime())) return ''

//   const timeZone = opts.timeZone ?? 'Asia/Dhaka' // your default
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric', // no leading zero
//     year: 'numeric',
//     timeZone,
//   }).format(date)
// }
// // Convenience wrappers if you want:
// export const formatLocalDhaka = (d: string | Date) => formatMonDYYYY(d, { timeZone: 'Asia/Dhaka' })
// export const formatUTC = (d: string | Date) => formatMonDYYYY(d, { timeZone: 'UTC' })

// // utils/date-bn.ts
// /** Replace 0-9 with Bangla digits in any string */
// export function enToBnNum(input: string | number): string {
//   const s = String(input)
//   const map: Record<string, string> = {
//     '0': '০',
//     '1': '১',
//     '2': '২',
//     '3': '৩',
//     '4': '৪',
//     '5': '৫',
//     '6': '৬',
//     '7': '৭',
//     '8': '৮',
//     '9': '৯',
//   }
//   return s.replace(/[0-9]/g, (d) => map[d])
// }

// /** Formats a Date/ISO as Bangla "Mon D, YYYY" (e.g., "জুল ১৭, ২০২৫"). */
// export function formatMonDYYYYBN(input: string | Date, opts: FormatOpts = {}): string {
//   const date = typeof input === 'string' ? new Date(input) : input
//   if (Number.isNaN(date.getTime())) return ''

//   const timeZone = opts.timeZone ?? 'Asia/Dhaka'

//   // Use Intl parts to get Bangla month/day/year cleanly
//   const parts = new Intl.DateTimeFormat('bn-BD', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     timeZone,
//   }).formatToParts(date)

//   const month = parts.find((p) => p.type === 'month')?.value ?? ''
//   const day = parts.find((p) => p.type === 'day')?.value ?? ''
//   const year = parts.find((p) => p.type === 'year')?.value ?? ''

//   // Compose as "Mon D, YYYY" in BN
//   return `${month} ${day}, ${year}`
// }

// export function formatPayloadDate(date?: string | null) {
//   if (!date) return ''

//   const d = new Date(date)

//   if (Number.isNaN(d.getTime())) return ''

//   return d.toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   })
// }
// export function formatPayloadDateShort(date?: string | null) {
//   if (!date) return ''

//   const d = new Date(date)

//   if (Number.isNaN(d.getTime())) return ''

//   return d.toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   })
// }

// /* Examples:
// formatMonDYYYYBN('2025-07-17T00:00:00Z')     -> "জুল ১৭, ২০২৫"
// formatMonDYYYYBN('2025-11-03T07:31:48.992Z') -> "নভে ৩, ২০২৫"
// enToBnNum('Call at 01812345678')             -> "Call at ০১৮১২৩৪৫৬৭৮"
// */

// // ========================================================================================
// // ========================================================================================
// // ========================================================================================
// // ========================================================================================
// // ========================================================================================
// // ========================================================================================
// // ========================================================================================
// // ========================================================================================
// // ========================================================================================

// new pasted file below
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delay = async (): Promise<void> => {
  console.log('Adding 10-second delay before fetching data...')
  await new Promise((resolve) => setTimeout(resolve, 10000))
  console.log('Delay complete, proceeding with data fetch...')
}

export const bnNum = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])

// ========================================================================================
// ========================================================================================
// ========================================================================================

// Link to internel page helpers
// ========================================================================================
// ========================================================================================
// ========================================================================================
type MaybePopulated = string | { slug?: string } | null | undefined

type MaybeRel<T> = string | T | null | undefined

export function resolvePageSlug(target: MaybeRel<{ slug?: string }>): string | null {
  return target && typeof target === 'object' && typeof target.slug === 'string'
    ? target.slug || null
    : null
}

export function stripButtonLinksToSlug<T = any>(page: T): T {
  if (!page || typeof page !== 'object') return page

  // clone so we don't mutate Payload's internal objects
  const clone: any =
    typeof structuredClone === 'function' ? structuredClone(page) : JSON.parse(JSON.stringify(page))

  const looksLikePageDoc = (node: any) => {
    if (!node || typeof node !== 'object') return false
    const hasSlug = typeof node.slug === 'string'
    const hasLayout = Array.isArray(node.layout)
    const isPagesCollection = typeof node.collection === 'string' && node.collection === 'pages'
    return hasSlug && (hasLayout || isPagesCollection)
  }

  const visit = (node: any, isRoot = false) => {
    if (!node || typeof node !== 'object') return

    // Walk children
    for (const key in node) {
      if (!Object.prototype.hasOwnProperty.call(node, key)) continue
      const value = node[key]

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const item = value[i]
          if (item && typeof item === 'object') {
            if (!isRoot && looksLikePageDoc(item)) {
              // shrink nested page doc in arrays → { slug }
              const slug = (item as any).slug
              value[i] = { slug }
            } else {
              visit(item, false)
            }
          }
        }
      } else if (value && typeof value === 'object') {
        if (!isRoot && looksLikePageDoc(value)) {
          // shrink nested page doc in objects → { slug }
          const slug = (value as any).slug
          node[key] = { slug }
        } else {
          visit(value, false)
        }
      }
    }
  }

  // root should stay full; only strip nested page docs
  visit(clone, true)

  return clone as T
}

export function normalizePagePath(raw?: string | null): string {
  const input = String(raw ?? '').trim()

  if (!input || input === '#') return '#'

  const [pathWithQuery, hashPart] = input.split('#')
  const [pathPart, queryPart] = pathWithQuery.split('?')

  let path = String(pathPart ?? '').replace(/^\/+|\/+$/g, '')

  if (!path || path === 'index' || path === 'home') {
    path = ''
  } else if (path.startsWith('index/')) {
    path = path.replace(/^index\/+/, '')
  } else if (path.startsWith('home/')) {
    path = path.replace(/^home\/+/, '')
  }

  const normalizedPath = path ? `/${path}` : '/'
  const query = queryPart ? `?${queryPart}` : ''
  const hash = hashPart ? `#${hashPart}` : ''

  return `${normalizedPath}${query}${hash}`
}

// export function pageHref(target: MaybePopulated): string {
//   // console.log('target', target)
//   if (!target || typeof target === 'string') return '#' // not populated; resolve on server
//   const s = target.slug || ''
//   if (!s) return '#'
//   return s === 'index' ? '/' : `/${s.replace(/^\/+/, '')}`
// }

export function pageHref(target: MaybePopulated): string {
  if (!target || typeof target === 'string') return '#'

  const slug = target.slug || ''
  if (!slug) return '#'

  return normalizePagePath(slug)
}

// export function pageHrefWithAnchor(target: MaybePopulated, anchor?: string) {
//   const base = pageHref(target)
//   if (!base || base === '#') return '#'

//   const hash = (anchor ?? '').replace(/^#/, '')
//   // If no anchor, just return the base string
//   if (!hash) return base

//   // Prefer UrlObject so Next.js preserves pathname + hash cleanly
//   return { pathname: base, hash }
// }
export function pageHrefWithAnchor(target: MaybePopulated, anchor?: string | null) {
  const base = pageHref(target)
  if (!base || base === '#') return '#'

  return withSectionHash(base, anchor)
}

// lib/routing.ts
// export function buildDetailHref(pattern: string, id: string | number): string {
//   if (!pattern) return '#'
//   const clean = pattern.replace(/^\/+|\/+$/g, '')
//   const colonIdx = clean.indexOf(':')
//   const base = colonIdx >= 0 ? clean.slice(0, colonIdx) : clean + '/'
//   const withSlash = base.endsWith('/') ? base : base + '/'
//   return '/' + (withSlash + encodeURIComponent(String(id))).replace(/^\/+/, '')
// }

export function buildDetailHref(pattern: string, id: string | number): string {
  const cleanPattern = String(pattern || '').replace(/^\/+|\/+$/g, '')
  const cleanId = String(id || '').trim()

  if (!cleanPattern || !cleanId) return '#'

  const encodedId = encodeURIComponent(cleanId)

  const hasDynamicSegment =
    cleanPattern.includes(':slug') ||
    cleanPattern.includes('[slug]') ||
    cleanPattern.includes(':id') ||
    cleanPattern.includes('[id]')

  const replaced = hasDynamicSegment
    ? cleanPattern
        .replace(/:slug/g, encodedId)
        .replace(/\[slug\]/g, encodedId)
        .replace(/:id/g, encodedId)
        .replace(/\[id\]/g, encodedId)
    : `${cleanPattern}/${encodedId}`

  return normalizePagePath(replaced)
}

// export const withSectionHash = (href: string, sectionId?: string | null) => {
//   const id = String(sectionId ?? '').trim()
//   if (!id) return href

//   const cleanHref = href.replace(/#.*$/, '')
//   return `${cleanHref}#${id}`
// }
export const withSectionHash = (href: string, sectionId?: string | null) => {
  const id = String(sectionId ?? '').trim()
  const cleanHref = normalizePagePath(String(href || '').replace(/#.*$/, ''))

  if (!id) return cleanHref

  return `${cleanHref}#${id.replace(/^#/, '')}`
}

// export const buildDetailHrefNew = (pattern: string, itemId: string) => {
//   const cleanPattern = String(pattern || '').replace(/^\/+|\/+$/g, '')
//   const cleanId = String(itemId || '').trim()

//   if (!cleanPattern) return '#'
//   if (!cleanId) return `/${cleanPattern}`

//   const replaced = cleanPattern
//     .replace(':slug', cleanId)
//     .replace('[slug]', cleanId)
//     .replace(':id', cleanId)
//     .replace('[id]', cleanId)

//   return `/${replaced}`
// }
export const buildDetailHrefNew = buildDetailHref

type BuildNewsHrefArgs = {
  buttonLink: any
  sectionId?: string | null
  itemId?: string | null
  detail?: boolean
}

// export const buildNewsHref = ({
//   buttonLink,
//   sectionId,
//   itemId,
//   detail = false,
// }: BuildNewsHrefArgs) => {
//   if (!buttonLink) return '#'

//   const pattern = resolvePageSlug(buttonLink) ?? ''

//   const baseHref = detail ? buildDetailHrefNew(pattern, itemId || '') : pageHref(buttonLink)

//   return withSectionHash(baseHref, sectionId)
// }

export const buildNewsHref = ({
  buttonLink,
  sectionId,
  itemId,
  detail = false,
}: BuildNewsHrefArgs) => {
  if (!buttonLink) return '#'

  const pattern = resolvePageSlug(buttonLink) ?? ''
  if (!pattern) return '#'

  const baseHref = detail ? buildDetailHref(pattern, itemId || '') : pageHref(buttonLink)

  return withSectionHash(baseHref, sectionId)
}

// ========================================================================================
// ========================================================================================
// ========================================================================================

// utils/date.ts
// ========================================================================================
// ========================================================================================
// date
type FormatOpts = { timeZone?: string }

/** Formats a Date/ISO string as "Mon D, YYYY" (e.g., "Jul 17, 2025"). */
export function formatMonDYYYY(input: string | Date, opts: FormatOpts = {}): string {
  const date = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(date.getTime())) return ''

  const timeZone = opts.timeZone ?? 'Asia/Dhaka' // your default
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric', // no leading zero
    year: 'numeric',
    timeZone,
  }).format(date)
}
// Convenience wrappers if you want:
export const formatLocalDhaka = (d: string | Date) => formatMonDYYYY(d, { timeZone: 'Asia/Dhaka' })
export const formatUTC = (d: string | Date) => formatMonDYYYY(d, { timeZone: 'UTC' })

// utils/date-bn.ts
/** Replace 0-9 with Bangla digits in any string */
export function enToBnNum(input: string | number): string {
  const s = String(input)
  const map: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  }
  return s.replace(/[0-9]/g, (d) => map[d])
}

/** Formats a Date/ISO as Bangla "Mon D, YYYY" (e.g., "জুল ১৭, ২০২৫"). */
export function formatMonDYYYYBN(input: string | Date, opts: FormatOpts = {}): string {
  const date = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(date.getTime())) return ''

  const timeZone = opts.timeZone ?? 'Asia/Dhaka'

  // Use Intl parts to get Bangla month/day/year cleanly
  const parts = new Intl.DateTimeFormat('bn-BD', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).formatToParts(date)

  const month = parts.find((p) => p.type === 'month')?.value ?? ''
  const day = parts.find((p) => p.type === 'day')?.value ?? ''
  const year = parts.find((p) => p.type === 'year')?.value ?? ''

  // Compose as "Mon D, YYYY" in BN
  return `${month} ${day}, ${year}`
}

export function formatPayloadDate(date?: string | null) {
  if (!date) return ''

  const d = new Date(date)

  if (Number.isNaN(d.getTime())) return ''

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
export function formatPayloadDateShort(date?: string | null) {
  if (!date) return ''

  const d = new Date(date)

  if (Number.isNaN(d.getTime())) return ''

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* Examples:
formatMonDYYYYBN('2025-07-17T00:00:00Z')     -> "জুল ১৭, ২০২৫"
formatMonDYYYYBN('2025-11-03T07:31:48.992Z') -> "নভে ৩, ২০২৫"
enToBnNum('Call at 01812345678')             -> "Call at ০১৮১২৩৪৫৬৭৮"
*/

// ========================================================================================
// ========================================================================================
