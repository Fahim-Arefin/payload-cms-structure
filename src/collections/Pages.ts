// // payload collection
// import HeroSchema from '@/blocks/hero/schema'
// import type { CollectionConfig } from 'payload'

// export const Pages: CollectionConfig = {
//   slug: 'pages',
//   fields: [
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
//     {
//       name: 'layout',
//       label: 'Layout',
//       type: 'blocks',
//       required: true,
//       blocks: [HeroSchema],
//     },
//   ],
//   hooks: {
//     beforeValidate: [
//       async ({ data, operation, req }) => {
//         try {
//           const heroes = data?.layout?.find?.((b: any) => b?.blockType === 'homePageHero')?.heroes
//           if (heroes?.length) {
//             req.payload.logger.info({
//               msg: '[DEBUG] incoming heroes[0] image payload',
//               operation,
//               image: heroes[0]?.image,
//               imageOriginal: heroes[0]?.imageOriginal,
//               pendingImageOriginal: heroes[0]?.pendingImageOriginal,
//               pendingImageCrop: heroes[0]?.pendingImageCrop,
//             })
//           }
//         } catch {}
//         return data
//       },
//     ],
//   },
// }

// ========================================================================================
// ========================================================================================
// ========================================================================================

// // src/collections/Pages.ts
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// import {
//   HOME_PAGE_HERO_SLUG_AND_TAG,
//   HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//   HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//   HOME_PAGE_VIDEO_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//   HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
// } from '@/lib/constants'
// import HeroSchema from '@/blocks/hero/schema'

// // // Import your block schemas
// // import { HomeHeroBlock } from '@/blocks/home-hero'
// // import { FeaturedPlansBlock } from '@/blocks/featured-plans'
// // import { HomePremiumCalculatorBlock } from '@/blocks/home-premium-calculator'
// // import { HomeVideoBlock } from '@/blocks/home-video'
// // import { LifeAtShantaBlock } from '@/blocks/life-at-shanta'
// // import { LifeInsuranceSimplifiedBlock } from '@/blocks/life-insurance-simplified'
// // import { WhyChooseUsBlock } from '@/blocks/why-choose-us'

// export const Pages: CollectionConfig = {
//   slug: 'pages',

//   admin: {
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'slug', 'updatedAt'],
//     group: 'Content',
//     description: 'Dynamic pages assembled from blocks',
//   },

//   fields: [
//     { name: 'name', type: 'text', required: true },

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

//     // 🔐 Hidden session id — cropper uses this for uploads
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     {
//       name: 'layout',
//       label: 'Layout',
//       type: 'blocks',
//       required: true,
//       blocks: [
//         HeroSchema,
//         // FeaturedPlansBlock,
//         // HomePremiumCalculatorBlock,
//         // HomeVideoBlock,
//         // LifeAtShantaBlock,
//         // LifeInsuranceSimplifiedBlock,
//         // WhyChooseUsBlock,
//       ],
//     },
//   ],

//   hooks: withMediaLifecycle({
//     imageConfigs: [],
//     arrayFields: [],
//     groupFields: [],

//     // 🔹 Block row fields with single media
//     blockSimpleFields: [
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//         mediaFields: ['backgroundImage1', 'backgroundImage2'],
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_VIDEO_SLUG_AND_TAG,
//         mediaFields: ['thumbnail'],
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//         mediaFields: ['backgroundImage'],
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//         mediaFields: ['mainImage', 'sideImage'],
//       },
//     ],

//     // 🔹 Arrays inside a block
//     blockArrayFields: [
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_HERO_SLUG_AND_TAG,
//         arrayKey: 'heroes',
//         mediaFields: ['image'],
//         itemLabelField: 'title',
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//         arrayKey: 'plans',
//         mediaFields: ['icon', 'image'],
//         itemLabelField: 'title',
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//         arrayKey: 'gallery',
//         mediaFields: ['image'],
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//         arrayKey: 'sections',
//         mediaFields: ['mainImage'],
//         itemLabelField: 'title',
//       },
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//         arrayKey: 'stats',
//         mediaFields: ['icon'],
//         itemLabelField: 'label',
//       },
//     ],

//     // 🔹 Nested arrays (group inside array)
//     blockGroupFields: [
//       {
//         layoutKey: 'layout',
//         blockType: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//         groupKey: 'sections',
//         arrayKey: 'insuranceCardData',
//         mediaFields: ['image'],
//         itemLabelField: 'title',
//         groupItemLabelField: 'title',
//       },
//     ],

//     skipOnDraft: true,
//     collectionSlug: 'pages',
//     onAfterChange: async ({ req }) => {
//       // revalidate all block tags that may be used on frontend
//       try {
//         revalidateTag(HOME_PAGE_HERO_SLUG_AND_TAG)
//         revalidateTag(HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG)
//         revalidateTag(HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG)
//         revalidateTag(HOME_PAGE_VIDEO_SLUG_AND_TAG)
//         revalidateTag(HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG)
//         revalidateTag(HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG)
//         revalidateTag(HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG)
//       } catch {}
//       // cleanup leftover temporary:true media
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// ======================================================
// ======================================================
// ======================================================
// ======================================================

// src/collections/Pages.ts
import FeaturedPlansSchema from '@/blocks/featuredPlan/schema'
import HeroSchema from '@/blocks/hero/schema'
import LifeAtShantaSchema from '@/blocks/lifeAtShanta/schema'
import LifeInsuranceSimplifiedSchema from '@/blocks/lifeInsuranceSimplified/schema'
import LifeInsuranceVideoSchema from '@/blocks/lifeInsuranceVideo/schema'
import PremiumCalculatorSchema from '@/blocks/premiumCalculator/schema'
import WhyChooseUsSchema from '@/blocks/whyChooseUs/schema'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },

  admin: {
    group: 'Dynamic Pages',
    description: 'Dynamic pages assembled from blocks',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },

  fields: [
    // (Optional) document-level session id used by your CropUploadField to tag media uploads.
    // Safe to keep; you can hide it from Admin UI.
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: { condition: () => false, readOnly: true },
    },

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
    // 👇 Publish toggle (directly below slug)
    {
      name: 'isPublished',
      label: 'Publish this page',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If unchecked, the page is not publicly accessible and will return a 404.',
      },
    },

    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      required: true,
      blocks: [
        HeroSchema,
        WhyChooseUsSchema,
        FeaturedPlansSchema,
        PremiumCalculatorSchema,
        LifeInsuranceSimplifiedSchema,
        LifeInsuranceVideoSchema,
        LifeAtShantaSchema,
      ],
    },
  ],

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  timestamps: true,
}

export default Pages
