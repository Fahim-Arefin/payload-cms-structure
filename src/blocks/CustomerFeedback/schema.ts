import type { Block } from 'payload'

import {
  CUSTOMER_FEEDBACK_BLOCK_LABEL,
  CUSTOMER_FEEDBACK_BLOCK_THUMBNAIL_URL,
  CUSTOMER_FEEDBACK_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
export const CTA_BUTTON_LABEL_MAX = 40

const CustomerFeedbackSchema: Block = {
  slug: CUSTOMER_FEEDBACK_SLUG_AND_TAG,
  labels: {
    singular: CUSTOMER_FEEDBACK_BLOCK_LABEL,
    plural: CUSTOMER_FEEDBACK_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: CUSTOMER_FEEDBACK_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CUSTOMER_FEEDBACK_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

    ...generateImageFields({
      fieldName: 'bannerImage',
      label: 'Banner Image',
      description: 'Upload Banner image. Aspect ratio 954:860 recommended.',
      aspectRatio: 954 / 860,
      quality: 0.9,
      maxKB: 500,
      required: true,
      ownerCollection: CUSTOMER_FEEDBACK_SLUG_AND_TAG as any,
    } as any),

    {
      type: 'row',
      fields: [
        {
          name: 'bannerTitle',
          type: 'text',
          required: true,
          label: 'Banner Title',
          validate: validateShortText('Banner Title', 180, true),
          admin: {
            width: '50%',
          },
        },
        {
          name: 'bannerSubtitle',
          type: 'text',
          required: true,
          label: 'Banner Subtitle',
          validate: validateShortText('Banner Subtitle', 180, true),
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'showPublishedReviews',
      type: 'checkbox',
      defaultValue: true,
    },

    CtaButtonsField({ maxRows: 1 }),
  ],
}

export default CustomerFeedbackSchema
