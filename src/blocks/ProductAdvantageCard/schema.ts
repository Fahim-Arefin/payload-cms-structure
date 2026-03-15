import type { Block } from 'payload'

import {
  COMMON,
  PRODUCT_ADVANTAGE_CARD_BLOCK_LABEL,
  PRODUCT_ADVANTAGE_CARD_BLOCK_THUMBNAIL_URL,
  PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { Card01Field } from '@/utils/block/fields/Card01Field'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { TestLabCardField } from '@/utils/block/fields/TestLabCard'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const CARD_TEXT_MAX = 120

const ProductAdvantageCardSchema: Block = {
  slug: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
  labels: {
    singular: PRODUCT_ADVANTAGE_CARD_BLOCK_LABEL,
    plural: PRODUCT_ADVANTAGE_CARD_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: PRODUCT_ADVANTAGE_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCT_ADVANTAGE_CARD_BLOCK_LABEL} preview`,

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
      ctaMaxRows: 1,
      // noCTA: true,
    }),

    // ===== Cards =====
    Card01Field({
      ownerCollection: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG as any,
      minRows: 1,
      maxRows: 8,
      cardTextMax: CARD_TEXT_MAX,
      maxIcons: 1,
    }),

    // ===== Test Lab Cards =====
    TestLabCardField({
      ownerCollection: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG as any,
      minRows: 0,
      maxRows: 1,
      titleMax: CARD_TEXT_MAX,
    }),

    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
  ],
}

export default ProductAdvantageCardSchema
