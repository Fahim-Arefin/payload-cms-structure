import type { Block } from 'payload'

import {
  GLOBAL_NEWS_SLUG_AND_TAG,
  NEWS,
  SINGLE_NEWS_BLOCK_LABEL,
  SINGLE_NEWS_BLOCK_THUMBNAIL_URL,
  SINGLE_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'

const SingleNewsSchema: Block = {
  slug: SINGLE_NEWS_SLUG_AND_TAG,

  labels: {
    singular: SINGLE_NEWS_BLOCK_LABEL,
    plural: SINGLE_NEWS_BLOCK_LABEL,
  },

  admin: {
    group: NEWS,
  },

  imageURL: SINGLE_NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SINGLE_NEWS_BLOCK_LABEL} preview`,

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
      name: 'newsCta',
      type: 'group',
      label: 'News CTA',
      admin: {
        description:
          'Manage the single news CTA button. This button can be used to link back to the news listing page or any internal page.',
      },
      fields: [
        CtaButtonsField({
          name: 'ctaButtons',
          label: 'All News Page Link',
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
          'Control whether this block should fetch single news data from the global News collection.',
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
• This block only stores presentation options such as background color and CTA button.
• News details come from the single shared Global to keep pages in sync.
• Frontend should fetch from Global → ${GLOBAL_NEWS_SLUG_AND_TAG}.
• The route slug/id is used to find the matching news item from the global news array.`,
          },
        },
      ],
    },
  ],
}

export default SingleNewsSchema
