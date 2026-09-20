import type { Block, Field } from 'payload'
import {
  CARD_PRIVILEGES_SLUG_AND_TAG,
  CARD_PRIVILEGES_BLOCK_LABEL,
  CARD_PRIVILEGES_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'
import { validateSectionIdOptional } from '@/utils/block/fields-validation'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
import { validateCardChoices, validateCardKey, validateDefaultCardKey } from './cardSelection'

const cardsField: Field = {
  name: 'cards',
  label: 'Cards',
  type: 'array',
  required: true,
  minRows: 1,
  validate: validateCardChoices,
  admin: {
    description:
      'Add any number of cards. A navbar link ending in #card-key selects the matching card. The first card is the default unless a Default Card Key is set.',
  },
  fields: [
    { name: 'cardName', label: 'Card Name', type: 'text', required: true, maxLength: 80 },
    {
      name: 'cardKey',
      label: 'Card Key / Navbar Anchor',
      type: 'text',
      required: true,
      maxLength: 80,
      validate: validateCardKey,
      admin: {
        description:
          'Example: platinum. Set the navbar link to #platinum on this page. Keys are case-sensitive and must be unique within this block. For existing cards, use their Card Info section IDs.',
      },
    },
    {
      name: 'cardPreference',
      label: 'Appearance',
      type: 'select',
      required: true,
      defaultValue: 'left',
      options: [
        { label: 'Left — text left, image right', value: 'left' },
        { label: 'Right — text right, image left', value: 'right' },
      ],
      admin: {
        description: 'Desktop layout. Mobile and tablet always show the image above the text.',
      },
    },
    ...generateImageFields({
      fieldName: 'cardImage',
      label: 'Card Image',
      description: 'One card image beside the section title for this group. Crop ratio: 726:1146.',
      aspectRatio: 726 / 1146,
      quality: 0.95,
      maxKB: 800,
      ownerCollection: CARD_PRIVILEGES_SLUG_AND_TAG,
    }),
    {
      name: 'items',
      label: 'Carousel Items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        { name: 'sectionTitle', type: 'text', required: true, maxLength: 80 },
        { name: 'sectionSubtitle', type: 'text', required: true, maxLength: 60 },
        { name: 'cardTitle', type: 'text', required: true, maxLength: 80 },
        { name: 'cardSubtitle', type: 'text', required: true, maxLength: 120 },
        { name: 'privilegesName', type: 'text', required: true, maxLength: 90 },
        { name: 'privilegesDescription', type: 'textarea', required: true, maxLength: 350 },
        ...generateArrayImageFields({
          fieldName: 'privilegesImage',
          label: 'Privileges Image',
          description: 'Crop ratio: 841:412. Recommended size: 1682 x 824 px.',
          aspectRatio: 841 / 412,
          quality: 0.95,
          maxKB: 1500,
          ownerCollection: CARD_PRIVILEGES_SLUG_AND_TAG,
        }),
      ],
    },
  ],
}

const CardPrivilegesSchema: Block = {
  slug: CARD_PRIVILEGES_SLUG_AND_TAG,
  labels: { singular: CARD_PRIVILEGES_BLOCK_LABEL, plural: CARD_PRIVILEGES_BLOCK_LABEL },
  admin: { group: 'Cards' },
  imageURL: CARD_PRIVILEGES_BLOCK_THUMBNAIL_URL,
  imageAltText: 'Card Privileges carousel preview',
  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },
    {
      name: 'sectionSettings',
      label: 'Section Settings',
      type: 'group',
      fields: [
        {
          name: 'sectionId',
          label: 'Section ID (anchor)',
          type: 'text',
          validate: validateSectionIdOptional,
        },
      ],
    },
    ...generateImageFields({
      fieldName: 'groovyDesign',
      label: 'Groovy Background Image',
      description: 'Optional transparent background pattern, like Card Info. Crop ratio: 4:3.',
      aspectRatio: 4 / 3,
      quality: 0.95,
      maxKB: 1000,
      required: false,
      ownerCollection: CARD_PRIVILEGES_SLUG_AND_TAG,
    }),
    cardsField,
    {
      name: 'defaultCardKey',
      label: 'Default Card Key',
      type: 'text',
      validate: (value: unknown, { siblingData }: { siblingData?: { cards?: unknown } }) =>
        validateDefaultCardKey(value, siblingData?.cards),
      admin: {
        description:
          'Optional. Must match a Card Key above. Leave empty to show the first card by default.',
      },
    },
  ],
}

export default CardPrivilegesSchema
