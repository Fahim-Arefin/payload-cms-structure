import {
  BLOGS_DETAILS_BLOCK_LABEL,
  BLOGS_DETAILS_BLOCK_THUMBNAIL_URL,
  BLOGS_DETAILS_SLUG_AND_TAG,
  GLOBAL_BLOGS_BLOCK_LABEL,
  NEWS_AND_BLOG_DETAILS_PAGE,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const COLOR_HEX_LEN = 7

const validateHexColor = (val: unknown) => {
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const BLogDetailsSectionSchema: Block = {
  slug: BLOGS_DETAILS_SLUG_AND_TAG,
  labels: {
    singular: BLOGS_DETAILS_BLOCK_LABEL,
    plural: BLOGS_DETAILS_BLOCK_LABEL,
  },
  admin: {
    group: NEWS_AND_BLOG_DETAILS_PAGE,
  },

  imageURL: BLOGS_DETAILS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BLOGS_DETAILS_BLOCK_LABEL} preview`,

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
      label: 'Use shared Blogs (Global)',
      defaultValue: true,
      required: true,
      admin: {
        // description:
        //   'When ON, this block renders from the Global “BoardOfDirectors”. Turn OFF to hide.',
        width: '50%',
        description: `When ON, this block renders data from **Global → ${GLOBAL_BLOGS_BLOCK_LABEL}**.

**Before enabling:** fill up the Global → ${GLOBAL_BLOGS_BLOCK_LABEL} data.

**Notes:**
• This block only stores presentation options (e.g., background color).
• All content comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}
export default BLogDetailsSectionSchema
