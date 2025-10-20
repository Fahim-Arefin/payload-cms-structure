import {
  BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_LABEL,
  BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_THUMBNAIL_URL,
  BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
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

const BoardOfDirectorsListSchema: Block = {
  slug: BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
  labels: {
    singular: BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_LABEL,
    plural: BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_LABEL,
  },

  imageURL: BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_LABEL} preview`,

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
      label: 'Use shared Board of Directors (Global)',
      defaultValue: true,
      required: true,
      admin: {
        description: `When ON, this block renders data from **Global → Board of Directors**.

**Before enabling:** fill up the Global → Board of Directors data.

**Notes:**
• This block only stores presentation options (e.g., background color).
• All content comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}

export default BoardOfDirectorsListSchema
