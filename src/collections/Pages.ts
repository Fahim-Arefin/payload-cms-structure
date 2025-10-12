// import FeaturedPlansSchema from '@/blocks/featuredPlan/schema'
// import HeroSchema from '@/blocks/hero/schema'
// import LifeAtShantaSchema from '@/blocks/lifeAtShanta/schema'
// import LifeInsuranceSimplifiedSchema from '@/blocks/lifeInsuranceSimplified/schema'
// import LifeInsuranceVideoSchema from '@/blocks/lifeInsuranceVideo/schema'
// import PremiumCalculatorSchema from '@/blocks/premiumCalculator/schema'
// import WhyChooseUsSchema from '@/blocks/whyChooseUs/schema'
// import type { CollectionConfig } from 'payload'

// export const Pages: CollectionConfig = {
//   slug: 'pages',
//   labels: {
//     singular: 'Page',
//     plural: 'Pages',
//   },

//   admin: {
//     group: 'Dynamic Pages',
//     description: 'Dynamic pages assembled from blocks',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'slug', 'updatedAt'],
//   },

//   fields: [
//     // (Optional) document-level session id used by your CropUploadField to tag media uploads.
//     // Safe to keep; you can hide it from Admin UI.
//     {
//       name: 'uploadSessionId',
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },

//     { name: 'name', label: 'Name', type: 'text', required: true },

//     {
//       name: 'slug',
//       label: 'Slug (e.g. index, about, bods/all-bods)',
//       type: 'text',
//       required: true,
//       unique: true,
//       admin: { position: 'sidebar' },
//       validate: (val: unknown) => {
//         const s = String(val ?? '').trim()
//         if (!s) return 'Slug is required'
//         if (s.startsWith('/') || s.endsWith('/')) return 'No leading/trailing slash'
//         if (s.includes('//')) return 'No double slashes'
//         return true
//       },
//     },
//     // 👇 Publish toggle (directly below slug)
//     {
//       name: 'isPublished',
//       label: 'Publish this page',
//       type: 'checkbox',
//       defaultValue: false,
//       admin: {
//         position: 'sidebar',
//         description: 'If unchecked, the page is not publicly accessible and will return a 404.',
//       },
//     },

//     {
//       name: 'layout',
//       label: 'Layout',
//       type: 'blocks',
//       required: true,
//       blocks: [
//         HeroSchema,
//         WhyChooseUsSchema,
//         FeaturedPlansSchema,
//         PremiumCalculatorSchema,
//         LifeInsuranceSimplifiedSchema,
//         LifeInsuranceVideoSchema,
//         LifeAtShantaSchema,
//       ],
//     },
//   ],

//   access: {
//     read: () => true,
//     create: () => true,
//     update: () => true,
//     delete: () => true,
//   },

//   timestamps: true,
// }

// export default Pages

// ==============================================================================================
// ==============================================================================================
// ==============================================================================================

// version 01 (added cache keys and tags for globals and home page sections)
// src/collections/Pages.ts
import FeaturedPlansSchema from '@/blocks/featuredPlan/schema'
import HeroSchema from '@/blocks/hero/schema'
import LifeAtShantaSchema from '@/blocks/lifeAtShanta/schema'
import LifeInsuranceSimplifiedSchema from '@/blocks/lifeInsuranceSimplified/schema'
import LifeInsuranceVideoSchema from '@/blocks/lifeInsuranceVideo/schema'
import PremiumCalculatorSchema from '@/blocks/premiumCalculator/schema'
import WhyChooseUsSchema from '@/blocks/whyChooseUs/schema'
import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
import ShantaIntroSchema from '@/blocks/shantaIntro/schema'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Dynamic Pages',
    description: 'Dynamic pages assembled from blocks',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'publish', 'updatedAt'],
  },
  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug (e.g. index, about, bods/all-bods)',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      validate: (val: unknown) => {
        const s = String(val ?? '').trim()
        if (!s) return 'Slug is required'
        if (s.startsWith('/') || s.endsWith('/')) return 'No leading/trailing slash'
        if (s.includes('//')) return 'No double slashes'
        return true
      },
    },
    {
      name: 'publish',
      type: 'checkbox',
      label: 'Publish this page',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Uncheck to hide this page (404).' },
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      required: true,
      blocks: [
        // home page
        HeroSchema,
        WhyChooseUsSchema,
        FeaturedPlansSchema,
        PremiumCalculatorSchema,
        LifeInsuranceSimplifiedSchema,
        LifeInsuranceVideoSchema,
        LifeAtShantaSchema,
        // about us page
        ShantaIntroSchema,
      ],
    },
  ],
  access: { read: () => true, create: () => true, update: () => true, delete: () => true },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        try {
          const slug = doc?.slug ?? previousDoc?.slug
          if (slug) revalidateTag(pageTag(slug)) // 🔁 revalidate only this page
          revalidateTag(pagesListTag) // (optional) pattern list
        } catch {}
      },
    ],
    afterDelete: [
      // This runs when a single doc is deleted (deleteByID) and also for each doc in deleteMany.
      async ({ doc, result }: any) => {
        try {
          // Payload may pass `doc` for single delete, and `result?.docs` for bulk delete.
          const docs: any[] = Array.isArray(result?.docs) ? result.docs : doc ? [doc] : []

          const slugs = docs.map((d) => String(d?.slug ?? '').trim()).filter(Boolean)

          // Invalidate each page’s tag
          for (const s of slugs) {
            revalidateTag(pageTag(s))
          }
          // Also invalidate the list/patterns cache
          revalidateTag(pagesListTag)
        } catch {}
      },
    ],
  },
  timestamps: true,
}

export default Pages
