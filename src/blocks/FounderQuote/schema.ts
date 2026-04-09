import type { Block } from 'payload'

import {
  HOME_PAGE,
  FOUNDER_QUOTE_BLOCK_LABEL,
  FOUNDER_QUOTE_BLOCK_THUMBNAIL_URL,
  FOUNDER_QUOTE_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
export const CTA_BUTTON_LABEL_MAX = 40

const FounderQuoteSchema: Block = {
  slug: FOUNDER_QUOTE_SLUG_AND_TAG,
  labels: {
    singular: FOUNDER_QUOTE_BLOCK_LABEL,
    plural: FOUNDER_QUOTE_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: FOUNDER_QUOTE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FOUNDER_QUOTE_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

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
      //   noCTA: true,
    }),

    ...generateImageFields({
      fieldName: 'profileImage',
      label: 'Profile Image',
      description: 'Upload transparent background image. Aspect ratio 800:1008 recommended.',
      aspectRatio: 800 / 1008,
      quality: 0.93,
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
          required: true,
          label: 'Founder Name',
          validate: validateShortText('Founder Name', 180, true),
          admin: {
            width: '50%',
            description: 'Founder name',
          },
        },
        {
          name: 'designation',
          type: 'text',
          required: true,
          label: 'Founder Designation',
          validate: validateShortText('Founder Designation', 180, true),
          admin: {
            width: '50%',
            description:
              'Founder designation (e.g., CEO, Co-founder, Founder & Managing Director, etc.)',
          },
        },
      ],
    },
    {
      name: 'quote',
      type: 'richText',
      required: true,
      label: 'Quote',
      admin: {
        description: "The founder's quote (you can add multiple paragraphs).",
      },
    },
  ],
}

export default FounderQuoteSchema
