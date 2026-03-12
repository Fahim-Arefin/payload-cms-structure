import type { Field } from 'payload'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
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
        type: 'row',
        fields: [
          {
            name: 'showCardNumber',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '33.33%',
            },
          },
          {
            name: 'showAnimation',
            type: 'checkbox',
            defaultValue: true,
            admin: {
              width: '33.33%',
            },
          },
          // spark image
          {
            name: 'showSparkImage',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              width: '33.33%',
            },
          },
        ],
      },

      {
        type: 'row',
        fields: [
          // title (required)
          {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            maxLength: cardTextMax,
            validate: validateShortText('Title', cardTextMax, true),
            admin: {
              width: '33.33%',
            },
          },

          // subtitle (optional)
          {
            name: 'subtitle',
            type: 'text',
            required: false,
            label: 'Subtitle',
            maxLength: cardTextMax,
            validate: validateShortText('Subtitle', cardTextMax, false),
            admin: {
              width: '33.33%',
            },
          },

          // tertiary title (optional)
          {
            name: 'tertiaryTitle',
            type: 'text',
            required: false,
            label: 'Tertiary Title',
            maxLength: cardTextMax,
            validate: validateShortText('tertiaryTitle', cardTextMax, false),
            admin: {
              width: '33.33%',
            },
          },
        ],
      },

      // description (optional)
      {
        name: 'description',
        type: 'richText',
        label: 'Description',
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
    ],
  }
}
