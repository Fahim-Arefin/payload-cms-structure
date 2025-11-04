import { NEWS_BLOCK_LABEL, NEWS_BLOCK_THUMBNAIL_URL, NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const COLOR_HEX_LEN = 7
const TITLE_MAX = 100
const CTA_TEXT_MAX = 50

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

// near other validators
const validateSingleWordId = (val: unknown) => {
  const s = String(val ?? '')
  if (!s) return 'Section ID is required.'
  if (!/^[A-Za-z0-9]+$/.test(s)) {
    return 'Section ID must be one word: letters and numbers only (no spaces, -, _ or symbols).'
  }
  return true
}

// near other validators
const validateRequiredNoEdgeSpaces = (val: unknown) => {
  const s = String(val ?? '')
  if (!s.trim()) return 'Section ID is required.'
  if (s !== s.trim()) return 'No leading or trailing spaces are allowed.'
  return validateSingleWordId(s)
}

const AllNewsSectionSchema: Block = {
  slug: NEWS_SLUG_AND_TAG,
  labels: {
    singular: NEWS_BLOCK_LABEL,
    plural: NEWS_BLOCK_LABEL,
  },

  imageURL: NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${NEWS_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
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
      name: 'sectionId',
      type: 'text',
      label: 'Section ID (anchor)',
      required: true,
      admin: {
        width: '33%',
        description:
          'Used for direct jump links to this section (e.g., blog-section). Must not have leading/trailing spaces.',
      },
      validate: validateRequiredNoEdgeSpaces, // any string allowed, but no before/after space
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showSearchBar',
          type: 'checkbox',
          label: 'Show Search Bar',
          defaultValue: true,
          required: true,
          admin: { width: '50%', description: 'Search bar will show if u check the checkbox' },
        },
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use shared News and Blogs (Global)',
          defaultValue: true,
          required: true,
          admin: {
            // description:
            //   'When ON, this block renders from the Global “BoardOfDirectors”. Turn OFF to hide.',
            width: '50%',
            description: `When ON, this block renders data from **Global → News and Blogs**.

**Before enabling:** fill up the Global → News and Blogs data.

**Notes:**
• This block only stores presentation options (e.g., background color).
• All content comes from the single shared Global to keep pages in sync.`,
          },
        },
      ],
    },
    // ---- add inside fields[] (after the useSharedData row) ----
    {
      type: 'row',
      fields: [
        {
          name: 'loadMoreText',
          type: 'text',
          label: 'Load More Button Text',
          required: true,
          defaultValue: 'Load More',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('Load More Button Text', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Label for the list “Load More” button. Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'loadMoreTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা) — Load More',
          required: true,
          defaultValue: 'আরও দেখুন',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('Load More Button Text (BN)', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `লিস্টের “Load More” বাটনের লেখা। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'seeLessText',
          type: 'text',
          label: 'See Less Button Text',
          required: true,
          defaultValue: 'See Less',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('See Less Button Text', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Label for collapsing the list (e.g., “See Less”). Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'seeLessTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা) — See Less',
          required: true,
          defaultValue: 'কম দেখুন',
          maxLength: CTA_TEXT_MAX,
          validate: validateShortText('See Less Button Text (BN)', CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `লিস্ট সংকুচিত করার বাটনের লেখা। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      name: 'linkTarget',
      label: 'Give Link to News and Blog Page Dynamic Details (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on a card it will navigate to all leadership team page, specify that page here',
      },
    },
  ],
}
export default AllNewsSectionSchema
