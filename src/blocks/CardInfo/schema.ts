import type { Block } from 'payload'

import {
  CARD_INFO_BLOCK_LABEL,
  CARD_INFO_BLOCK_THUMBNAIL_URL,
  CARD_INFO_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const BUTTON_TITLE_MAX = 80
const BUTTON_LABEL_MAX = 50

/* =========================================================
   WORLD ELITE CARD

   Uploaded reference:
   726:1146 (recommended 726 x 1146)
========================================================= */

const worldEliteCardImageFields = generateImageFields({
  required: true,

  fieldName: 'cardImage',

  label: 'World Elite Card Image',

  description:
    'Upload the World Elite card image with transparent background. Crop ratio: 726:1146. Recommended size: 726 x 1146 px. Use Zoom and drag to make the card fill the frame consistently for both cards.',

  aspectRatio: 726 / 1146,

  quality: 0.95,

  maxKB: 800,

  ownerCollection: CARD_INFO_SLUG_AND_TAG as any,
} as any)

/* =========================================================
   VISA INFINITE CARD

   Uploaded reference:
   726:1146 (recommended 726 x 1146)
========================================================= */

const visaInfiniteCardImageFields = generateImageFields({
  required: true,

  fieldName: 'cardImage',

  label: 'Visa Infinite Card Image',

  description:
    'Upload the Visa Infinite card image with transparent background. Crop ratio: 726:1146. Recommended size: 726 x 1146 px. Use Zoom and drag to make the card fill the frame consistently for both cards.',

  aspectRatio: 726 / 1146,

  quality: 0.95,

  maxKB: 800,

  ownerCollection: CARD_INFO_SLUG_AND_TAG as any,
} as any)

/* =========================================================
   CARD INFO BLOCK
========================================================= */

const CardInfoSchema: Block = {
  slug: CARD_INFO_SLUG_AND_TAG,

  labels: {
    singular: CARD_INFO_BLOCK_LABEL,
    plural: CARD_INFO_BLOCK_LABEL,
  },

  admin: {
    group: 'Cards',
  },

  imageURL: CARD_INFO_BLOCK_THUMBNAIL_URL,

  imageAltText: `${CARD_INFO_BLOCK_LABEL} preview`,

  fields: [
    ...generateImageFields({
      required: false,
      fieldName: 'groovyDesign',
      label: 'Groovy Background Image',
      description:
        'Optional decorative background behind the card information. Crop ratio: 4:3. Recommended size: 1920 x 1440 px. Upload a transparent PNG or WebP. The image covers the section with centered cropping on different screen sizes.',
      aspectRatio: 4 / 3,
      quality: 0.95,
      maxKB: 1000,
      ownerCollection: CARD_INFO_SLUG_AND_TAG,
    }),
    /* =====================================================
       UPLOAD SESSION
    ===================================================== */

    {
      name: 'uploadSessionId',

      type: 'text',

      admin: {
        condition: () => false,
      },
    },

    /* =====================================================
       SECTION SETTINGS
    ===================================================== */

    {
      name: 'sectionSettings',

      type: 'group',

      label: 'Section Settings',

      fields: [
        {
          name: 'sectionId',

          type: 'text',

          label: 'Section ID (anchor)',

          required: false,

          validate: validateSectionIdOptional,

          admin: {
            description: 'Optional section ID for direct navigation. Example: card-info.',
          },
        },
      ],
    },

    /* =====================================================
       CONTENT
    ===================================================== */

    {
      name: 'content',

      type: 'group',

      label: 'Card Information',

      fields: [
        {
          name: 'title',

          type: 'text',

          label: 'Title',

          required: true,

          defaultValue: 'Welcome',

          maxLength: TITLE_MAX,

          validate: validateShortText('Title', TITLE_MAX, true),

          admin: {
            description: `Example: Welcome. Max ${TITLE_MAX} characters.`,
          },
        },

        {
          name: 'subtitle',

          type: 'text',

          label: 'Subtitle',

          required: true,

          defaultValue: 'to a card made to last.',

          maxLength: SUBTITLE_MAX,

          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),

          admin: {
            description: `Max ${SUBTITLE_MAX} characters.`,
          },
        },

        {
          name: 'description',

          type: 'richText',

          label: 'Description',

          required: true,

          admin: {
            description: 'Main descriptive copy displayed under the title and subtitle.',
          },
        },
      ],
    },

    /* =====================================================
       CARD SELECTOR
    ===================================================== */

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

          maxLength: BUTTON_TITLE_MAX,

          validate: validateShortText('Selector Title', BUTTON_TITLE_MAX, true),
        },

        /* =================================================
           DEFAULT CARD
        ================================================= */

        {
          name: 'defaultCard',

          type: 'select',

          label: 'Default Active Card',

          required: true,

          defaultValue: 'worldElite',

          options: [
            {
              label: 'World Elite',
              value: 'worldElite',
            },

            {
              label: 'Visa Infinite',
              value: 'visaInfinite',
            },
          ],

          admin: {
            description: 'Used when the URL does not contain either card section ID.',
          },
        },

        /* =================================================
           WORLD ELITE
        ================================================= */

        {
          name: 'worldElite',

          type: 'group',

          label: 'World Elite',

          fields: [
            {
              name: 'cardName',

              type: 'text',

              label: 'Card Name',

              required: true,

              defaultValue: 'World Elite',

              maxLength: BUTTON_LABEL_MAX,

              validate: validateShortText('World Elite Card Name', BUTTON_LABEL_MAX, true),
            },

            ...worldEliteCardImageFields,

            {
              type: 'row',

              fields: [
                {
                  name: 'buttonLabel',

                  type: 'text',

                  label: 'Button Label',

                  required: true,

                  defaultValue: 'World Elite',

                  maxLength: BUTTON_LABEL_MAX,

                  validate: validateShortText('World Elite Button Label', BUTTON_LABEL_MAX, true),

                  admin: {
                    width: '50%',
                  },
                },

                {
                  name: 'buttonLink',

                  type: 'relationship',

                  relationTo: 'pages',

                  label: 'Link To Page',

                  required: true,

                  admin: {
                    width: '50%',

                    description:
                      'For this design, select the same page containing this Card Info block.',
                  },
                },
              ],
            },

            {
              name: 'sectionId',

              type: 'text',

              label: 'Section ID / Card State ID',

              required: true,

              validate: validateSectionIdOptional,

              admin: {
                description: 'Example: world-elite. This hash activates the World Elite card.',
              },
            },
          ],
        },

        /* =================================================
           VISA INFINITE
        ================================================= */

        {
          name: 'visaInfinite',

          type: 'group',

          label: 'Visa Infinite',

          fields: [
            {
              name: 'cardName',

              type: 'text',

              label: 'Card Name',

              required: true,

              defaultValue: 'Visa Infinite',

              maxLength: BUTTON_LABEL_MAX,

              validate: validateShortText('Visa Infinite Card Name', BUTTON_LABEL_MAX, true),
            },

            ...visaInfiniteCardImageFields,

            {
              type: 'row',

              fields: [
                {
                  name: 'buttonLabel',

                  type: 'text',

                  label: 'Button Label',

                  required: true,

                  defaultValue: 'Visa Infinite',

                  maxLength: BUTTON_LABEL_MAX,

                  validate: validateShortText('Visa Infinite Button Label', BUTTON_LABEL_MAX, true),

                  admin: {
                    width: '50%',
                  },
                },

                {
                  name: 'buttonLink',

                  type: 'relationship',

                  relationTo: 'pages',

                  label: 'Link To Page',

                  required: true,

                  admin: {
                    width: '50%',

                    description:
                      'For this design, select the same page containing this Card Info block.',
                  },
                },
              ],
            },

            {
              name: 'sectionId',

              type: 'text',

              label: 'Section ID / Card State ID',

              required: true,

              validate: validateSectionIdOptional,

              admin: {
                description: 'Example: visa-infinite. This hash activates the Visa Infinite card.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CardInfoSchema
