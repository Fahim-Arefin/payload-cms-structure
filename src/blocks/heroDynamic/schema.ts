import { bnNum } from './../../lib/utils'
// with localization
import type { Block } from 'payload'

import {
  HERO,
  HERO_DYNAMIC_BLOCK_LABEL,
  HERO_DYNAMIC_BLOCK_THUMBNAIL_URL,
  HERO_DYNAMIC_SLUG_AND_TAG,
} from '@/lib/constants'
import { callNowButton } from '../hero/callNowButton'
import { pageLinkButton } from '../hero/pageLinkButton'
import { youtubeVideoButton } from '../hero/youtubeVideoButton'

const TITLE_MAX = 120

const HeroDynamicSchema: Block = {
  slug: HERO_DYNAMIC_SLUG_AND_TAG,
  labels: {
    singular: HERO_DYNAMIC_BLOCK_LABEL,
    plural: HERO_DYNAMIC_BLOCK_LABEL,
  },

  admin: {
    group: HERO,
  },

  imageURL: HERO_DYNAMIC_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HERO_DYNAMIC_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by the cropper + hooks)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'heroes',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Hero Item', plural: 'Hero Items' },

      fields: [
        // ===== Text fields (EN + BN twins) =====
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              maxLength: TITLE_MAX,
              admin: {
                width: '50%',
                description: `Title (English). Max ${TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'শিরোনাম (বাংলা)',
              maxLength: TITLE_MAX,
              admin: {
                width: '50%',
                description: `শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },

    // CTA Buttons Block Layout (outside of hero items)
    {
      name: 'ctaButtons',
      type: 'blocks',
      label: 'CTA Buttons',
      admin: {
        description:
          'Add call-to-action buttons that appear below the hero content (maximum 2 buttons)',
      },
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      minRows: 0,
      maxRows: 2,
      blocks: [pageLinkButton, youtubeVideoButton, callNowButton],
    },
  ],
}

export default HeroDynamicSchema
