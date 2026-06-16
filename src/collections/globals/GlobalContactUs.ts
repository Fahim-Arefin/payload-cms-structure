import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cacheTags'
import {
  CONTACT_US_SLUG_AND_TAG,
  GLOBAL_CONTACT_US_LABEL,
  GLOBAL_CONTACT_US_SLUG_AND_TAG,
} from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { validateShortText } from '@/utils/block/fields-validation'
import { revalidateTag } from 'next/cache'

const OPTION_TEXT_MAX = 100

const GlobalContactUs: GlobalConfig = {
  slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
  label: GLOBAL_CONTACT_US_LABEL,

  admin: {
    description: 'Global Contact Us options: our solutions and budget ranges.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    {
      name: 'ourSolutions',
      type: 'array',
      label: 'Our Solutions',
      minRows: 1,
      maxRows: 30,
      labels: {
        singular: 'Solution',
        plural: 'Solutions',
      },
      admin: {
        description:
          'Examples: Software as a Service (SaaS), Web App Development, Mobile App Development.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Solution Text',
          required: true,
          maxLength: OPTION_TEXT_MAX,
          validate: validateShortText('Solution Text', OPTION_TEXT_MAX, true),
          admin: {
            description: `Solution name. Max ${OPTION_TEXT_MAX} characters.`,
          },
        },
      ],
    },

    {
      name: 'budgets',
      type: 'array',
      label: 'Budget Options',
      minRows: 1,
      maxRows: 30,
      labels: {
        singular: 'Budget',
        plural: 'Budgets',
      },
      admin: {
        description: 'Examples: BELOW 1K USD, 1K-3K USD, 3K-5K USD.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Budget Text',
          required: true,
          maxLength: OPTION_TEXT_MAX,
          validate: validateShortText('Budget Text', OPTION_TEXT_MAX, true),
          admin: {
            description: `Budget range text. Max ${OPTION_TEXT_MAX} characters.`,
          },
        },
      ],
    },
  ],

  hooks: {
    afterChange: [
      async () => {
        revalidateTag(globalTag(GLOBAL_CONTACT_US_SLUG_AND_TAG))
        revalidateTag(CONTACT_US_SLUG_AND_TAG)
      },
    ],
  },
}

export default GlobalContactUs
