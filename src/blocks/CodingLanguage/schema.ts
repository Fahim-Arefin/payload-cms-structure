import type { Block } from 'payload'

import {
  CODING_LANGUAGE_BLOCK_LABEL,
  CODING_LANGUAGE_BLOCK_THUMBNAIL_URL,
  CODING_LANGUAGE_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const STACK_NAME_MAX = 40

const CodingLanguageSchema: Block = {
  slug: CODING_LANGUAGE_SLUG_AND_TAG,

  labels: {
    singular: CODING_LANGUAGE_BLOCK_LABEL,
    plural: CODING_LANGUAGE_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: CODING_LANGUAGE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CODING_LANGUAGE_BLOCK_LABEL} preview`,

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
      name: 'languageImages',
      type: 'group',
      label: 'Language Images',
      admin: {
        description: 'Add coding stack logo images with stack name.',
      },
      fields: [
        {
          name: 'languages',
          type: 'array',
          label: 'Coding Stack Images',
          required: true,
          minRows: 1,
          maxRows: 30,
          labels: {
            singular: 'Coding Stack',
            plural: 'Coding Stacks',
          },
          admin: {
            description: 'Add up to 30 coding stack logos.',
          },
          fields: [
            {
              name: 'stackName',
              type: 'text',
              label: 'Stack Name',
              required: true,
              maxLength: STACK_NAME_MAX,
              validate: validateShortText('Stack Name', STACK_NAME_MAX, true),
              admin: {
                description: `Example: React, Next.js, Laravel. Max ${STACK_NAME_MAX} characters.`,
              },
            },

            ...generateArrayImageFields({
              fieldName: 'transparentColoredImage',
              label: 'Stack Colored Image',
              description:
                'Upload the colored version of the stack logo. Recommended square transparent PNG/SVG-like image.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 250,
              required: true,
              ownerCollection: CODING_LANGUAGE_SLUG_AND_TAG as any,
            } as any),
          ],
        },
      ],
    },
  ],
}

export default CodingLanguageSchema
