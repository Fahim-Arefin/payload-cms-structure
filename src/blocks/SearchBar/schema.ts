import {
  HOME_PAGE,
  HOME_PAGE_SEARCH_BAR_BLOCK_LABEL,
  HOME_PAGE_SEARCH_BAR_BLOCK_THUMBNAIL_URL,
  HOME_PAGE_SEARCH_BAR_SLUG_AND_TAG,
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

const SearchBarSchema: Block = {
  slug: HOME_PAGE_SEARCH_BAR_SLUG_AND_TAG,
  labels: {
    singular: HOME_PAGE_SEARCH_BAR_BLOCK_LABEL,
    plural: HOME_PAGE_SEARCH_BAR_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: HOME_PAGE_SEARCH_BAR_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_PAGE_SEARCH_BAR_BLOCK_LABEL} preview`,

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
        width: '50%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
  ],
}

export default SearchBarSchema
