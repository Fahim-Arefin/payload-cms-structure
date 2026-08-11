import type { Block } from 'payload'

import {
  COMMON,
  MAINTENANCE_BLOCK_LABEL,
  MAINTENANCE_BLOCK_THUMBNAIL_URL,
  MAINTENANCE_SLUG_AND_TAG,
} from '@/lib/constants'

import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TITLE_MAX = 100
const SUBTITLE_MAX = 160
const DESCRIPTION_MAX = 420

const maintenanceImageFields = generateImageFields({
  required: true,
  fieldName: 'image',
  label: 'Maintenance Image',
  description:
    'Upload the maintenance illustration image. Recommended transparent PNG/WebP. Ratio 1600:1144',
  aspectRatio: 1600 / 1144,
  quality: 0.9,
  maxKB: 800,
  ownerCollection: MAINTENANCE_SLUG_AND_TAG as any,
} as any)

const MaintenanceSchema: Block = {
  slug: MAINTENANCE_SLUG_AND_TAG,

  labels: {
    singular: MAINTENANCE_BLOCK_LABEL,
    plural: MAINTENANCE_BLOCK_LABEL,
  },

  admin: {
    group: COMMON,
  },

  imageURL: MAINTENANCE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MAINTENANCE_BLOCK_LABEL} preview`,

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
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-2',
        }),
      ],
    },

    {
      name: 'maintenanceInfo',
      type: 'group',
      label: 'Maintenance Info',
      admin: {
        description: 'Manage the maintenance image, title, subtitle, description and CTA buttons.',
      },
      fields: [
        ...maintenanceImageFields,

        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          defaultValue: 'Assembling the',
          maxLength: TITLE_MAX,
          validate: validateShortText('Maintenance Title', TITLE_MAX, true),
          admin: {
            description: `Example: Assembling the pieces all together. Max ${TITLE_MAX} characters.`,
          },
        },

        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          required: false,
          defaultValue: 'pieces all together',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Maintenance Subtitle', SUBTITLE_MAX, false),
          admin: {
            description: `Optional short subtitle. Max ${SUBTITLE_MAX} characters.`,
          },
        },

        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          defaultValue:
            "This page is currently under maintenance. We're working hard behind the scenes to improve your experience and will be back shortly. Thank you for your patience!",
          maxLength: DESCRIPTION_MAX,
          validate: validateShortText('Maintenance Description', DESCRIPTION_MAX, true),
          admin: {
            description: `Write the maintenance message. Max ${DESCRIPTION_MAX} characters.`,
          },
        },

        CtaButtonsField({
          maxRows: 2,
        }),
      ],
    },
  ],
}

export default MaintenanceSchema
