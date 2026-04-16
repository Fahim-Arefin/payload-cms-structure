import type { Block } from 'payload'

import {
  PRODUCT_INFO_04_BLOCK_LABEL,
  PRODUCT_INFO_04_BLOCK_THUMBNAIL_URL,
  PRODUCT_INFO_04_SLUG_AND_TAG,
  PRODUCT_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { Card05Field } from '@/utils/block/fields/Card05Field'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const CARD_TEXT_MAX = 120

const ProductInfo04Schema: Block = {
  slug: PRODUCT_INFO_04_SLUG_AND_TAG,
  labels: {
    singular: PRODUCT_INFO_04_BLOCK_LABEL,
    plural: PRODUCT_INFO_04_BLOCK_LABEL,
  },

  admin: { group: PRODUCT_PAGE },

  imageURL: PRODUCT_INFO_04_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCT_INFO_04_BLOCK_LABEL} preview`,

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
      // noCTA: true,
    }),

    // ===== Cards =====
    Card05Field({
      ownerCollection: PRODUCT_INFO_04_SLUG_AND_TAG as any,
      minRows: 1,
      maxRows: 8,
      titleMax: CARD_TEXT_MAX,
    }),
  ],
}

export default ProductInfo04Schema
