// src/payload/blocks/PremCalculatorPage.ts
import type { Block } from 'payload'

import {
  PREM_CALC_PAGE_SLUG_AND_TAG,
  PREM_CALC_PAGE_BLOCK_LABEL,
  PREM_CALC_PAGE_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const HILITE_MAX = 80
const CARD_TITLE_MAX = 80

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

// Accepts #RRGGBB or #RRGGBBAA (alpha optional)
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB or #RRGGBBAA.'
}

// Minimal non-empty check for Lexical richText JSON
const validateRichTextNonEmpty =
  (label = 'Rich text') =>
  (val: unknown) => {
    if (!val) return true // allow empty if not required
    try {
      return val ? true : `${label} is invalid.`
    } catch {
      return `${label} is invalid.`
    }
  }

/* ---------------- block ---------------- */
const PremCalculatorPageSchema: Block = {
  slug: PREM_CALC_PAGE_SLUG_AND_TAG,
  labels: {
    singular: PREM_CALC_PAGE_BLOCK_LABEL,
    plural: PREM_CALC_PAGE_BLOCK_LABEL,
  },
  imageURL: PREM_CALC_PAGE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PREM_CALC_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // ── Section Title (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: { width: '50%' },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'সেকশন শিরোনাম (বাংলা)',
          required: false,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },

    // ── Section Highlighted Title (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedTitle',
          type: 'text',
          label: 'Highlighted Title',
          required: false,
          maxLength: HILITE_MAX,
          validate: validateShortText('Highlighted Title', HILITE_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'highlightedTitleBN',
          type: 'text',
          label: 'হাইলাইটেড শিরোনাম (বাংলা)',
          required: false,
          maxLength: HILITE_MAX,
          validate: validateShortText('Highlighted Title (BN)', HILITE_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },

    // ── Section Description (richText EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'richText',
          label: 'Section Description',
          required: false,
          validate: validateRichTextNonEmpty('Section Description'),
          admin: { width: '50%' },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'সেকশন বর্ণনা (বাংলা)',
          required: false,
          validate: validateRichTextNonEmpty('Section Description (BN)'),
          admin: { width: '50%' },
        },
      ],
    },

    // ── Cards (array) — min 1, max 4
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description:
          'Cards shown under the hero copy. Each card has a title, rich description, and a hex background color.',
      },
      fields: [
        // Card Title (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'cardTitle',
              type: 'text',
              label: 'Card Title',
              required: true,
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'cardTitleBN',
              type: 'text',
              label: 'কার্ড শিরোনাম (বাংলা)',
              required: false,
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },

        // Card Description (rich text EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'cardDesc',
              type: 'richText',
              label: 'Card Description',
              required: false,
              validate: validateRichTextNonEmpty('Card Description'),
              admin: { width: '50%' },
            },
            {
              name: 'cardDescBN',
              type: 'richText',
              label: 'কার্ড বর্ণনা (বাংলা)',
              required: false,
              validate: validateRichTextNonEmpty('Card Description (BN)'),
              admin: { width: '50%' },
            },
          ],
        },

        // Card Background (hex)
        {
          name: 'cardBg',
          type: 'text',
          label: 'Card Background Color',
          required: false,
          validate: validateHexColor,
          admin: {
            description: 'Hex color (#RRGGBB or #RRGGBBAA). Example: #9C8639 or #9C8639B2',
            width: '50%',
          },
          defaultValue: '#9C8639B2',
        },
      ],
      defaultValue: [
        { cardTitle: 'For their future', cardBg: '#9C863940' },
        { cardTitle: 'For your growth', cardBg: '#CCBF95' },
        { cardTitle: 'When life throws you a curveball', cardBg: '#9C8639B2' },
      ],
    },
  ],
}

export default PremCalculatorPageSchema
