import type { Block } from 'payload'

import {
  COMMON,
  QUERIES_BLOCK_LABEL,
  QUERIES_BLOCK_THUMBNAIL_URL,
  QUERIES_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const QueriesSchema: Block = {
  slug: QUERIES_SLUG_AND_TAG,
  labels: {
    singular: QUERIES_BLOCK_LABEL,
    plural: QUERIES_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: QUERIES_BLOCK_THUMBNAIL_URL,
  imageAltText: `${QUERIES_BLOCK_LABEL} preview`,

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

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },
    // ===== Queries (FAQ) =====
    {
      name: 'queries',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      label: 'Queries',
      labels: { singular: 'Query', plural: 'Queries' },
      admin: {
        description: 'Add question + answer items for this section.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
          maxLength: 160,
          validate: validateShortText('Question', 160, true),
          admin: {
            description: 'Example: "What is the minimum order quantity?"',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Answer',
          admin: {
            description: 'Write the answer (you can add multiple paragraphs).',
          },
        },
      ],
    },
  ],
}

export default QueriesSchema
