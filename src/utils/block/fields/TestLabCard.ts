import type { Field } from 'payload'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { CtaButtonsField } from './CtaButtonsField'

type Args = {
  ownerCollection: any
  name?: string
  label?: string
  minRows?: number
  maxRows?: number
  titleMax?: number
  iconMaxKB?: number
}

export const TestLabCardField = ({
  ownerCollection,
  name = 'testLabCards',
  label = 'Link Card',
  minRows = 0,
  maxRows = 1,
  titleMax = 120,
  iconMaxKB = 200,
}: Args): Field => {
  return {
    name,
    type: 'array',
    required: false,
    minRows,
    maxRows,
    label,
    labels: { singular: 'Test Lab Card', plural: 'Test Lab Cards' },
    admin: {
      description: 'Simple card for link to test lab result page.',
    },
    fields: [
      // ✅ Colored icon (required)
      ...generateArrayImageFields({
        fieldName: 'icon',
        label: 'Icon (Colored)',
        description:
          'Required. Upload a colored icon (PNG/SVG) with transparent background (no background). 1:1.',
        aspectRatio: 1 / 1,
        quality: 0.9,
        maxKB: iconMaxKB,
        required: true,
        ownerCollection,
      } as any),

      // ✅ White icon (required)
      ...generateArrayImageFields({
        fieldName: 'iconWhite',
        label: 'Icon (White)',
        description:
          'Required. Upload a white icon (PNG/SVG) with transparent background (no background). Used for dark/hover UI. 1:1.',
        aspectRatio: 1 / 1,
        quality: 0.9,
        maxKB: iconMaxKB,
        required: true,
        ownerCollection,
      } as any),

      {
        type: 'row',
        fields: [
          // title (required)
          {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Title',
            maxLength: titleMax,
            validate: validateShortText('Title', titleMax, true),
            admin: {
              width: '50%',
              description: `Max ${titleMax} characters.`,
            },
          },
          // subtitle (optional)
          {
            name: 'subtitle',
            type: 'text',
            required: false,
            label: 'Subtitle',
            maxLength: titleMax,
            validate: validateShortText('Subtitle', titleMax, false),
            admin: {
              width: '50%',
              description: `Max ${titleMax} characters.`,
            },
          },
        ],
      },
      // ===== CTA Buttons (array format, exactly like the block fields) =====
      CtaButtonsField({ minRows: 1, maxRows: 1, required: true }),
    ],
  }
}
