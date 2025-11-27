// current last fix code
import RenderBlocks from '@/blocks/RenderBlock'
import { logCacheMiss } from '@/lib/cacheDebug'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
import { stripButtonLinksToSlug } from '@/lib/utils'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@/payload.config'
import { unstable_cache as unstableCache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type PageParams = { slug?: string[] }
type PageProps = { params: Promise<PageParams> } // Next 15: params may be a Promise

const norm = (s: string) =>
  decodeURIComponent(s)
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')

const payloadClient = async () => getPayload({ config: await config })

// --- Cached fetchers ---------------------------------------------------------

// new one
const getPageBySlugCached = (slug: string) =>
  unstableCache(
    async () => {
      logCacheMiss(`page:${slug}`)
      const payload = await payloadClient()
      const { docs } = await payload.find({
        collection: 'pages',
        limit: 1,
        depth: 2,
        where: { slug: { equals: slug } },
      })

      const page = (docs?.[0] as PayloadPage | null) || null
      return page ? stripButtonLinksToSlug(page) : null
    },
    [`page:${slug}`],
    { tags: [pageTag(slug)] },
  )()

// new one
const getPatternPagesCached = unstableCache(
  async () => {
    logCacheMiss('pages:patterns')
    const payload = await payloadClient()
    const { docs } = await payload.find({ collection: 'pages', limit: 1000, depth: 2 })

    const sanitized = (docs ?? []).map((p) => stripButtonLinksToSlug(p)) // shrink nested buttonLink

    return sanitized.filter((p: any) => typeof p.slug === 'string' && p.slug.includes(':'))
  },
  ['pages:patterns'],
  { tags: [pagesListTag] },
)

// --- pattern helpers ---------------------------------------------------------
function compilePattern(pattern: string) {
  const keys: string[] = []
  const regexStr = pattern
    .split('/')
    .map((seg) => {
      if (seg === '*') return '(.*)'
      if (seg.startsWith(':')) {
        const optional = seg.endsWith('?')
        const key = seg.replace(/^:/, '').replace(/\?$/, '')
        keys.push(key)
        return optional ? '([^/]+)?' : '([^/]+)'
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    })
    .join('/')
  return { regex: new RegExp(`^${regexStr}$`), keys }
}

function matchPattern(path: string, pattern: string) {
  const { regex, keys } = compilePattern(pattern)
  const m = path.match(regex)
  if (!m) return null
  const params: Record<string, string> = {}
  keys.forEach((k, i) => {
    const v = m[i + 1]
    if (v != null) params[k] = v
  })
  return params
}

// Force static + tag invalidation model (pure tag-based freshness)
export const dynamic = 'force-static'
export const revalidate = false

export default async function CatchAll(props: PageProps) {
  const { slug } = await props.params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  const exact = await getPageBySlugCached(path)
  if (exact) {
    if ((exact as any)?._status === 'draft') return notFound() // defensive
    return (
      <div>
        <RenderBlocks layout={exact.layout as PayloadPage['layout']} params={{}} />
      </div>
    )
  }

  // 2) try pattern pages (only when no exact match)
  const patterns = await getPatternPagesCached()
  patterns.sort((a: any, b: any) => {
    const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
    return statics(b.slug) - statics(a.slug)
  })

  for (const page of patterns) {
    const params = matchPattern(path, page.slug)
    if (!params) continue

    const concrete = await getPageBySlugCached(page.slug)
    // const canShow = (concrete ?? page)?.publish !== false
    // if (!canShow) break
    const canShow = ((concrete ?? page) as any)?._status !== 'draft'
    if (!canShow) break

    return (
      <div>
        <RenderBlocks
          layout={(concrete?.layout ?? page.layout) as PayloadPage['layout']}
          params={params}
        />
      </div>
    )
  }

  notFound()
}
