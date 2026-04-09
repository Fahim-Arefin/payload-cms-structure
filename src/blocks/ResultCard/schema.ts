import type { Block } from 'payload'

import {
  HOME_PAGE,
  RESULT_CARD_BLOCK_LABEL,
  RESULT_CARD_BLOCK_THUMBNAIL_URL,
  RESULT_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { ResultCardField } from '@/utils/block/fields/ResultCardField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const TITLE_MAX = 90
export const CTA_BUTTON_LABEL_MAX = 40

const ResultCardSchema: Block = {
  slug: RESULT_CARD_SLUG_AND_TAG,
  labels: {
    singular: RESULT_CARD_BLOCK_LABEL,
    plural: RESULT_CARD_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: RESULT_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${RESULT_CARD_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      ctaMaxRows: 1,
      //   noCTA: true,
    }),

    ResultCardField({
      name: 'cards',
      label: 'Result Cards',
      minRows: 1,
      maxRows: 9,
      titleMax: TITLE_MAX,
      subtitleMax: TITLE_MAX,
    }),
  ],
}

export default ResultCardSchema
