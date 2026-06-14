import type { Block } from 'payload'

import {
  FOUNDER_QUOTE_BLOCK_LABEL,
  FOUNDER_QUOTE_BLOCK_THUMBNAIL_URL,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import {
  validateAbsoluteHTTPUrl,
  validateHighlightedInField,
  validateShortText,
} from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const FOUNDER_NAME_MAX = 80
const FOUNDER_DESIGNATION_MAX = 120
const SOCIAL_URL_MAX = 200
const URL_MAX = 300

const FounderQuoteSchema: Block = {
  slug: FOUNDER_QUOTE_SLUG_AND_TAG,

  labels: {
    singular: FOUNDER_QUOTE_BLOCK_LABEL,
    plural: FOUNDER_QUOTE_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: FOUNDER_QUOTE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FOUNDER_QUOTE_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
      },
    },

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

    {
      name: 'founderQuote',
      type: 'group',
      label: 'Founder Quote',
      admin: {
        description: 'Founder quote section content: tag, heading 1, heading 2 and quote.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          required: false,
          maxLength: TAG_MAX,
          validate: validateShortText('Tag', TAG_MAX, false),
          admin: {
            description: `Small label above heading. Max ${TAG_MAX} characters.`,
          },
        },

        {
          type: 'row',
          fields: [
            {
              name: 'heading1',
              type: 'text',
              required: true,
              label: 'Heading 1',
              maxLength: HEADING_MAX,
              validate: validateShortText('Heading 1', HEADING_MAX, true),
              admin: {
                width: '33.33%',
                description: `Main heading line 1. Max ${HEADING_MAX} characters.`,
              },
            },
            {
              name: 'heading1Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 1)',
              maxLength: HEADING_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 1)',
                'heading1',
                HEADING_MAX,
                false,
              ),
              admin: {
                width: '33.33%',
                description: `Optional. Must be inside Heading 1. Max ${HEADING_MAX}.`,
              },
            },
            {
              name: 'heading1HighlightColor',
              type: 'select',
              required: false,
              label: 'Highlight Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
              ],
              admin: {
                width: '33.33%',
                description: 'Choose the highlight color style for this heading.',
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'heading2',
              type: 'text',
              required: false,
              label: 'Heading 2',
              maxLength: HEADING_MAX,
              validate: validateShortText('Heading 2', HEADING_MAX, false),
              admin: {
                width: '33.33%',
                description: `Secondary heading line. Max ${HEADING_MAX} characters.`,
              },
            },
            {
              name: 'heading2Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 2)',
              maxLength: HEADING_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 2)',
                'heading2',
                HEADING_MAX,
                false,
              ),
              admin: {
                width: '33.33%',
                description: `Optional. Must be inside Heading 2. Max ${HEADING_MAX}.`,
              },
            },
            {
              name: 'heading2HighlightColor',
              type: 'select',
              required: false,
              label: 'Highlight Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
              ],
              admin: {
                width: '33.33%',
                description: 'Choose the highlight color style for this heading.',
              },
            },
          ],
        },

        {
          name: 'quote',
          type: 'richText',
          label: 'Founder Quote',
          required: true,
          admin: {
            description: 'Founder quote text.',
          },
        },
      ],
    },

    {
      name: 'founderInfo',
      type: 'group',
      label: 'Founder Info',
      admin: {
        description: 'Founder image, name, designation and social/contact links.',
      },
      fields: [
        ...generateImageFields({
          fieldName: 'founderImage',
          label: 'Founder Image',
          description:
            'Upload founder image. Recommended transparent image. Aspect Ratio (525:512)',
          aspectRatio: 525 / 512,
          quality: 0.95,
          maxKB: 500,
          required: true,
          ownerCollection: FOUNDER_QUOTE_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Founder Name',
              required: true,
              validate: validateShortText('Founder Name', FOUNDER_NAME_MAX, true),
              admin: {
                description: `Founder name. Max ${FOUNDER_NAME_MAX} characters.`,
                width: '50%',
              },
            },

            {
              name: 'designation',
              type: 'text',
              label: 'Founder Designation',
              required: true,
              validate: validateShortText('Founder Designation', FOUNDER_DESIGNATION_MAX, true),
              admin: {
                description: `Founder designation. Max ${FOUNDER_DESIGNATION_MAX} characters.`,
                width: '50%',
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'LinkedIn URL',
              required: true,
              maxLength: SOCIAL_URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: {
                width: '50%',
                description: `Founder LinkedIn profile URL. Max ${SOCIAL_URL_MAX} characters.`,
              },
            },
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook URL',
              required: true,
              maxLength: SOCIAL_URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: {
                width: '50%',
                description: `Founder Facebook profile URL. Max ${SOCIAL_URL_MAX} characters.`,
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'whatsApp',
              type: 'text',
              label: 'WhatsApp URL',
              required: true,
              maxLength: SOCIAL_URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: {
                width: '50%',
                description:
                  'Full WhatsApp URL. Example: https://api.whatsapp.com/send?phone=%2B8801777189611&brid=YQYMKgmDKn-ZQ3Gbr7U7AA',
              },
            },
            {
              name: 'emailAddress',
              type: 'email',
              label: 'Email Address',
              required: true,
              admin: {
                width: '50%',
                description: 'Founder email address.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default FounderQuoteSchema
