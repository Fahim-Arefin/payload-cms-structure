import type { Block } from 'payload'

import {
  GLOBAL_NEWS_SLUG_AND_TAG,
  NEWS,
  RELATED_NEWS_BLOCK_LABEL,
  RELATED_NEWS_BLOCK_THUMBNAIL_URL,
  RELATED_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 120

const RelatedNewsSchema: Block = {
  slug: RELATED_NEWS_SLUG_AND_TAG,

  labels: {
    singular: RELATED_NEWS_BLOCK_LABEL,
    plural: RELATED_NEWS_BLOCK_LABEL,
  },

  admin: {
    group: NEWS,
  },

  imageURL: RELATED_NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${RELATED_NEWS_BLOCK_LABEL} preview`,

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
          defaultBackground: 'white-3',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the related news section tag, heading and description. CTA is disabled for the section heading.',
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
          'Manage the related news card CTA. This link is used to build each related news detail page URL using the selected page + news item ID.',
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
          'Control whether this block should fetch related news from the global News collection.',
      },
      fields: [
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use Shared News Data (Global)',
          defaultValue: true,
          required: true,
          admin: {
            description: `When ON, this block renders related news from **Global → ${NEWS}**.

**Before enabling:** fill up the Global → ${NEWS} data.

**Notes:**
• This block stores presentation options like background color, section heading and news CTA.
• Related news data comes from the shared Global → ${NEWS} collection.
• Frontend should fetch from Global → ${GLOBAL_NEWS_SLUG_AND_TAG}.
• The frontend can filter out the current news item and show other news items with matching tags.
• The news CTA works like the All News block CTA: selected page + section ID + related news item ID.`,
          },
        },
      ],
    },
  ],
}

export default RelatedNewsSchema
