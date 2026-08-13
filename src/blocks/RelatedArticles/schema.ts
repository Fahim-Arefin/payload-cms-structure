import type { Block } from 'payload'

import {
  ARTICLES,
  GLOBAL_ARTICLE_SLUG_AND_TAG,
  RELATED_ARTICLE_BLOCK_LABEL,
  RELATED_ARTICLE_BLOCK_THUMBNAIL_URL,
  RELATED_ARTICLE_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'

const TAG_MAX = 40
const HEADING_MAX = 120

const RelatedArticleSchema: Block = {
  slug: RELATED_ARTICLE_SLUG_AND_TAG,

  labels: {
    singular: RELATED_ARTICLE_BLOCK_LABEL,
    plural: RELATED_ARTICLE_BLOCK_LABEL,
  },

  admin: {
    group: ARTICLES,
  },

  imageURL: RELATED_ARTICLE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${RELATED_ARTICLE_BLOCK_LABEL} preview`,

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
          'Manage the related article section tag, heading and description. CTA is disabled for this block.',
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
          'Manage the related article card CTA. This link is used to build each related article detail page URL using the selected page + article item id.',
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
          'Control whether this block should fetch related articles from the global Articles collection.',
      },
      fields: [
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use Shared Article Data (Global)',
          defaultValue: true,
          required: true,
          admin: {
            description: `When ON, this block renders related articles from **Global → ${ARTICLES}**.

**Before enabling:** fill up the Global → ${ARTICLES} data.

**Notes:**
• This block only stores presentation options like background color and section heading.
• Related articles come from the shared Global → ${ARTICLES} collection.
• The frontend can filter out the current article and show other articles from the same/global article data.`,
          },
        },
      ],
    },
  ],
}

export default RelatedArticleSchema
