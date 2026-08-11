import type { Block } from 'payload'

import {
  PRODUCTION_PIPELINE_BLOCK_LABEL,
  PRODUCTION_PIPELINE_BLOCK_THUMBNAIL_URL,
  PRODUCTION_PIPELINE_SLUG_AND_TAG,
  SOLUTION,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 90
const PIPELINE_TITLE_MAX = 60
const PIPELINE_DESCRIPTION_MAX = 220

const pipelineIconFields = [
  ...generateArrayImageFields({
    required: false,
    fieldName: 'iconColored',
    label: 'Icon Colored',
    description: 'Upload the colored pipeline icon. Recommended transparent PNG/WebP.',
    aspectRatio: 1 / 1,
    quality: 0.9,
    maxKB: 80,
    ownerCollection: PRODUCTION_PIPELINE_SLUG_AND_TAG as any,
  } as any),

  ...generateArrayImageFields({
    required: false,
    fieldName: 'iconWhite',
    label: 'Icon White',
    description: 'Upload the white pipeline icon for active/hover state.',
    aspectRatio: 1 / 1,
    quality: 0.9,
    maxKB: 80,
    ownerCollection: PRODUCTION_PIPELINE_SLUG_AND_TAG as any,
  } as any),
]

const ProductionPipelineSchema: Block = {
  slug: PRODUCTION_PIPELINE_SLUG_AND_TAG,
  labels: {
    singular: PRODUCTION_PIPELINE_BLOCK_LABEL,
    plural: PRODUCTION_PIPELINE_BLOCK_LABEL,
  },
  admin: {
    group: SOLUTION,
  },
  imageURL: PRODUCTION_PIPELINE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCTION_PIPELINE_BLOCK_LABEL} preview`,
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
      fields: [BgColorAndSectionIdField({ defaultBackground: 'white-2' })],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the production pipeline tag, heading, description, CTA button and downloadable case study.',
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
          ctaMaxRows: 1,
          includeHeading3: false,
          includeDownloadButton: true,
          downloadButtonLabelMax: 40,
        }),
      ],
    },

    {
      name: 'pipeline',
      type: 'group',
      label: 'Production Pipeline',
      admin: {
        description:
          'Manage the implementation pathway timeline items. Items will alternate left and right on the frontend based on their order.',
      },
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Pipeline Items',
          minRows: 1,
          maxRows: 8,
          admin: {
            description:
              'Add pipeline steps like Discovery, Strategy & Planning, UI/UX Design, Development, Testing & QA, Launch & Support.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              maxLength: PIPELINE_TITLE_MAX,
              validate: validateShortText('Pipeline Title', PIPELINE_TITLE_MAX, true),
              admin: {
                description: `Example: Discovery. Max ${PIPELINE_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              maxLength: PIPELINE_DESCRIPTION_MAX,
              validate: validateShortText('Pipeline Description', PIPELINE_DESCRIPTION_MAX, true),
              admin: {
                description: `Short description for this pipeline step. Max ${PIPELINE_DESCRIPTION_MAX} characters.`,
              },
            },
            {
              name: 'icon',
              type: 'group',
              label: 'Icon',
              fields: [...pipelineIconFields],
            },
          ],
        },
      ],
    },
  ],
}

export default ProductionPipelineSchema
