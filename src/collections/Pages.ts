// currently working code
import APPDSchema from '@/blocks/APPD/schema'
import AddonsInfoSchema from '@/blocks/AddonsInfoSchema/schema'
import AllBLogsCardSchema from '@/blocks/AllblogsCard/schema'
import BoardOfDirectorsCardSchema from '@/blocks/BoardOfDirectorsCard/schema'
import BoardOfDirectorsListSchema from '@/blocks/BoardOfDirectorsList/schema'
import LicensedLaunchedSchema from '@/blocks/LicensedAndLaunched/schema'
import AgentOnboardingFormSchema from '@/blocks/agentForm/schema'
import AgentOnboardingOpportunitySchema from '@/blocks/agentOnboadringOpportunity/schema'
import AgentVisionSchema from '@/blocks/agentVision/schema'
import BLogDetailsSectionSchema from '@/blocks/blogDetails/schema'
import AllBLogsSectionSchema from '@/blocks/blogs/schema'
import CareerIntroSchema from '@/blocks/careerIntro/schema'
import CareerOpeningSchema from '@/blocks/careerOpening/schema'
import CareerProcessingSchema from '@/blocks/careerProcessingFlow/schema'
import CareerResourcesSchema from '@/blocks/careerResources/schema'
import CareerSwiperSchema from '@/blocks/careerSwiper/schema'
import ContactUsSchema from '@/blocks/contactUs/schema'
import CorporateInfoSchema from '@/blocks/corporateInfo/schema'
import CorporateIntroSchema from '@/blocks/corporateIntro/schema'
import CorporatePartnersSchema from '@/blocks/corporatePartners/schema'
import CustomAccordionSchema from '@/blocks/customAccordion/schema'
import CustomCardSectionSchema from '@/blocks/customCardSection/schema'
import DirectorsMessagesSchema from '@/blocks/directorsMessage/schema'
import FeaturedBlogVlogNewsSchema from '@/blocks/featuredBlogVlogNews/schema'
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
import AllNewsSectionSchema from '@/blocks/news/schema'
import PlanInfoDesignSchema from '@/blocks/planInfoDesign/schema'
import PlanInfoDesign03Schema from '@/blocks/planInfoDesign03/schema'
import PlanInfoDesign04Schema from '@/blocks/planInfoDesign04/schema'
import PlanInfoDesign05Schema from '@/blocks/planInfoDesign05/schema'
// import PlanCardSchema from '@/blocks/planCard/schema'
import CustomTabSchema from '@/blocks/customTab/schema'
import PremCalculatorPageSchema from '@/blocks/premCalculatorPage/schema'
import PremiumCalculatorSchema from '@/blocks/premiumCalculator/schema'
import PurchaseFormSchema from '@/blocks/purchaseFormBlock/schema'
import ShantaFootprintSchema from '@/blocks/shantaFootprint/schema'
import ShantaIntroSchema from '@/blocks/shantaIntro/schema'
import ShantaMilestonesUnlockedSchema from '@/blocks/shantaMilestoneUnlocked/schema'
import ShantaVisionSchema from '@/blocks/shantaVision/schema'
import SupportBuzzSchema from '@/blocks/supportBuzz/schema'
import SupportFaqTabSchema from '@/blocks/supportFaqTab/schema'
import SupportFeedbackSchema from '@/blocks/supportFeedbackForm/schema'
import SupportMapTabSchema from '@/blocks/supportMapTab/schema'
import ValuesThatShapeUsSchema from '@/blocks/valuesThatShapeUs/schema'
import AllVLogsSectionSchema from '@/blocks/vlogs/schema'
import WhyChooseUsSchema from '@/blocks/whyChooseUs/schema'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
import { getClientIP } from '@/lib/http'
import { roleAtLeast } from '@/lib/rbac'
import { mediaHooks } from '@/utils/media/mediaHooks'
import { revalidateTag } from 'next/cache'
import { type CollectionConfig } from 'payload'
import { APIError } from '@/lib/apiError'
import MicroinsuranceServiceSchema from '@/blocks/microinsuranceService/schema'
import WhyMicroInsuranceMattersSchema from '@/blocks/microinsuranceMatters/schema'
import MicroInsuranceStrategicPartnersSchema from '@/blocks/strategicPartners/schema'
import LearningMediaSectionSchema from '@/blocks/learningPlatform/schema'
import SearchBarSchema from '@/blocks/SearchBar/schema'
import HeroSmallSchema from '@/blocks/heroSmall/schema'
import PlanInfoDesign07Schema from '@/blocks/planInfoDesign07/schema'
import PlanInfoDesign06Schema from '@/blocks/planInfoDesign06/schema'

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
    defaultColumns: ['name', 'slug', '_status', 'updatedAt'],
  },
  versions: { drafts: true },

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description:
          'for home page use `index`, for dynamic page use `:slug`, (e.g. index , plans, plans/individual , news-and-blogs , news-and-blogs/:slug)',
      },
      // validate: (val: unknown) => {
      //   const s = String(val ?? '').trim()
      //   if (!s) return 'Slug is required'
      //   if (s.startsWith('/') || s.endsWith('/')) return 'No leading/trailing slash'
      //   if (s.includes('//')) return 'No double slashes'
      //   return true
      // },
      validate: (val: unknown) => {
        const raw = String(val ?? '')
        const trimmed = raw.trim()

        // 1. Slug is required
        if (!trimmed) return 'Slug is required'

        // 4. No spaces leading or tailing
        if (raw !== trimmed) {
          return 'No leading or trailing spaces'
        }

        const s = trimmed

        // 2. No leading/trailing slash
        if (s.startsWith('/') || s.endsWith('/')) {
          return 'No leading/trailing slash'
        }

        // 3. No double slashes
        if (s.includes('//')) {
          return 'No double slashes'
        }

        // 5. No spaces between words (use "-" instead)
        if (/\s/.test(s)) {
          return 'No spaces allowed. Use "-" to separate words.'
        }

        // 6. Dynamic route rules for ":slug"
        // - ":" only at start or right after "/"
        // - each dynamic segment must be exactly ":slug"
        // - ":slug" must be followed by "/" or end
        for (let i = 0; i < s.length; i++) {
          if (s[i] === ':') {
            // ":" must be at start or immediately after "/"
            if (i > 0 && s[i - 1] !== '/') {
              return '":" is only allowed immediately after "/". Example: "news/:slug".'
            }

            // Must be exactly ":slug"
            if (s.slice(i, i + 5) !== ':slug') {
              return 'Dynamic segments must use ":slug" exactly.'
            }

            // After "slug" must be "/" or end of string
            const after = s[i + 5]
            if (after && after !== '/') {
              return '":slug" must be followed by "/" or end of slug.'
            }

            // Skip over "slug" (for-loop will add +1 more)
            i += 4
          }
        }

        return true
      },
    },

    // {
    //   name: 'publish',
    //   type: 'checkbox',
    //   label: 'Publish this page',
    //   defaultValue: true,
    //   admin: { position: 'sidebar', description: 'Uncheck to hide this page (404).' },
    // },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      required: true,
      blocks: [
        // hero page
        HeroSchema,
        HeroSmallSchema,
        // common section
        LifeInsuranceSimplifiedSchema,
        MicroinsuranceServiceSchema,
        ContactUsSchema,
        ValuesThatShapeUsSchema,
        AgentVisionSchema,
        CorporatePartnersSchema,
        MultiStageIntroSchema,
        ShantaIntroSchema,
        CorporateIntroSchema,
        APPDSchema,
        AddonsInfoSchema,
        PlanInfoDesignSchema,
        PlanInfoDesign03Schema,
        PlanInfoDesign04Schema,
        PlanInfoDesign05Schema,
        PlanInfoDesign06Schema,
        PlanInfoDesign07Schema,
        // custom blocks
        CustomCardSectionSchema,
        CustomTabSchema,
        CustomAccordionSchema,
        // home page unique
        SearchBarSchema,
        WhyChooseUsSchema,
        FeaturedPlansSchema,
        PremiumCalculatorSchema,
        LifeInsuranceVideoSchema,
        LifeAtShantaSchema,
        FeaturedBlogVlogNewsSchema,
        // about us page
        ShantaVisionSchema,
        LicensedLaunchedSchema,
        DirectorsMessagesSchema,
        BoardOfDirectorsCardSchema,
        LeadershipTeamCardSchema,
        ShantaMilestonesUnlockedSchema,
        ShantaFootprintSchema,
        // BOD page
        BoardOfDirectorsListSchema,
        // leadershipo page
        LeadershipTeamListSchema,
        // agent onboarding
        AgentOnboardingOpportunitySchema,
        MoreThanAWorkplaceSchema,
        AgentOnboardingFormSchema,
        // corporate page
        CorporateInfoSchema,
        //multistage page
        MultiStagePlanSchema,
        // micro insurance
        WhyMicroInsuranceMattersSchema,
        MicroInsuranceStrategicPartnersSchema,
        // purchase now page
        PurchaseFormSchema,
        // premium cal page,
        PremCalculatorPageSchema,
        //support page
        SupportMapTabSchema,
        SupportFaqTabSchema,
        SupportBuzzSchema,
        SupportFeedbackSchema,

        // news and media
        AllBLogsSectionSchema,
        AllVLogsSectionSchema,
        AllNewsSectionSchema,
        // news and media details page
        BLogDetailsSectionSchema,
        AllBLogsCardSchema,

        //careerpage
        CareerSwiperSchema,
        CareerResourcesSchema,
        CareerOpeningSchema,
        CareerProcessingSchema,

        // Learn more page
        LearningMediaSectionSchema,
      ],
    },
  ],
  access: {
    read: () => true, // public read
    create: ({ req }) => roleAtLeast(req.user, 'admin'),
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'admin'),
    // // Version-enabled Collections only
    // readVersions: ({ req }) => {
    //   return roleAtLeast(req.user, 'admin')
    // },
  },
  timestamps: true,
  // hooks: {
  //   ...safeMediaHooks,

  //   beforeChange: [
  //     ({ req, data, operation }) => {
  //       if (operation !== 'update') return
  //       if (data?._status === 'published' && !roleAtLeast(req.user, 'admin')) {
  //         throw new Error('Only Admin or Super Admin can publish.')
  //       }
  //     },
  //   ],

  //   // append your revalidation on top
  //   afterChange: [
  //     ...baseAfterChange,
  //     async ({ req, doc, previousDoc, operation }) => {
  //       // revalidate
  //       try {
  //         const slug = (doc as any)?.slug ?? (previousDoc as any)?.slug
  //         if (slug) revalidateTag(pageTag(slug))
  //         revalidateTag(pagesListTag)
  //       } catch {}

  //       // audit (compute publish from _status)
  //       try {
  //         const becamePublished =
  //           (doc as any)?._status === 'published' && (previousDoc as any)?._status !== 'published'
  //         const action = becamePublished ? 'publish' : operation

  //         await req.payload.create({
  //           collection: 'audit-logs',
  //           data: {
  //             action,
  //             targetCollection: 'pages',
  //             docId: String((doc as any).id),
  //             actor: req.user?.id ?? null,
  //             ip: getClientIP(req),
  //             diff: { before: previousDoc ?? null, after: doc ?? null },
  //           },
  //         })
  //       } catch (e) {
  //         req.payload.logger.error('Audit log (pages) failed', e)
  //       }

  //       return doc
  //     },
  //   ],

  //   afterDelete: [
  //     ...baseAfterDelete,
  //     async ({ doc, result }: any) => {
  //       try {
  //         const docs: any[] = Array.isArray(result?.docs) ? result.docs : doc ? [doc] : []
  //         const slugs = docs.map((d) => String(d?.slug ?? '')).filter(Boolean)
  //         for (const s of slugs) revalidateTag(pageTag(s))
  //         revalidateTag(pagesListTag)
  //       } catch {}
  //     },
  //   ],

  //   afterError: [...baseAfterError],
  // },
  hooks: {
    // spread whatever withMediaLifecycle gave us (or nothing)
    ...safeMediaHooks,

    // stop editor to publish
    // beforeChange: [
    //   ({ req, data, operation }) => {
    //     if (operation !== 'update') return
    //     if (data?._status === 'published' && !roleAtLeast(req.user, 'admin')) {
    //       throw new APIError('Only Admin or Super Admin can publish.', 403)
    //     }
    //   },
    // ],

    // ✅ Only rule: Editors may *only* perform "draft" saves.
    beforeValidate: [
      ({ req, operation }) => {
        if (operation !== 'create' && operation !== 'update') return

        // Admin / Super Admin → full power
        if (roleAtLeast(req.user, 'admin')) return

        // Detect if this request is a "Save draft" action
        const body = (req.body || {}) as any
        const query = (req.query || {}) as any
        const rawDraft = body?.draft ?? query?.draft

        const isDraftSave =
          rawDraft === true || rawDraft === 'true' || rawDraft === 1 || rawDraft === '1'

        // Editors are allowed to do ONLY draft saves.
        // Any non-draft write = publish / unpublish / revert / change live doc.
        if (!isDraftSave) {
          throw new APIError(
            [
              'Only Admin or Super Admin can publish, unpublish, or revert pages.',
              'Draft was not saved. Please click "Save draft" instead.',
            ].join('\n'),
            403,
          )
        }
      },
    ],

    afterChange: [
      ...baseAfterChange,
      async ({ req, doc, previousDoc, operation }) => {
        // 👀 Only treat calls with ?draft=true as "draft-only" saves
        const hasDraftFlag = !!req?.query && (req.query as any).draft === 'true'

        // ✅ Revalidate live routes for:
        //   - normal saves / publishes (no ?draft=true)
        //   - Unpublish (published -> draft, also no ?draft=true)
        if (!hasDraftFlag) {
          try {
            const slug = (doc as any)?.slug ?? (previousDoc as any)?.slug
            if (slug) revalidateTag(pageTag(slug))
            revalidateTag(pagesListTag)
          } catch {}
        }

        // 📝 audit log still records all operations (draft + publish + unpublish)
        try {
          const becamePublished =
            (doc as any)?._status === 'published' && (previousDoc as any)?._status !== 'published'

          const action = becamePublished ? 'publish' : operation

          await req.payload.create({
            collection: 'audit-logs',
            data: {
              action,
              targetCollection: 'pages',
              docId: String((doc as any).id),
              actor: req.user?.id ?? null,
              ip: getClientIP(req),
              diff: { before: previousDoc ?? null, after: doc ?? null },
            },
          })
        } catch (e) {
          req.payload.logger.error('Audit log (pages) failed', e)
        }

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

    afterError: [...baseAfterError],
  },
}

export default Pages
