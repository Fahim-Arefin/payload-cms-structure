import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

import {
  COMMON,
  MICROINSURANCE_SERVICE_BLOCK_LABEL,
  MICROINSURANCE_SERVICE_BLOCK_THUMBNAIL_URL,
  MICROINSURANCE_SERVICE_SLUG_AND_TAG,
} from '@/lib/constants'

/* ------------ limits (at top; reuse in admin descriptions) ------------ */
const COLOR_HEX_LEN = 7
const HEADING_MAX = 40
const HIGHLIGHTED_TEXT_MAX = 40
const DESCRIPTION_MAX = 300

const PLAN_TITLE_MAX = 20
const PLANS_MIN = 3
const PLANS_MAX = 5

const CTA_BUTTON_TEXT_MAX = 24

/* ------------ validators ------------ */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateHighlightedInHeading = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'Highlighted Text must be text.'
  if (typeof siblingData?.heading === 'string' && !siblingData.heading.includes(val)) {
    return 'Highlighted Text must exist within the Heading exactly.'
  }
  return true
}

const validateHighlightedInHeadingBN = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'রঙিন টেক্সট অবশ্যই টেক্সট হতে হবে।'
  if (typeof siblingData?.headingBN === 'string' && !siblingData.headingBN.includes(val)) {
    return 'রঙিন টেক্সট অবশ্যই হেডিং-এর ভিতর হুবহু থাকতে হবে।'
  }
  return true
}

const validatePlanButtonTextEN = (val: unknown) => {
  if (val == null || val === '') return true
  const t = String(val)
  return t.length <= CTA_BUTTON_TEXT_MAX
    ? true
    : `Plans Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
}

const validatePlanButtonTextBN = (val: unknown) => {
  if (val == null || val === '') return true
  const t = String(val)
  return t.length <= CTA_BUTTON_TEXT_MAX
    ? true
    : `প্ল্যান CTA টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
}

/* ---------- shared ---------- */
const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

/* ---------- PLAN-LEVEL CTA (inside plans[] items) ---------- */
const validatePlanCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'Plans Button Text (EN) is required when any plan CTA text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `Plans Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

/* ---------- SECTION/GLOBAL CTA (bottom fields) ---------- */
const validateRootCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA Button Text (EN) is required when any CTA button text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

const validateRootCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  }
  return true
}

const validateRootCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object')
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  else hasLink = Boolean(val)

  if (hasAnyText && !hasLink) {
    return 'CTA Button Link is required when CTA Button Text is provided.'
  }
  return true
}

/* ------------ Block config ------------ */
const MicroinsuranceServiceSchema: Block = {
  slug: MICROINSURANCE_SERVICE_SLUG_AND_TAG,
  labels: {
    singular: MICROINSURANCE_SERVICE_BLOCK_LABEL,
    plural: MICROINSURANCE_SERVICE_BLOCK_LABEL,
  },
  admin: {
    group: COMMON,
  },

  imageURL: MICROINSURANCE_SERVICE_BLOCK_THUMBNAIL_URL,
  imageAltText: 'Microinsurance Service preview',

  fields: [
    /* -------- Section appearance -------- */
    // {
    //   name: 'backgroundColor',
    //   type: 'text',
    //   label: 'Section Background Color',
    //   maxLength: COLOR_HEX_LEN,
    //   validate: validateHexColor,
    //   defaultValue: '#F6EDDD',
    //   admin: {
    //     width: '33%',
    //     description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(
    //       COLOR_HEX_LEN,
    //     )}).`,
    //   },
    // },
    {
      name: 'cardBg',
      type: 'text',
      label: 'Card Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FFFFFF',
      admin: {
        width: '33%',
        description: `Hex color for individual cards in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    /* -------- Heading (EN/BN pairs) -------- */
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          maxLength: HEADING_MAX,
          admin: {
            width: '50%',
            description: `Main heading. Max ${HEADING_MAX} characters.`,
          },
        },
        {
          name: 'headingBN',
          type: 'text',
          required: true,
          label: 'হেডিং (বাংলা)',
          maxLength: HEADING_MAX,
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(HEADING_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* -------- Highlighted text (must exist inside heading) -------- */
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within heading)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInHeading,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Heading. Max ${HIGHLIGHTED_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (হেডিং-এর মধ্যে)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInHeadingBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই হেডিং-এর ভিতর হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HIGHLIGHTED_TEXT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // Plans Button Text (EN/BN) — no link
    {
      type: 'row',
      fields: [
        {
          name: 'plansButtonText',
          type: 'text',
          label: 'Plans Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validatePlanButtonTextEN,
          defaultValue: 'See More',
          admin: {
            width: '50%',
            description: `Optional. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'plansButtonTextBN',
          type: 'text',
          label: 'প্ল্যানস বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          defaultValue: 'আরও দেখান',
          validate: validatePlanButtonTextBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
        {
          name: 'plansSecondaryButtonText',
          type: 'text',
          label: 'Plans Secondary Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validatePlanButtonTextEN,
          defaultValue: 'See Less',
          admin: {
            width: '50%',
            description: `Optional. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'plansSecondaryButtonTextBN',
          type: 'text',
          label: 'প্ল্যানস সেকেন্ডারি বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          defaultValue: 'কম দেখান',
          validate: validatePlanButtonTextBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* -------- Plans array -------- */
    {
      name: 'plans',
      type: 'array',
      label: 'Featured Microinsurance Plans',
      required: true,
      minRows: PLANS_MIN,
      maxRows: PLANS_MAX,
      admin: {
        description: `Add ${PLANS_MIN}–${PLANS_MAX} plans to feature.`,
      },
      fields: [
        // Icon (1:1)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Plan icon. Upload & crop a square (1:1).',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 100,
          ownerCollection: MICROINSURANCE_SERVICE_SLUG_AND_TAG as any,
        } as any),

        // Image (~451:350)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Plan image. Upload & crop to ~451:350 (≈1.2886). Keep subject centered.',
          aspectRatio: 451 / 350,
          quality: 0.9,
          maxKB: 300,
          ownerCollection: MICROINSURANCE_SERVICE_SLUG_AND_TAG as any,
        } as any),

        // Plan Title (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Plan Title',
              maxLength: PLAN_TITLE_MAX,
              admin: {
                width: '50%',
                description: `Plan title. Max ${PLAN_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'প্ল্যান শিরোনাম (বাংলা)',
              maxLength: PLAN_TITLE_MAX,
              admin: {
                width: '50%',
                description: `প্ল্যানের শিরোনাম। সর্বোচ্চ ${bnNum(PLAN_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Plan Description (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Plan Description',
              maxLength: DESCRIPTION_MAX,
              admin: {
                width: '50%',
                description: `Brief description of the plan. Max ${DESCRIPTION_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'textarea',
              required: true,
              label: 'প্ল্যানের বিবরণ (বাংলা)',
              maxLength: DESCRIPTION_MAX,
              admin: {
                width: '50%',
                description: `প্ল্যানের সংক্ষিপ্ত বর্ণনা। সর্বোচ্চ ${bnNum(
                  DESCRIPTION_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        // List Items (EN/BN), min 2, max 8
        {
          name: 'listItems',
          type: 'array',
          label: 'Key Benefits / Points',
          required: true,
          minRows: 2,
          maxRows: 8,
          admin: {
            description: 'Add 2–8 bullet items describing the plan.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'listItemText',
                  type: 'text',
                  required: true,
                  label: 'List Item Text',
                  admin: { width: '50%' },
                },
                {
                  name: 'listItemTextBN',
                  type: 'text',
                  required: true,
                  label: 'লিস্ট আইটেম টেক্সট (বাংলা)',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              label: 'CTA Button Text',
              maxLength: CTA_BUTTON_TEXT_MAX,
              validate: validateRootCTAEnglishText,
              admin: {
                width: '50%',
                description: `Text shown on the call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
              },
            },
            {
              name: 'buttonTextBN',
              type: 'text',
              label: 'CTA বাটনের টেক্সট (বাংলা)',
              maxLength: CTA_BUTTON_TEXT_MAX,
              validate: validateRootCTABanglaText,
              admin: {
                width: '50%',
                description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(
                  CTA_BUTTON_TEXT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'buttonLink',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          validate: validateRootCTALinkRequiredIfAnyText,
          admin: {
            description:
              'Pick an internal Page to link to. External URLs are not allowed. When clicking this button it will navigate to that page.',
          },
        },
      ],
    },
  ],
}

export default MicroinsuranceServiceSchema
