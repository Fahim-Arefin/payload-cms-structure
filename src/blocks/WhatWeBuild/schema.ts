import type { Block } from 'payload'

import {
  SOLUTION,
  WHAT_WE_BUILD_BLOCK_LABEL,
  WHAT_WE_BUILD_BLOCK_THUMBNAIL_URL,
  WHAT_WE_BUILD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 90
const ITEM_TITLE_MAX = 60
const ITEM_DESCRIPTION_MAX = 180

const whatWeBuildImageFields = generateArrayImageFields({
  required: true,
  fieldName: 'image',
  label: 'Item Image',
  description: 'Upload the image for this what we build item. Recommended wide ratio 1200:340.',
  aspectRatio: 1200 / 340,
  quality: 0.9,
  maxKB: 800,
  ownerCollection: WHAT_WE_BUILD_SLUG_AND_TAG as any,
} as any)

const WhatWeBuildSchema: Block = {
  slug: WHAT_WE_BUILD_SLUG_AND_TAG,
  labels: {
    singular: WHAT_WE_BUILD_BLOCK_LABEL,
    plural: WHAT_WE_BUILD_BLOCK_LABEL,
  },
  admin: {
    group: SOLUTION,
  },
  imageURL: WHAT_WE_BUILD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${WHAT_WE_BUILD_BLOCK_LABEL} preview`,
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
          'Manage the section tag, heading and description. CTA is disabled for this block.',
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
      name: 'whatWeBuild',
      type: 'group',
      label: 'What We Build',
      admin: {
        description: 'Manage the solution cards/tabs and their preview images.',
      },
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          maxRows: 12,
          admin: {
            description:
              'Add items like Corporate Websites, E-Commerce Platforms, Business Websites and Customer Portals.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              maxLength: ITEM_TITLE_MAX,
              validate: validateShortText('Item Title', ITEM_TITLE_MAX, true),
              admin: {
                description: `Example: E-Commerce Platforms. Max ${ITEM_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              maxLength: ITEM_DESCRIPTION_MAX,
              validate: validateShortText('Item Description', ITEM_DESCRIPTION_MAX, true),
              admin: {
                description: `Short description for this solution item. Max ${ITEM_DESCRIPTION_MAX} characters.`,
              },
            },
            ...whatWeBuildImageFields,
          ],
        },
      ],
    },
  ],
}

export default WhatWeBuildSchema
