import type { Block } from 'payload'

import {
  HOME_PAGE,
  PROJECT_APPROACH_BLOCK_LABEL,
  PROJECT_APPROACH_BLOCK_THUMBNAIL_URL,
  PROJECT_APPROACH_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const APPROACH_TITLE_MAX = 80

const ProjectApproachSchema: Block = {
  slug: PROJECT_APPROACH_SLUG_AND_TAG,
  labels: {
    singular: PROJECT_APPROACH_BLOCK_LABEL,
    plural: PROJECT_APPROACH_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: PROJECT_APPROACH_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PROJECT_APPROACH_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-2',
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
      name: 'projectApproach',
      type: 'group',
      label: 'Project Approach',
      admin: {
        description: 'Add the project approach steps/items shown in this section.',
      },
      fields: [
        {
          name: 'approachItems',
          type: 'array',
          label: 'Project Approach Items',
          required: true,
          minRows: 1,
          maxRows: 6,
          labels: {
            singular: 'Approach Item',
            plural: 'Approach Items',
          },
          admin: {
            description: 'Add project approach items. Each item has a title and description.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              maxLength: APPROACH_TITLE_MAX,
              validate: validateShortText('Title', APPROACH_TITLE_MAX, true),
              admin: {
                description: `Approach item title. Max ${APPROACH_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              required: false,
              admin: {
                description: 'Write the approach item description.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default ProjectApproachSchema
