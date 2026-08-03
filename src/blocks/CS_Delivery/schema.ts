import type { Block } from 'payload'

import {
  CASE_STUDY,
  CS_DELIVERY_BLOCK_LABEL,
  CS_DELIVERY_BLOCK_THUMBNAIL_URL,
  CS_DELIVERY_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 120

const FEATURE_TITLE_MAX = 120

const CSDeliverySchema: Block = {
  slug: CS_DELIVERY_SLUG_AND_TAG,

  labels: {
    singular: CS_DELIVERY_BLOCK_LABEL,
    plural: CS_DELIVERY_BLOCK_LABEL,
  },

  admin: {
    group: CASE_STUDY,
  },

  imageURL: CS_DELIVERY_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CS_DELIVERY_BLOCK_LABEL} preview`,

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
        description:
          'Top section heading. Example: tag, "04. How We Deliver", and short description.',
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
      name: 'deliveryInfo',
      type: 'group',
      label: 'Delivery Info',
      admin: {
        description: 'Feature list and two delivery images.',
      },
      fields: [
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          required: true,
          minRows: 1,
          maxRows: 6,
          labels: {
            singular: 'Feature',
            plural: 'Features',
          },
          admin: {
            description: 'Add delivery feature titles. Example: 4a. Test-Driven Development (TDD).',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                  maxLength: 10,
                  validate: validateShortText('Feature Title', 10, true),
                  admin: {
                    width: '25%',
                    description: 'Example: 4a.',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Subtitle',
                  required: true,
                  maxLength: FEATURE_TITLE_MAX,
                  validate: validateShortText('Feature Subtitle', FEATURE_TITLE_MAX, true),
                  admin: {
                    width: '75%',
                    description: `Example: Test-Driven Development (TDD). Max ${FEATURE_TITLE_MAX} characters.`,
                  },
                },
              ],
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'imageOneWrapper',
              type: 'group',
              label: 'Image One',
              admin: {
                width: '50%',
              },
              fields: [
                ...generateImageFields({
                  fieldName: 'imageOne',
                  label: 'Image One',
                  description:
                    'Upload first delivery image. Recommended landscape image. Aspect ratio 571:386.',
                  aspectRatio: 571 / 386,
                  quality: 0.9,
                  maxKB: 500,
                  required: true,
                  ownerCollection: CS_DELIVERY_SLUG_AND_TAG as any,
                } as any),
              ],
            },

            {
              name: 'imageTwoWrapper',
              type: 'group',
              label: 'Image Two',
              admin: {
                width: '50%',
              },
              fields: [
                ...generateImageFields({
                  fieldName: 'imageTwo',
                  label: 'Image Two',
                  description:
                    'Upload second delivery image. Recommended landscape image. Aspect ratio 571:386.',
                  aspectRatio: 571 / 386,
                  quality: 0.9,
                  maxKB: 500,
                  required: true,
                  ownerCollection: CS_DELIVERY_SLUG_AND_TAG as any,
                } as any),
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default CSDeliverySchema
