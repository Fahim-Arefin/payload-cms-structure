// src/payload/blocks/SupportBuzz.ts
import type { Block } from 'payload'

import {
  SUPPORT_BUZZ_SLUG_AND_TAG,
  SUPPORT_BUZZ_BLOCK_LABEL,
  SUPPORT_BUZZ_BLOCK_THUMBNAIL_URL,
  SUPPORT_PAGE,
} from '@/lib/constants'

import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const HILITE_MAX = 80
const DESC_MAX = 700 // textarea
const URL_MAX = 300

/* ---------------- validators ---------------- */
const validateShort =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

const validateAbsoluteHttpUrl =
  (label = 'URL') =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (!s) return true
    try {
      const u = new URL(s)
      if (u.protocol === 'http:' || u.protocol === 'https:') return true
      return `${label} must be an absolute http(s) URL.`
    } catch {
      return `${label} must be an absolute http(s) URL.`
    }
  }

const validateYouTubeUrl =
  (label = 'YouTube URL') =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (!s) return true
    try {
      const u = new URL(s)
      const host = u.hostname.replace(/^www\./, '')
      const okHost = ['youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(host)
      if (!okHost) return `${label} must be a valid YouTube URL.`
      return true
    } catch {
      return `${label} must be a valid YouTube URL.`
    }
  }

// Ensure a text field equals a literal string (prevents other values)
const requireLiteral =
  (literal: string, label = 'Value') =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    return s === literal ? true : `${label} must be "${literal}".`
  }

/* ---------------- block ---------------- */
const SupportBuzzSchema: Block = {
  slug: SUPPORT_BUZZ_SLUG_AND_TAG,
  labels: {
    singular: SUPPORT_BUZZ_BLOCK_LABEL,
    plural: SUPPORT_BUZZ_BLOCK_LABEL,
  },
  admin: {
    group: SUPPORT_PAGE,
  },
  imageURL: SUPPORT_BUZZ_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SUPPORT_BUZZ_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Header (section title) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShort('Title', TITLE_MAX, true),
          admin: { width: '50%' },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'শিরোনাম (বাংলা)',
          required: false,
          maxLength: TITLE_MAX,
          validate: validateShort('Title (BN)', TITLE_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedTitle',
          type: 'text',
          label: 'Highlighted Title (part to color)',
          required: false,
          maxLength: HILITE_MAX,
          validate: validateShort('Highlighted Title', HILITE_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'highlightedTitleBN',
          type: 'text',
          label: 'হাইলাইটেড শিরোনাম (বাংলা)',
          required: false,
          maxLength: HILITE_MAX,
          validate: validateShort('Highlighted Title (BN)', HILITE_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },

    /* ---------- Moved image fields OUTSIDE groups (as requested) ---------- */
    ...generateImageFields({
      ownerCollection: SUPPORT_BUZZ_SLUG_AND_TAG,
      fieldName: 'mainImage',
      label: 'Main Image (Hero) — 16:9',
      description: 'Large section background visual for ALL tab. 16:9 recommended.',
      aspectRatio: 16 / 9,
      quality: 0.85,
      maxKB: 600,
    }),
    ...generateImageFields({
      ownerCollection: SUPPORT_BUZZ_SLUG_AND_TAG,
      fieldName: 'backgroundImage',
      label: 'Background Image — 16:9',
      description: 'Background visual for the OVC/TVC tab. 16:9 recommended.',
      aspectRatio: 16 / 9,
      quality: 0.85,
      maxKB: 700,
    }),

    /* ---------- ALL tab (value = "all") ---------- */
    {
      name: 'allTab',
      type: 'group',
      label: 'All Tab',
      admin: {
        description:
          'Main “ALL” feed. Uses the top-level Main Image. Contains a source link and exactly 3 news cards.',
      },
      fields: [
        // ✅ Text value (no selector) with fixed default + BN
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Tab Value (fixed)',
              required: true,
              defaultValue: 'all',
              validate: requireLiteral('all', 'Tab Value'),
              admin: { width: '25%', description: 'Fixed: "all" (string).' },
            },
            {
              name: 'valueBN',
              type: 'text',
              label: 'ট্যাব ভ্যালু (বাংলা)',
              required: true,
              defaultValue: 'সকল',
              validate: validateShort('Tab Value (BN)', 40, true),
              admin: { width: '25%', description: 'ডিফল্ট: “সকল”.' },
            },
          ],
        },

        // kept here: source link only (image lives at top-level now)
        {
          name: 'mainImageSrcLink',
          type: 'text',
          label: 'Main Image Source Link',
          required: false,
          maxLength: URL_MAX,
          validate: validateAbsoluteHttpUrl('Main Image Source Link'),
        },

        // EXACTLY 3 news items
        {
          name: 'newsItems',
          type: 'array',
          label: 'News Items (exactly 3)',
          minRows: 3,
          maxRows: 3,
          admin: {
            description:
              'Exactly 3 items. Each uses a single 16:9 image, real date, EN/BN title/description, and optional YouTube link.',
          },
          fields: [
            ...generateArrayImageFields({
              ownerCollection: SUPPORT_BUZZ_SLUG_AND_TAG,
              fieldName: 'image',
              label: 'News Image — 16:9',
              description: 'Single image per item. 16:9 recommended.',
              aspectRatio: 16 / 9,
              quality: 0.8,
              maxKB: 400,
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  label: 'Date',
                  required: true,
                  admin: { date: { pickerAppearance: 'dayAndTime' }, width: '33%' },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                  maxLength: TITLE_MAX,
                  validate: validateShort('Title', TITLE_MAX, true),
                  admin: { width: '33%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShort('Title (BN)', TITLE_MAX, false),
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  required: false,
                  maxLength: DESC_MAX,
                  admin: { width: '50%', description: `Max ${DESC_MAX} chars.` },
                },
                {
                  name: 'descriptionBN',
                  type: 'textarea',
                  label: 'বিবরণ (বাংলা)',
                  required: false,
                  maxLength: DESC_MAX,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'videoLink',
              type: 'text',
              label: 'YouTube Video Link',
              required: false,
              maxLength: URL_MAX,
              validate: validateYouTubeUrl('YouTube Video Link'),
              admin: { description: 'Ex: https://www.youtube.com/watch?v=...' },
            },
          ],
          defaultValue: [
            {
              title: 'Understanding Life Insurance Basics',
              date: '2024-01-15T10:00:00.000Z',
              description:
                "Learn the fundamental concepts of life insurance and how it can protect your family's financial future. Discover the different types of policies available and find the right coverage for your needs. Our expert explains key terms, benefits, and important considerations when choosing life insurance.",
              videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
            },
            {
              title: 'Expert Insurance Guidance & Tips',
              date: '2024-02-22T14:30:00.000Z',
              description:
                'Get professional insights from our insurance experts on making smart coverage decisions. Learn practical tips for evaluating policies, understanding premiums, and maximizing your insurance benefits.',
              videoLink: 'https://www.youtube.com/embed/rcduE_ff314',
            },
            {
              title: 'Life Insurance Planning Strategies',
              date: '2024-01-15T11:30:00.000Z',
              description:
                "Explore comprehensive strategies for incorporating life insurance into your financial planning. Align coverage with your goals to protect your family's lifestyle.",
              videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
            },
          ],
        },
      ],
    },

    /* ---------- OVC/TVC tab (value = "ovc") ---------- */
    {
      name: 'ovcTab',
      type: 'group',
      label: 'OVC/TVC Tab',
      admin: {
        description:
          'Uses the top-level Background Image. Add headline (EN/BN) and optional YouTube link for the modal.',
      },
      fields: [
        // ✅ Text value (no selector) with fixed default + BN
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Tab Value (fixed)',
              required: true,
              defaultValue: 'ovc',
              validate: requireLiteral('ovc', 'Tab Value'),
              admin: { width: '25%', description: 'Fixed: "OVC" (string).' },
            },
            {
              name: 'valueBN',
              type: 'text',
              label: 'ট্যাব ভ্যালু (বাংলা)',
              required: true,
              defaultValue: 'অভিসি/টিভিসি',
              validate: validateShort('Tab Value (BN)', 40, true),
              admin: { width: '25%', description: 'ডিফল্ট: “অভিসি/টিভিসি”.' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShort('Title', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'titleBN',
              type: 'text',
              label: 'শিরোনাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShort('Title (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'highlightedTitle',
              type: 'text',
              label: 'Highlighted Title',
              required: false,
              maxLength: HILITE_MAX,
              validate: validateShort('Highlighted Title', HILITE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'highlightedTitleBN',
              type: 'text',
              label: 'হাইলাইটেড শিরোনাম (বাংলা)',
              required: false,
              maxLength: HILITE_MAX,
              validate: validateShort('Highlighted Title (BN)', HILITE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'videoLink',
          type: 'text',
          label: 'YouTube Video Link',
          required: false,
          maxLength: URL_MAX,
          validate: validateYouTubeUrl('YouTube Video Link'),
        },
      ],
    },
  ],
}

export default SupportBuzzSchema
