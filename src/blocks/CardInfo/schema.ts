import type { Block } from 'payload'
import {
  CARD_INFO_BLOCK_LABEL,
  CARD_INFO_BLOCK_THUMBNAIL_URL,
  CARD_INFO_SLUG_AND_TAG,
} from '@/lib/constants'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import {
  validateCardChoices,
  validateCardKey,
  validateDefaultCardKey,
} from '../CardCardPrivileges/cardSelection'

const CardInfoSchema: Block = {
  slug: CARD_INFO_SLUG_AND_TAG,
  labels: { singular: CARD_INFO_BLOCK_LABEL, plural: CARD_INFO_BLOCK_LABEL },
  admin: { group: 'Cards' },
  imageURL: CARD_INFO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CARD_INFO_BLOCK_LABEL} preview`,
  fields: [
    ...generateImageFields({
      required: false,
      fieldName: 'groovyDesign',
      label: 'Groovy Background Image',
      description: 'Optional transparent background pattern. Crop ratio: 4:3.',
      aspectRatio: 4 / 3,
      quality: 0.95,
      maxKB: 1000,
      ownerCollection: CARD_INFO_SLUG_AND_TAG,
    }),
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
    {
      name: 'content',
      type: 'group',
      label: 'Card Information',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Welcome',
          maxLength: 80,
          validate: validateShortText('Title', 80, true),
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'to a card made to last.',
          maxLength: 120,
          validate: validateShortText('Subtitle', 120, true),
        },
        { name: 'description', type: 'richText', required: true },
      ],
    },
    {
      name: 'cardSelector',
      type: 'group',
      label: 'Card Selector',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Selector Title',
          required: true,
          defaultValue: 'Choose Your Card',
          maxLength: 80,
          validate: validateShortText('Selector Title', 80, true),
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      validate: validateCardChoices,
      admin: {
        description:
          'Add any number of cards. Use the same card key in navbar anchors and Card Privileges.',
      },
      fields: [
        { name: 'cardName', type: 'text', required: true, maxLength: 50 },
        {
          name: 'cardKey',
          type: 'text',
          label: 'Card Key / Navbar Anchor',
          required: true,
          maxLength: 80,
          validate: validateCardKey,
          admin: {
            description:
              'Unique, case-sensitive key, for example platinum. Set the navbar link to #platinum.',
          },
        },
        ...generateImageFields({
          fieldName: 'cardImage',
          label: 'Card Image',
          required: true,
          description: 'Transparent card artwork. Crop ratio: 726:1146.',
          aspectRatio: 726 / 1146,
          quality: 0.95,
          maxKB: 800,
          ownerCollection: CARD_INFO_SLUG_AND_TAG,
        }),
        { name: 'buttonLabel', type: 'text', required: true, maxLength: 50 },
        {
          name: 'buttonLink',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Link To Page',
          admin: {
            description:
              'Leave empty to select this card on the current page, or choose a destination page.',
          },
        },
        {
          name: 'legacyCardType',
          type: 'select',
          options: ['worldElite', 'visaInfinite'],
          admin: { hidden: true },
        },
      ],
    },
    {
      name: 'defaultCardKey',
      type: 'text',
      label: 'Default Card Key',
      validate: (value: unknown, { siblingData }: { siblingData?: { cards?: unknown } }) =>
        validateDefaultCardKey(value, siblingData?.cards),
      admin: {
        description: 'Optional. Must match a card key above. Leave empty to select the first card.',
      },
    },
  ],
}
export default CardInfoSchema
