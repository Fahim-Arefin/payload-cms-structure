// src/payload/blocks/MultiStageIntro.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  MULTI_STAGE_INTRO_SLUG_AND_TAG,
  MULTI_STAGE_INTRO_BLOCK_LABEL,
  MULTI_STAGE_INTRO_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

/* ------------ limits ------------ */
const TEXT_MAX = 160
const HILITE_MAX = 40

/* ------------ validators ------------ */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInField =
  (label: string, targetField: 'text' | 'textBN', max = HILITE_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true // optional
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const base = (siblingData?.[targetField] ?? '').toString()
    return base.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }
const COLOR_HEX_LEN = 7

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

/* ------------ block ------------ */
const MultiStageIntroSchema: Block = {
  slug: MULTI_STAGE_INTRO_SLUG_AND_TAG,
  labels: {
    singular: MULTI_STAGE_INTRO_BLOCK_LABEL,
    plural: MULTI_STAGE_INTRO_BLOCK_LABEL,
  },

  imageURL: MULTI_STAGE_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MULTI_STAGE_INTRO_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
          maxLength: TEXT_MAX,
          validate: validateShortText('Text', TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Main line. Max ${TEXT_MAX} characters.`,
          },
        },
        {
          name: 'textBN',
          type: 'text',
          label: 'টেক্সট (বাংলা)',
          required: true,
          maxLength: TEXT_MAX,
          validate: validateShortText('Text (BN)', TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `মূল লাইন। সর্বোচ্চ ${bnNum(TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within Text)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'text', HILITE_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside “Text”. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'হাইলাইটেড টেক্সট (টেক্সটের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text (BN)', 'textBN', HILITE_MAX),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। “টেক্সট (বাংলা)” এর ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },
  ],
}

export default MultiStageIntroSchema
