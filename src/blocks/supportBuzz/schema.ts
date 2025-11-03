// src/payload/blocks/SupportBuzz.ts
import type { Block } from 'payload'

import {
  SUPPORT_BUZZ_SLUG_AND_TAG,
  SUPPORT_BUZZ_BLOCK_LABEL,
  SUPPORT_BUZZ_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

import { bnNum } from '@/lib/utils'
import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const HILITE_MAX = 80
const DESC_MAX = 700 // plain text/textarea (you can switch to richText later if needed)
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

/* ---------------- block ---------------- */
const SupportBuzzSchema: Block = {
  slug: SUPPORT_BUZZ_SLUG_AND_TAG,
  labels: {
    singular: SUPPORT_BUZZ_BLOCK_LABEL,
    plural: SUPPORT_BUZZ_BLOCK_LABEL,
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

    /* ---------- ALL tab (value = "all") ---------- */
    {
      name: 'allTab',
      type: 'group',
      label: 'All Tab',
      admin: {
        description:
          'Main “ALL” feed. Includes hero image + a list of news cards with image, date, title, description and YouTube link.',
      },
      fields: [
        // Keep a select "value" like your other tabs for FE parity (optional but helpful)
        {
          name: 'value',
          type: 'select',
          label: 'Tab Value',
          required: true,
          defaultValue: 'all',
          options: [
            { label: 'ALL', value: 'all' },
            { label: 'OVC/TVC', value: 'ovc' },
          ],
          admin: { width: '25%' },
        },

        // Hero image & optional source link
        ...generateImageFields({
          ownerCollection: SUPPORT_BUZZ_SLUG_AND_TAG,
          fieldName: 'mainImage',
          label: 'Main Image (Hero) — 16:9',
          description: 'Large section background visual. 16:9 recommended.',
          // guidance only; your generator may accept ratio/quality hints
          aspectRatio: 16 / 9,
          quality: 0.85,
          maxKB: 600,
        }),
        {
          name: 'mainImageSrcLink',
          type: 'text',
          label: 'Main Image Source Link',
          required: false,
          maxLength: URL_MAX,
          validate: validateAbsoluteHttpUrl('Main Image Source Link'),
        },

        // News items
        {
          name: 'newsItems',
          type: 'array',
          label: 'News Items',
          minRows: 0,
          admin: {
            description:
              'Each news item uses a single image (no mobileImage). Date is a real date field. Video link must be a YouTube URL.',
          },
          fields: [
            // Thumbnail image (single)
            ...generateArrayImageFields({
              ownerCollection: SUPPORT_BUZZ_SLUG_AND_TAG,
              fieldName: 'image',

              description: 'Square icon (1:1). PNG with transparent background preferred.',
              label: 'News Image — 16:9',
              aspectRatio: 16 / 9,
              quality: 0.8,
              maxKB: 400,
            }),

            // Meta
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  label: 'Date',
                  admin: {
                    date: { pickerAppearance: 'dayAndTime' },
                    width: '33%',
                  },
                  required: true,
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

            // Descriptions
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

            // YouTube link
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
          'Background hero with overlaid headline. Optionally add a YouTube link for the modal video.',
      },
      fields: [
        {
          name: 'value',
          type: 'select',
          label: 'Tab Value',
          required: true,
          defaultValue: 'ovc',
          options: [
            { label: 'ALL', value: 'all' },
            { label: 'OVC/TVC', value: 'ovc' },
          ],
          admin: { width: '25%' },
        },

        // Background hero (desktop/mobile handled by CSS; single image here)
        ...generateImageFields({
          ownerCollection: SUPPORT_BUZZ_SLUG_AND_TAG,
          fieldName: 'backgroundImage',
          description: 'Background visual for the OVC/TVC tab. 16:9 recommended.',
          label: 'Background Image — 16:9',
          aspectRatio: 16 / 9,
          quality: 0.85,
          maxKB: 700,
        }),

        // Headline
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

        // Optional OVC/TVC video (YouTube)
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
