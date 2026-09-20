import RenderBlocks from '@/blocks/RenderBlock'
import { logCacheMiss } from '@/lib/cacheDebug'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
import { stripButtonLinksToSlug } from '@/lib/utils'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@/payload.config'
import type { Metadata } from 'next'

import { unstable_cache as unstableCache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type PageParams = { slug?: string[] }
type PageProps = { params: Promise<PageParams> }

const SITE_NAME = 'Xynolab'

const DEFAULT_DESCRIPTION =
  'XynoLab delivers custom software, websites, SaaS platforms, ERP systems, and digital solutions designed to help businesses operate smarter and grow faster.'

const norm = (s: string) =>
  decodeURIComponent(s)
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')

const payloadClient = async () => getPayload({ config: await config })

const getSiteUrl = () => {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.API_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '')
}

const getDefaultOgImage = () => {
  const staticDomain = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN?.replace(/\/$/, '')

  if (staticDomain) {
    return `${staticDomain}/images/logo.png`
  }

  return `${getSiteUrl()}/images/logo.png`
}

// --- Cached fetchers ---------------------------------------------------------

// Invalidate layouts cached before Privileges switched to configurable card entries.
const PAGE_LAYOUT_CACHE_VERSION = 'card-benefits-dynamic-stack-v5'

const getPageBySlugCached = (slug: string) =>
  unstableCache(
    async () => {
      logCacheMiss(`page:${slug}`)

      const payload = await payloadClient()

      const { docs } = await payload.find({
        collection: 'pages',
        limit: 1,
        depth: 2,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const page = (docs?.[0] as PayloadPage | null) || null

      return page ? stripButtonLinksToSlug(page) : null
    },
    [`page:${slug}`, PAGE_LAYOUT_CACHE_VERSION],
    {
      tags: [pageTag(slug)],
    },
  )()

const getPatternPagesCached = unstableCache(
  async () => {
    logCacheMiss('pages:patterns')

    const payload = await payloadClient()

    const { docs } = await payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 2,
    })

    const sanitized = (docs ?? []).map((p) => stripButtonLinksToSlug(p))

    return sanitized.filter((p: any) => typeof p.slug === 'string' && p.slug.includes(':'))
  },
  ['pages:patterns', PAGE_LAYOUT_CACHE_VERSION],
  {
    tags: [pagesListTag],
  },
)

// --- Pattern helpers ---------------------------------------------------------

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

  return {
    regex: new RegExp(`^${regexStr}$`),
    keys,
  }
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

async function getPageForPath(path: string) {
  const exact = await getPageBySlugCached(path)

  if (exact) {
    return {
      page: exact,
      params: {},
    }
  }

  const patterns = await getPatternPagesCached()

  patterns.sort((a: any, b: any) => {
    const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
    return statics(b.slug) - statics(a.slug)
  })

  for (const page of patterns) {
    const params = matchPattern(path, page.slug)

    if (!params) continue

    const concrete = await getPageBySlugCached(page.slug)

    return {
      page: concrete ?? page,
      params,
    }
  }

  return {
    page: null,
    params: {},
  }
}

// ✅ Page-by-page metadata from Payload
// ✅ No metaImage field
// ✅ Default OG image uses the same website logo
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  const { page } = await getPageForPath(path)

  if (!page || (page as any)?._status === 'draft') {
    return {
      title: `Page Not Found | ${SITE_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const p = page as any

  const siteUrl = getSiteUrl()
  const cleanPath = path === 'index' ? '' : path
  const pageUrl = cleanPath ? `${siteUrl}/${cleanPath}` : `${siteUrl}/`

  const title = p.metaTitle || p.title || p.name || SITE_NAME

  const description = p.metaDescription || DEFAULT_DESCRIPTION

  const keywords =
    typeof p.metaKeywords === 'string'
      ? p.metaKeywords
          .split(',')
          .map((item: string) => item.trim())
          .filter(Boolean)
      : undefined

  const fallbackOgImage = getDefaultOgImage()

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: p.canonicalUrl || pageUrl,
    },

    robots: p.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: fallbackOgImage,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fallbackOgImage],
    },
  }
}

// Force static + tag invalidation model
export const dynamic = 'force-static'
export const revalidate = false

export default async function CatchAll(props: PageProps) {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const { slug } = await props.params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  const exact = await getPageBySlugCached(path)

  if (exact) {
    if ((exact as any)?._status === 'draft') return notFound()

    return (
      <div>
        <RenderBlocks layout={exact.layout as PayloadPage['layout']} params={{}} />
      </div>
    )
  }

  const patterns = await getPatternPagesCached()

  patterns.sort((a: any, b: any) => {
    const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
    return statics(b.slug) - statics(a.slug)
  })

  for (const page of patterns) {
    const params = matchPattern(path, page.slug)

    if (!params) continue

    const concrete = await getPageBySlugCached(page.slug)

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
