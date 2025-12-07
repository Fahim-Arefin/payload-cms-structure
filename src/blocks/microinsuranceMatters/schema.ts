// src/payload/blocks/WhyMicroInsuranceMatters.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  MICRO_INSURANCE_MATTERS_SLUG_AND_TAG,
  MICRO_INSURANCE_MATTERS_BLOCK_LABEL,
  MICRO_INSURANCE_MATTERS_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

/* ------------ limits ------------ */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HIGHLIGHT_MAX = 40
const ITEMS_MIN = 1
const ITEMS_MAX = 6

/* ------------ validators ------------ */

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Highlight must appear verbatim inside a target text field */
const validateHighlightedInField =
  (label: string, targetField: string, max = HIGHLIGHT_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/* ------------ block ------------ */

const WhyMicroInsuranceMattersSchema: Block = {
  slug: MICRO_INSURANCE_MATTERS_SLUG_AND_TAG,
  labels: {
    singular: MICRO_INSURANCE_MATTERS_BLOCK_LABEL,
    plural: MICRO_INSURANCE_MATTERS_BLOCK_LABEL,
  },

  imageURL: MICRO_INSURANCE_MATTERS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MICRO_INSURANCE_MATTERS_BLOCK_THUMBNAIL_URL} preview`,

  fields: [
    // Appearance (so you can still control BG color instead of hardcoding in FE)
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    // Section title + highlighted part (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Main heading (e.g., "Why Microinsurance Matters?"). Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'sectionTitleBN',
          type: 'text',
          label: 'সেকশন শিরোনাম (বাংলা)',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম (যেমন, "কেন মাইক্রোইন্স্যুরেন্স গুরুত্বপূর্ণ ?")। সর্বোচ্চ ${bnNum(
              TITLE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'highlightedSectionTitle',
          type: 'text',
          label: 'Highlighted Text (within Section Title)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Section Title',
            'sectionTitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Section Title (e.g., "Microinsurance"). Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedSectionTitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সেকশন শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Section Title (BN)',
            'sectionTitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই সেকশন শিরোনামের ভেতরে হুবহু থাকতে হবে (যেমন, "মাইক্রোইন্স্যুরেন্স")। সর্বোচ্চ ${bnNum(
              HIGHLIGHT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // Main description (EN/BN) — RICHTEXT as you requested
    {
      name: 'description',
      type: 'richText',
      label: 'Main Description',
      required: true,
      admin: {
        description:
          'Main explanatory copy under the heading (EN). Use short paragraphs and bullet points if needed.',
      },
    },
    {
      name: 'descriptionBN',
      type: 'richText',
      label: 'মূল বর্ণনা (বাংলা)',
      required: true,
      admin: {
        description:
          'শিরোনামের নিচে মূল বর্ণনা (বাংলা)। প্রয়োজন হলে ছোট প্যারাগ্রাফ ও বুলেট পয়েন্ট ব্যবহার করতে পারেন।',
      },
    },

    // Items array — single richText per locale (title+description together)
    {
      name: 'items',
      type: 'array',
      label: 'Benefit Items',
      required: true,
      minRows: ITEMS_MIN,
      maxRows: ITEMS_MAX,
      labels: { singular: 'Item', plural: 'Items' },
      admin: {
        description: `Add ${ITEMS_MIN}–${ITEMS_MAX} benefit items (e.g., Coverage for sudden loss of life, Permanent Disability, Health Care Support).`,
      },
      fields: [
        {
          name: 'itemDescription',
          type: 'richText',
          label: 'Item Content (EN)',
          required: true,
          admin: {
            description:
              'Use this to combine title + description (e.g., bold heading then paragraph).',
          },
        },
        {
          name: 'itemDescriptionBN',
          type: 'richText',
          label: 'আইটেম কনটেন্ট (বাংলা)',
          required: true,
          admin: {
            description: 'শিরোনাম + বর্ণনা একসাথে লিখুন (যেমন, শিরোনাম bold + নিচে বাংলা বর্ণনা)।',
          },
        },
      ],
    },
  ],
}

export default WhyMicroInsuranceMattersSchema
