import type { Block } from 'payload'

import {
  CUSTOMER_REVIEW_BLOCK_LABEL,
  CUSTOMER_REVIEW_BLOCK_THUMBNAIL_URL,
  CUSTOMER_REVIEW_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 90

const CustomerReviewSchema: Block = {
  slug: CUSTOMER_REVIEW_SLUG_AND_TAG,
  labels: {
    singular: CUSTOMER_REVIEW_BLOCK_LABEL,
    plural: CUSTOMER_REVIEW_BLOCK_LABEL,
  },
  admin: {
    group: HOME_PAGE,
  },
  imageURL: CUSTOMER_REVIEW_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CUSTOMER_REVIEW_BLOCK_LABEL} preview`,
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
      label: 'Site Settings',
      fields: [BgColorAndSectionIdField({ defaultBackground: 'secondary-1' })],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the section tag, heading, description and two CTA buttons for the customer review section.',
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
          noCTA: false,
          ctaMaxRows: 2,
          includeHeading3: false,
        }),
      ],
    },

    {
      name: 'reviewSettings',
      type: 'group',
      label: 'Review Settings',
      admin: {
        description: 'Control where the customer review section gets its reviews from.',
      },
      fields: [
        {
          name: 'useReviewFormPublishedReviews',
          type: 'checkbox',
          label: 'Use Review Form Published Reviews',
          defaultValue: true,
          admin: {
            description: 'Enable this to show published reviews submitted through the review form.',
          },
        },
      ],
    },
  ],
}

export default CustomerReviewSchema
