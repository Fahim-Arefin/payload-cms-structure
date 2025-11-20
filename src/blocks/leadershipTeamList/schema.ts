import {
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_THUMBNAIL_URL,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
} from '@/lib/constants'

import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const COLOR_HEX_LEN = 7
const CTA_TEXT_MAX = 50

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional
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

const LeadershipTeamListSchema: Block = {
  slug: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
  labels: {
    singular: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL,
    plural: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL,
  },

  imageURL: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_THUMBNAIL_URL,
  imageAltText: `${LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL} preview`,

  fields: [
    {
      type: 'row',
      fields: [
        // Appearance
        {
          name: 'oddBackgroundColor',
          type: 'text',
          label: 'Odd Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#FFFFFF',
          admin: {
            width: '50%',
            description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
          },
        },
        {
          name: 'evenBackgroundColor',
          type: 'text',
          label: 'Even Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#F6EDDD',
          admin: {
            width: '50%',
            description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'readMoreText',
          type: 'text',
          label: 'Read More Button Text',
          required: true,
          defaultValue: 'Read More',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('Read More Button Text', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Label for the per-section CTA (e.g., “Read More”). Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'readMoreTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা) — Read More',
          required: true,
          defaultValue: 'বিস্তারিত পড়ুন',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('Read More Button Text (BN)', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `CTA বাটনের লেখা (যেমন, “বিস্তারিত পড়ুন”). সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'readLessText',
          type: 'text',
          label: 'Read Less Button Text',
          required: true,
          defaultValue: 'Read Less',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('Read Less Button Text', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Label for collapsing long content (e.g., “Read Less”). Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'readLessTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা) — Read Less',
          required: true,
          defaultValue: 'কম পড়ুন',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('Read Less Button Text (BN)', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `দীর্ঘ কনটেন্ট সংকুচিত করার বাটনের লেখা (যেমন, “কম পড়ুন”)। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Data source toggle
    {
      name: 'useSharedData',
      type: 'checkbox',
      label: 'Use shared Leadership Team (Global)',
      defaultValue: true,
      required: true,
      admin: {
        description: `When ON, this block renders data from **Global → Leadership Team**.

**Before enabling:** fill up the Global → Leadership Team data.

**Notes:**
• This block only stores presentation options (e.g., background color).
• All content comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}

export default LeadershipTeamListSchema
