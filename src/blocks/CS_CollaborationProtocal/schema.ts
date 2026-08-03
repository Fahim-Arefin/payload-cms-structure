import type { Block } from 'payload'

import {
  CASE_STUDY,
  CS_COLLABORATION_PROTOCAL_BLOCK_LABEL,
  CS_COLLABORATION_PROTOCAL_BLOCK_THUMBNAIL_URL,
  CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 120

const FEATURE_TITLE_MAX = 80

const CSCollaborationProtocalSchema: Block = {
  slug: CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG,

  labels: {
    singular: CS_COLLABORATION_PROTOCAL_BLOCK_LABEL,
    plural: CS_COLLABORATION_PROTOCAL_BLOCK_LABEL,
  },

  admin: {
    group: CASE_STUDY,
  },

  imageURL: CS_COLLABORATION_PROTOCAL_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CS_COLLABORATION_PROTOCAL_BLOCK_LABEL} preview`,

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
          'Top section heading. Example: tag, "02. One Team With Our Clients", and short description.',
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
      name: 'protocolInfo',
      type: 'group',
      label: 'Protocol Info',
      admin: {
        description: 'Feature items and main image for the collaboration protocol section.',
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
            description: 'Add feature items. Example: Radical Transparency, Feedback Loops.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              maxLength: FEATURE_TITLE_MAX,
              validate: validateShortText('Feature Title', FEATURE_TITLE_MAX, true),
              admin: {
                description: `Feature title. Example: 01. Radical Transparency. Max ${FEATURE_TITLE_MAX} characters.`,
              },
            },

            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              required: true,
              admin: {
                description: 'Feature description rich text.',
              },
            },
          ],
        },

        ...generateImageFields({
          fieldName: 'image',
          label: 'Main Image',
          description:
            'Upload collaboration protocol image. Recommended wide image. Aspect ratio 1200:425.',
          aspectRatio: 1200 / 425,
          quality: 0.9,
          maxKB: 700,
          required: true,
          ownerCollection: CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG as any,
        } as any),
      ],
    },
  ],
}

export default CSCollaborationProtocalSchema
