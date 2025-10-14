// // working code
// import { unstable_cache as unstableCache } from 'next/cache'
// import { getPayload, GlobalSlug } from 'payload'
// import config from '@/payload.config'
// import { globalTag } from './cacheTags'
// import { logCacheMiss } from './cacheDebug'

// const payloadClient = async () => getPayload({ config: await config })

// export function getGlobalCached<T = any>(slug: GlobalSlug, depth = 2) {
//   return unstableCache(
//     async (): Promise<T> => {
//       // Only prints when a real DB fetch happens (cache miss)
//       logCacheMiss(`global:${slug}`)
//       const payload = await payloadClient()
//       const data = await payload.findGlobal({ slug, depth })
//       return data as T
//     },
//     [`global:${slug}`, String(depth)],
//     { tags: [globalTag(slug)] },
//   )()
// }

// ========================================================================
// ========================================================================
// ========================================================================
// src/lib/cachedGlobals.ts
import { unstable_cache as unstableCache } from 'next/cache'
import { getPayload, GlobalSlug } from 'payload'
import config from '@/payload.config'
import { globalTag } from './cacheTags'
import { logCacheMiss } from './cacheDebug'

const payloadClient = async () => getPayload({ config: await config })

export function getGlobalCached<T = any>(
  slug: GlobalSlug,
  depth = 2,
  extraTags?: string | string[], // raw tag names
) {
  const extras = Array.isArray(extraTags) ? extraTags.filter(Boolean) : extraTags ? [extraTags] : []
  const cacheKey = [`global:${slug}`, String(depth), ...extras]

  return unstableCache(
    async (): Promise<T> => {
      logCacheMiss(`global:${slug}${extras.length ? ` deps:${extras.join(',')}` : ''}`)
      const payload = await payloadClient()
      const data = await payload.findGlobal({ slug, depth })
      return data as T
    },
    cacheKey,
    {
      // primary tag is still the global
      tags: [globalTag(slug), ...extras], // NOTE: extras used as-is
    },
  )()
}
