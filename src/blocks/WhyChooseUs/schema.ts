import type { Block } from 'payload'

import {
  SOLUTION,
  WHY_CHOOSE_US_BLOCK_LABEL,
  WHY_CHOOSE_US_BLOCK_THUMBNAIL_URL,
  WHY_CHOOSE_US_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

const TAG_MAX = 40
const HEADING_MAX = 90
const CRITERIA_TEXT_MAX = 90

const WhyChooseUsSchema: Block = {
  slug: WHY_CHOOSE_US_SLUG_AND_TAG,
  labels: {
    singular: WHY_CHOOSE_US_BLOCK_LABEL,
    plural: WHY_CHOOSE_US_BLOCK_LABEL,
  },
  admin: {
    group: SOLUTION,
  },
  imageURL: WHY_CHOOSE_US_BLOCK_THUMBNAIL_URL,
  imageAltText: `${WHY_CHOOSE_US_BLOCK_LABEL} preview`,
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
      fields: [BgColorAndSectionIdField({ defaultBackground: 'white-3' })],
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
      name: 'choosingCriteria',
      type: 'group',
      label: 'Choosing Criteria',
      admin: {
        description: 'Manage the why choose us criteria list.',
      },
      fields: [
        {
          name: 'criteria',
          type: 'array',
          label: 'Criteria',
          minRows: 1,
          maxRows: 20,
          admin: {
            description: 'Add criteria items like Custom Design, Fast Loading Performance, etc.',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Criteria Text',
              required: true,
              maxLength: CRITERIA_TEXT_MAX,
              validate: validateShortText('Criteria Text', CRITERIA_TEXT_MAX, true),
              admin: {
                description: `Example: Custom Design – No Generic Templates. Max ${CRITERIA_TEXT_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default WhyChooseUsSchema
