import type { Block } from 'payload'

import {
  COMMON,
  TECHNICAL_SPECIFICATIONS_BLOCK_LABEL,
  TECHNICAL_SPECIFICATIONS_BLOCK_THUMBNAIL_URL,
  TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const SPECT_NAME = 60
const SPECT_DETAILS = 120

const TechnicalSpecificationsSchema: Block = {
  slug: TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
  labels: {
    singular: TECHNICAL_SPECIFICATIONS_BLOCK_LABEL,
    plural: TECHNICAL_SPECIFICATIONS_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: TECHNICAL_SPECIFICATIONS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${TECHNICAL_SPECIFICATIONS_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      //   ctaMaxRows: 1,
      noCTA: true,
    }),

    // ===== Table Headers (Specification / Details) =====
    {
      type: 'row',
      fields: [
        {
          name: 'specNameHeader',
          type: 'text',
          required: false,
          label: 'Specification Header',
          maxLength: SPECT_NAME,
          validate: validateShortText('Specification Header', SPECT_NAME, false),
          admin: {
            width: '50%',
            description: 'Left column heading. Example: "Specification".',
          },
          defaultValue: 'Specification',
        },
        {
          name: 'detailsHeader',
          type: 'text',
          required: false,
          label: 'Details Header',
          maxLength: SPECT_NAME,
          validate: validateShortText('Details Header', SPECT_NAME, false),
          admin: {
            width: '50%',
            description: 'Right column heading. Example: "Details".',
          },
          defaultValue: 'Details',
        },
      ],
    },

    // ===== Specifications =====
    {
      name: 'specifications',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      label: 'Specifications',
      labels: { singular: 'Specification', plural: 'Specifications' },
      admin: {
        description: 'Add technical specifications (icon optional).',
      },
      fields: [
        // optional icon
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (optional)',
          description: 'Optional icon (1:1). Transparent PNG/SVG recommended.',
          aspectRatio: 1 / 1,
          quality: 0.9,
          maxKB: 200,
          required: false,
          ownerCollection: TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Specification Name',
              maxLength: SPECT_NAME,
              validate: validateShortText('Specification Name', SPECT_NAME, true),
              admin: {
                width: '50%',
                description: 'Example: "Diameter Range"',
              },
            },
            {
              name: 'details',
              type: 'text',
              required: true,
              label: 'Specification Details',
              maxLength: SPECT_DETAILS,
              validate: validateShortText('Specification Details', SPECT_DETAILS, true),
              admin: {
                width: '50%',
                description: 'Example: "2.5 mm to 40 mm , 3 Strand / 4 Strand Twisted etc ..."',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default TechnicalSpecificationsSchema
