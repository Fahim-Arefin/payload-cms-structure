import type { Block } from 'payload'

import {
  ARTICLES,
  SINGLE_ARTICLE_BLOCK_LABEL,
  SINGLE_ARTICLE_BLOCK_THUMBNAIL_URL,
  SINGLE_ARTICLE_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'

const SingleArticleSchema: Block = {
  slug: SINGLE_ARTICLE_SLUG_AND_TAG,

  labels: {
    singular: SINGLE_ARTICLE_BLOCK_LABEL,
    plural: SINGLE_ARTICLE_BLOCK_LABEL,
  },

  admin: {
    group: ARTICLES,
  },

  imageURL: SINGLE_ARTICLE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SINGLE_ARTICLE_BLOCK_LABEL} preview`,

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
      name: 'articleCta',
      type: 'group',
      label: 'Article CTA',
      admin: {
        description:
          'Manage the single article CTA button. This button can be used to link back to the article listing page or any internal page.',
      },
      fields: [
        CtaButtonsField({
          name: 'ctaButtons',
          label: 'All Article Page Link',
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
          'Control whether this block should fetch single article data from the global Articles collection.',
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
• This block only stores presentation options such as background color and CTA button.
• Article details come from the single shared Global to keep pages in sync.`,
          },
        },
      ],
    },
  ],
}

export default SingleArticleSchema
