// with localization
import { revalidateTag } from 'next/cache'
import type { Block } from 'payload'

import { HOME_PAGE_HERO_SLUG_AND_TAG } from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { pageLinkButton } from './pageLinkButton'
import { youtubeVideoButton } from './youtubeVideoButton'
import { callNowButton } from './callNowButton'

const HeroSchema: Block = {
  slug: HOME_PAGE_HERO_SLUG_AND_TAG,

  //   admin: {
  //     useAsTitle: 'id',
  //     defaultColumns: ['id', 'updatedAt'],
  //     group: HOME_PAGE_ADMIN_GROUP,
  //     description: 'Homepage → “Hero” slider items with cropped images.',
  //   },
  //   access: createSingleDocAccess(HOME_PAGE_HERO_SLUG_AND_TAG),

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by the cropper + hooks)
    // { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'heroes',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 5,
      labels: { singular: 'Hero Item', plural: 'Hero Items' },

      // ❌ removed the old “~1 MB total JSON” validations
      fields: [
        // ...generateArrayImageFields({
        //   fieldName: 'image',
        //   label: 'Hero Image',
        //   description: 'Upload & crop a 16:9 hero image.',
        //   aspectRatio: 16 / 9,
        //   quality: 0.95,
        //   maxKB: 400, // UI hint only; server accepts big files now
        //   ownerCollection: HOME_PAGE_HERO_SLUG_AND_TAG as any, // pass through to cropper
        // } as any),
        {
          name: 'image',
          label: 'Banner Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        // ===== Text fields (EN + BN twins) =====
        { name: 'title', type: 'text', required: true, label: 'Title', maxLength: 120 },
        { name: 'titleBN', type: 'text', required: true, label: 'শিরোনাম (বাংলা)', maxLength: 120 },

        { name: 'subtitle', type: 'text', label: 'Subtitle', maxLength: 160 },
        { name: 'subtitleBN', type: 'text', label: 'উপশিরোনাম (বাংলা)', maxLength: 160 },

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

  // ✅ Unified media lifecycle: direct uploads finalize on success, purge on error,
  //   hooks: withMediaLifecycle({
  //     imageConfigs: [], // none at top-level for this collection
  //     arrayFields: [
  //       {
  //         fieldName: 'heroes',
  //         mediaFields: ['image'],
  //         itemLabelField: 'title',
  //         mediaFieldLabels: { image: 'Hero Image' },
  //       },
  //     ],
  //     skipOnDraft: true,
  //     singleDocSlug: HOME_PAGE_HERO_SLUG_AND_TAG, // adds single-doc guard
  //     collectionSlug: HOME_PAGE_HERO_SLUG_AND_TAG, // used when finalizing temps
  //     onAfterChange: async ({ req }) => {
  //       revalidateTag(HOME_PAGE_HERO_SLUG_AND_TAG)
  //       triggerMediaTemporaryPurge(req) // fire-and-forget cleanup for temporary:true
  //     },
  //   }),
}

export default HeroSchema
