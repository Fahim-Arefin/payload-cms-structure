import {
  CONTACT_US_BLOCK_LABEL,
  CONTACT_US_BLOCK_THUMBNAIL_URL,
  CONTACT_US_BLOCK_SLUG_AND_TAG,
  COMMON,
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

const ContactUsSchema: Block = {
  slug: CONTACT_US_BLOCK_SLUG_AND_TAG,
  labels: {
    singular: CONTACT_US_BLOCK_LABEL,
    plural: CONTACT_US_BLOCK_LABEL,
  },

  admin: {
    group: COMMON,
  },

  imageURL: CONTACT_US_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CONTACT_US_BLOCK_LABEL} preview`,

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
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },
    {
      name: 'useSharedData',
      type: 'checkbox',
      label: 'Use shared Contact Us (Global)',
      defaultValue: true,
      required: true,
      admin: {
        // description:
        //   'When ON, this block renders from the Global “BoardOfDirectors”. Turn OFF to hide.',
        description: `When ON, this block renders data from **Global → Contact Us**.

**Before enabling:** fill up the Global → Contact Us data.

**Notes:**
• This block only stores presentation options (e.g., background color).
• All content comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}
export default ContactUsSchema
