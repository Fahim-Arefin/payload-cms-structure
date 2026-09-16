import type { Block } from 'payload'

import {
  CS_PRODUCT_SHOWCASE_BLOCK_LABEL,
  CS_PRODUCT_SHOWCASE_BLOCK_THUMBNAIL_URL,
  CS_PRODUCT_SHOWCASE_SLUG_AND_TAG,
  PRODUCT,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* =========================================================
   LIMITS
========================================================= */

const TAG_MAX = 40
const HEADING_MAX = 90

const PRODUCTS_TITLE_MAX = 40
const PRODUCTS_SUBTITLE_MAX = 80

const MENU_LABEL_MAX = 40
const PRODUCT_TITLE_MAX = 100
const PRODUCT_HIGHLIGHT_MAX = 50

/* =========================================================
   MAIN ICON

   Exact uploaded icon ratio:
   347 x 347 = 1:1

   Both colored + white versions required.
========================================================= */

const mainIconFields = [
  ...generateArrayImageFields({
    required: true,

    fieldName: 'mainIconColored',

    label: 'Main Icon Colored',

    description: 'Upload the colored product icon. Recommended size/ratio: 347 × 347 (1:1).',

    aspectRatio: 1 / 1,

    quality: 0.95,

    maxKB: 150,

    ownerCollection: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG as any,
  } as any),

  ...generateArrayImageFields({
    required: true,

    fieldName: 'mainIconWhite',

    label: 'Main Icon White',

    description:
      'Upload the white product icon for active/hover states. Recommended size/ratio: 347 × 347 (1:1).',

    aspectRatio: 1 / 1,

    quality: 0.95,

    maxKB: 150,

    ownerCollection: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG as any,
  } as any),
]

/* =========================================================
   SCHEMA
========================================================= */

const CSProductShowcaseSchema: Block = {
  slug: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG,

  labels: {
    singular: CS_PRODUCT_SHOWCASE_BLOCK_LABEL,
    plural: CS_PRODUCT_SHOWCASE_BLOCK_LABEL,
  },

  admin: {
    group: PRODUCT,
  },

  imageURL: CS_PRODUCT_SHOWCASE_BLOCK_THUMBNAIL_URL,

  imageAltText: `${CS_PRODUCT_SHOWCASE_BLOCK_LABEL} preview`,

  fields: [
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
        BgColorAndSectionIdField({
          defaultBackground: 'white-2',
        }),
      ],
    },

    /* =====================================================
       SECTION HEADING

       Same system as Development Framework.
    ===================================================== */

    {
      name: 'sectionHeading',

      type: 'group',

      label: 'Section Heading',

      admin: {
        description: 'Product showcase heading, description, CTA and downloadable case study.',
      },

      fields: [
        ...SectionHeadingFields({
          tagMax: TAG_MAX,

          heading1Max: HEADING_MAX,
          heading1HighlightMax: HEADING_MAX,

          heading2Max: HEADING_MAX,
          heading2HighlightMax: HEADING_MAX,

          heading3Max: HEADING_MAX,
          heading3HighlightMax: HEADING_MAX,

          includeHeading3: false,

          noCTA: false,

          ctaMaxRows: 1,

          includeDownloadButton: true,

          downloadButtonLabelMax: 40,
        }),
      ],
    },

    /* =====================================================
       PRODUCTS
    ===================================================== */

    {
      name: 'products',

      type: 'group',

      label: 'Products',

      admin: {
        description: 'Controls the products menu and connected product showcase items.',
      },

      fields: [
        /* =================================================
           PRODUCTS MENU TITLE
        ================================================= */

        {
          name: 'title',

          type: 'text',

          label: 'Products Menu Title',

          required: true,

          defaultValue: 'Our Products',

          maxLength: PRODUCTS_TITLE_MAX,

          validate: validateShortText('Products Menu Title', PRODUCTS_TITLE_MAX, true),

          admin: {
            description: `Example: Our Products. Max ${PRODUCTS_TITLE_MAX} characters.`,
          },
        },

        /* =================================================
           OPTIONAL SUBTITLE
        ================================================= */

        {
          name: 'subtitle',

          type: 'text',

          label: 'Products Menu Subtitle',

          required: false,

          maxLength: PRODUCTS_SUBTITLE_MAX,

          validate: validateShortText('Products Menu Subtitle', PRODUCTS_SUBTITLE_MAX, false),

          admin: {
            description: `Optional subtitle. Max ${PRODUCTS_SUBTITLE_MAX} characters.`,
          },
        },

        /* =================================================
           PRODUCT ITEMS
        ================================================= */

        {
          name: 'items',

          type: 'array',

          label: 'Product Items',

          required: true,

          minRows: 1,

          maxRows: 10,

          labels: {
            singular: 'Product Item',
            plural: 'Product Items',
          },

          admin: {
            description: 'Add products such as SellFast, MedCore and EduSphere.',
          },

          fields: [
            /* =============================================
               MENU
            ============================================= */

            {
              name: 'menu',

              type: 'group',

              label: 'Product Menu Item',

              fields: [
                {
                  name: 'label',

                  type: 'text',

                  label: 'Menu Label',

                  required: true,

                  maxLength: MENU_LABEL_MAX,

                  validate: validateShortText('Menu Label', MENU_LABEL_MAX, true),

                  admin: {
                    description: 'Example: SellFast, MedCore, EduSphere.',
                  },
                },

                {
                  name: 'defaultActive',

                  type: 'checkbox',

                  label: 'Default Active Item',

                  defaultValue: false,

                  admin: {
                    description: 'If enabled, this product is initially selected.',
                  },
                },
              ],
            },

            /* =============================================
               MAIN ICON

               347 × 347
            ============================================= */

            {
              name: 'mainIcon',

              type: 'group',

              label: 'Main Product Icon',

              admin: {
                description: 'Square icon used in the product menu and showcase.',
              },

              fields: [...mainIconFields],
            },

            /* =============================================
               PRODUCT LOGO

               Exact uploaded ratio:
               1216 × 320
            ============================================= */

            ...generateArrayImageFields({
              required: true,

              fieldName: 'productLogo',

              label: 'Product Logo',

              description: 'Upload the full product wordmark/logo. Recommended ratio: 1216 × 320.',

              aspectRatio: 1216 / 320,

              quality: 0.96,

              maxKB: 400,

              ownerCollection: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG as any,
            } as any),

            /* =============================================
               PRODUCT SHOWCASE IMAGE

               Exact uploaded ratio:
               1473 × 965
            ============================================= */

            ...generateArrayImageFields({
              required: true,

              fieldName: 'productImage',

              label: 'Product Showcase Image',

              description: 'Upload the product UI/device mockup. Recommended ratio: 1473 × 965.',

              aspectRatio: 1473 / 965,

              quality: 0.95,

              maxKB: 1200,

              ownerCollection: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG as any,
            } as any),

            /* =============================================
               MAIN CONTENT
            ============================================= */

            {
              name: 'mainContent',

              type: 'group',

              label: 'Product Main Content',

              fields: [
                /* title */

                {
                  name: 'title',

                  type: 'text',

                  label: 'Product Title',

                  required: true,

                  maxLength: PRODUCT_TITLE_MAX,

                  validate: validateShortText('Product Title', PRODUCT_TITLE_MAX, true),

                  admin: {
                    description:
                      'Example: CMS Website Builder, Hospital Management System, Learning Management System.',
                  },
                },

                /* =========================================
                   PRODUCT HIGHLIGHTS

                   Good generic name because it supports:
                   Build
                   Launch
                   Sell
                   Grow

                   or:
                   Patients
                   Appointments
                   EMR
                   Billing
                   Reports
                ========================================= */

                {
                  name: 'productHighlights',

                  type: 'array',

                  label: 'Product Highlights',

                  required: true,

                  minRows: 1,

                  maxRows: 10,

                  labels: {
                    singular: 'Product Highlight',

                    plural: 'Product Highlights',
                  },

                  admin: {
                    description:
                      'Short labels displayed below the product title. Example: Build, Launch, Sell, Grow.',
                  },

                  fields: [
                    {
                      name: 'text',

                      type: 'text',

                      label: 'Highlight Text',

                      required: true,

                      maxLength: PRODUCT_HIGHLIGHT_MAX,

                      validate: validateShortText('Highlight Text', PRODUCT_HIGHLIGHT_MAX, true),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default CSProductShowcaseSchema
