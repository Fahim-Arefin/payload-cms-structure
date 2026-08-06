import AboutUsIntroSchema from '@/blocks/AboutUsIntro/schema'
import BasicHeroSchema from '@/blocks/BasicHero/schema'
import BookACallSchema from '@/blocks/BookACall/schema'
import ClientSuccessStoriesSchema from '@/blocks/ClientSuccessStories/schema'
import CodingLanguageSchema from '@/blocks/CodingLanguage/schema'
import CompanyInfoSchema from '@/blocks/CompanyInfo/schema'
import CompanyIntroSchema from '@/blocks/CompanyIntro/schema'
import LocationSchema from '@/blocks/CompanyLocation/schema'
import CompanyStatsSchema from '@/blocks/CompanyStats/schema'
import ContactInfoSchema from '@/blocks/ContactInfo/schema'
import ContactUsSchema from '@/blocks/ContactUs/schema'
import CSCollaborationProtocalSchema from '@/blocks/CS_CollaborationProtocal/schema'
import CSCollaborativeMobbingSchema from '@/blocks/CS_Collaborative_Mobbing/schema'
import CSDeliverySchema from '@/blocks/CS_Delivery/schema'
import EmployeeSchema from '@/blocks/Employee/schema'
import FAQSchema from '@/blocks/FAQ/schema'
import FounderQuoteSchema from '@/blocks/FounderQuote/schema'
import OurProjectSchema from '@/blocks/OurProject/schema'
import ProductHeroSchema from '@/blocks/ProductHero/schema'
import ProductInfoSchema from '@/blocks/ProductInfo/schema'
import ProjectApproachSchema from '@/blocks/ProjectApproach/schema'
import { APIError } from '@/lib/apiError'
import { pageTag, pagesListTag } from '@/lib/cacheTags'
import { getClientIP } from '@/lib/http'
import { roleAtLeast } from '@/lib/rbac'
import { mediaHooks } from '@/utils/media/mediaHooks'
import { revalidateTag } from 'next/cache'
import { type CollectionConfig } from 'payload'

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
    components: {
      edit: {
        // ✅ hide the top publish/unpublish/revert UI for editors
        PublishButton: '/components/payload/PagesPublishButton#PagesPublishButton',

        // ✅ hide "Publish changes" (save published changes) for editors
        SaveButton: '/components/payload/PagesSaveButton#PagesSaveButton',

        // ✅ keep default Save Draft button (or override if you want)
        // SaveDraftButton: '/components/payload/PagesSaveDraftButton#PagesSaveDraftButton',
      },
    },
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
    // metadata fields for future use (e.g. preview image, SEO title/description, etc.)
    // Add inside Pages fields array

    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      maxLength: 70,
      admin: {
        position: 'sidebar',
        description: 'Recommended: 50–60 characters. Example: Raffia Rope | Sagar Ropes',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      maxLength: 180,
      admin: {
        position: 'sidebar',
        description: 'Recommended: 140–160 characters.',
      },
    },
    {
      name: 'metaKeywords',
      type: 'text',
      label: 'Meta Keywords',
      admin: {
        position: 'sidebar',
        description: 'Optional. Comma separated. Example: raffia rope, rope supplier Bangladesh',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
      admin: {
        position: 'sidebar',
        description: 'Optional. Leave empty to auto-generate from page slug.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'Hide from search engines?',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Enable only for pages you do not want Google to index.',
      },
    },

    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      required: true,
      blocks: [
        // hero page
        BasicHeroSchema,
        // ProductHeroSchema,

        // common section
        ContactUsSchema,
        FAQSchema,
        BookACallSchema,
        // custom blocks

        // home page unique
        CompanyInfoSchema,
        CompanyIntroSchema,
        ProductInfoSchema,
        ProjectApproachSchema,
        CodingLanguageSchema,
        FounderQuoteSchema,
        ClientSuccessStoriesSchema,
        CompanyStatsSchema,

        // about us page unique
        OurProjectSchema,
        AboutUsIntroSchema,
        EmployeeSchema,

        // Case StudyPage
        CSCollaborativeMobbingSchema,
        CSCollaborationProtocalSchema,
        CSDeliverySchema,
        // Get In Touch
        ContactInfoSchema,
        LocationSchema,

        // News
      ],
    },
  ],
  access: {
    read: () => true, // public read
    create: ({ req }) => roleAtLeast(req.user, 'admin'),
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'admin'),
  },
  timestamps: true,

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
              // ✅ add this
              docName: String((doc as any)?.name ?? (previousDoc as any)?.name ?? ''),
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
