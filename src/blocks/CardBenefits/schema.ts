import type { Block, Field } from 'payload'
import { CARD_BENEFITS_SLUG_AND_TAG } from '@/lib/constants'
import { validateSectionIdOptional } from '@/utils/block/fields-validation'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'

const cardImageFields = (fieldName: string, label: string) =>
  generateImageFields({
    fieldName,
    label,
    description: 'Transparent card artwork. Crop ratio: 726:1146.',
    aspectRatio: 726 / 1146,
    quality: 0.95,
    maxKB: 1000,
    required: false,
    ownerCollection: CARD_BENEFITS_SLUG_AND_TAG,
  })

const benefitFields = (): Field[] => [
  ...generateArrayImageFields({
    fieldName: 'image',
    label: 'Benefit Image',
    description:
      'Use the nearly square 2.png reference ratio, 967:975. Recommended size: 1934 x 1950 px. Keep the subject in the upper portion and the lower portion dark for readable text.',
    aspectRatio: 967 / 975,
    quality: 0.95,
    maxKB: 1500,
    ownerCollection: CARD_BENEFITS_SLUG_AND_TAG,
  }),
  { name: 'title', label: 'Card Title', type: 'text', required: true, maxLength: 70 },
  { name: 'description', type: 'textarea', required: true, maxLength: 220 },
  { name: 'infoText', label: 'Below Info Text', type: 'text', required: true, maxLength: 70 },
]

const CardBenefitsSchema: Block = {
  slug: CARD_BENEFITS_SLUG_AND_TAG,
  labels: { singular: 'Card Benefits', plural: 'Card Benefits' },
  admin: { group: 'Cards' },
  imageURL: '/assets/block-thumbnails/card-benefits-block-thumbnail.svg',
  imageAltText: 'Card Benefits carousel preview',
  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },
    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Site / Section Settings',
      fields: [
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (anchor)',
          validate: validateSectionIdOptional,
        },
      ],
    },
    ...generateImageFields({
      fieldName: 'groovyDesign',
      label: 'Groovy Background Image',
      description: 'Optional transparent pattern over the Dora light. Crop ratio: 4:3.',
      aspectRatio: 4 / 3,
      quality: 0.95,
      maxKB: 1500,
      required: false,
      ownerCollection: CARD_BENEFITS_SLUG_AND_TAG,
    }),
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Explore a world of',
      maxLength: 80,
      admin: {
        description: 'The selected card name and the static word “benefits.” follow this text.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 300,
      defaultValue:
        'Privileges, each negotiated with our hospitality partners, keeping you in mind.',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Metal Card',
          fields: [
            {
              name: 'metalCardName',
              type: 'text',
              required: true,
              defaultValue: 'METAL CARDS',
              maxLength: 40,
            },
            ...cardImageFields('metalCardImage', 'Metal Card Image'),
            {
              name: 'metalBenefits',
              label: 'Metal Card Benefits',
              type: 'array',
              required: true,
              minRows: 3,
              maxRows: 12,
              admin: {
                description:
                  'Initial order: 1 = front, 2 = lower right, 3 = lower left. Scrolling cycles through all benefits.',
              },
              fields: benefitFields(),
            },
          ],
        },
        {
          label: 'Visa Infinite',
          fields: [
            {
              name: 'visaCardName',
              type: 'text',
              required: true,
              defaultValue: 'VISA CARDS',
              maxLength: 40,
            },
            ...cardImageFields('visaCardImage', 'Visa Infinite Card Image'),
            {
              name: 'visaBenefits',
              label: 'Visa Infinite Benefits',
              type: 'array',
              required: true,
              minRows: 3,
              maxRows: 12,
              admin: {
                description:
                  'Initial order: 1 = front, 2 = lower right, 3 = lower left. Scrolling cycles through all benefits.',
              },
              fields: benefitFields(),
            },
          ],
        },
      ],
    },
  ],
}

export default CardBenefitsSchema
