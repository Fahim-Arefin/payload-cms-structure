import type { Field } from 'payload'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

type Args = {
  ownerCollection: any
  name?: string
  label?: string
  minRows?: number
  maxRows?: number
  titleMax?: number
}

export const Card02Field = ({
  ownerCollection,
  name = 'cards02',
  label = 'Cards (Type 02)',
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
      // ✅ required icon (single)
      ...generateArrayImageFields({
        fieldName: 'icon',
        label: 'Icon (required)',
        description:
          'Required. Upload icon (PNG/SVG) with transparent background (no background). 1:1.',
        aspectRatio: 1 / 1,
        quality: 0.9,
        maxKB: 200,
        required: true,
        ownerCollection,
      } as any),

      // ✅ title + (required) description
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
            admin: { width: '50%' },
          },
          {
            name: 'description',
            type: 'richText',
            required: true,
            label: 'Description',
            admin: {
              width: '50%',
              description: 'Write the description (you can add multiple paragraphs).',
            },
          },
        ],
      },

      // ✅ optional internal link
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
