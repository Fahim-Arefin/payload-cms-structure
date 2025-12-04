// src/payload/blocks/CareerIntro.ts
import type { Block } from 'payload'
import {
  CAREER_PAGE,
  CAREER_PAGE_INTRO_BLOCK_LABEL,
  CAREER_PAGE_INTRO_BLOCK_THUMBNAIL_URL,
  CAREER_PAGE_INTRO_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'

/* ---------------- limits ---------------- */
const TITLE_MAX = 80
const HILITE_MAX = 40
const DESCRIPTION_MAX = 300

/* ---------------- validators ---------------- */

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
  (label: string, targetField: string, max = HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/* ---------------- block ---------------- */

const CareerIntroSchema: Block = {
  slug: CAREER_PAGE_INTRO_SLUG_AND_TAG,
  labels: {
    singular: CAREER_PAGE_INTRO_BLOCK_LABEL,
    plural: CAREER_PAGE_INTRO_BLOCK_LABEL,
  },

  admin: {
    group: CAREER_PAGE,
  },

  imageURL: CAREER_PAGE_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_PAGE_INTRO_BLOCK_LABEL} preview`,

  fields: [
    // Title (EN/BN)
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
          admin: {
            width: '50%',
            description: `Primary headline. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Highlighted (within title) EN/BN — optional
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedTitle',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // Description (now richText) EN/BN
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Description',
          admin: {
            width: '50%',
            description: `1–2 short sentences. Max ${DESCRIPTION_MAX} characters (guideline).`,
          },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          required: true,
          label: 'বর্ণনা (বাংলা)',
          admin: {
            width: '50%',
            description: `১–২টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ${bnNum(
              DESCRIPTION_MAX,
            )} অক্ষরের মধ্যে রাখার পরামর্শ।`,
          },
        },
      ],
    },
  ],
}

export default CareerIntroSchema
