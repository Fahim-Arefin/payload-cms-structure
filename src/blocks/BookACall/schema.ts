import type { Block } from 'payload'

import {
  BOOK_A_CALL_BLOCK_LABEL,
  BOOK_A_CALL_BLOCK_THUMBNAIL_URL,
  BOOK_A_CALL_SLUG_AND_TAG,
  COMMON,
} from '@/lib/constants'

import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'

const TITLE_MAX = 90
const BUTTON_LABEL_MAX = 40

const backgroundColorOptions = [
  {
    label: 'White 1 (#FFFBFC)',
    value: 'white-1',
  },
  {
    label: 'White 2 (#F3F8F6)',
    value: 'white-2',
  },
  {
    label: 'White 3 (#F1F4EB)',
    value: 'white-3',
  },
  {
    label: 'Secondary 1 (#0A1128)',
    value: 'secondary-1',
  },
  {
    label: 'Secondary 2 (#0B0537)',
    value: 'secondary-2',
  },
  {
    label: 'Primary 1 / 30% (#006C67 30%)',
    value: 'primary-1-30',
  },
  {
    label: 'Primary 1 / 50% (#006C67 50%)',
    value: 'primary-1-50',
  },
]

const BookACallSchema: Block = {
  slug: BOOK_A_CALL_SLUG_AND_TAG,

  labels: {
    singular: BOOK_A_CALL_BLOCK_LABEL,
    plural: BOOK_A_CALL_BLOCK_LABEL,
  },

  admin: {
    group: COMMON,
  },

  imageURL: BOOK_A_CALL_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BOOK_A_CALL_BLOCK_LABEL} preview`,

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
      admin: {
        description:
          'Controls section ID and the two background colors. Top-to-mid color applies to the upper half, mid-to-bottom color applies to the lower half.',
      },
      fields: [
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID',
          required: false,
          admin: {
            description:
              'Optional section ID for anchor scrolling. No spaces. Use "-" to separate words.',
          },
          validate: validateSectionIdOptional,
        },

        {
          type: 'row',
          fields: [
            {
              name: 'topToMidBackgroundColor',
              type: 'select',
              label: 'Top To Mid Background Color',
              required: true,
              defaultValue: 'white-3',
              options: backgroundColorOptions,
              admin: {
                width: '50%',
                description: 'Background color from top to middle of the section.',
              },
            },
            {
              name: 'midToBottomBackgroundColor',
              type: 'select',
              label: 'Mid To Bottom Background Color',
              required: true,
              defaultValue: 'white-1',
              options: backgroundColorOptions,
              admin: {
                width: '50%',
                description: 'Background color from middle to bottom of the section.',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'bookCallInfo',
      type: 'group',
      label: 'Book A Call Info',
      admin: {
        description: 'Title, description and internal CTA button information.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            description: `Example: Ready To Optimize Your Business? Max ${TITLE_MAX} characters.`,
          },
        },

        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          required: true,
          admin: {
            description: 'Short supporting description.',
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
              defaultValue: 'Book A Free Call',
              maxLength: BUTTON_LABEL_MAX,
              validate: validateShortText('Button Label', BUTTON_LABEL_MAX, true),
              admin: {
                width: '33.33%',
                description: `Example: Book A Free Call. Max ${BUTTON_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              admin: {
                width: '33.33%',
                description: 'Pick an internal page for the button.',
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
  ],
}

export default BookACallSchema
