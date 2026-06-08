import type { Field } from 'payload'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { CtaButtonsField } from './CtaButtonsField'

type Args = {
  ownerCollection: any
  name?: string
  label?: string
  minRows?: number
  maxRows?: number
  titleMax?: number
}

export const Card05Field = ({
  ownerCollection,
  name = 'cards05',
  label = 'Cards (Type 05)',
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
          'Required. Upload icon (PNG/SVG) with transparent background (no background). 5:4.',
        aspectRatio: 5 / 4,
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

      CtaButtonsField({ minRows: 1, maxRows: 1 }),
    ],
  }
}
