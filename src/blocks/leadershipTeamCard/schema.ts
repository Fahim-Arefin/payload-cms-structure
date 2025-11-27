import {
  ABOUT_US_PAGE,
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL,
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_THUMBNAIL_URL,
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const COLOR_HEX_LEN = 7

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const LeadershipTeamCardSchema: Block = {
  slug: ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  labels: {
    singular: ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL,
  },
  admin: {
    group: ABOUT_US_PAGE,
  },

  imageURL: ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    {
      name: 'linkTarget',
      label: 'Link to (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on a card it will navigate to all leadership team page, specify that page here',
      },
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

export default LeadershipTeamCardSchema
