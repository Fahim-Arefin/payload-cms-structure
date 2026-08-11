import type { Block } from 'payload'

import {
  GET_IN_TOUCH,
  RATING_BLOCK_LABEL,
  RATING_BLOCK_THUMBNAIL_URL,
  RATING_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const RatingSchema: Block = {
  slug: RATING_SLUG_AND_TAG,

  labels: {
    singular: RATING_BLOCK_LABEL,
    plural: RATING_BLOCK_LABEL,
  },

  admin: {
    group: GET_IN_TOUCH,
  },

  imageURL: RATING_BLOCK_THUMBNAIL_URL,
  imageAltText: `${RATING_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
      },
    },

    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-1',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Rating section tag, heading and highlighted heading text.',
      },
      fields: [
        ...SectionHeadingFields({
          tagMax: TAG_MAX,
          heading1Max: HEADING_MAX,
          heading1HighlightMax: HEADING_MAX,
          heading2Max: HEADING_MAX,
          heading2HighlightMax: HEADING_MAX,
          heading3Max: HEADING_MAX,
          heading3HighlightMax: HEADING_MAX,
          noCTA: true,
          includeHeading3: false,
        }),
      ],
    },

    {
      name: 'ratingSettings',
      type: 'group',
      label: 'Rating Settings',
      admin: {
        description: 'Control whether the rating form should be shown on the frontend.',
      },
      fields: [
        {
          name: 'showRatingForm',
          type: 'checkbox',
          label: 'Show Rating Form',
          defaultValue: true,
          admin: {
            description: 'Enable this to show the rating form section.',
          },
        },
      ],
    },
  ],
}

export default RatingSchema
