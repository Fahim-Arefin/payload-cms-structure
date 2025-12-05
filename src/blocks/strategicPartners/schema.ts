// src/payload/blocks/MicroInsuranceStrategicPartners.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  MICRO_INSURANCE_STRATEGIC_PARTNERS_SLUG_AND_TAG,
  MICRO_INSURANCE_STRATEGIC_PARTNERS_BLOCK_LABEL,
  MICRO_INSURANCE_STRATEGIC_PARTNERS_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ------------ limits ------------ */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HIGHLIGHT_MAX = 40
const PARTNER_NAME_MAX = 60
const PARTNERS_MIN = 3
const PARTNERS_MAX = 12

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

const MicroInsuranceStrategicPartnersSchema: Block = {
  slug: MICRO_INSURANCE_STRATEGIC_PARTNERS_SLUG_AND_TAG,
  labels: {
    singular: MICRO_INSURANCE_STRATEGIC_PARTNERS_BLOCK_LABEL,
    plural: MICRO_INSURANCE_STRATEGIC_PARTNERS_BLOCK_LABEL,
  },

  imageURL: MICRO_INSURANCE_STRATEGIC_PARTNERS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MICRO_INSURANCE_STRATEGIC_PARTNERS_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FFFFFF',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    // Title + TitleBN
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
          admin: {
            width: '50%',
            description: `Main heading (e.g., "Our Strategic Partners"). Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'সেকশন শিরোনাম (বাংলা)',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম (যেমন, "আমাদের স্ট্রাটেজিক পার্টনারস")। সর্বোচ্চ ${bnNum(
              TITLE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // Highlighted text (EN/BN) inside the title
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HIGHLIGHT_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title (e.g., "Strategic Partners"). Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই শিরোনামের ভেতরে হুবহু থাকতে হবে (যেমন, "স্ট্রাটেজিক পার্টনারস")। সর্বোচ্চ ${bnNum(
              HIGHLIGHT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // Partners grid
    {
      name: 'partners',
      type: 'array',
      label: 'Strategic Partners',
      required: true,
      minRows: PARTNERS_MIN,
      maxRows: PARTNERS_MAX,
      labels: { singular: 'Partner', plural: 'Partners' },
      admin: {
        description: `Add ${PARTNERS_MIN}–${PARTNERS_MAX} partners (e.g., NGOs, Cooperative Society, Banks, Multipurpose, NBFIs).`,
      },
      fields: [
        // Logo upload (1:1)
        ...generateArrayImageFields({
          fieldName: 'logo',
          label: 'Partner Logo',
          description: 'Upload & crop the partner logo (square 1:1 recommended).',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 200,
          ownerCollection: MICRO_INSURANCE_STRATEGIC_PARTNERS_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Partner Name',
              required: true,
              maxLength: PARTNER_NAME_MAX,
              validate: validateShortText('Partner Name', PARTNER_NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Short label (e.g., "NGOs", "Banks"). Max ${PARTNER_NAME_MAX} characters.`,
              },
            },
            {
              name: 'nameBN',
              type: 'text',
              label: 'পার্টনার নাম (বাংলা)',
              required: true,
              maxLength: PARTNER_NAME_MAX,
              validate: validateShortText('Partner Name (BN)', PARTNER_NAME_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত নাম (যেমন, "এনজিও", "ব্যাংক"). সর্বোচ্চ ${bnNum(
                  PARTNER_NAME_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default MicroInsuranceStrategicPartnersSchema
