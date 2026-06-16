import type { Block } from 'payload'

import {
  CONTACT_US_BLOCK_LABEL,
  CONTACT_US_BLOCK_THUMBNAIL_URL,
  CONTACT_US_SLUG_AND_TAG,
  COMMON,
  GLOBAL_CONTACT_US_LABEL,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const ContactUsSchema: Block = {
  slug: CONTACT_US_SLUG_AND_TAG,

  labels: {
    singular: CONTACT_US_BLOCK_LABEL,
    plural: CONTACT_US_BLOCK_LABEL,
  },

  admin: {
    group: COMMON,
  },

  imageURL: CONTACT_US_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CONTACT_US_BLOCK_LABEL} preview`,

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
          defaultBackground: 'white-3',
        }),
      ],
    },
    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Main intro heading, highlighted text, description and optional CTA.',
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
          noCTA: true,
          includeHeading3: false,
        }),
      ],
    },
    {
      name: 'useSharedData',
      type: 'checkbox',
      label: `Use shared **${GLOBAL_CONTACT_US_LABEL}**`,
      defaultValue: true,
      required: true,
      admin: {
        description: `When ON, this block renders data from **${GLOBAL_CONTACT_US_LABEL}**.

**Before enabling:** fill up the **${GLOBAL_CONTACT_US_LABEL}** data.

**Notes:**
• This block only stores presentation options (e.g., background color , section headings etc.).
• Contact Us data comes from the single shared **${GLOBAL_CONTACT_US_LABEL}** to keep pages in sync.`,
      },
    },
  ],
}

export default ContactUsSchema
