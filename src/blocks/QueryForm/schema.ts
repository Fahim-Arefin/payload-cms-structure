import type { Block } from 'payload'

import {
  COMMON,
  QUERY_FORM_BLOCK_LABEL,
  QUERY_FORM_BLOCK_THUMBNAIL_URL,
  QUERY_FORM_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 90

const QueryFormSchema: Block = {
  slug: QUERY_FORM_SLUG_AND_TAG,
  labels: {
    singular: QUERY_FORM_BLOCK_LABEL,
    plural: QUERY_FORM_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: QUERY_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${QUERY_FORM_BLOCK_LABEL} preview`,

  fields: [
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
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'showPatternDesign',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'showQueryForm',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}

export default QueryFormSchema
