import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import type { Field } from 'payload'

type Args = {
  ownerCollection: any
  name?: string
  label?: string
  minRows?: number
  maxRows?: number
  titleMax?: number
  keyPointMax?: number
  keyPointMinRows?: number
  keyPointMaxRows?: number
}

export const Card04Field = ({
  name = 'cards04',
  label = 'Cards (Type 04)',
  minRows = 1,
  maxRows = 8,
  titleMax = 120,
}: Args): Field => {
  return {
    name,
    type: 'array',
    required: true,
    minRows,
    maxRows,
    label,
    labels: { singular: 'Card', plural: 'Cards' },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'year',
            type: 'text',
            required: true,
            label: 'Year',
            maxLength: titleMax,
            validate: validateShortText('Year', titleMax, true),
            admin: { width: '50%' },
          },
          {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            maxLength: titleMax,
            validate: validateShortText('Title', titleMax, true),
            admin: { width: '50%' },
          },
          {
            name: 'description',
            type: 'text',
            required: true,
            label: 'Description',
            admin: {
              width: '100%',
              description: 'Write the description.',
            },
          },
        ],
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
            name: 'sectionId',
            type: 'text',
            label: 'Section ID (anchor)',
            required: false,
            admin: {
              width: '50%',
              description:
                'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
            },
            validate: validateSectionIdOptional,
          },
        ],
      },
    ],
  }
}
