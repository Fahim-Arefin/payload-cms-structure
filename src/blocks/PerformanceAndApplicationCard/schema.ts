import type { Block } from 'payload'

import {
  COMMON,
  PERFORMANCE_AND_APPLICATION_CARD_BLOCK_LABEL,
  PERFORMANCE_AND_APPLICATION_CARD_BLOCK_THUMBNAIL_URL,
  PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { Card02Field } from '@/utils/block/fields/Card02Field'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { TestLabCardField } from '@/utils/block/fields/TestLabCard'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const CARD_TEXT_MAX = 120

const PerformanceAndApplicationCardSchema: Block = {
  slug: PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
  labels: {
    singular: PERFORMANCE_AND_APPLICATION_CARD_BLOCK_LABEL,
    plural: PERFORMANCE_AND_APPLICATION_CARD_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: PERFORMANCE_AND_APPLICATION_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PERFORMANCE_AND_APPLICATION_CARD_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'dark-1', disableBgColor: true }),
    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: false,
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
      // noCTA: true,
      includeHeading3: false,
    }),

    // ===== Cards =====
    Card02Field({
      ownerCollection: PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG as any,
      minRows: 1,
      maxRows: 8,
      titleMax: CARD_TEXT_MAX,
    }),

    // ===== Test Lab Cards =====
    TestLabCardField({
      ownerCollection: PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG as any,
      minRows: 0,
      maxRows: 1,
      titleMax: CARD_TEXT_MAX,
    }),
  ],
}

export default PerformanceAndApplicationCardSchema
