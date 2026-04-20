import type { Block } from 'payload'

import {
  GET_IN_TOUCH,
  FEEDBACK_FORM_BLOCK_LABEL,
  FEEDBACK_FORM_BLOCK_THUMBNAIL_URL,
  FEEDBACK_FORM_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 90

const FeedbackFormSchema: Block = {
  slug: FEEDBACK_FORM_SLUG_AND_TAG,
  labels: {
    singular: FEEDBACK_FORM_BLOCK_LABEL,
    plural: FEEDBACK_FORM_BLOCK_LABEL,
  },

  admin: { group: GET_IN_TOUCH },

  imageURL: FEEDBACK_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FEEDBACK_FORM_BLOCK_LABEL} preview`,

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

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
          name: 'showForm',
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

export default FeedbackFormSchema
