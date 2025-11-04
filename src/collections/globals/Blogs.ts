// src/globals/Blogs.ts
import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import {
  BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG,
  BLOGS_DETAILS_SLUG_AND_TAG,
  BLOGS_SLUG_AND_TAG,
  GLOBAL_BLOGS_BLOCK_LABEL,
  GLOBAL_BLOGS_SLUG_AND_TAG,
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
const CTA_TEXT_MAX = 150
const DESC_MAX = 5000 // rich text budget

/* ---------------- short-text validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

/* ---------------- CTA validators (EN/BN) ---------------- */
const validateCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.newsLinkBtnText) || isNonEmpty(siblingData?.newsLinkBtnTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'Button Text (EN) is required when any button text is provided.'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `Button Text must be at most ${CTA_TEXT_MAX} characters.`
  return true
}
const validateCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.newsLinkBtnText) || isNonEmpty(siblingData?.newsLinkBtnTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর হতে পারবে।`
  return true
}

/* ---------------- Link validator (absolute http/https) ---------------- */
const validateAbsoluteUrl =
  (label = 'URL', requiredIfAnyText = false) =>
  (val: unknown, { siblingData }: any) => {
    const url = (val ?? '').toString().trim()
    const anyBtn =
      isNonEmpty(siblingData?.newsLinkBtnText) || isNonEmpty(siblingData?.newsLinkBtnTextBN)

    if (requiredIfAnyText && anyBtn && !url)
      return `${label} is required when button text is provided.`
    if (!url) return true
    if (!/^https?:\/\//i.test(url)) return `${label} must be an absolute http(s) URL.`
    try {
      new URL(url)
      return true
    } catch {
      return `Provide a valid ${label}.`
    }
  }

/* ---------------- rich text (Lexical) helpers ---------------- */
function lexicalHasRealText(root: any): boolean {
  if (!root) return false
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
      if (stripped.length > 0) return true
    }
    if (Array.isArray(node)) for (const c of node) stack.push(c)
    else if (typeof node === 'object')
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
  }
  return false
}
function lexicalCharCount(root: any): number {
  let count = 0
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
    }
    if (Array.isArray(node)) for (const c of node) stack.push(c)
    else if (typeof node === 'object')
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
  }
  return count
}
const validateRichText =
  (label: string, { required, max }: { required: boolean; max: number }) =>
  (val: unknown) => {
    const root = (val as any)?.root ?? val
    if (required && !lexicalHasRealText(root)) return `${label} is required.`
    if (!root) return true
    const chars = lexicalCharCount(root)
    if (max && chars > max) return `${label} must be at most ${max} characters.`
    return true
  }

/* ---------------- media lifecycle (blogs[].image via cropper) ---------------- */
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_BLOGS_SLUG_AND_TAG,
  arrayFields: [
    // Your image flow (cropper + blur + original/pending handling)
    { fieldName: 'blogs', mediaFields: ['image'], itemLabelField: 'title' },
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
const GlobalBlogs: GlobalConfig = {
  slug: GLOBAL_BLOGS_SLUG_AND_TAG,
  label: GLOBAL_BLOGS_BLOCK_LABEL,

  admin: {
    description:
      'Global list of blog/news cards. Each item has EN/BN title, image (cropper), rich descriptions, important date, Bangla date label, and a news link with EN/BN button text.',
  },

  fields: [
    // 🔐 session id for cropper + lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    {
      name: 'blogs',
      type: 'array',
      validate: (val: unknown) => {
        const list = Array.isArray(val) ? (val as any[]) : []
        const featuredCount = list.reduce((n, it) => n + (it && (it as any).isFeatured ? 1 : 0), 0)
        if (featuredCount !== 2) {
          return 'Exactly 2 blogs must be featured. Please select or deselect items to make it 2.'
        }
        return true
      },
      label: 'Blogs',
      minRows: 1,
      maxRows: 200,
      required: true,
      labels: { singular: 'Blog', plural: 'Blogs' },
      admin: { description: 'Add each blog/news as a card item.' },

      fields: [
        // 🖼 image via generator (your image flow)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Cover Image',
          description: '563:375 recommended. Blur placeholder generated automatically.',
          aspectRatio: 600 / 375,
          quality: 0.9,
          maxKB: 700,
          ownerCollection: GLOBAL_BLOGS_SLUG_AND_TAG as any,
        } as any),

        // Titles
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title', TITLE_MAX, true),
              admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'শিরোনাম (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title (BN)', TITLE_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।` },
            },
          ],
        },

        // Rich descriptions
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: { width: '50%', description: `প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।` },
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

        // featured
        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Feature this blog',
          defaultValue: false,
          admin: {
            description:
              'If you featured a blog that means it will show on the homepage news and blog section. (exactly 2 must be selected)',
          },
        },

        // Link + Button Texts
        {
          type: 'row',
          fields: [
            {
              name: 'newsLinkBtnText',
              type: 'text',
              label: 'Button Text',
              maxLength: CTA_TEXT_MAX,
              validate: validateCTAEnglishText,
              admin: { width: '50%', description: `Max ${CTA_TEXT_MAX} chars.` },
            },
            {
              name: 'newsLinkBtnTextBN',
              type: 'text',
              label: 'বাটনের টেক্সট (বাংলা)',
              maxLength: CTA_TEXT_MAX,
              validate: validateCTABanglaText,
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।` },
            },
          ],
        },
        {
          name: 'newsLink',
          type: 'text',
          label: 'News Link (absolute URL)',
          validate: validateAbsoluteUrl('News Link', true /* required if button text */),
          admin: { description: 'Must be a full http(s) URL.' },
        },

        // Per-item timestamps (maintained via hooks below)
        { name: 'createdAt', type: 'date', admin: { readOnly: true } },
        { name: 'updatedAt', type: 'date', admin: { readOnly: true } },
      ],

      // Per-item id + timestamps (array-level hooks)
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (Array.isArray(data?.blogs)) {
              data.blogs = data.blogs.map((item: any, idx: number) => ({
                id: idx + 1,
                ...item,
              }))
            }
          },
        ],
        beforeChange: [
          ({ data, operation }) => {
            if (!Array.isArray(data?.blogs)) return
            const now = new Date().toISOString()
            data.blogs = data.blogs.map((item: any) => ({
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
        revalidateTag(globalTag(GLOBAL_BLOGS_SLUG_AND_TAG))
        revalidateTag(BLOGS_SLUG_AND_TAG)
        revalidateTag(BLOGS_DETAILS_SLUG_AND_TAG)
        revalidateTag(BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG)
      },
    ],
  },
}

export default GlobalBlogs
