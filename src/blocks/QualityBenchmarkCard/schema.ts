import type { Block } from 'payload'

import {
  COMMON,
  QUALITY_BENCHMARK_CARD_BLOCK_LABEL,
  QUALITY_BENCHMARK_CARD_BLOCK_THUMBNAIL_URL,
  QUALITY_BENCHMARK_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const QualityBenchhmarkSchema: Block = {
  slug: QUALITY_BENCHMARK_CARD_SLUG_AND_TAG,
  labels: {
    singular: QUALITY_BENCHMARK_CARD_BLOCK_LABEL,
    plural: QUALITY_BENCHMARK_CARD_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: QUALITY_BENCHMARK_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${QUALITY_BENCHMARK_CARD_BLOCK_LABEL} preview`,

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
      includeHeading3: false,
      // noCTA: true,
    }),

    // arrays of title and description
    {
      name: 'benchmarks',
      type: 'array',
      label: 'Benchmarks',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: HEADING_MAX,
          validate: validateShortText('Title', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Short label/title for Mission. Max ${HEADING_MAX} characters.`,
          },
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Description',
          admin: {
            width: '50%',
            description: 'description (you can add multiple paragraphs).',
          },
        },
      ],
    },
  ],
}

export default QualityBenchhmarkSchema
