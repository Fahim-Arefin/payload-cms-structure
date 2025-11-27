import { VLOGS_BLOCK_LABEL, VLOGS_BLOCK_THUMBNAIL_URL, VLOGS_SLUG_AND_TAG } from '@/lib/constants'
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
// === Section ID validator ===
// Rules:
//  - required (cannot be empty)
//  - no leading or trailing spaces
//  - no spaces in between
//  - only letters, numbers, and hyphens are allowed
//  - recommend using hyphen for multi-word ids (e.g., "blog-section")
const validateSectionId = (val: unknown) => {
  const raw = String(val ?? '')

  // required
  if (!raw.trim()) {
    return 'Section ID is required.'
  }

  // no leading/trailing spaces
  if (raw !== raw.trim()) {
    return 'Section ID must not have leading or trailing spaces.'
  }

  const s = raw.trim()

  // no spaces at all
  if (/\s/.test(s)) {
    return 'No spaces allowed. Use "-" to separate words (e.g., "blog-section", not "blog section").'
  }

  // allowed chars: letters, numbers, hyphen
  if (!/^[A-Za-z0-9-]+$/.test(s)) {
    return 'Section ID can only contain letters, numbers, and hyphens (e.g., "blog-section").'
  }

  return true
}

const AllVLogsSectionSchema: Block = {
  slug: VLOGS_SLUG_AND_TAG,
  labels: {
    singular: VLOGS_BLOCK_LABEL,
    plural: VLOGS_BLOCK_LABEL,
  },

  imageURL: VLOGS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${VLOGS_BLOCK_LABEL} preview`,

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
    // {
    //   name: 'sectionId',
    //   type: 'text',
    //   label: 'Section ID (anchor)',
    //   required: true,
    //   admin: {
    //     width: '33%',
    //     description:
    //       'Used for direct jump links to this section (e.g., blog-section). Must not have leading/trailing spaces.',
    //   },
    //   validate: validateRequiredNoEdgeSpaces, // any string allowed, but no before/after space
    // },
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID (anchor)',
      required: true,
      admin: {
        width: '50%',
        description:
          'Used for direct jump links to this section (e.g., "vlog-section"). Required. No spaces. Use "-" to separate words (e.g., "vlog-section", not "vlog section").',
      },
      validate: validateSectionId,
    },
    {
      name: 'useSharedData',
      type: 'checkbox',
      label: 'Use shared Vlogs (Global)',
      defaultValue: true,
      required: true,
      admin: {
        // description:
        //   'When ON, this block renders from the Global “BoardOfDirectors”. Turn OFF to hide.',
        description: `When ON, this block renders data from **Global → Vlogs**.

**Before enabling:** fill up the Global → Vlogs data.

**Notes:**
• This block only stores presentation options (e.g., background color).
• All content comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}
export default AllVLogsSectionSchema
