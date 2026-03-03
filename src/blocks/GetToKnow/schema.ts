import type { Block } from 'payload'

import {
  GET_TO_KNOW_BLOCK_LABEL,
  GET_TO_KNOW_BLOCK_THUMBNAIL_URL,
  GET_TO_KNOW_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { validateHighlightedInField, validateShortText } from '@/utils/block'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 160
const HIGHLIGHT_MAX = 80

// ✅ one constant to control card text max lengths
const CARD_TEXT_MAX = 120

const GetToKnowSchema: Block = {
  slug: GET_TO_KNOW_SLUG_AND_TAG,
  labels: {
    singular: GET_TO_KNOW_BLOCK_LABEL,
    plural: GET_TO_KNOW_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: GET_TO_KNOW_BLOCK_THUMBNAIL_URL,
  imageAltText: `${GET_TO_KNOW_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // ===== Main Image (right media) =====
    ...generateArrayImageFields({
      fieldName: 'mainImage',
      label: 'Main Image',
      description: 'Upload the main (right-side) image.',
      aspectRatio: 316 / 543,
      quality: 0.9,
      maxKB: 500,
      ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
    } as any),

    // ===== Tag =====
    {
      name: 'tag',
      type: 'text',
      required: false,
      label: 'Tag',
      maxLength: TAG_MAX,
      validate: validateShortText('Tag', TAG_MAX, false),
      admin: {
        description: `Small label above heading (e.g., "GET TO KNOW SAGAR"). Max ${TAG_MAX}.`,
      },
    },

    // ===== Heading + highlighted text =====
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          maxLength: HEADING_MAX,
          validate: validateShortText('Heading', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Main heading text. Max ${HEADING_MAX} characters.`,
          },
        },
        {
          name: 'headingHighlighted',
          type: 'text',
          required: false,
          label: 'Highlighted Text (within heading)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (Heading)',
            'heading',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must be inside Heading. Max ${HIGHLIGHT_MAX}.`,
          },
        },
      ],
    },

    // ===== Cards =====
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        // ✅ icons array (multiple icons)
        {
          name: 'icons',
          type: 'array',
          required: false,
          minRows: 0,
          maxRows: 4,
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
              ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
            } as any),
          ],
        },

        // title (required)
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: CARD_TEXT_MAX,
          validate: validateShortText('Title', CARD_TEXT_MAX, true),
        },

        // subtitle (optional)
        {
          name: 'subtitle',
          type: 'text',
          required: false,
          label: 'Subtitle',
          maxLength: CARD_TEXT_MAX,
          validate: validateShortText('Subtitle', CARD_TEXT_MAX, false),
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
          ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
        } as any),
      ],
    },
  ],
}

export default GetToKnowSchema
