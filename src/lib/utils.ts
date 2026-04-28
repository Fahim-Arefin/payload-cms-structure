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
type MaybePopulated = string | { slug?: string } | null | undefined

// Strip heavy nested "pages" docs from buttonLink; keep only { slug }
// export function stripButtonLinksToSlug<T = any>(page: T): T {
//   if (!page || typeof page !== 'object') return page

//   // clone so we don't mutate Payload's internal objects
//   const clone: any =
//     typeof structuredClone === 'function' ? structuredClone(page) : JSON.parse(JSON.stringify(page))

//   const visit = (node: any) => {
//     if (!node || typeof node !== 'object') return

//     // If this node has a populated buttonLink (relationship to pages),
//     // shrink it from full doc → { slug }
//     if (node.buttonLink && typeof node.buttonLink === 'object') {
//       const slug = (node.buttonLink as any).slug
//       if (typeof slug === 'string') {
//         node.buttonLink = { slug }
//       }
//     }

//     // Walk children
//     for (const key in node) {
//       if (!Object.prototype.hasOwnProperty.call(node, key)) continue
//       const value = node[key]
//       if (Array.isArray(value)) {
//         value.forEach(visit)
//       } else if (value && typeof value === 'object') {
//         visit(value)
//       }
//     }
//   }

//   visit(clone)
//   return clone as T
// }

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

export function pageHref(target: MaybePopulated): string {
  // console.log('target', target)
  if (!target || typeof target === 'string') return '#' // not populated; resolve on server
  const s = target.slug || ''
  if (!s) return '#'
  return s === 'index' ? '/' : `/${s.replace(/^\/+/, '')}`
}
/** New: returns a Link-friendly href (string or UrlObject) with an optional #hash */
export function pageHrefWithAnchor(target: MaybePopulated, anchor?: string) {
  const base = pageHref(target)
  if (!base || base === '#') return '#'

  const hash = (anchor ?? '').replace(/^#/, '')
  // If no anchor, just return the base string
  if (!hash) return base

  // Prefer UrlObject so Next.js preserves pathname + hash cleanly
  return { pathname: base, hash }
}

// lib/routing.ts
export function buildDetailHref(pattern: string, id: string | number): string {
  if (!pattern) return '#'
  const clean = pattern.replace(/^\/+|\/+$/g, '')
  const colonIdx = clean.indexOf(':')
  const base = colonIdx >= 0 ? clean.slice(0, colonIdx) : clean + '/'
  const withSlash = base.endsWith('/') ? base : base + '/'
  return '/' + (withSlash + encodeURIComponent(String(id))).replace(/^\/+/, '')
}

export const withSectionHash = (href: string, sectionId?: string | null) => {
  const id = String(sectionId ?? '').trim()
  if (!id) return href

  const cleanHref = href.replace(/#.*$/, '')
  return `${cleanHref}#${id}`
}

type MaybeRel<T> = string | T | null | undefined

export function resolvePageSlug(target: MaybeRel<{ slug?: string }>): string | null {
  return target && typeof target === 'object' && typeof target.slug === 'string'
    ? target.slug || null
    : null
}

// ========================================================================================
// ========================================================================================

// ========================================================================================
// ========================================================================================
// utils/date.ts
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
