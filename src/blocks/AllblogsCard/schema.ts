import {
  BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_LABEL,
  BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_THUMBNAIL_URL,
  BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG,
  GLOBAL_BLOGS_BLOCK_LABEL,
  NEWS_AND_BLOG_DETAILS_PAGE,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const COLOR_HEX_LEN = 7
const TITLE_MAX = 100

const validateHexColor = (val: unknown) => {
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

const AllBLogsCardSchema: Block = {
  slug: BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG,
  labels: {
    singular: BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_LABEL,
    plural: BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_LABEL,
  },
  admin: {
    group: NEWS_AND_BLOG_DETAILS_PAGE,
  },

  imageURL: BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_LABEL} preview`,

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
            description: `Primary heading. Max ${TITLE_MAX} characters.`,
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
    {
      name: 'linkTarget',
      label: 'Give Link to News and Blog Page Dynamic Details (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        description:
          'Pick an internal dynamic page to link to. External URLs are not allowed. When click on a card it will navigate to its details page, specify that page here',
      },
    },
  ],
}
export default AllBLogsCardSchema
