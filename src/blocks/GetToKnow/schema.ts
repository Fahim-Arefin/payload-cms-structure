import type { Block } from 'payload'

import {
  GET_TO_KNOW_BLOCK_LABEL,
  GET_TO_KNOW_BLOCK_THUMBNAIL_URL,
  GET_TO_KNOW_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import {
  validateHighlightedInField,
  validateShortText,
  validateYouTubeUrl,
} from '@/utils/block/fields-validation'

import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { Card01Field } from '@/utils/block/fields/Card01Field'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 160
const HIGHLIGHT_MAX = 80
const CARD_TEXT_MAX = 120
const URL_MAX = 300

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

    BgColorAndSectionIdField({ defaultBackground: '#E7E7EE' }),

    // ===== Main Image (right media) =====
    ...generateArrayImageFields({
      fieldName: 'mainImage',
      label: 'Thumbnail Image',
      description: 'Upload the thumbnail (right-side) image.',
      aspectRatio: 316 / 543,
      quality: 0.9,
      maxKB: 500,
      ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
    } as any),

    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      label: 'YouTube URL',
      maxLength: URL_MAX,
      validate: validateYouTubeUrl(URL_MAX, true),
      admin: {
        description:
          'Paste a YouTube link (watch, share, or embed). Example: https://www.youtube.com/watch?v=XXXX or https://youtu.be/XXXX',
      },
      defaultValue: 'https://www.youtube.com/embed/nOI5Hzb8bMI?si=OUiIVpGF91LJG-qL',
    },

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

    // ===== CTA Buttons (array format, exactly like the block fields) =====
    CtaButtonsField({ maxRows: 1 }),

    // ===== Cards =====
    // {
    //   name: 'cards',
    //   type: 'array',
    //   required: true,
    //   minRows: 1,
    //   maxRows: 8,
    //   label: 'Cards',
    //   labels: { singular: 'Card', plural: 'Cards' },
    //   fields: [
    //     // ✅ icons array (multiple icons)
    //     {
    //       name: 'icons',
    //       type: 'array',
    //       required: false,
    //       minRows: 0,
    //       maxRows: 4,
    //       label: 'Icons (optional)',
    //       labels: { singular: 'Icon', plural: 'Icons' },
    //       fields: [
    //         ...generateArrayImageFields({
    //           fieldName: 'icon',
    //           label: 'Icon',
    //           description: 'Square icon (1:1).',
    //           aspectRatio: 1 / 1,
    //           quality: 0.9,
    //           maxKB: 200,
    //           required: false,
    //           ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
    //         } as any),
    //       ],
    //     },

    //     {
    //       name: 'showCardNumber',
    //       type: 'checkbox',
    //       defaultValue: true,
    //     },

    //     // title (required)
    //     {
    //       name: 'title',
    //       type: 'text',
    //       required: true,
    //       label: 'Title',
    //       maxLength: CARD_TEXT_MAX,
    //       validate: validateShortText('Title', CARD_TEXT_MAX, true),
    //     },

    //     // subtitle (optional)
    //     {
    //       name: 'subtitle',
    //       type: 'text',
    //       required: false,
    //       label: 'Subtitle',
    //       maxLength: CARD_TEXT_MAX,
    //       validate: validateShortText('Subtitle', CARD_TEXT_MAX, false),
    //     },

    //     // tertiary title (optional)
    //     {
    //       name: 'tertiaryTitle',
    //       type: 'text',
    //       required: false,
    //       label: 'Tertiary Title',
    //       maxLength: CARD_TEXT_MAX,
    //       validate: validateShortText('tertiaryTitle', CARD_TEXT_MAX, false),
    //     },

    //     // description (optional)
    //     {
    //       name: 'description',
    //       type: 'richText',
    //       label: 'Description',
    //     },

    //     // bg image (optional)
    //     ...generateArrayImageFields({
    //       fieldName: 'bgImage',
    //       label: 'Background Image (optional)',
    //       description: 'Optional background image for the card.',
    //       aspectRatio: 16 / 9,
    //       quality: 0.9,
    //       maxKB: 700,
    //       required: false,
    //       ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
    //     } as any),

    //     // spark image
    //     {
    //       name: 'showSparkImage',
    //       type: 'checkbox',
    //       defaultValue: false,
    //     },
    //   ],
    // },
    // ===== Cards =====
    Card01Field({
      ownerCollection: GET_TO_KNOW_SLUG_AND_TAG as any,
      minRows: 1,
      maxRows: 8,
      cardTextMax: CARD_TEXT_MAX,
      maxIcons: 4,
    }),
  ],
}

export default GetToKnowSchema
