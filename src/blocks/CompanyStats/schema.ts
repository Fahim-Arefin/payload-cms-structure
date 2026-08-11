import type { Block } from 'payload'

import {
  COMPANY_STATS_BLOCK_LABEL,
  COMPANY_STATS_BLOCK_THUMBNAIL_URL,
  COMPANY_STATS_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { validateShortText } from '@/utils/block/fields-validation'

const STAT_VALUE_MAX = 30
const STAT_LABEL_MAX = 80

const CompanyStatsSchema: Block = {
  slug: COMPANY_STATS_SLUG_AND_TAG,

  labels: {
    singular: COMPANY_STATS_BLOCK_LABEL,
    plural: COMPANY_STATS_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: COMPANY_STATS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${COMPANY_STATS_BLOCK_LABEL} preview`,

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
          defaultBackground: 'primary-1-50',
        }),
      ],
    },

    {
      name: 'companyStats',
      type: 'group',
      label: 'Company Stats',
      admin: {
        description: 'Add company achievement/stat items shown in the stats strip.',
      },
      fields: [
        {
          name: 'stats',
          type: 'array',
          label: 'Stats',
          required: true,
          minRows: 1,
          maxRows: 4,
          labels: {
            singular: 'Stat',
            plural: 'Stats',
          },
          admin: {
            description: 'Recommended 4 items. Example: 8+ Years, 19+ Projects, +62%, 24/7.',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
              maxLength: STAT_VALUE_MAX,
              validate: validateShortText('Stat Value', STAT_VALUE_MAX, true),
              admin: {
                description: `Main stat value. Example: 8+ Years. Max ${STAT_VALUE_MAX} characters.`,
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Stat Label', STAT_LABEL_MAX, true),
              admin: {
                description: `Small text below the value. Example: Average Engineer Tenure. Max ${STAT_LABEL_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CompanyStatsSchema
