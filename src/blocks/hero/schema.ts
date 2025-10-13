import { bnNum } from './../../lib/utils'
// with localization
import type { Block } from 'payload'

import { HOME_PAGE_HERO_BLOCK_LABEL, HOME_PAGE_HERO_SLUG_AND_TAG } from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { callNowButton } from './callNowButton'
import { pageLinkButton } from './pageLinkButton'
import { youtubeVideoButton } from './youtubeVideoButton'

const TITLE_MAX = 120
const SUB_TITLE_MAX = 160

const HeroSchema: Block = {
  slug: HOME_PAGE_HERO_SLUG_AND_TAG,
  labels: {
    singular: HOME_PAGE_HERO_BLOCK_LABEL,
    plural: HOME_PAGE_HERO_BLOCK_LABEL,
  },

  // 👇 This is the important bit
  imageURL: '/assets/block-icons/hero-block-thumbnail.png',
  imageAltText: 'Hero block preview',

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
          description: 'Upload & crop a 16:9 hero image.',
          aspectRatio: 16 / 9,
          quality: 0.9,
          maxKB: 400, // UI hint only; server accepts big files now
          ownerCollection: HOME_PAGE_HERO_SLUG_AND_TAG as any, // pass through to cropper
        } as any),

        // {
        //   name: 'image',
        //   label: 'Banner Image',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        // },

        // ===== Text fields (EN + BN twins) =====
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          admin: {
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
            description: `শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },

        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          maxLength: SUB_TITLE_MAX,
          admin: { description: `Subtitle (English). Max ${SUB_TITLE_MAX} characters.` },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUB_TITLE_MAX,
          admin: { description: `উপশিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(SUB_TITLE_MAX)} অক্ষর।` },
        },

        { name: 'description', type: 'richText', label: 'Description' },
        { name: 'descriptionBN', type: 'richText', label: 'বিবরণ (বাংলা)' },
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

export default HeroSchema
