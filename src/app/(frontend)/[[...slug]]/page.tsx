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

// // version 01
// // app/(frontend)/[[...slug]]/page.tsx
// import FeaturedPlanBlock from '@/blocks/featuredPlan/FeaturedPlanBlock'
// import HeroBlock from '@/blocks/hero/HeroBlock'
// import LifeAtShantaBlock from '@/blocks/lifeAtShanta/LifeAtShantaBlock'
// import LifeInsuranceSimplifiedBlock from '@/blocks/lifeInsuranceSimplified/LifeInsuranceSimplifiedBlock'
// import LifeInsuranceVideoBlock from '@/blocks/lifeInsuranceVideo/LifeInsuranceVideoBlock'
// import PremiumCalculatorBlock from '@/blocks/premiumCalculator/PremiumCalculatorBlock'
// import WhyChooseUsBlock from '@/blocks/whyChooseUs/WhyChooseUsBlock'
// import {
//   HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//   HOME_PAGE_HERO_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
//   HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//   HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
// } from '@/lib/constants'
// import type { Page as PayloadPage } from '@/payload-types'
// import config from '@/payload.config'
// import { notFound } from 'next/navigation'
// import { getPayload } from 'payload'
// import { cache } from 'react'

// type PageParams = { slug?: string[] }
// type PageProps = { params: Promise<PageParams> } // <-- Next 15: params may be a Promise

// const norm = (s: string) =>
//   decodeURIComponent(s)
//     .replace(/^\/+|\/+$/g, '')
//     .replace(/\/{2,}/g, '/')
// const payloadClient = async () => getPayload({ config: await config })

// const findExactPage = cache(async (slug: string) => {
//   const payload = await payloadClient()
//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     depth: 2, // <-- ensure relationship to media is populated
//     where: { slug: { equals: slug } },
//   })
//   return docs?.[0] || null
// })

// const findPatternPages = cache(async () => {
//   const payload = await payloadClient()
//   const { docs } = await payload.find({ collection: 'pages', limit: 1000, depth: 2 })
//   return (docs ?? []).filter((p: any) => typeof p.slug === 'string' && p.slug.includes(':'))
// })

// /** compile 'all-bods/:id' → { regex: /^all-bods\/([^/]+)$/, keys: ['id'] } */
// function compilePattern(pattern: string) {
//   const keys: string[] = []
//   const regexStr = pattern
//     .split('/')
//     .map((seg) => {
//       if (seg === '*') return '(.*)'
//       if (seg.startsWith(':')) {
//         const optional = seg.endsWith('?')
//         const key = seg.replace(/^:/, '').replace(/\?$/, '')
//         keys.push(key)
//         return optional ? '([^/]+)?' : '([^/]+)'
//       }
//       return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
//     })
//     .join('/')
//   return { regex: new RegExp(`^${regexStr}$`), keys }
// }

// function matchPattern(path: string, pattern: string) {
//   const { regex, keys } = compilePattern(pattern)
//   const m = path.match(regex)
//   if (!m) return null
//   const params: Record<string, string> = {}
//   keys.forEach((k, i) => {
//     const v = m[i + 1]
//     if (v != null) params[k] = v
//   })
//   return params
// }

// const renderBlock = (block: PayloadPage['layout'][0], params: Record<string, string>) => {
//   switch (block.blockType) {
//     case HOME_PAGE_HERO_SLUG_AND_TAG:
//       return <HeroBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG:
//       return <WhyChooseUsBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG:
//       return <FeaturedPlanBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG:
//       return <PremiumCalculatorBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG:
//       return <LifeInsuranceSimplifiedBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG:
//       return <LifeInsuranceVideoBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG:
//       return <LifeAtShantaBlock key={block.id} block={block} params={params} />
//     default:
//       return null
//   }
// }

// export default async function CatchAll(props: PageProps) {
//   const { slug } = await props.params // <-- await params
//   const effective = slug?.length ? slug.join('/') : 'index'
//   const path = norm(effective)

//   // 1) exact CMS page (e.g., 'index', 'about', 'bods')
//   const exact = await findExactPage(path)
//   if (exact) return <div>{exact.layout?.map((b) => renderBlock(b, {}))}</div>

//   // 2) pattern CMS page (e.g., 'all-bods/:id', 'blog/:year/:month/:slug')
//   const patterns = await findPatternPages()
//   // prefer more specific patterns (more static segments) first
//   patterns.sort((a: any, b: any) => {
//     const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
//     return statics(b.slug) - statics(a.slug)
//   })

//   for (const page of patterns) {
//     const params = matchPattern(path, page.slug)
//     if (!params) continue
//     return <div>{page.layout?.map((b: any) => renderBlock(b, params))}</div>
//   }

//   notFound()
// }

// export const dynamicParams = true

// =========================================================================
// =========================================================================
// =========================================================================
// // version 02 (added published check)
// // app/(frontend)/[[...slug]]/page.tsx
// import FeaturedPlanBlock from '@/blocks/featuredPlan/FeaturedPlanBlock'
// import HeroBlock from '@/blocks/hero/HeroBlock'
// import LifeAtShantaBlock from '@/blocks/lifeAtShanta/LifeAtShantaBlock'
// import LifeInsuranceSimplifiedBlock from '@/blocks/lifeInsuranceSimplified/LifeInsuranceSimplifiedBlock'
// import LifeInsuranceVideoBlock from '@/blocks/lifeInsuranceVideo/LifeInsuranceVideoBlock'
// import PremiumCalculatorBlock from '@/blocks/premiumCalculator/PremiumCalculatorBlock'
// import WhyChooseUsBlock from '@/blocks/whyChooseUs/WhyChooseUsBlock'
// import {
//   HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//   HOME_PAGE_HERO_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
//   HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//   HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
// } from '@/lib/constants'
// import type { Page as PayloadPage } from '@/payload-types'
// import config from '@/payload.config'
// import { notFound } from 'next/navigation'
// import { getPayload } from 'payload'
// import { cache } from 'react'

// type PageParams = { slug?: string[] }
// type PageProps = { params: Promise<PageParams> }

// const norm = (s: string) =>
//   decodeURIComponent(s)
//     .replace(/^\/+|\/+$/g, '')
//     .replace(/\/{2,}/g, '/')

// const payloadClient = async () => getPayload({ config: await config })

// // ✅ fetch only published exact match
// const findExactPage = cache(async (slug: string) => {
//   const payload = await payloadClient()
//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     depth: 2,
//     where: {
//       and: [{ slug: { equals: slug } }, { isPublished: { equals: true } }],
//     },
//   })
//   return docs?.[0] || null
// })

// // ✅ fetch only published, then filter pattern slugs locally
// const findPatternPages = cache(async () => {
//   const payload = await payloadClient()
//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 1000,
//     depth: 2,
//     where: { isPublished: { equals: true } },
//   })
//   return (docs ?? []).filter((p: any) => typeof p.slug === 'string' && p.slug.includes(':'))
// })

// function compilePattern(pattern: string) {
//   const keys: string[] = []
//   const regexStr = pattern
//     .split('/')
//     .map((seg) => {
//       if (seg === '*') return '(.*)'
//       if (seg.startsWith(':')) {
//         const optional = seg.endsWith('?')
//         const key = seg.replace(/^:/, '').replace(/\?$/, '')
//         keys.push(key)
//         return optional ? '([^/]+)?' : '([^/]+)'
//       }
//       return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
//     })
//     .join('/')
//   return { regex: new RegExp(`^${regexStr}$`), keys }
// }

// function matchPattern(path: string, pattern: string) {
//   const { regex, keys } = compilePattern(pattern)
//   const m = path.match(regex)
//   if (!m) return null
//   const params: Record<string, string> = {}
//   keys.forEach((k, i) => {
//     const v = m[i + 1]
//     if (v != null) params[k] = v
//   })
//   return params
// }

// const renderBlock = (block: PayloadPage['layout'][0], params: Record<string, string>) => {
//   switch (block.blockType) {
//     case HOME_PAGE_HERO_SLUG_AND_TAG:
//       return <HeroBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG:
//       return <WhyChooseUsBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG:
//       return <FeaturedPlanBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG:
//       return <PremiumCalculatorBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG:
//       return <LifeInsuranceSimplifiedBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG:
//       return <LifeInsuranceVideoBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG:
//       return <LifeAtShantaBlock key={block.id} block={block} params={params} />
//     default:
//       return null
//   }
// }

// export default async function CatchAll(props: PageProps) {
//   const { slug } = await props.params
//   const effective = slug?.length ? slug.join('/') : 'index'
//   const path = norm(effective)

//   // 1) Published exact page
//   const exact = await findExactPage(path)
//   if (exact) return <div>{exact.layout?.map((b) => renderBlock(b, {}))}</div>

//   // 2) Published pattern pages
//   const patterns = await findPatternPages()
//   patterns.sort((a: any, b: any) => {
//     const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
//     return statics(b.slug) - statics(a.slug)
//   })

//   for (const page of patterns) {
//     const params = matchPattern(path, page.slug)
//     if (!params) continue
//     return <div>{page.layout?.map((b: any) => renderBlock(b, params))}</div>
//   }

//   // 3) If not found or unpublished → 404
//   notFound()
// }

// export const dynamicParams = true

// =========================================================================
// =========================================================================
// =========================================================================

// version 03 (refactored caching, added cache tags)
// app/(frontend)/[[...slug]]/page.tsx
import RenderBlocks from '@/blocks/RenderBlock'
import { logCacheMiss } from '@/lib/cacheDebug'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
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
      return docs?.[0] || null
    },
    // cache key must be stable
    [`page:${slug}`],
    { tags: [pageTag(slug)] },
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
    return (docs ?? []).filter((p: any) => typeof p.slug === 'string' && p.slug.includes(':'))
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

// --- block renderer ----------------------------------------------------------
// const renderBlock = (block: PayloadPage['layout'][0], params: Record<string, string>) => {
//   switch (block.blockType) {
//     // home page
//     case HOME_PAGE_HERO_SLUG_AND_TAG:
//       return <HeroBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG:
//       return <WhyChooseUsBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG:
//       return <FeaturedPlanBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG:
//       return <PremiumCalculatorBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG:
//       return <LifeInsuranceSimplifiedBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG:
//       return <LifeInsuranceVideoBlock key={block.id} block={block} params={params} />
//     case HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG:
//       return <LifeAtShantaBlock key={block.id} block={block} params={params} />
//     // about us page
//     case ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG:
//       return <ShantaIntroBlock key={block.id} block={block} params={params} />
//     default:
//       return null
//   }
// }

// Force static + tag invalidation model (pure tag-based freshness)
export const dynamic = 'force-static'
export const revalidate = false

export default async function CatchAll(props: PageProps) {
  const { slug } = await props.params
  const effective = slug?.length ? slug.join('/') : 'index'
  const path = norm(effective)

  // // =============================================================================================
  // // =============================================================================================
  // // 1) try exact
  // const exact = await getPageBySlugCached(path)
  // if (!exact) notFound()
  // // if (exact?.publish !== false) return <div>{exact?.layout?.map((b) => renderBlock(b, {}))}</div>
  // if (exact?.publish !== false)
  //   return (
  //     <div>
  //       <RenderBlocks layout={exact.layout} params={{}} />
  //     </div>
  //   )
  // if (exact && exact.publish === false) return notFound()

  // // 2) try pattern pages (sorted by specificity)
  // const patterns = await getPatternPagesCached()
  // patterns.sort((a: any, b: any) => {
  //   const statics = (s: string) => s.split('/').filter((p) => p && !p.startsWith(':')).length
  //   return statics(b.slug) - statics(a.slug)
  // })

  // for (const page of patterns) {
  //   const params = matchPattern(path, page.slug)
  //   if (!params) continue
  //   // If you store the same doc under that pattern slug, reuse its tag
  //   const concrete = await getPageBySlugCached(page.slug)
  //   const canShow = (concrete ?? page)?.publish !== false
  //   if (!canShow) break
  //   // return <div>{(concrete?.layout ?? page.layout)?.map((b: any) => renderBlock(b, params))}</div>
  //   return (
  //     <div>
  //       <RenderBlocks
  //         layout={(concrete?.layout ?? page.layout) as PayloadPage['layout']}
  //         params={params}
  //       />
  //     </div>
  //   )
  // }
  // notFound()
  // // =============================================================================================
  // // =============================================================================================
  // 1) exact page (published only by default)
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
