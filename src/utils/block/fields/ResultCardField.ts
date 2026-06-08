import type { Field } from 'payload'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'

type Args = {
  name?: string
  label?: string
  minRows?: number
  maxRows?: number
  titleMax?: number
  subtitleMax?: number
}

export const ResultCardField = ({
  name = 'cards',
  label = 'Result Cards',
  minRows = 1,
  maxRows = 10,
  titleMax = 90,
  subtitleMax = 90,
}: Args = {}): Field => {
  return {
    name,
    type: 'array',
    required: true,
    minRows,
    maxRows,
    label,
    labels: {
      singular: 'Card',
      plural: 'Cards',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            maxLength: titleMax,
            validate: validateShortText('Title', titleMax, true),
            admin: {
              width: '50%',
            },
          },
          {
            name: 'subtitle',
            type: 'text',
            required: false,
            label: 'Subtitle',
            maxLength: subtitleMax,
            validate: validateShortText('Subtitle', subtitleMax, false),
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        name: 'cardDescription',
        type: 'richText',
        required: true,
        label: 'Card Description',
        admin: {
          description: 'Write the card description.',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'buttonLink',
            label: 'Link to (internal page)',
            type: 'relationship',
            relationTo: 'pages',
            required: false,
            admin: {
              width: '50%',
              description:
                'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
            },
          },
          {
            name: 'buttonSectionId',
            type: 'text',
            label: 'Section ID (anchor)',
            required: false,
            admin: {
              width: '50%',
              description:
                'Used for direct jump links to this section (e.g., "blog-section"). No spaces. Use "-" to separate words.',
            },
            validate: validateSectionIdOptional,
          },
        ],
      },
    ],
  }
}
