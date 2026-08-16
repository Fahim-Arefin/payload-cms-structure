import type { Block } from 'payload'

import {
  ALL_NEWS_BLOCK_LABEL,
  ALL_NEWS_BLOCK_THUMBNAIL_URL,
  ALL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  NEWS,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 120

const AllNewsSchema: Block = {
  slug: ALL_NEWS_SLUG_AND_TAG,

  labels: {
    singular: ALL_NEWS_BLOCK_LABEL,
    plural: ALL_NEWS_BLOCK_LABEL,
  },

  admin: {
    group: NEWS,
  },

  imageURL: ALL_NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ALL_NEWS_BLOCK_LABEL} preview`,

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
      label: 'Site Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-1',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the news listing section tag, heading and description. CTA is disabled here because the news card CTA is controlled separately.',
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
      name: 'newsCta',
      type: 'group',
      label: 'News CTA',
      admin: {
        description:
          'Manage the news card/details page CTA. This link is used for the news details page button.',
      },
      fields: [
        CtaButtonsField({
          name: 'ctaButtons',
          label: 'News Details Page Link',
          minRows: 1,
          maxRows: 1,
          required: true,
        }),
      ],
    },

    {
      name: 'sharedDataSettings',
      type: 'group',
      label: 'Shared Data Settings',
      admin: {
        description:
          'Control whether this block should fetch news data from the global News collection.',
      },
      fields: [
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use Shared News Data (Global)',
          defaultValue: true,
          required: true,
          admin: {
            description: `When ON, this block renders data from **Global → ${NEWS}**.

**Before enabling:** fill up the Global → ${NEWS} data.

**Notes:**
• This block only stores presentation options such as background color, section heading and CTA button.
• News data comes from the single shared Global to keep pages in sync.
• Frontend should fetch from Global → ${GLOBAL_NEWS_SLUG_AND_TAG}.
• The news CTA should work like the Article CTA: selected page + section ID + news item ID.`,
          },
        },
      ],
    },
  ],
}

export default AllNewsSchema
