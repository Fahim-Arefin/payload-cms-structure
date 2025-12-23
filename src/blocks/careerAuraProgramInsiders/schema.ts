// src/payload/blocks/CareerAuraProgramInsiders.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  CAREER_AURA_PROGRAM_INSIDERS_SLUG_AND_TAG,
  CAREER_AURA_PROGRAM_INSIDERS_BLOCK_LABEL,
  CAREER_AURA_PROGRAM_INSIDERS_BLOCK_THUMBNAIL_URL,
  CAREER_PAGE,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HIGHLIGHT_MAX = 80

/* ---------- validators ---------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

/** Highlight must appear verbatim inside the paired title field */
const validateHighlightedInTitle =
  (label: string, targetField: 'title' | 'titleBN', max = HIGHLIGHT_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const title = (siblingData?.[targetField] ?? '').toString()
    return title.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }

/* ---------- block ---------- */
const CareerAuraProgramInsidersSchema: Block = {
  slug: CAREER_AURA_PROGRAM_INSIDERS_SLUG_AND_TAG,
  labels: {
    singular: CAREER_AURA_PROGRAM_INSIDERS_BLOCK_LABEL,
    plural: CAREER_AURA_PROGRAM_INSIDERS_BLOCK_LABEL,
  },

  admin: {
    group: CAREER_PAGE,
  },

  imageURL: CAREER_AURA_PROGRAM_INSIDERS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_AURA_PROGRAM_INSIDERS_BLOCK_LABEL} preview`,

  fields: [
    /* ---------- Appearance ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#FCF4EB',
          admin: {
            width: '50%',
            description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(
              COLOR_HEX_LEN,
            )}).`,
          },
        },
      ],
    },

    /* ---------- Title / Highlighted Title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'শিরোনাম (বাংলা)',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'highlightedTitle',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInTitle('Highlighted Title', 'title', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Title. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInTitle('Highlighted Title (BN)', 'titleBN', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HIGHLIGHT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Images Grid ---------- */
    {
      name: 'images',
      type: 'array',
      label: 'Program Images',
      required: true,
      minRows: 3,
      maxRows: 8,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      admin: {
        description:
          'Upload the collage images shown in the Program Insiders section (landscape photos recommended). Max images should be 8.',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image (4:3)',
          description: 'Program photo. 4:3 landscape recommended.',
          aspectRatio: 4 / 3,
          quality: 0.9,
          maxKB: 700,
          ownerCollection: CAREER_AURA_PROGRAM_INSIDERS_SLUG_AND_TAG as any,
        } as any),
      ],
    },
  ],
}

export default CareerAuraProgramInsidersSchema
