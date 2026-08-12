import type { Block } from 'payload'

import {
  ALL_ARTICLE_BLOCK_LABEL,
  ALL_ARTICLE_BLOCK_THUMBNAIL_URL,
  ALL_ARTICLE_SLUG_AND_TAG,
  ARTICLES,
} from '@/lib/constants'

import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 120

const AllArticleSchema: Block = {
  slug: ALL_ARTICLE_SLUG_AND_TAG,
  labels: {
    singular: ALL_ARTICLE_BLOCK_LABEL,
    plural: ALL_ARTICLE_BLOCK_LABEL,
  },
  admin: {
    group: ARTICLES,
  },
  imageURL: ALL_ARTICLE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ALL_ARTICLE_BLOCK_LABEL} preview`,
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
      fields: [BgColorAndSectionIdField({ defaultBackground: 'white-1' })],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description:
          'Manage the article listing section tag, heading and description. CTA is disabled here because the article card CTA is controlled separately.',
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
          'Manage the article card/details page CTA. This link is used for the article details page button.',
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
          'Control whether this block should fetch article data from the global Articles collection.',
      },
      fields: [
        {
          name: 'useSharedData',
          type: 'checkbox',
          label: 'Use Shared Article Data (Global)',
          defaultValue: true,
          required: true,
          admin: {
            description: `When ON, this block renders data from **Global → ${ARTICLES}**.

**Before enabling:** fill up the Global → ${ARTICLES} data.

**Notes:**
• This block only stores presentation options (e.g., background color , CTA btn etc.).
• Articles comes from the single shared Global to keep pages in sync.`,
          },
        },
      ],
    },
  ],
}

export default AllArticleSchema
