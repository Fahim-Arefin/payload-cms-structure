import type { Block } from 'payload'

import {
  NEWS,
  SINGLE_NEWS_BLOCK_LABEL,
  SINGLE_NEWS_BLOCK_THUMBNAIL_URL,
  SINGLE_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'

/* ---------- limits ---------- */

const SignleNewsSchema: Block = {
  slug: SINGLE_NEWS_SLUG_AND_TAG,
  labels: {
    singular: SINGLE_NEWS_BLOCK_LABEL,
    plural: SINGLE_NEWS_BLOCK_LABEL,
  },

  admin: { group: NEWS },

  imageURL: SINGLE_NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SINGLE_NEWS_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),
    CtaButtonsField({ maxRows: 1 }),

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
• This block only stores presentation options (e.g., background color , CTA btn etc.).
• News comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}

export default SignleNewsSchema
