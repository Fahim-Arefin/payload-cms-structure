import type { Block } from 'payload'

import {
  HOME_PAGE,
  SAGAR_BLOGS_BLOCK_LABEL,
  SAGAR_BLOGS_BLOCK_THUMBNAIL_URL,
  SAGAR_BLOGS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const SagarBlogsSchema: Block = {
  slug: SAGAR_BLOGS_SLUG_AND_TAG,
  labels: {
    singular: SAGAR_BLOGS_BLOCK_LABEL,
    plural: SAGAR_BLOGS_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: SAGAR_BLOGS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SAGAR_BLOGS_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      // ctaMaxRows: 1,
      noCTA: true,
      includeHeading3: false, // ✅ disables heading 3 fields in admin
    }),

    CtaButtonsField({
      name: 'detailsPageLink',
      label: 'News Details Page Link',
      minRows: 1,
      maxRows: 1,
    }),

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show/hide pattern design on the right side of the block',
        width: '100%',
      },
    },

    {
      name: 'useSharedData',
      type: 'checkbox',
      label: 'Use shared News (Global)',
      defaultValue: true,
      required: true,
      admin: {
        description: `When ON, this block renders data from **Global → News**.

**Before enabling:** fill up the Global → News data.

**Notes:**
• This block only stores presentation options (e.g., background color , section heading etc.).
• News Videos comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}

export default SagarBlogsSchema
