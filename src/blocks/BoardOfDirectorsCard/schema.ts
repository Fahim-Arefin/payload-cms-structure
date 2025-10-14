import {
  ABOUT_US_PAGE_BOD_CARD_BLOCK_LABEL,
  ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const COLOR_HEX_LEN = 7

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const BoardOfDirectorsCardSchema: Block = {
  slug: ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
  labels: {
    singular: ABOUT_US_PAGE_BOD_CARD_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_BOD_CARD_BLOCK_LABEL,
  },
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
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    {
      name: 'useSharedData',
      type: 'checkbox',
      label: 'Use shared Board of Directors (Global)',
      defaultValue: true,
      required: true,
      admin: {
        description:
          'When ON, this block renders from the Global “BoardOfDirectors”. Turn OFF to hide.',
      },
    },
  ],
}
export default BoardOfDirectorsCardSchema
