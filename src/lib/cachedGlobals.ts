// // working code
// import { unstable_cache as unstableCache } from 'next/cache'
// import { getPayload, GlobalSlug } from 'payload'
// import config from '@/payload.config'
// import { globalTag } from './cacheTags'
// import { logCacheMiss } from './cacheDebug'

// const payloadClient = async () => getPayload({ config: await config })

// export function getGlobalCached<T = any>(
//   slug: GlobalSlug,
//   depth = 2,
//   extraTags?: string | string[], // raw tag names
// ) {
//   const extras = Array.isArray(extraTags) ? extraTags.filter(Boolean) : extraTags ? [extraTags] : []
//   const cacheKey = [`global:${slug}`, String(depth), ...extras]

//   return unstableCache(
//     async (): Promise<T> => {
//       logCacheMiss(`global:${slug}${extras.length ? ` deps:${extras.join(',')}` : ''}`)
//       const payload = await payloadClient()
//       const data = await payload.findGlobal({ slug, depth })
//       return data as T
//     },
//     cacheKey,
//     {
//       // primary tag is still the global
//       tags: [globalTag(slug), ...extras], // NOTE: extras used as-is
//     },
//   )()
// }

// ==================================================================================
// ==================================================================================
// ==================================================================================
// src/lib/shrinkNestedPagesToSlug.ts
import { unstable_cache as unstableCache } from 'next/cache'
import { getPayload, GlobalSlug } from 'payload'
import config from '@/payload.config'
import { globalTag } from './cacheTags'
import { logCacheMiss } from './cacheDebug'

const payloadClient = async () => getPayload({ config: await config })

export function shrinkNestedPagesToSlug<T = any>(input: T): T {
  if (!input || typeof input !== 'object') return input

  const clone: any =
    typeof structuredClone === 'function'
      ? structuredClone(input)
      : JSON.parse(JSON.stringify(input))

  const looksLikePageDoc = (node: any) => {
    if (!node || typeof node !== 'object') return false
    const hasSlug = typeof node.slug === 'string'
    const hasLayout = Array.isArray(node.layout)
    const isPagesCollection = typeof node.collection === 'string' && node.collection === 'pages'
    return hasSlug && (hasLayout || isPagesCollection)
  }

  const visit = (node: any) => {
    if (!node || typeof node !== 'object') return

    // relationship shape { relationTo:'pages', value:{...doc...} }
    if (
      node &&
      typeof node === 'object' &&
      node.relationTo === 'pages' &&
      node.value &&
      typeof node.value === 'object'
    ) {
      const slug = node.value?.slug
      if (typeof slug === 'string') node.value = { slug }
    }

    for (const key in node) {
      if (!Object.prototype.hasOwnProperty.call(node, key)) continue
      const val = node[key]

      if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          const item = val[i]
          if (item && typeof item === 'object') {
            // array of populated page docs → shrink to { slug }
            if (looksLikePageDoc(item)) {
              const slug = item.slug
              val[i] = typeof slug === 'string' ? { slug } : val[i]
            } else {
              visit(item)
            }
          }
        }
      } else if (val && typeof val === 'object') {
        // simple relationship (not polymorphic): field itself is a page doc
        if (looksLikePageDoc(val)) {
          const slug = val.slug
          node[key] = typeof slug === 'string' ? { slug } : node[key]
        } else {
          visit(val)
        }
      }
    }
  }

  visit(clone)
  return clone as T
}

export function getGlobalCached<T = any>(
  slug: GlobalSlug,
  depth = 2,
  extraTags?: string | string[],
) {
  const extras = Array.isArray(extraTags) ? extraTags.filter(Boolean) : extraTags ? [extraTags] : []
  const cacheKey = [`global:${slug}`, String(depth), ...extras]

  return unstableCache(
    async (): Promise<T> => {
      logCacheMiss(`global:${slug}${extras.length ? ` deps:${extras.join(',')}` : ''}`)
      const payload = await payloadClient()
      const raw = await payload.findGlobal({ slug, depth })

      // 🧹 shrink populated `pages` relations before caching
      const sanitized = shrinkNestedPagesToSlug(raw)

      return sanitized as T
    },
    cacheKey,
    { tags: [globalTag(slug), ...extras] },
  )()
}
