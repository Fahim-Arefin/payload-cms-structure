import type { Block } from 'payload'
import { CARD_BENEFITS_SLUG_AND_TAG } from '@/lib/constants'
import { validateSectionIdOptional } from '@/utils/block/fields-validation'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
import {
  validateCardChoices,
  validateCardKey,
  validateDefaultCardKey,
} from '../CardCardPrivileges/cardSelection'

const CardBenefitsSchema: Block = {
  slug: CARD_BENEFITS_SLUG_AND_TAG,
  labels: { singular: 'Card Benefits', plural: 'Card Benefits' },
  admin: { group: 'Cards' },
  imageURL: '/assets/block-thumbnails/card-benefits-block-thumbnail.svg',
  imageAltText: 'Card Benefits stack preview',
  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },
    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
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
      description: 'Optional transparent pattern covering the entire section. Crop ratio: 4:3.',
      aspectRatio: 4 / 3,
      quality: 0.95,
      maxKB: 1500,
      required: false,
      ownerCollection: CARD_BENEFITS_SLUG_AND_TAG,
    }),
    {
      name: 'title',
      label: 'Title 1',
      type: 'text',
      required: true,
      defaultValue: 'Explore a world of',
      maxLength: 80,
      admin: {
        description:
          'Heading: Title 1 + the selected Card Name (Title 2) + the fixed word benefits. (Title 3).',
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
      name: 'cards',
      label: 'Cards',
      type: 'array',
      required: true,
      minRows: 1,
      validate: validateCardChoices,
      admin: {
        description:
          'Add any number of cards. Match Card Key to Card Info, Card Privileges and the navbar anchor.',
      },
      fields: [
        {
          name: 'cardName',
          label: 'Card Name / Title 2',
          type: 'text',
          required: true,
          maxLength: 80,
        },
        {
          name: 'cardKey',
          label: 'Card Key / Navbar Anchor',
          type: 'text',
          required: true,
          maxLength: 80,
          validate: validateCardKey,
        },
        ...generateImageFields({
          fieldName: 'cardImage',
          label: 'Card Image',
          description: 'Artwork beside the heading. Crop ratio: 726:1146.',
          aspectRatio: 726 / 1146,
          quality: 0.95,
          maxKB: 1000,
          required: false,
          ownerCollection: CARD_BENEFITS_SLUG_AND_TAG,
        }),
        {
          name: 'items',
          label: 'Benefits',
          type: 'array',
          required: true,
          minRows: 1,
          maxRows: 12,
          admin: {
            description:
              'The first benefit starts at the front. Scrolling moves the front benefit to the back of the stack.',
          },
          fields: [
            ...generateArrayImageFields({
              fieldName: 'image',
              label: 'Benefit Image',
              description:
                'Crop ratio: 967:975. The image fills the upper part of the benefit card.',
              aspectRatio: 967 / 975,
              quality: 0.95,
              maxKB: 1500,
              ownerCollection: CARD_BENEFITS_SLUG_AND_TAG,
            }),
            { name: 'title', label: 'Benefit Title', type: 'text', required: true, maxLength: 70 },
            { name: 'description', type: 'textarea', required: true, maxLength: 220 },
            {
              name: 'infoText',
              label: 'Below Info Text',
              type: 'text',
              required: true,
              maxLength: 70,
            },
          ],
        },
      ],
    },
    {
      name: 'defaultCardKey',
      label: 'Default Card Key',
      type: 'text',
      validate: (value: unknown, { siblingData }: { siblingData?: { cards?: unknown } }) =>
        validateDefaultCardKey(value, siblingData?.cards),
      admin: {
        description: 'Optional. Match a card key above, or leave empty to use the first card.',
      },
    },
  ],
}
export default CardBenefitsSchema
