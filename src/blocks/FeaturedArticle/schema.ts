import type { Block } from 'payload'

import {
  ARTICLES,
  FEATURED_ARTICLE_BLOCK_LABEL,
  FEATURED_ARTICLE_BLOCK_THUMBNAIL_URL,
  FEATURED_ARTICLE_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 120

const FeaturedArticleSchema: Block = {
  slug: FEATURED_ARTICLE_SLUG_AND_TAG,

  labels: {
    singular: FEATURED_ARTICLE_BLOCK_LABEL,
    plural: FEATURED_ARTICLE_BLOCK_LABEL,
  },

  admin: {
    group: ARTICLES,
  },

  imageURL: FEATURED_ARTICLE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FEATURED_ARTICLE_BLOCK_LABEL} preview`,

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
          'Turn this ON if this Featured Article block is the first visible content section After Hero Section of the page. Frontend can use this to adjust top Roundness.',
      },
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the featured article section tag, heading and description. CTA is disabled for the section heading.',
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
      name: 'articleCta',
      type: 'group',
      label: 'Article CTA',
      admin: {
        description:
          'Manage the featured article card CTA. This link is used to build the article details page URL using the selected page + article item ID.',
      },
      fields: [
        CtaButtonsField({
          name: 'ctaButtons',
          label: 'Article Details Page Link',
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
          'Control whether this block should fetch featured articles from the global Articles collection.',
      },
      fields: [
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use Shared Article Data (Global)',
          defaultValue: true,
          required: true,
          admin: {
            description: `When ON, this block renders featured articles from **Global → ${ARTICLES}**.

**Before enabling:** fill up the Global → ${ARTICLES} data.

**Notes:**
• This block stores presentation options like background color, first content setting, section heading and article CTA.
• Featured article data comes from the shared Global → ${ARTICLES} collection.
• The frontend should render articles where “Featured Article” is enabled in the global article item.
• The article CTA works like the All Article block CTA: selected page + section ID + article item ID.`,
          },
        },
      ],
    },
  ],
}

export default FeaturedArticleSchema
