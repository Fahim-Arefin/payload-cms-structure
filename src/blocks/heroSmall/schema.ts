import { bnNum } from './../../lib/utils'
// with localization
import type { Block } from 'payload'

import {
  HERO,
  HERO_SMALL_BLOCK_LABEL,
  HERO_SMALL_BLOCK_THUMBNAIL_URL,
  HERO_SMALL_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { pageLinkButton } from '../hero/pageLinkButton'
import { youtubeVideoButton } from '../hero/youtubeVideoButton'
import { callNowButton } from '../hero/callNowButton'

const TITLE_MAX = 120
const SUB_TITLE_MAX = 160

const HeroSmallSchema: Block = {
  slug: HERO_SMALL_SLUG_AND_TAG,
  labels: {
    singular: HERO_SMALL_BLOCK_LABEL,
    plural: HERO_SMALL_BLOCK_LABEL,
  },

  admin: {
    group: HERO,
  },

  imageURL: HERO_SMALL_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HERO_SMALL_BLOCK_LABEL} preview`,

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
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Hero Image',
          description: 'Upload & crop a 16:5 hero image.',
          aspectRatio: 16 / 5,
          quality: 0.93,
          maxKB: 700, // UI hint only; server accepts big files now
          ownerCollection: HERO_SMALL_SLUG_AND_TAG as any, // pass through to cropper
        } as any),

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

export default HeroSmallSchema
