import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import {
  GLOBAL_VLOGS_BLOCK_LABEL,
  GLOBAL_VLOGS_SLUG_AND_TAG,
  HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
  VLOGS_SLUG_AND_TAG,
} from '@/lib/constants'

import { globalTag } from '@/lib/cacheTags'
import { bnNum } from '@/lib/utils'

// ✅ media lifecycle + temp purge
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'

// ✅ cropper generator
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 500
const DATE_BN_MAX = 150
const DESC_MAX = 200 // rich text budget
const MAX_VIDEO_LINK = 200

/* ---------------- short-text validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

export const validateOptionalYouTubeLinkWithMax = (max: number) => (val: unknown) => {
  const link = (val ?? '').toString().trim()
  if (!link) return true // optional

  if (link.length > max) return `Video link must be at most ${max} characters.`

  try {
    const u = new URL(link)
    const host = u.hostname.toLowerCase()
    const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
    const isYouTube =
      host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')

    if (!isHttp) return 'Video link must be http(s).'
    if (!isYouTube) return 'Only YouTube links are allowed.'
    return true
  } catch {
    return 'Provide a valid URL.'
  }
}

/* ---------------- media lifecycle (vlogs[].image via cropper) ---------------- */
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_VLOGS_SLUG_AND_TAG,
  arrayFields: [
    // Your image flow (cropper + blur + original/pending handling)
    { fieldName: 'vlogs', mediaFields: ['image'], itemLabelField: 'title' },
  ],
  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
}) as NonNullable<GlobalConfig['hooks']> | undefined

const pickGlobalHooks = (h: NonNullable<GlobalConfig['hooks']> | undefined) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})
const base = pickGlobalHooks(mediaHooks)

/* ---------------- schema ---------------- */
const GlobalVlogs: GlobalConfig = {
  slug: GLOBAL_VLOGS_SLUG_AND_TAG,
  label: GLOBAL_VLOGS_BLOCK_LABEL,

  admin: {
    description:
      'Global list of Vlog cards. Each item has EN/BN title, image (cropper), rich descriptions, important date, Bangla date label',
  },

  fields: [
    // 🔐 session id for cropper + lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    {
      name: 'vlogs',
      type: 'array',
      validate: (val: unknown) => {
        const list = Array.isArray(val) ? (val as any[]) : []

        const featuredCount = list.reduce((n, it) => n + (it && (it as any).isFeatured ? 1 : 0), 0)
        if (featuredCount !== 1) {
          return 'Exactly 1 vlogs must be featured. Please select or deselect items to make it 1.'
        }

        return true
      },
      label: 'Vlogs',
      minRows: 1,
      maxRows: 200,
      required: true,
      labels: { singular: 'Vlog', plural: 'Vlogs' },
      admin: { description: 'Add each vlog as a card item.' },

      fields: [
        // 🖼 image via generator (your image flow)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Thumbnail Image',
          description: '4:3 recommended. Blur placeholder generated automatically.',
          aspectRatio: 4 / 3,
          quality: 0.93,
          maxKB: 700,
          ownerCollection: GLOBAL_VLOGS_SLUG_AND_TAG as any,
        } as any),

        // Card Video Link (YouTube)
        {
          name: 'videoLink',
          type: 'text',
          required: false,
          label: 'Card Video Link (YouTube)',
          maxLength: MAX_VIDEO_LINK,
          validate: validateOptionalYouTubeLinkWithMax(MAX_VIDEO_LINK),
          admin: {
            description: `Use a YouTube URL (embed, watch, youtu.be, or youtube-nocookie). Max ${MAX_VIDEO_LINK} characters.`,
          },
        },

        // Titles
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: false,
              label: 'Title',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title', TITLE_MAX, false),
              admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: false,
              label: 'শিরোনাম (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title (BN)', TITLE_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।` },
            },
          ],
        },
        // headline
        {
          type: 'row',
          fields: [
            {
              name: 'headline',
              type: 'text',
              required: false,
              label: 'Headline',
              maxLength: TITLE_MAX,
              validate: validateShortText('Headline', TITLE_MAX, false),
              admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
            },
            {
              name: 'headlineBN',
              type: 'text',
              required: false,
              label: 'হেডলাইন (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Headline (BN)', TITLE_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।` },
            },
          ],
        },

        // Description + DescriptionBN
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'text',
              required: false,
              label: 'Short Description',
              maxLength: DESC_MAX,
              admin: {
                width: '50%',
                description: `2–3 short sentences. Max ${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'text',
              required: false,
              label: 'সংক্ষিপ্ত বর্ণনা (বাংলা)',
              maxLength: DESC_MAX,
              admin: {
                width: '50%',
                description: `২–৩টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Dates
        {
          type: 'row',
          fields: [
            {
              name: 'importantDate',
              type: 'text',
              label: 'Important Date',
              admin: { width: '50%', description: 'Primary date used for sorting/highlighting.' },
              required: false,
            },
            {
              name: 'importantDateBN',
              type: 'text',
              label: 'তারিখ (বাংলা প্রদর্শন)',
              maxLength: DATE_BN_MAX,
              validate: validateShortText('Date (BN)', DATE_BN_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(DATE_BN_MAX)} অক্ষর।` },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            // featured
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Feature this blog',
              defaultValue: false,
              admin: {
                width: '50%',
                description:
                  "If you featured a Vlog that means it will show on the homepage news and blog section's `Middle Video Grid`. (exactly 1 must be selected)",
              },
            },
            // trending
            {
              name: 'isHide',
              type: 'checkbox',
              label: 'Hide this vlog',
              defaultValue: false,
              admin: {
                width: '50%',
                description: 'If checked, this vlog will be hidden from public view.',
              },
            },
          ],
        },

        // Per-item timestamps (maintained via hooks below)
        { name: 'createdAt', type: 'date', admin: { readOnly: true } },
        { name: 'updatedAt', type: 'date', admin: { readOnly: true } },
      ],

      // Per-item id + timestamps (array-level hooks)
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (Array.isArray(data?.vlogs)) {
              data.vlogs = data.vlogs.map((item: any, idx: number) => ({
                id: idx + 1,
                ...item,
              }))
            }
          },
        ],
        beforeChange: [
          ({ data }) => {
            if (!Array.isArray(data?.vlogs)) return
            const now = new Date().toISOString()
            data.vlogs = data.vlogs.map((item: any) => ({
              ...item,
              createdAt: item?.createdAt ?? now,
              updatedAt: now,
            }))
            // Note: Payload does not auto-maintain timestamps on array rows;
            // we stamp them here consistently on create/update.
          },
        ],
      },
    },
  ],

  hooks: {
    beforeValidate: [...base.beforeValidate],
    beforeChange: [...base.beforeChange],
    afterChange: [
      ...base.afterChange,
      async () => {
        // Revalidate both the global tag and your cache key for FE caches
        revalidateTag(globalTag(GLOBAL_VLOGS_SLUG_AND_TAG))
        revalidateTag(VLOGS_SLUG_AND_TAG)
        revalidateTag(HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG)
      },
    ],
  },
}

export default GlobalVlogs
