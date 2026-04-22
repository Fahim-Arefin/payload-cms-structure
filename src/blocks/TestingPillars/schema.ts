import type { Block } from 'payload'

import {
  COMMON,
  TESTING_PILLARS_BLOCK_LABEL,
  TESTING_PILLARS_BLOCK_THUMBNAIL_URL,
  TESTING_PILLARS_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const TestingPillarsSchema: Block = {
  slug: TESTING_PILLARS_SLUG_AND_TAG,
  labels: {
    singular: TESTING_PILLARS_BLOCK_LABEL,
    plural: TESTING_PILLARS_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: TESTING_PILLARS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${TESTING_PILLARS_BLOCK_LABEL} preview`,

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
      ctaMaxRows: 3,
      includeHeading3: false,
    }),

    {
      name: 'testingPillars',
      type: 'array',
      label: 'Testing Pillars',
      minRows: 1,
      maxRows: 10,
      fields: [
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Upload the main icon. Recommended 1:1.',
          aspectRatio: 1 / 1,
          quality: 0.9,
          maxKB: 200,
          required: false,
          ownerCollection: TESTING_PILLARS_SLUG_AND_TAG as any,
        } as any),

        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Upload the Banner image. Recommended 327:211',
          aspectRatio: 327 / 211,
          quality: 0.92,
          maxKB: 500,
          required: true,
          ownerCollection: TESTING_PILLARS_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
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
                description: `Short title. Max ${HEADING_MAX} characters.`,
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: false,
              label: 'Description',
              admin: {
                width: '50%',
                description: 'Description (you can add multiple paragraphs).',
              },
            },
          ],
        },

        {
          name: 'items',
          type: 'array',
          label: 'Inner Items',
          minRows: 1,
          maxRows: 12,
          fields: [
            ...generateArrayImageFields({
              fieldName: 'icon',
              label: 'Item Icon',
              description: 'Upload the item icon. Recommended 1:1.',
              aspectRatio: 1 / 1,
              quality: 0.9,
              maxKB: 200,
              required: false,
              ownerCollection: TESTING_PILLARS_SLUG_AND_TAG as any,
            } as any),

            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Item Title',
                  maxLength: HEADING_MAX,
                  validate: validateShortText('Item Title', HEADING_MAX, true),
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'description',
                  type: 'richText',
                  required: false,
                  label: 'Item Description',
                  admin: {
                    width: '50%',
                    description: 'Item description (you can add multiple paragraphs).',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default TestingPillarsSchema
