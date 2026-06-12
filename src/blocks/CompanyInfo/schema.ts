import type { Block } from 'payload'

import {
  COMPANY_INFO_BLOCK_LABEL,
  COMPANY_INFO_BLOCK_THUMBNAIL_URL,
  COMPANY_INFO_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const INFO_TEXT_MAX = 80

const CompanyInfoSchema: Block = {
  slug: COMPANY_INFO_SLUG_AND_TAG,

  labels: {
    singular: COMPANY_INFO_BLOCK_LABEL,
    plural: COMPANY_INFO_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: COMPANY_INFO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${COMPANY_INFO_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // BgColorAndSectionIdField({
    //   defaultBackground: 'white-1',
    // }),
    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-1',
        }),
      ],
    },

    {
      name: 'companyInfoItems',
      type: 'array',
      label: 'Company Info Items',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Company Info Item',
        plural: 'Company Info Items',
      },
      admin: {
        description:
          'Add small company info items like Heart Winning Agency, IT Solution Agency, Located at Dhaka, Bangladesh.',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Upload & crop a square icon. Recommended 1:1 ratio.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 100,
          required: true,
          ownerCollection: COMPANY_INFO_SLUG_AND_TAG as any,
        } as any),

        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
          maxLength: INFO_TEXT_MAX,
          validate: validateShortText('Text', INFO_TEXT_MAX, true),
          admin: {
            description: `Info text. Max ${INFO_TEXT_MAX} characters.`,
          },
        },
      ],
    },
  ],
}

export default CompanyInfoSchema
