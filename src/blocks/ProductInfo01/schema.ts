import type { Block } from 'payload'

import {
  COMMON,
  PRODUCT_INFO_01_BLOCK_LABEL,
  PRODUCT_INFO_01_BLOCK_THUMBNAIL_URL,
  PRODUCT_INFO_01_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const ProductInfo01Schema: Block = {
  slug: PRODUCT_INFO_01_SLUG_AND_TAG,
  labels: {
    singular: PRODUCT_INFO_01_BLOCK_LABEL,
    plural: PRODUCT_INFO_01_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: PRODUCT_INFO_01_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCT_INFO_01_BLOCK_LABEL} preview`,

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
      includeHeading3: false, // ✅ disables heading 3 fields in admin
    }),

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },

    ...generateImageFields({
      fieldName: 'image',
      label: 'Info Image',
      description: 'Aspect ratio 477:487 recommended.',
      aspectRatio: 477 / 487,
      quality: 0.93,
      maxKB: 500,
      required: true,
      ownerCollection: PRODUCT_INFO_01_SLUG_AND_TAG as any,
    } as any),
  ],
}

export default ProductInfo01Schema
