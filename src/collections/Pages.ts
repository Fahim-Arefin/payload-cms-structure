// // version 01 (added cache keys and tags for globals and home page sections)
// import FeaturedPlansSchema from '@/blocks/featuredPlan/schema'
// import HeroSchema from '@/blocks/hero/schema'
// import LifeAtShantaSchema from '@/blocks/lifeAtShanta/schema'
// import LifeInsuranceSimplifiedSchema from '@/blocks/lifeInsuranceSimplified/schema'
// import LifeInsuranceVideoSchema from '@/blocks/lifeInsuranceVideo/schema'
// import PremiumCalculatorSchema from '@/blocks/premiumCalculator/schema'
// import WhyChooseUsSchema from '@/blocks/whyChooseUs/schema'
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'
// import { pageTag, pagesListTag } from '@/lib/cacheTags'
// import ShantaIntroSchema from '@/blocks/shantaIntro/schema'
// import ShantaVisionSchema from '@/blocks/shantaVision/schema'
// import ValuesThatShapeUsSchema from '@/blocks/valuesThatShapeUs/schema'
// import LicensedLaunchedSchema from '@/blocks/LicensedAndLaunched/schema'
// import DirectorsMessagesSchema from '@/blocks/directorsMessage/schema'
// import ShantaMilestonesUnlockedSchema from '@/blocks/shantaMilestoneUnlocked/schema'
// import ShantaFootprintSchema from '@/blocks/shantaFootprint/schema'
// import AgentVisionSchema from '@/blocks/agentVision/schema'
// import AgentOnboardingOpportunitySchema from '@/blocks/agentOnboadringOpportunity/schema'
// import MoreThanAWorkplaceSchema from '@/blocks/moreThanAWorkplace/schema'
// import BoardOfDirectorsCardSchema from '@/blocks/BoardOfDirectorsCard/schema'
// import BoardOfDirectorsListSchema from '@/blocks/BoardOfDirectorsList/schema'
// import LeadershipTeamCardSchema from '@/blocks/leadershipTeamCard/schema'
// import LeadershipTeamListSchema from '@/blocks/leadershipTeamList/schema'

// export const Pages: CollectionConfig = {
//   slug: 'pages',
//   labels: { singular: 'Page', plural: 'Pages' },
//   admin: {
//     group: 'Dynamic Pages',
//     description: 'Dynamic pages assembled from blocks',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'slug', 'publish', 'updatedAt'],
//   },
//   fields: [
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },
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
//       name: 'publish',
//       type: 'checkbox',
//       label: 'Publish this page',
//       defaultValue: true,
//       admin: { position: 'sidebar', description: 'Uncheck to hide this page (404).' },
//     },
//     {
//       name: 'layout',
//       label: 'Layout',
//       type: 'blocks',
//       required: true,
//       blocks: [
//         // home page
//         HeroSchema,
//         WhyChooseUsSchema,
//         FeaturedPlansSchema,
//         PremiumCalculatorSchema,
//         LifeInsuranceSimplifiedSchema,
//         LifeInsuranceVideoSchema,
//         LifeAtShantaSchema,
//         // about us page
//         ShantaIntroSchema,
//         ShantaVisionSchema,
//         ValuesThatShapeUsSchema,
//         LicensedLaunchedSchema,
//         DirectorsMessagesSchema,
//         BoardOfDirectorsCardSchema,
//         LeadershipTeamCardSchema,
//         ShantaMilestonesUnlockedSchema,
//         ShantaFootprintSchema,
//         // agent onboarding
//         AgentVisionSchema,
//         AgentOnboardingOpportunitySchema,
//         MoreThanAWorkplaceSchema,
//         // BOD page
//         BoardOfDirectorsListSchema,
//         // leadershipo page
//         LeadershipTeamListSchema,
//       ],
//     },
//   ],
//   access: { read: () => true, create: () => true, update: () => true, delete: () => true },
//   hooks: {
//     afterChange: [
//       async ({ doc, previousDoc }) => {
//         try {
//           const slug = doc?.slug ?? previousDoc?.slug
//           if (slug) revalidateTag(pageTag(slug)) // 🔁 revalidate only this page
//           revalidateTag(pagesListTag) // (optional) pattern list
//         } catch {}
//       },
//     ],
//     afterDelete: [
//       // This runs when a single doc is deleted (deleteByID) and also for each doc in deleteMany.
//       async ({ doc, result }: any) => {
//         try {
//           // Payload may pass `doc` for single delete, and `result?.docs` for bulk delete.
//           const docs: any[] = Array.isArray(result?.docs) ? result.docs : doc ? [doc] : []

//           const slugs = docs.map((d) => String(d?.slug ?? '').trim()).filter(Boolean)

//           // Invalidate each page’s tag
//           for (const s of slugs) {
//             revalidateTag(pageTag(s))
//           }
//           // Also invalidate the list/patterns cache
//           revalidateTag(pagesListTag)
//         } catch {}
//       },
//     ],
//   },
//   timestamps: true,
// }

// export default Pages

// ================================================================================================
// ================================================================================================
// ================================================================================================

// version 02 (added media cleanup hooks)
import BoardOfDirectorsCardSchema from '@/blocks/BoardOfDirectorsCard/schema'
import BoardOfDirectorsListSchema from '@/blocks/BoardOfDirectorsList/schema'
import LicensedLaunchedSchema from '@/blocks/LicensedAndLaunched/schema'
import AgentOnboardingOpportunitySchema from '@/blocks/agentOnboadringOpportunity/schema'
import AgentVisionSchema from '@/blocks/agentVision/schema'
import CareerIntroSchema from '@/blocks/careerIntro/schema'
import CareerOpeningSchema from '@/blocks/careerOpening/schema'
import CareerProcessingSchema from '@/blocks/careerProcessingFlow/schema'
import CareerResourcesSchema from '@/blocks/careerResources/schema'
import CareerSwiperSchema from '@/blocks/careerSwiper/schema'
import CustomAccordionSchema from '@/blocks/customAccordion/schema'
import DirectorsMessagesSchema from '@/blocks/directorsMessage/schema'
import FeaturedPlansSchema from '@/blocks/featuredPlan/schema'
import HeroSchema from '@/blocks/hero/schema'
import LeadershipTeamCardSchema from '@/blocks/leadershipTeamCard/schema'
import LeadershipTeamListSchema from '@/blocks/leadershipTeamList/schema'
import LifeAtShantaSchema from '@/blocks/lifeAtShanta/schema'
import LifeInsuranceSimplifiedSchema from '@/blocks/lifeInsuranceSimplified/schema'
import LifeInsuranceVideoSchema from '@/blocks/lifeInsuranceVideo/schema'
import MoreThanAWorkplaceSchema from '@/blocks/moreThanAWorkplace/schema'
import MultiStagePlanSchema from '@/blocks/multiStagePlan/schema'
import MultiStageIntroSchema from '@/blocks/multiStageTitle/schema'
import PlanCardSchema from '@/blocks/planCard/schema'
import PremiumCalculatorSchema from '@/blocks/premiumCalculator/schema'
import ShantaFootprintSchema from '@/blocks/shantaFootprint/schema'
import ShantaIntroSchema from '@/blocks/shantaIntro/schema'
import ShantaMilestonesUnlockedSchema from '@/blocks/shantaMilestoneUnlocked/schema'
import ShantaVisionSchema from '@/blocks/shantaVision/schema'
import SupportBuzzSchema from '@/blocks/supportBuzz/schema'
import SupportFaqTabSchema from '@/blocks/supportFaqTab/schema'
import SupportFeedbackSchema from '@/blocks/supportFeedbackForm/schema'
import SupportMapTabSchema from '@/blocks/supportMapTab/schema'
import ValuesThatShapeUsSchema from '@/blocks/valuesThatShapeUs/schema'
import WhyChooseUsSchema from '@/blocks/whyChooseUs/schema'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
import { mediaHooks } from '@/utils/media/mediaHooks'
import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

// const mediaHooks = withMediaLifecycle({
//   collectionSlug: 'pages',
//   blockArrayFields: [
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_HERO_SLUG_AND_TAG,
//       arrayKey: 'heroes',
//       mediaFields: ['image'],
//     },
//   ],
//   onAfterChange: async ({ req }) => {
//     triggerMediaTemporaryPurge(req)
//   },
// })

// ✅ always spread a safe object
const safeMediaHooks: NonNullable<CollectionConfig['hooks']> = mediaHooks ?? {}

// ✅ safely read hook arrays
const baseAfterChange = safeMediaHooks.afterChange ?? []
const baseAfterDelete = safeMediaHooks.afterDelete ?? []
const baseAfterError = safeMediaHooks.afterError ?? []

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
        ShantaVisionSchema,
        ValuesThatShapeUsSchema,
        LicensedLaunchedSchema,
        DirectorsMessagesSchema,
        BoardOfDirectorsCardSchema,
        LeadershipTeamCardSchema,
        ShantaMilestonesUnlockedSchema,
        ShantaFootprintSchema,
        // agent onboarding
        AgentVisionSchema,
        AgentOnboardingOpportunitySchema,
        MoreThanAWorkplaceSchema,
        // BOD page
        BoardOfDirectorsListSchema,
        // leadershipo page
        LeadershipTeamListSchema,
        // plan page
        PlanCardSchema,
        //careerpage
        CareerIntroSchema,
        CareerSwiperSchema,
        CareerResourcesSchema,
        CareerOpeningSchema,
        CareerProcessingSchema,
        //multistage page
        MultiStageIntroSchema,
        MultiStagePlanSchema,
        //custom blocks
        CustomAccordionSchema,
        //support page
        SupportMapTabSchema,
        SupportFaqTabSchema,
        SupportBuzzSchema,
        SupportFeedbackSchema,
      ],
    },
  ],
  access: { read: () => true, create: () => true, update: () => true, delete: () => true },
  timestamps: true,
  hooks: {
    // spread whatever withMediaLifecycle gave us (or nothing)
    ...safeMediaHooks,

    // append your revalidation on top
    afterChange: [
      ...baseAfterChange,
      async ({ doc, previousDoc }) => {
        try {
          const slug = (doc as any)?.slug ?? (previousDoc as any)?.slug
          if (slug) revalidateTag(pageTag(slug))
          revalidateTag(pagesListTag)
        } catch {}
        return doc
      },
    ],

    afterDelete: [
      ...baseAfterDelete,
      async ({ doc, result }: any) => {
        try {
          const docs: any[] = Array.isArray(result?.docs) ? result.docs : doc ? [doc] : []
          const slugs = docs.map((d) => String(d?.slug ?? '')).filter(Boolean)
          for (const s of slugs) revalidateTag(pageTag(s))
          revalidateTag(pagesListTag)
        } catch {}
      },
    ],

    // (optional) if you also want to keep lifecycle’s afterError:
    afterError: [...baseAfterError],
  },
}

// Merge our own afterChange/afterDelete with media hooks

export default Pages
