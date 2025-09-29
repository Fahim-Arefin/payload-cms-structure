// import React, { cache } from 'react'

// import config from '@/payload.config'
// import { getPayload } from 'payload'
// import { notFound } from 'next/navigation'
// import { Page as PayloadPage } from '@/payload-types'
// import HeroBlock from '@/blocks/Hero/HeroBlock'
// import ContactUsFormBlock from '@/blocks/contactUsForm/ContactUsFormBlock'
// import ServicesOverviewBlock from '@/blocks/servicesOverview/ServicesOverviewBlock'

// const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const parsedSlug = decodeURIComponent(slug)

//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })

//   const result = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     where: {
//       slug: {
//         equals: parsedSlug,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// })

// export async function generateStaticParams() {
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })

//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//   })

//   return pages.docs
//     ?.filter((doc) => doc.slug !== 'index')
//     .map((doc) => ({
//       params: { slug: doc.slug },
//     }))
// }

// type PageProps = {
//   params: {
//     slug?: string
//   }
// }

// async function Page({ params: { slug = 'index' } }: PageProps) {
//   const page = await queryPageBySlug({ slug })

//   if (!page) {
//     return notFound()
//   }

//   console.log('page', page)

//   const renderBlocks = (block: PayloadPage['layout'][0]) => {
//     switch (block.blockType) {
//       case 'hero':
//         return <HeroBlock block={block} key={block.id} />
//       case 'contact-us-form':
//         return <ContactUsFormBlock block={block} key={block.id} />
//       case 'services-overview':
//         return <ServicesOverviewBlock block={block} key={block.id} />

//       default:
//         return null
//     }
//   }

//   return <div>{page.layout?.map((block) => renderBlocks(block))}</div>
// }

// export default Page

// =========================================================================
// =========================================================================
// =========================================================================

// // app/[[...slug]]/page.tsx
// import React, { cache } from 'react'
// import { notFound } from 'next/navigation'
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import type { Page as PayloadPage } from '@/payload-types'

// import HeroBlock from '@/blocks/Hero/HeroBlock'
// import ContactUsFormBlock from '@/blocks/contactUsForm/ContactUsFormBlock'
// import ServicesOverviewBlock from '@/blocks/servicesOverview/ServicesOverviewBlock'

// const normalizeSlug = (s: string) =>
//   decodeURIComponent(s)
//     .replace(/^\/+|\/+$/g, '')
//     .replace(/\/{2,}/g, '/')

// const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const payload = await getPayload({ config: await config })
//   const result = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     where: { slug: { equals: slug } },
//   })
//   console.log('result', result)
//   return result.docs?.[0] || null
// })

// const renderBlock = (block: PayloadPage['layout'][0]) => {
//   switch (block.blockType) {
//     case 'hero':
//       return <HeroBlock block={block} key={block.id} />
//     case 'contact-us-form':
//       return <ContactUsFormBlock block={block} key={block.id} />
//     case 'services-overview':
//       return <ServicesOverviewBlock block={block} key={block.id} />
//     default:
//       return null
//   }
// }

// type PageProps = { params: { slug?: string[] } }

// export default async function Page({ params: { slug } }: PageProps) {
//   // empty slug array => homepage
//   const effective = slug?.length ? slug.join('/') : 'index'
//   const page = await queryPageBySlug({ slug: normalizeSlug(effective) })
//   console.log('page', page)
//   if (!page) notFound()
//   return <div>{page.layout?.map(renderBlock)}</div>
// }

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: await config })
//   const { docs } = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//   })

//   return (docs ?? []).map((doc) => {
//     const clean = normalizeSlug(doc.slug || '')
//     if (!clean || clean === 'index') return {} // → homepage (`/`)
//     return { slug: clean.split('/') } // e.g. 'bods/all-bods' → ['bods','all-bods']
//   })
// }

// // (optional) control SSG/ISR explicitly if you want
// export const dynamicParams = true

// ==========================================================================
// ==========================================================================
// ==========================================================================

// app/(frontend)/[[...slug]]/page.tsx
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Page as PayloadPage } from '@/payload-types'
import HeroBlock from '@/blocks/hero/HeroBlock'
import { HOME_PAGE_HERO_SLUG_AND_TAG } from '@/lib/constants'

type PageParams = { slug?: string[] }
type PageProps = { params: Promise<PageParams> } // <-- Next 15: params may be a Promise

const norm = (s: string) =>
  decodeURIComponent(s)
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')
const payloadClient = async () => getPayload({ config: await config })

const findExactPage = cache(async (slug: string) => {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: slug } },
  })
  return docs?.[0] || null
})

const findPatternPages = cache(async () => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'pages', limit: 1000 })
  return (docs ?? []).filter((p: any) => typeof p.slug === 'string' && p.slug.includes(':'))
})

/** compile 'all-bods/:id' → { regex: /^all-bods\/([^/]+)$/, keys: ['id'] } */
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

const renderBlock = (block: PayloadPage['layout'][0], params: Record<string, string>) => {
  switch (block.blockType) {
    case HOME_PAGE_HERO_SLUG_AND_TAG:
      return <HeroBlock key={block.id} block={block} params={params} />
    default:
      return null
  }
}

export default async function CatchAll(props: PageProps) {
  const { slug } = await props.params // <-- await params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  // 1) exact CMS page (e.g., 'index', 'about', 'bods')
  const exact = await findExactPage(path)
  if (exact) return <div>{exact.layout?.map((b) => renderBlock(b, {}))}</div>

  // 2) pattern CMS page (e.g., 'all-bods/:id', 'blog/:year/:month/:slug')
  const patterns = await findPatternPages()
  // prefer more specific patterns (more static segments) first
  patterns.sort((a: any, b: any) => {
    const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
    return statics(b.slug) - statics(a.slug)
  })

  for (const page of patterns) {
    const params = matchPattern(path, page.slug)
    if (!params) continue
    return <div>{page.layout?.map((b: any) => renderBlock(b, params))}</div>
  }

  notFound()
}

export const dynamicParams = true
