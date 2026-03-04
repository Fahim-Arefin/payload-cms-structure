import type { Field } from 'payload'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

type BuildCardsFieldArgs = {
  ownerCollection: any
  name?: string
  label?: string
  minRows?: number
  maxRows?: number
  cardTextMax?: number
  maxIcons?: number
}

export const Card01Field = ({
  ownerCollection,
  name = 'cards',
  label = 'Cards',
  minRows = 1,
  maxRows = 8,
  cardTextMax = 120,
  maxIcons = 4,
}: BuildCardsFieldArgs): Field => {
  return {
    name,
    type: 'array',
    required: true,
    minRows,
    maxRows,
    label,
    labels: { singular: 'Card', plural: 'Cards' },
    fields: [
      // ✅ icons array (multiple icons)
      {
        name: 'icons',
        type: 'array',
        required: false,
        minRows: 0,
        maxRows: maxIcons,
        label: 'Icons (optional)',
        labels: { singular: 'Icon', plural: 'Icons' },
        fields: [
          ...generateArrayImageFields({
            fieldName: 'icon',
            label: 'Icon',
            description: 'Square icon (1:1).',
            aspectRatio: 1 / 1,
            quality: 0.9,
            maxKB: 200,
            required: false,
            ownerCollection,
          } as any),
        ],
      },

      {
        name: 'showCardNumber',
        type: 'checkbox',
        defaultValue: true,
      },

      // title (required)
      {
        name: 'title',
        type: 'text',
        required: true,
        label: 'Title',
        maxLength: cardTextMax,
        validate: validateShortText('Title', cardTextMax, true),
      },

      // subtitle (optional)
      {
        name: 'subtitle',
        type: 'text',
        required: false,
        label: 'Subtitle',
        maxLength: cardTextMax,
        validate: validateShortText('Subtitle', cardTextMax, false),
      },

      // tertiary title (optional)
      {
        name: 'tertiaryTitle',
        type: 'text',
        required: false,
        label: 'Tertiary Title',
        maxLength: cardTextMax,
        validate: validateShortText('tertiaryTitle', cardTextMax, false),
      },

      // description (optional)
      {
        name: 'description',
        type: 'richText',
        label: 'Description',
      },

      // bg image (optional)
      ...generateArrayImageFields({
        fieldName: 'bgImage',
        label: 'Background Image (optional)',
        description: 'Optional background image for the card.',
        aspectRatio: 16 / 9,
        quality: 0.9,
        maxKB: 700,
        required: false,
        ownerCollection,
      } as any),

      // spark image
      {
        name: 'showSparkImage',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  }
}
