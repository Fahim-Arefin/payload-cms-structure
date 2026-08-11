import type { Block } from 'payload'

import {
  CLIENT_SUCCESS_STORIES_BLOCK_LABEL,
  CLIENT_SUCCESS_STORIES_BLOCK_THUMBNAIL_URL,
  CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const COMPANY_NAME_MAX = 80
const CLIENT_NAME_MAX = 80
const CLIENT_DESIGNATION_MAX = 120
const REVIEW_MAX = 500

const ClientSuccessStoriesSchema: Block = {
  slug: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,

  labels: {
    singular: CLIENT_SUCCESS_STORIES_BLOCK_LABEL,
    plural: CLIENT_SUCCESS_STORIES_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: CLIENT_SUCCESS_STORIES_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CLIENT_SUCCESS_STORIES_BLOCK_LABEL} preview`,

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
          defaultBackground: 'secondary-1',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Main intro heading, highlighted text, description and optional CTA.',
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
      name: 'clientReviews',
      type: 'group',
      label: 'Client Reviews',
      admin: {
        description: 'Company-wise client success reviews.',
      },
      fields: [
        {
          name: 'companies',
          type: 'array',
          label: 'Companies',
          required: true,
          minRows: 1,
          maxRows: 12,
          labels: {
            singular: 'Company',
            plural: 'Companies',
          },
          fields: [
            {
              name: 'companyName',
              type: 'text',
              label: 'Company Name',
              required: true,
              maxLength: COMPANY_NAME_MAX,
              validate: validateShortText('Company Name', COMPANY_NAME_MAX, true),
              admin: {
                description: `Example: AltSource. Max ${COMPANY_NAME_MAX} characters.`,
              },
            },
            ...generateImageFields({
              fieldName: 'companyLogo',
              label: 'Company Logo',
              description: 'Upload company logo. Transparent PNG/SVG preferred. Aspect ratio 3:1.',
              aspectRatio: 3 / 1,
              quality: 0.9,
              maxKB: 250,
              required: true,
              ownerCollection: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG as any,
            } as any),

            {
              name: 'reviews',
              type: 'array',
              label: 'Reviews',
              required: true,
              minRows: 1,
              maxRows: 10,
              labels: {
                singular: 'Review',
                plural: 'Reviews',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'clientName',
                      type: 'text',
                      label: 'Client Name',
                      required: true,
                      maxLength: CLIENT_NAME_MAX,
                      validate: validateShortText('Client Name', CLIENT_NAME_MAX, true),
                      admin: {
                        width: '50%',
                        description: `Example: Dianne Russell. Max ${CLIENT_NAME_MAX} characters.`,
                      },
                    },
                    {
                      name: 'clientDesignation',
                      type: 'text',
                      label: 'Client Designation',
                      required: true,
                      maxLength: CLIENT_DESIGNATION_MAX,
                      validate: validateShortText(
                        'Client Designation',
                        CLIENT_DESIGNATION_MAX,
                        true,
                      ),
                      admin: {
                        width: '50%',
                        description: `Client designation. Max ${CLIENT_DESIGNATION_MAX} characters.`,
                      },
                    },
                  ],
                },

                {
                  name: 'rating',
                  type: 'number',
                  label: 'Rating',
                  required: true,
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                  admin: {
                    description: 'Rating from 1 to 5.',
                  },
                },

                {
                  name: 'review',
                  type: 'textarea',
                  label: 'Review',
                  required: true,
                  maxLength: REVIEW_MAX,
                  validate: validateShortText('Review', REVIEW_MAX, true),
                  admin: {
                    description: `Client review text. Max ${REVIEW_MAX} characters.`,
                  },
                },

                ...generateImageFields({
                  fieldName: 'image',
                  label: 'Client Image',
                  description: 'Upload client image. Aspect ratio 240:301.',
                  aspectRatio: 240 / 301,
                  quality: 0.9,
                  maxKB: 400,
                  required: true,
                  ownerCollection: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG as any,
                } as any),
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default ClientSuccessStoriesSchema
