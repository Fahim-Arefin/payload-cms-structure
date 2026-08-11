import type { Block } from 'payload'

import { COMMON, FAQ_BLOCK_LABEL, FAQ_BLOCK_THUMBNAIL_URL, FAQ_SLUG_AND_TAG } from '@/lib/constants'

import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 90

const CTO_NAME_MAX = 80
const CTO_DESIGNATION_MAX = 120
const CTO_DESCRIPTION_MAX = 300
const BUTTON_LABEL_MAX = 40

const QUESTION_MAX = 160
const ANSWER_MAX = 800

const FAQSchema: Block = {
  slug: FAQ_SLUG_AND_TAG,

  labels: {
    singular: FAQ_BLOCK_LABEL,
    plural: FAQ_BLOCK_LABEL,
  },

  admin: {
    group: COMMON,
  },

  imageURL: FAQ_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FAQ_BLOCK_LABEL} preview`,

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
          defaultBackground: 'white-2',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Main FAQ intro heading, highlighted text and description.',
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
      name: 'ctoInfo',
      type: 'group',
      label: 'CTO Info Card',
      admin: {
        description: 'Right side CTO/help card with image, name, designation, description and CTA.',
      },
      fields: [
        ...generateImageFields({
          fieldName: 'image',
          label: 'CTO Image',
          description: 'Upload CTO/person image. Recommended transparent PNG or square portrait.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 400,
          required: true,
          ownerCollection: FAQ_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
              maxLength: CTO_NAME_MAX,
              validate: validateShortText('CTO Name', CTO_NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Example: Fahim Islam Mohip. Max ${CTO_NAME_MAX} characters.`,
              },
            },
            {
              name: 'designation',
              type: 'text',
              label: 'Designation',
              required: true,
              maxLength: CTO_DESIGNATION_MAX,
              validate: validateShortText('CTO Designation', CTO_DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `Example: CTO & Managing Director. Max ${CTO_DESIGNATION_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          maxLength: CTO_DESCRIPTION_MAX,
          validate: validateShortText('CTO Description', CTO_DESCRIPTION_MAX, true),
          admin: {
            description: `Short help card description. Max ${CTO_DESCRIPTION_MAX} characters.`,
          },
        },

        {
          type: 'row',
          fields: [
            {
              name: 'buttonLabel',
              type: 'text',
              label: 'Button Label',
              required: true,
              defaultValue: 'Contact Us',
              maxLength: BUTTON_LABEL_MAX,
              validate: validateShortText('Button Label', BUTTON_LABEL_MAX, true),
              admin: {
                width: '33.33%',
                description: `Example: Contact Us. Max ${BUTTON_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              required: false,
              admin: {
                width: '33.33%',
                description: 'Pick an internal Page for the button. External URLs are not allowed.',
              },
            },
            {
              name: 'sectionId',
              type: 'text',
              label: 'Section ID (anchor)',
              required: false,
              admin: {
                width: '33.33%',
                description:
                  'Optional direct jump section ID. No spaces. Use "-" to separate words.',
              },
              validate: validateSectionIdOptional,
            },
          ],
        },
      ],
    },

    {
      name: 'qaGroup',
      type: 'group',
      label: 'Questions & Answers',
      admin: {
        description: 'Add FAQ questions and answers shown in accordion list.',
      },
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'FAQ Items',
          required: true,
          minRows: 1,
          maxRows: 20,
          labels: {
            singular: 'FAQ Item',
            plural: 'FAQ Items',
          },
          admin: {
            description: 'Add FAQ question and answer items.',
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              label: 'Question',
              required: true,
              maxLength: QUESTION_MAX,
              validate: validateShortText('FAQ Question', QUESTION_MAX, true),
              admin: {
                description: `Example: What Does XynoLab Do? Max ${QUESTION_MAX} characters.`,
              },
            },
            {
              name: 'answer',
              type: 'textarea',
              label: 'Answer',
              required: true,
              maxLength: ANSWER_MAX,
              validate: validateShortText('FAQ Answer', ANSWER_MAX, true),
              admin: {
                description: `FAQ answer text. Max ${ANSWER_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default FAQSchema
