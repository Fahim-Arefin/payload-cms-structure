import {
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
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

const LeadershipTeamListSchema: Block = {
  slug: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
  labels: {
    singular: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL,
    plural: LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL,
  },
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
        width: '33%',
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
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
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

export default LeadershipTeamListSchema
