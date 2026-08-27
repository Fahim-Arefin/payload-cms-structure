import type { Block } from 'payload'

import {
  FEATURED_NEWS_BLOCK_LABEL,
  FEATURED_NEWS_BLOCK_THUMBNAIL_URL,
  FEATURED_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  NEWS,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 120

const FeaturedNewsSchema: Block = {
  slug: FEATURED_NEWS_SLUG_AND_TAG,

  labels: {
    singular: FEATURED_NEWS_BLOCK_LABEL,
    plural: FEATURED_NEWS_BLOCK_LABEL,
  },

  admin: {
    group: NEWS,
  },

  imageURL: FEATURED_NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FEATURED_NEWS_BLOCK_LABEL} preview`,

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
          defaultBackground: 'white-2',
        }),
      ],
    },

    {
      name: 'isFirstContentOfPage',
      type: 'checkbox',
      label: 'Is First Content Of The Page?',
      defaultValue: false,
      admin: {
        description:
          'Turn this ON if this Featured News block is the first visible content section after Hero Section of the page. Frontend can use this to adjust top roundness.',
      },
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the featured news section tag, heading and description. CTA is disabled for the section heading.',
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
          'Manage the featured news card CTA. This link is used to build the news details page URL using the selected page + news item ID.',
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
          'Control whether this block should fetch featured news from the global News collection.',
      },
      fields: [
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use Shared News Data (Global)',
          defaultValue: true,
          required: true,
          admin: {
            description: `When ON, this block renders featured news from **Global → ${NEWS}**.

**Before enabling:** fill up the Global → ${NEWS} data.

**Notes:**
• This block stores presentation options like background color, first content setting, section heading and news CTA.
• Featured news data comes from the shared Global → ${NEWS} collection.
• Frontend should fetch from Global → ${GLOBAL_NEWS_SLUG_AND_TAG}.
• The frontend should render news items where “Feature this news” is enabled in the global news item.
• The news CTA works like the All News block CTA: selected page + section ID + news item ID.`,
          },
        },
      ],
    },
  ],
}

export default FeaturedNewsSchema
