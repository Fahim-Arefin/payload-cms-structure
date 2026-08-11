import type { Block } from 'payload'

import {
  COLLABORATIVE_METHOD_BLOCK_LABEL,
  COLLABORATIVE_METHOD_BLOCK_THUMBNAIL_URL,
  COLLABORATIVE_METHOD_SLUG_AND_TAG,
  SOLUTION,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 90
const DESCRIPTION_ICON_TITLE_MAX = 40
const DESCRIPTION_ICON_SUBTITLE_MAX = 80

const mainImageFields = generateImageFields({
  required: true,
  fieldName: 'image',
  label: 'Main Image',
  description: 'Upload the collaborative method main image. Recommended ratio 500:360.',
  aspectRatio: 500 / 360,
  quality: 0.9,
  maxKB: 600,
  ownerCollection: COLLABORATIVE_METHOD_SLUG_AND_TAG as any,
} as any)

const designerIconFields = generateImageFields({
  required: true,
  fieldName: 'designerIcon',
  label: 'Designer Icon',
  description: 'Upload the designer icon. Recommended transparent PNG/WebP.',
  aspectRatio: 1 / 1,
  quality: 0.9,
  maxKB: 120,
  ownerCollection: COLLABORATIVE_METHOD_SLUG_AND_TAG as any,
} as any)

const builderIconFields = generateImageFields({
  required: true,
  fieldName: 'builderIcon',
  label: 'Builder Icon',
  description: 'Upload the builder icon. Recommended transparent PNG/WebP.',
  aspectRatio: 1 / 1,
  quality: 0.9,
  maxKB: 120,
  ownerCollection: COLLABORATIVE_METHOD_SLUG_AND_TAG as any,
} as any)

const CollaborativeMethodSchema: Block = {
  slug: COLLABORATIVE_METHOD_SLUG_AND_TAG,
  labels: {
    singular: COLLABORATIVE_METHOD_BLOCK_LABEL,
    plural: COLLABORATIVE_METHOD_BLOCK_LABEL,
  },
  admin: {
    group: SOLUTION,
  },
  imageURL: COLLABORATIVE_METHOD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${COLLABORATIVE_METHOD_BLOCK_LABEL} preview`,
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
      fields: [BgColorAndSectionIdField({ defaultBackground: 'white-1' })],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Manage the section tag and heading text. CTA is disabled for this block.',
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
      name: 'collaborativeMethodInfo',
      type: 'group',
      label: 'Collaborative Method Info',
      admin: {
        description:
          'Manage the main image, description, designer information and builder information.',
      },
      fields: [
        ...mainImageFields,

        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          required: true,
          admin: {
            description:
              'Write the collaborative method description shown on the left side of the section.',
          },
        },

        {
          name: 'designer',
          type: 'group',
          label: 'Designer',
          fields: [
            ...designerIconFields,
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'DESIGNER',
              maxLength: DESCRIPTION_ICON_TITLE_MAX,
              validate: validateShortText('Designer Title', DESCRIPTION_ICON_TITLE_MAX, true),
              admin: {
                description: `Example: DESIGNER. Max ${DESCRIPTION_ICON_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle',
              required: true,
              defaultValue: 'Visual Storytelling',
              maxLength: DESCRIPTION_ICON_SUBTITLE_MAX,
              validate: validateShortText('Designer Subtitle', DESCRIPTION_ICON_SUBTITLE_MAX, true),
              admin: {
                description: `Example: Visual Storytelling. Max ${DESCRIPTION_ICON_SUBTITLE_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'builder',
          type: 'group',
          label: 'Builder',
          fields: [
            ...builderIconFields,
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              defaultValue: 'BUILDER',
              maxLength: DESCRIPTION_ICON_TITLE_MAX,
              validate: validateShortText('Builder Title', DESCRIPTION_ICON_TITLE_MAX, true),
              admin: {
                description: `Example: BUILDER. Max ${DESCRIPTION_ICON_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle',
              required: true,
              defaultValue: 'Rapid Prototyping',
              maxLength: DESCRIPTION_ICON_SUBTITLE_MAX,
              validate: validateShortText('Builder Subtitle', DESCRIPTION_ICON_SUBTITLE_MAX, true),
              admin: {
                description: `Example: Rapid Prototyping. Max ${DESCRIPTION_ICON_SUBTITLE_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CollaborativeMethodSchema
