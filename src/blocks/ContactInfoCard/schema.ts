import type { Block } from 'payload'

import {
  GET_IN_TOUCH,
  CONTACT_INFO_CARD_BLOCK_LABEL,
  CONTACT_INFO_CARD_BLOCK_THUMBNAIL_URL,
  CONTACT_INFO_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const ContactInfoCardSchema: Block = {
  slug: CONTACT_INFO_CARD_SLUG_AND_TAG,
  labels: {
    singular: CONTACT_INFO_CARD_BLOCK_LABEL,
    plural: CONTACT_INFO_CARD_BLOCK_LABEL,
  },

  admin: { group: GET_IN_TOUCH },

  imageURL: CONTACT_INFO_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CONTACT_INFO_CARD_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      ctaMaxRows: 1,
      includeHeading3: false,
      // noCTA: true,
    }),

    // arrays of title and description
    {
      name: 'contactInfo',
      type: 'array',
      label: 'Contact Information',
      minRows: 1,
      maxRows: 6,
      fields: [
        // ✅ Colored icon (required)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (Colored)',
          description:
            'Required. Upload a colored icon (PNG/SVG) with transparent background (no background). 1:1.',
          aspectRatio: 1 / 1,
          quality: 0.9,
          maxKB: 200,
          required: true,
          ownerCollection: CONTACT_INFO_CARD_SLUG_AND_TAG as any,
        } as any),

        // ✅ White icon (required)
        ...generateArrayImageFields({
          fieldName: 'iconWhite',
          label: 'Icon (White)',
          description:
            'Required. Upload a white icon (PNG/SVG) with transparent background (no background). Used for dark/hover UI. 1:1.',
          aspectRatio: 1 / 1,
          quality: 0.9,
          maxKB: 200,
          required: true,
          ownerCollection: CONTACT_INFO_CARD_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'displayText',
              type: 'text',
              required: true,
              label: 'Display Text',
              validate: validateShortText('Display Text', 180, true),
              admin: {
                width: '50%',
                description:
                  'Visible text, such as phone number, email, office address, or page label.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Description',
              admin: {
                width: '50%',
                description: 'description (you can add multiple paragraphs).',
              },
            },
          ],
        },

        // {
        //   type: 'row',
        //   fields: [
        //     {
        //       name: 'actionType',
        //       type: 'select',
        //       required: true,
        //       defaultValue: 'auto',
        //       label: 'Action Type',
        //       options: [
        //         { label: 'Phone Call', value: 'phone' },
        //         { label: 'Email', value: 'email' },
        //         { label: 'External Link', value: 'external' },
        //         { label: 'Internal Page', value: 'internal' },
        //         { label: 'No Link', value: 'none' },
        //       ],
        //       admin: {
        //         width: '50%',
        //       },
        //     },
        //     {
        //       name: 'actionValue',
        //       type: 'text',
        //       required: false,
        //       label: 'Action Value',
        //       admin: {
        //         width: '50%',
        //         description:
        //           'Phone number, email, or external URL. Leave empty when using Auto Detect from Display Text.',
        //         condition: (_data, siblingData) =>
        //           ['phone', 'email', 'external'].includes(siblingData?.actionType),
        //       },
        //     },
        //   ],
        // },
        {
          type: 'row',
          fields: [
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              required: false,
              admin: {
                width: '50%',
                description:
                  'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
              },
            },
            {
              name: 'sectionId',
              type: 'text',
              label: 'Section ID (anchor)',
              required: false,
              admin: {
                width: '50%',
                description:
                  'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
              },
              validate: validateSectionIdOptional,
            },
          ],
        },
      ],
    },
  ],
}

export default ContactInfoCardSchema
