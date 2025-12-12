// src/payload/blocks/APPDSchema.ts
import {
  APPD_BLOCK_LABEL,
  APPD_BLOCK_SLUG_AND_TAG,
  APPD_BLOCK_THUMBNAIL_URL,
  COMMON,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7 // #RRGGBB
const TITLE_MAX = 80
const HEADER_MAX = 60
const SUBHEADER_MAX = 100
const LOSS_TEXT_MAX = 120
const BENEFIT_TEXT_MAX = 20
const ROWS_MIN = 1
const ROWS_MAX = 50

/* ---------------- validators ---------------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #ED7125).'
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateShortTextBN =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} আবশ্যক।`
    if (!s) return true
    return s.length <= max ? true : `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
  }

/* ---------------- block ---------------- */
const APPDSchema: Block = {
  slug: APPD_BLOCK_SLUG_AND_TAG,
  labels: {
    singular: APPD_BLOCK_LABEL,
    plural: APPD_BLOCK_LABEL,
  },

  admin: {
    group: COMMON,
  },

  imageURL: APPD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${APPD_BLOCK_LABEL} preview`,

  fields: [
    // styling/behavior knobs so “everything comes from schema”
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#FFFFFF',
          required: true,
          admin: {
            width: '50%',
            description: `Hex color in #RRGGBB. Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
          },
        },
        // ⬇️ ADD this block in APPDSchema.fields (after headerOffsetPx row)
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (for deep-link)',
          maxLength: TITLE_MAX,
          defaultValue: 'ptd-schedule',
          required: true,
          admin: {
            width: '50%',
            description:
              'Used in the page URL hash (e.g., #ptd-schedule) and as the <section id="…"> value.',
          },
        },
      ],
    },

    /* Section titles (two lines) */
    {
      type: 'row',
      fields: [
        {
          name: 'titleLine1',
          type: 'text',
          label: 'Section Title — Line 1 (EN)',
          maxLength: TITLE_MAX,
          required: true,
          validate: validateShortText('Section Title — Line 1 (EN)', TITLE_MAX, true),
          defaultValue: 'Coverage Under',
          admin: {
            width: '50%',
            description: `First line of section heading. Max ${TITLE_MAX} chars.`,
          },
        },
        {
          name: 'titleLine1BN',
          type: 'text',
          label: 'সেকশন শিরোনাম — লাইন ১ (BN)',
          maxLength: TITLE_MAX,
          required: true,
          validate: validateShortTextBN('সেকশন শিরোনাম — লাইন ১', TITLE_MAX, true),
          defaultValue: 'বীমার কভারেজের অধীনে',
          admin: {
            width: '50%',
            description: `শিরোনামের প্রথম লাইন। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'titleLine2',
          type: 'text',
          label: 'Section Title — Line 2 (EN)',
          maxLength: TITLE_MAX,
          required: true,
          validate: validateShortText('Section Title — Line 2 (EN)', TITLE_MAX, true),
          defaultValue: 'Accidental Permanent Partial Disability',
          admin: {
            width: '50%',
            description: `Second line of section heading (accent color). Max ${TITLE_MAX} chars.`,
          },
        },
        {
          name: 'titleLine2BN',
          type: 'text',
          label: 'সেকশন শিরোনাম — লাইন ২ (BN)',
          maxLength: TITLE_MAX,
          required: true,
          validate: validateShortTextBN('সেকশন শিরোনাম — লাইন ২', TITLE_MAX, true),
          defaultValue: 'দুর্ঘটনাজনিত স্থায়ী আংশিক অক্ষমতা।',
          admin: {
            width: '50%',
            description: `শিরোনামের দ্বিতীয় লাইন (অ্যাকসেন্ট রঙ)। সর্বোচ্চ ${bnNum(
              TITLE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    /* Table headers */
    {
      type: 'row',
      fields: [
        {
          name: 'lossHeader',
          type: 'text',
          label: 'Table Header — Loss column (EN)',
          maxLength: HEADER_MAX,
          required: true,
          validate: validateShortText('Loss Header (EN)', HEADER_MAX, true),
          defaultValue: 'Loss of',
          admin: {
            width: '50%',
            description: `Left column header. Max ${HEADER_MAX} chars.`,
          },
        },
        {
          name: 'lossHeaderBN',
          type: 'text',
          label: 'টেবিল হেডার — ক্ষতি কলাম (BN)',
          maxLength: HEADER_MAX,
          required: true,
          validate: validateShortTextBN('ক্ষতি কলামের হেডার', HEADER_MAX, true),
          defaultValue: 'ক্ষতি',
          admin: {
            width: '50%',
            description: `বাম কলামের শিরোনাম। সর্বোচ্চ ${bnNum(HEADER_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'benefitsHeader',
          type: 'text',
          label: 'Table Header — Benefits column (EN)',
          maxLength: HEADER_MAX,
          required: true,
          validate: validateShortText('Benefits Header (EN)', HEADER_MAX, true),
          defaultValue: 'Benefits',
          admin: {
            width: '50%',
            description: `Right column header. Max ${HEADER_MAX} chars.`,
          },
        },
        {
          name: 'benefitsHeaderBN',
          type: 'text',
          label: 'টেবিল হেডার — সুবিধা কলাম (BN)',
          maxLength: HEADER_MAX,
          required: true,
          validate: validateShortTextBN('সুবিধা কলামের হেডার', HEADER_MAX, true),
          defaultValue: 'সুবিধা',
          admin: {
            width: '50%',
            description: `ডান কলামের শিরোনাম। সর্বোচ্চ ${bnNum(HEADER_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'benefitsSubHeader',
          type: 'text',
          label: 'Table Subheader (under Benefits) — (EN)',
          maxLength: SUBHEADER_MAX,
          required: true,
          validate: validateShortText('Benefits Subheader (EN)', SUBHEADER_MAX, true),
          defaultValue: '(As % of Coverage Amount)',
          admin: {
            width: '50%',
            description: `Small line under Benefits header. Max ${SUBHEADER_MAX} chars.`,
          },
        },
        {
          name: 'benefitsSubHeaderBN',
          type: 'text',
          label: 'টেবিল সাবহেডার (সুবিধার নিচে) — (BN)',
          maxLength: SUBHEADER_MAX,
          required: true,
          validate: validateShortTextBN('সুবিধার সাবহেডার', SUBHEADER_MAX, true),
          defaultValue: '(বিমা অঙ্কের শতাংশ হিসেবে)',
          admin: {
            width: '50%',
            description: `সুবিধা হেডারের নিচের ছোট লাইন। সর্বোচ্চ ${bnNum(SUBHEADER_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* Rows */
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      required: true,
      minRows: ROWS_MIN,
      maxRows: ROWS_MAX,
      labels: { singular: 'Row', plural: 'Rows' },
      admin: {
        description: `Each row contains the “Loss of …” text and the “Benefit” value/label. Min ${ROWS_MIN}, Max ${ROWS_MAX}.`,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'lossEN',
              type: 'text',
              label: 'Loss (EN)',
              required: true,
              maxLength: LOSS_TEXT_MAX,
              validate: validateShortText('Loss (EN)', LOSS_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `Loss description. Max ${LOSS_TEXT_MAX} chars.`,
              },
            },
            {
              name: 'lossBN',
              type: 'text',
              label: 'ক্ষতি (BN)',
              required: true,
              maxLength: LOSS_TEXT_MAX,
              validate: validateShortTextBN('ক্ষতি', LOSS_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `ক্ষতির বিবরণ। সর্বোচ্চ ${bnNum(LOSS_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'benefitEN',
              type: 'text',
              label: 'Benefit (EN)',
              required: true,
              maxLength: BENEFIT_TEXT_MAX,
              validate: validateShortText('Benefit (EN)', BENEFIT_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `e.g., "100%" or "50%". Max ${BENEFIT_TEXT_MAX} chars.`,
              },
            },
            {
              name: 'benefitBN',
              type: 'text',
              label: 'সুবিধা (BN)',
              required: true,
              maxLength: BENEFIT_TEXT_MAX,
              validate: validateShortTextBN('সুবিধা', BENEFIT_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `যেমন, "১০০%" বা "৫০%". সর্বোচ্চ ${bnNum(BENEFIT_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
      // sensible defaults matching your current table
      defaultValue: [
        {
          lossEN: 'Both hands, Both foot, or sight of both eye',
          lossBN: 'দুই হাত, দুই পা, বা উভয় চোখের দৃষ্টি',
          benefitEN: '100%',
          benefitBN: '১০০%',
        },
        {
          lossEN: 'One hand and one foot',
          lossBN: 'এক হাত ও এক পা',
          benefitEN: '100%',
          benefitBN: '১০০%',
        },
        {
          lossEN: 'One hand/foot and sight of one eye',
          lossBN: 'এক হাত/পা এবং এক চোখের দৃষ্টি',
          benefitEN: '100%',
          benefitBN: '১০০%',
        },
        {
          lossEN: 'Both ears’ hearing capability',
          lossBN: 'উভয় কানের শ্রবণ ক্ষমতা',
          benefitEN: '100%',
          benefitBN: '১০০%',
        },
        { lossEN: 'Speech capability', lossBN: 'বাক ক্ষমতা', benefitEN: '100%', benefitBN: '১০০%' },
        { lossEN: 'One hand/foot', lossBN: 'একটি হাত/পা', benefitEN: '50%', benefitBN: '৫০%' },
        {
          lossEN: 'Sight of one eye',
          lossBN: 'এক চোখের দৃষ্টি',
          benefitEN: '50%',
          benefitBN: '৫০%',
        },
        {
          lossEN: 'Thumb and index finger',
          lossBN: 'বুড়ো আঙুল ও তর্জনী',
          benefitEN: '25%',
          benefitBN: '২৫%',
        },
      ],
    },
  ],
}

export default APPDSchema
